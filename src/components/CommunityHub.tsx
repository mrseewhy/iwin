import { Link } from "react-router-dom"

const SITE_URL = "https://iwillvote2027.ng"

const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent("I'm pledging to vote in the 2027 Nigerian elections! Join me. #IWillVote2027")}&url=${encodeURIComponent(SITE_URL)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SITE_URL)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(SITE_URL)}&text=${encodeURIComponent("I'm pledging to vote in 2027! #IWillVote2027")}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent("I'm pledging to vote in the 2027 Nigerian elections! Join me here: " + SITE_URL)}`,
}

export default function CommitmentHub() {
    return (
        // -mt-24 pulls this section up into the green countdown section
        <section className="relative -mt-40 pb-20 z-10">
            <div className="max-w-7xl mx-auto px-6 bg-gray-50 rounded-t-3xl pt-10">

                {/* Section label */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                        Commitment Hub
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Four steps to make your voice count
                    </p>
                </div>

                {/* 4-card grid — 2×2 on mobile, 4 columns on desktop */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">

                    {/* Card 1 — Get your PVC */}
                    <Card
                        icon={
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        }
                        iconBg="bg-green-100"
                        iconColor="text-green-700"
                        title="Get your PVC"
                        description="Register and collect your Permanent Voter's Card before the deadline..."
                        step="01"
                    />

                    {/* Card 2 — Take the pledge */}
                    <Card
                        icon={
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        }
                        iconBg="bg-emerald-100"
                        iconColor="text-emerald-700"
                        title="Take the pledge"
                        description="Commit publicly to voting in the 2027 general elections."
                        step="02"
                        cta={<Link to="/pledge" className="mt-4 inline-block text-xs font-bold text-green-700 hover:underline">Pledge now →</Link>}
                    />

                    {/* Card 3 — Engage others */}
                    <Card
                        icon={
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        }
                        iconBg="bg-teal-100"
                        iconColor="text-teal-700"
                        title="Engage others"
                        description="Mobilise your network — family, friends, and colleagues — to pledge too."
                        step="03"
                    />

                    {/* Card 4 — Share */}
                    <div className="bg-green-700 text-white rounded-2xl p-5 shadow-lg shadow-green-200 flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                            </div>
                            <span className="text-white/50 text-xs font-bold tracking-widest">04</span>
                            <h3 className="text-base font-bold mt-1 mb-1">Share the movement</h3>
                            <p className="text-white/70 text-xs leading-relaxed">
                                Spread the word on social media and grow the movement.
                            </p>
                        </div>

                        {/* Social icons */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            <SocialIcon
                                href={shareLinks.whatsapp}
                                label="WhatsApp"
                                icon={
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.054 23.25a.75.75 0 00.916.916l5.392-1.479A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 01-4.953-1.356l-.355-.211-3.682 1.01 1.01-3.682-.211-.355A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                                    </svg>
                                }
                            />
                            <SocialIcon
                                href={shareLinks.facebook}
                                label="Facebook"
                                icon={
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                }
                            />
                            <SocialIcon
                                href={shareLinks.twitter}
                                label="X / Twitter"
                                icon={
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                }
                            />
                            <SocialIcon
                                href={shareLinks.linkedin}
                                label="LinkedIn"
                                icon={
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                }
                            />
                            <SocialIcon
                                href={shareLinks.telegram}
                                label="Telegram"
                                icon={
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                    </svg>
                                }
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

/* ── Sub-components ───────────────────────────────────────── */

type CardProps = {
    icon: React.ReactNode
    iconBg: string
    iconColor: string
    title: string
    description: string
    step: string
    cta?: React.ReactNode
}

function Card({ icon, iconBg, iconColor, title, description, step, cta }: CardProps) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-100 border border-gray-100 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
            <div>
                <div className={`w-12 h-12 ${iconBg} ${iconColor} rounded-xl flex items-center justify-center mb-4`}>
                    {icon}
                </div>
                <span className="text-gray-300 text-xs font-bold tracking-widest">{step}</span>
                <h3 className="text-base font-bold text-gray-900 mt-1 mb-2">{title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
            </div>
            {cta}
        </div>
    )
}

type SocialIconProps = {
    href: string
    label: string
    icon: React.ReactNode
}

function SocialIcon({ href, label, icon }: SocialIconProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-colors duration-150"
        >
            {icon}
        </a>
    )
}