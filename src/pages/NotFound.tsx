import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

export default function NotFound() {
    const [count, setCount] = useState(10)

    // Auto-redirect countdown
    useEffect(() => {
        if (count <= 0) {
            window.location.href = "/"
            return
        }
        const t = setTimeout(() => setCount((c) => c - 1), 1000)
        return () => clearTimeout(t)
    }, [count])

    return (
        <div className="min-h-screen bg-green-950 flex items-center justify-center px-6 overflow-hidden relative">

            {/* Large faint 404 background text */}
            <span
                className="absolute select-none font-black text-white/3 pointer-events-none"
                style={{ fontSize: "clamp(160px, 35vw, 420px)", lineHeight: 1, letterSpacing: "-0.05em" }}
            >
                404
            </span>

            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/3 pointer-events-none" />

            {/* Nigeria flag accent — left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
                <div className="flex-1 bg-green-600" />
                <div className="flex-1 bg-white/20" />
                <div className="flex-1 bg-green-600" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-lg">

                {/* Ballot box icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-8 mx-auto">
                    <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                </div>

                {/* Eyebrow */}
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-green-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    Page Not Found
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                    This page didn't
                    <br />
                    <span className="text-green-400">show up to vote.</span>
                </h1>

                {/* Subtext */}
                <p className="text-white/50 text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                    The page you're looking for has abstained. But your vote still counts —
                    head back and make it matter.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        to="/"
                        className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-900 text-sm"
                    >
                        <svg className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>

                    <Link
                        to="/pledge"
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 hover:text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm"
                    >
                        Take the Pledge
                    </Link>
                </div>

                {/* Auto-redirect notice */}
                <p className="text-white/20 text-xs mt-10">
                    Redirecting to home in{" "}
                    <span className="text-green-400 font-bold tabular-nums">{count}s</span>
                </p>

            </div>

            {/* Bottom branding */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-white/20 text-xs font-semibold tracking-widest uppercase">
                    IWillVote<span className="text-green-400/50">2027</span>
                </p>
            </div>

        </div>
    )
}