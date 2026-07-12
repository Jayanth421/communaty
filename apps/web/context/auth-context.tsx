"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "@repo/firebase"
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore"

export type UserRole = "student" | "instructor" | "moderator" | "admin"

type AuthContextType = {
  user: User | null
  role: UserRole | null
  loading: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  signOut: async () => {},
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser)
      if (currentUser) {
        try {
          // Listen to user document in Firestore in real-time
          const userRef = doc(db, "users", currentUser.uid)
          
          const unsubscribeSnapshot = onSnapshot(userRef, async (snap) => {
            if (snap.exists()) {
              setRole((snap.data().role as UserRole) ?? "student")
              setLoading(false)
            } else {
              // First login — create user doc with default role
              await setDoc(userRef, {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName ?? "",
                role: "student",
                createdAt: serverTimestamp(),
              })
              setRole("student")
              setLoading(false)
            }
          }, (error) => {
            console.error("Error listening to user role:", error)
            setRole("student")
            setLoading(false)
          })

          // Cleanup snapshot listener on unmount or auth change
          return () => unsubscribeSnapshot()
        } catch (error) {
          console.error("Error setting up role listener:", error)
          setRole("student")
          setLoading(false)
        }
      } else {
        setRole(null)
        setLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  const signOut = async () => {
    await firebaseSignOut(auth)
    setRole(null)
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
