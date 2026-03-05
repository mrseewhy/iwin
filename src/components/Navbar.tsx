import { NavLink } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="w-full bg-green-950 border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <NavLink to="/" className="text-lg font-extrabold tracking-tight text-white">
                    IWillVote<span className="text-green-400">2027</span>
                </NavLink>

                {/* Nav links */}
                <div className="flex items-center gap-2">

                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            `text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 ${isActive
                                ? "bg-white/10 text-white"
                                : "text-white/60 hover:text-white hover:bg-white/5"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/pledge"
                        className={({ isActive }) =>
                            `inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-xl transition-all duration-200 hover:-translate-y-0.5 ${isActive
                                ? "bg-green-400 text-green-950 shadow-lg shadow-green-900"
                                : "bg-green-600 text-white hover:bg-green-500 shadow-lg shadow-green-900"
                            }`
                        }
                    >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Take the Pledge
                    </NavLink>

                </div>
            </div>
        </nav>
    )
}