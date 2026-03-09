import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAdminAuth } from "../../hooks/useAdminAuth"

export default function AdminLogin() {
    const { login, isAdmin, loading, error } = useAdminAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPass, setShowPass] = useState(false)

    // Redirect if already logged in
    useEffect(() => {
        if (isAdmin) navigate("/admin/dashboard", { replace: true })
    }, [isAdmin, navigate])

    const handleSubmit = async () => {
        if (!email.trim() || !password) return
        await login(email.trim(), password)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit()
    }

    return (
        <div className="min-h-screen bg-green-950 flex items-center justify-center px-4">

            {/* Background rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5 pointer-events-none" />

            <div className="relative w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <p className="text-2xl font-extrabold tracking-tight text-white">
                        IWillVoteIn<span className="text-green-400">2027</span>
                    </p>
                    <p className="text-white/40 text-sm mt-1">Admin Dashboard</p>
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-5">

                    <div>
                        <h1 className="text-xl font-extrabold text-gray-900">Sign in</h1>
                        <p className="text-sm text-gray-400 mt-1">
                            Authorised accounts only
                        </p>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2 text-sm text-red-700">
                            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Email address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="admin@example.com"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 text-sm text-gray-900 outline-none transition-colors disabled:opacity-50"
                        />
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                        <label className="block text-sm font-semibold text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPass ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="••••••••"
                                disabled={loading}
                                className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-green-500 text-sm text-gray-900 outline-none transition-colors disabled:opacity-50"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPass((p) => !p)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPass ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={loading || !email || !password}
                        className="w-full flex items-center justify-center gap-3 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-200"
                    >
                        {loading ? (
                            <>
                                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Signing in…
                            </>
                        ) : (
                            "Sign in"
                        )}
                    </button>

                </div>

                <p className="text-center text-white/20 text-xs mt-6">
                    Access restricted to authorised administrators only
                </p>
            </div>
        </div>
    )
}