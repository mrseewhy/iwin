import { useState, useEffect } from "react"
import {
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    type User,
} from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../lib/firebase"

type AdminAuthState = {
    user: User | null
    isAdmin: boolean
    loading: boolean
    error: string | null
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

export function useAdminAuth(): AdminAuthState {
    const [user, setUser] = useState<User | null>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Listen to Firebase auth state on mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Check allowlist
                const allowed = await checkAllowlist(firebaseUser.email ?? "")
                if (allowed) {
                    setUser(firebaseUser)
                    setIsAdmin(true)
                } else {
                    // Signed in but not in allowlist — sign them out immediately
                    await firebaseSignOut(auth)
                    setUser(null)
                    setIsAdmin(false)
                }
            } else {
                setUser(null)
                setIsAdmin(false)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const login = async (email: string, password: string): Promise<void> => {
        setError(null)
        setLoading(true)

        try {
            const credential = await signInWithEmailAndPassword(auth, email, password)

            // Double-check allowlist after login
            const allowed = await checkAllowlist(credential.user.email ?? "")
            if (!allowed) {
                await firebaseSignOut(auth)
                setError("Access denied. Your account is not authorised to access this dashboard.")
                setUser(null)
                setIsAdmin(false)
            }
        } catch (err) {
            const code = (err as { code?: string }).code ?? ""
            setError(friendlyError(code))
            setUser(null)
            setIsAdmin(false)
        } finally {
            setLoading(false)
        }
    }

    const logout = async (): Promise<void> => {
        await firebaseSignOut(auth)
        setUser(null)
        setIsAdmin(false)
    }

    return { user, isAdmin, loading, error, login, logout }
}

/* ── Helpers ──────────────────────────────────────────────── */

async function checkAllowlist(email: string): Promise<boolean> {
    if (!email) return false
    try {
        // Firestore document path: admins/{email}
        const ref = doc(db, "admins", email.toLowerCase())
        const snap = await getDoc(ref)
        return snap.exists()
    } catch {
        return false
    }
}

function friendlyError(code: string): string {
    switch (code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Incorrect email or password."
        case "auth/too-many-requests":
            return "Too many failed attempts. Please try again later."
        case "auth/network-request-failed":
            return "Network error. Check your connection and try again."
        default:
            return "Login failed. Please try again."
    }
}