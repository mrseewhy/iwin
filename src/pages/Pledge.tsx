
import { useState } from "react"
import PledgeForm from "../components/PledgeForm"
import PledgeBadge from "../components/PledgeBadge"
import type { PledgeFormData } from "../types/pledges"
import { savePledge } from "../lib/savePledge"

type PledgeStep = "form" | "submitting" | "badge"

export default function PledgePage() {
    const [step, setStep] = useState<PledgeStep>("form")
    const [pledgeData, setPledgeData] = useState<PledgeFormData | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleFormSubmit = async (data: PledgeFormData) => {
        setStep("submitting")
        setError(null)

        try {
            await savePledge(data)
            setPledgeData(data)
            setStep("badge")
        } catch (err) {
            console.error("Failed to save pledge:", err)
            setError("Something went wrong saving your pledge. Please try again.")
            setStep("form")
        }
    }

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Top green banner */}
            <div className="bg-green-900 text-white py-3 text-center text-xs font-semibold tracking-widest uppercase">
                <span className="inline-flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    February 25, 2027 — Election Day
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Step indicator */}
                <div className="flex items-center justify-center gap-3 mb-12">
                    <StepDot active={step === "form" || step === "submitting"} done={step === "badge"} label="Your Details" number={1} />
                    <div className={`h-px w-16 transition-colors duration-500 ${step === "badge" ? "bg-green-500" : "bg-gray-200"}`} />
                    <StepDot active={step === "badge"} done={false} label="Your Badge" number={2} />
                </div>

                {/* Error banner */}
                {error && (
                    <div className="max-w-2xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm flex items-start gap-3">
                        <svg className="w-5 h-5 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span>{error}</span>
                    </div>
                )}

                {/* Form state */}
                {(step === "form" || step === "submitting") && (
                    <PledgeForm
                        onSubmit={handleFormSubmit}
                        isSubmitting={step === "submitting"}
                    />
                )}

                {/* Badge state */}
                {step === "badge" && pledgeData && (
                    <PledgeBadge data={pledgeData} />
                )}

            </div>
        </main>
    )
}

/* ── Step indicator dot ───────────────────────────────────── */

function StepDot({
    number,
    label,
    active,
    done,
}: {
    number: number
    label: string
    active: boolean
    done: boolean
}) {
    return (
        <div className="flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${done
                ? "bg-green-600 text-white"
                : active
                    ? "bg-green-700 text-white ring-4 ring-green-200"
                    : "bg-gray-200 text-gray-400"
                }`}>
                {done ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                ) : number}
            </div>
            <span className={`text-xs font-semibold ${active || done ? "text-green-700" : "text-gray-400"}`}>
                {label}
            </span>
        </div>
    )
}