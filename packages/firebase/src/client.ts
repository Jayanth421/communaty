import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMieR1kdBtnsU0tjm2NW_duc9dgxzypLw",
  authDomain: "copex-5eea9.firebaseapp.com",
  projectId: "copex-5eea9",
  storageBucket: "copex-5eea9.firebasestorage.app",
  messagingSenderId: "334449759192",
  appId: "1:334449759192:web:19cd921ea2d47197f418ad",
  measurementId: "G-D8MPTP7Z78"
};

// Initialize Firebase only once (safe for HMR in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
