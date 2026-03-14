import { Link } from "react-router-dom"

const socialLinks = [
    {
        label: "WhatsApp",
        href: "https://wa.me/?text=I'm pledging to vote in the 2027 Nigerian elections! Join me: https://iwillvote2027.ng",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.054 23.25a.75.75 0 00.916.916l5.392-1.479A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 01-4.953-1.356l-.355-.211-3.682 1.01 1.01-3.682-.211-.355A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
            </svg>
        ),
    },
    {
        label: "X / Twitter",
        href: "https://twitter.com/intent/tweet?text=I'm pledging to vote in the 2027 Nigerian elections! %23IWillVote2027&url=https://iwillvote2027.ng",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/sharer/sharer.php?u=https://iwillvote2027.ng",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
        ),
    },
    {
        label: "Telegram",
        href: "https://t.me/share/url?url=https://iwillvote2027.ng&text=I'm pledging to vote in 2027! %23IWillVote2027",
        icon: (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
        ),
    },
]

export default function Footer() {
    return (
        <footer className="bg-green-950 text-white">

            {/* Main footer body */}
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                    {/* Brand column */}
                    <div className="space-y-4">
                        <Link to="/" className="inline-block text-xl font-extrabold tracking-tight text-white">
                            IWillVote<span className="text-green-400">2027</span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                            A civic movement to mobilise Nigerians to exercise their democratic right in the 2027 general elections.
                        </p>

                        {/* Social icons */}
                        <div className="flex items-center gap-3 pt-2">
                            {socialLinks.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-green-700 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200"
                                >
                                    {s.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { label: "Home", to: "/" },
                                { label: "Take the Pledge", to: "/pledge" },
                            ].map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-sm text-white/70 hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200 group"
                                    >
                                        <span className="w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CTA column */}
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
                            Join the Movement
                        </h4>
                        <p className="text-white/60 text-sm leading-relaxed mb-5">
                            Your vote is your power. Take the pledge, earn your badge, and inspire those around you.
                        </p>
                        <Link
                            to="/pledge"
                            className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-5 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-900"
                        >
                            Take the Pledge
                            <svg
                                className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>

            {/* Divider */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="border-t border-white/10" />
            </div>

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
                <p>© {new Date().getFullYear()} I Will Vote In 2027. All rights reserved.</p>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    <span>#IWillVoteIn2027!</span>
                </div>
            </div>

        </footer>
    )
}