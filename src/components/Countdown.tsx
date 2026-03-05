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
        <section className="bg-green-900 text-white pt-16 pb-32">
            <div className="max-w-7xl mx-auto px-6 py-16 text-center">

                <p className="uppercase tracking-widest text-sm opacity-80">
                    Days to Election Day 2027
                </p>

                <div className="mt-6 flex justify-center gap-6 text-4xl md:text-5xl font-bold">

                    <TimeBox value={timeLeft.days} label="Days" />
                    <TimeBox value={timeLeft.hours} label="Hours" />
                    <TimeBox value={timeLeft.minutes} label="Minutes" />
                    <TimeBox value={timeLeft.seconds} label="Seconds" />

                </div>

            </div>
        </section>
    )
}

type TimeBoxProps = {
    value: number
    label: string
}

function TimeBox({ value, label }: TimeBoxProps) {
    return (
        <div className="flex flex-col items-center bg-white text-green-700 rounded-lg px-6 py-4 min-w-[90px]">
            <span className="text-3xl font-bold">{value}</span>
            <span className="text-xs uppercase tracking-wider">{label}</span>
        </div>
    )
}