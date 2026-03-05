import { useEffect, useState } from "react"

type TimeLeft = {
    days: number
    hours: number
    minutes: number
    seconds: number
}

const targetDate = new Date("Feb 25, 2027 00:00:00").getTime()

export default function Countdown() {

    const calculateTimeLeft = (): TimeLeft => {
        const now = new Date().getTime()
        const difference = targetDate - now

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        }
    }

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    return (
        // pb-36 gives room for the CommitmentHub cards to overlap up into this section
        <section className="relative bg-green-900 text-white pt-20 pb-56 overflow-hidden">

            {/* Decorative background rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-white/5 pointer-events-none" />

            {/* Subtle radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 text-center">

                {/* Label */}
                <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Countdown to Election Day
                </div>

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                    February 25, 2027
                </h2>
                <p className="text-white/60 text-sm mb-12">
                    Your vote will shape the next chapter of Nigeria's story
                </p>

                {/* Timer boxes */}
                <div className="flex justify-center gap-4 md:gap-6">
                    <TimeBox value={timeLeft.days} label="Days" />
                    <Separator />
                    <TimeBox value={timeLeft.hours} label="Hours" />
                    <Separator />
                    <TimeBox value={timeLeft.minutes} label="Minutes" />
                    <Separator />
                    <TimeBox value={timeLeft.seconds} label="Seconds" />
                </div>

            </div>
        </section>
    )
}

/* ── Sub-components ───────────────────────────────────────── */

type TimeBoxProps = {
    value: number
    label: string
}

function TimeBox({ value, label }: TimeBoxProps) {
    return (
        <div className="flex flex-col items-center bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-5 py-5 min-w-[80px] md:min-w-[110px]">
            <span className="text-4xl md:text-5xl font-extrabold text-white tabular-nums leading-none">
                {String(value).padStart(2, "0")}
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/60 mt-2">
                {label}
            </span>
        </div>
    )
}

function Separator() {
    return (
        <div className="flex flex-col items-center justify-center gap-2 pb-4">
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
            <span className="w-1.5 h-1.5 bg-white/40 rounded-full" />
        </div>
    )
}