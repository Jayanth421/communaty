"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "@repo/firebase"
import { FirebaseError } from "firebase/app"
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth"
import { doc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore"
import { resolveRoleFromEmail } from "../lib/admin"

export type UserRole = "student" | "institute" | "instructor" | "moderator" | "admin"

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
    let unsubscribeSnapshot: (() => void) | undefined

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      unsubscribeSnapshot?.()
      unsubscribeSnapshot = undefined
      setUser(currentUser)
      if (currentUser) {
        try {
          // Listen to user document in Firestore in real-time
          const userRef = doc(db, "users", currentUser.uid)
          
          unsubscribeSnapshot = onSnapshot(userRef, async (snap) => {
            if (snap.exists()) {
              setRole((snap.data().role as UserRole) ?? resolveRoleFromEmail(currentUser.email))
              setLoading(false)
            } else {
              // First login — create user doc with default role
              const resolvedRole = resolveRoleFromEmail(currentUser.email)
              await setDoc(userRef, {
                uid: currentUser.uid,
                email: currentUser.email,
                displayName: currentUser.displayName ?? "",
                role: resolvedRole,
                accountType: resolvedRole,
                createdAt: serverTimestamp(),
              })
              setRole(resolvedRole)
              setLoading(false)
            }
          }, (error) => {
            console.error("Error listening to user role:", error)
            if (error instanceof FirebaseError && error.code === "permission-denied") {
              console.warn("Signed in, but user profile is not readable. Falling back to email-based role detection.")
            }
            setRole(resolveRoleFromEmail(currentUser.email))
            setLoading(false)
          })
        } catch (error) {
          console.error("Error setting up role listener:", error)
          setRole(resolveRoleFromEmail(currentUser.email))
          setLoading(false)
        }
      } else {
        setRole(null)
        setLoading(false)
      }
    })
    return () => {
      unsubscribeSnapshot?.()
      unsubscribe()
    }
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
