import { Navigate } from "react-router-dom"
import { useAdminAuth } from "../../hooks/useAdminAuth"

type Props = {
    children: React.ReactNode
}

export default function AdminRoute({ children }: Props) {
    const { isAdmin, loading } = useAdminAuth()

    // Still checking auth state — show nothing to avoid flash
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <svg className="w-10 h-10 text-green-600 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <p className="text-sm text-gray-400">Checking access…</p>
                </div>
            </div>
        )
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" replace />
    }

    return <>{children}</>
}