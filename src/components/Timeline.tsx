import { Link } from "react-router-dom"
import type { ReactNode } from "react"

type StepStatus = "action" | "upcoming" | "destination"

type StepData = {
    number: string
    title: string
    description: string
    icon: ReactNode
    status: StepStatus
    tag: string
    cta?: boolean
}

const steps: StepData[] = [
    {
        number: "01",
        title: "Get Your PVC",
        description:
            "Visit your nearest INEC registration centre and collect your Permanent Voter's Card. Your PVC is your ticket to participate.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        status: "action",
        tag: "Do this now",
    },
    {
        number: "02",
        title: "Take the Pledge",
        description:
            "Make your public commitment. Sign the pledge, earn your badge, and let Nigeria know you'll show up on election day.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        status: "action",
        tag: "Takes 2 minutes",
        cta: true,
    },
    {
        number: "03",
        title: "Mobilise Others",
        description:
            "Share your badge. Challenge your friends, family, and colleagues to pledge. Every voice you activate multiplies your impact.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        status: "upcoming",
        tag: "Spread the word",
    },
    {
        number: "04",
        title: "Vote in 2027",
        description:
            "On January 16, 2027, go to your polling unit and cast your vote. This is the moment everything leads to.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
        ),
        status: "destination",
        tag: "Jan 16, 2027",
    },
]

export default function Timeline() {
    return (
        <section className="bg-white py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                        Your Journey
                    </div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                        Road to{" "}
                        <span className="text-green-700">Election Day</span>
                    </h2>
                    <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
                        Four steps stand between now and the most important day in Nigeria's
                        democratic calendar. Here's how to make sure your voice is counted.
                    </p>
                </div>

                {/* ── DESKTOP: Horizontal timeline ── */}
                <div className="hidden lg:block">
                    <div className="relative">
                        <div className="absolute top-10 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-0.5 bg-linear-to-r from-green-200 via-green-400 to-green-700" />
                        <div className="grid grid-cols-4 gap-6">
                            {steps.map((step) => (
                                <DesktopStep key={step.number} step={step} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── MOBILE: Vertical timeline ── */}
                <div className="lg:hidden flex flex-col">
                    {steps.map((step, i) => (
                        <MobileStep
                            key={step.number}
                            step={step}
                            isLast={i === steps.length - 1}
                        />
                    ))}
                </div>

                {/* Bottom CTA banner */}
                <div className="mt-16 bg-green-900 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-white font-extrabold text-xl mb-1">
                            Ready to start your journey?
                        </h3>
                        <p className="text-white/60 text-sm">
                            Take the pledge today and earn your voter badge.
                        </p>
                    </div>
                    <Link
                        to="/pledge"
                        className="group shrink-0 inline-flex items-center gap-3 bg-white text-green-900 px-8 py-4 rounded-xl font-bold text-sm hover:bg-green-50 transition-all duration-200 shadow-lg hover:-translate-y-0.5"
                    >
                        Take the Pledge
                        <svg
                            className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    )
}

/* ── Desktop Step ─────────────────────────────────────────── */

function DesktopStep({ step }: { step: StepData }) {
    const isDestination = step.status === "destination"

    return (
        <div className="flex flex-col items-center text-center group">

            {/* Icon node */}
            <div
                className={`relative z-10 w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-all duration-300 group-hover:-translate-y-1 ${isDestination
                    ? "bg-green-700 text-white shadow-green-300"
                    : "bg-white border-2 border-green-200 text-green-700 group-hover:border-green-500 group-hover:shadow-green-100"
                    }`}
            >
                {step.icon}
                <span
                    className={`absolute -top-2 -right-2 text-[10px] font-black px-1.5 py-0.5 rounded-full ${isDestination ? "bg-white text-green-700" : "bg-green-700 text-white"
                        }`}
                >
                    {step.number}
                </span>
            </div>

            {/* Tag */}
            <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${isDestination ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                    }`}
            >
                {step.tag}
            </span>

            <h3 className="text-base font-extrabold text-gray-900 mb-2">{step.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>

            {step.cta === true && (
                <Link
                    to="/pledge"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-green-700 hover:text-green-900 transition-colors"
                >
                    Pledge now
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            )}
        </div>
    )
}

/* ── Mobile Step ──────────────────────────────────────────── */

function MobileStep({ step, isLast }: { step: StepData; isLast: boolean }) {
    const isDestination = step.status === "destination"

    return (
        <div className="flex gap-5">

            {/* Left: icon node + connector */}
            <div className="flex flex-col items-center">
                <div
                    className={`relative z-10 w-14 h-14 shrink-0 rounded-xl flex items-center justify-center shadow-sm ${isDestination
                        ? "bg-green-700 text-white"
                        : "bg-white border-2 border-green-200 text-green-700"
                        }`}
                >
                    {step.icon}
                    <span
                        className={`absolute -top-1.5 -right-1.5 text-[9px] font-black px-1 py-0.5 rounded-full leading-none ${isDestination ? "bg-white text-green-700" : "bg-green-700 text-white"
                            }`}
                    >
                        {step.number}
                    </span>
                </div>

                {!isLast && (
                    <div className="w-0.5 flex-1 bg-linear-to-b from-green-300 to-green-100 my-2 min-h-[48px]" />
                )}
            </div>

            {/* Right: text content */}
            <div className="pb-10">
                <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2 ${isDestination ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                        }`}
                >
                    {step.tag}
                </span>
                <h3 className="text-base font-extrabold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.description}</p>

                {step.cta === true && (
                    <Link
                        to="/pledge"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-green-700"
                    >
                        Pledge now →
                    </Link>
                )}
            </div>
        </div>
    )
}