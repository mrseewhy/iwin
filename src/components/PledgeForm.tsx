import { useState, useRef } from "react"
import type { PledgeFormData, ReachCategory } from "../types/pledges"
import { REACH_OPTIONS, REACH_TO_STARS, NIGERIAN_STATES } from "../types/pledges"

type Props = {
    onSubmit: (data: PledgeFormData) => void
    isSubmitting: boolean
}

type FormFields = {
    name: string
    email: string
    phone: string
    state: string
    committedToVote: boolean
    willEngage: boolean | null
    reachCategory: ReachCategory | ""
    photoDataUrl: string | null
}

type FormErrors = Partial<Record<keyof FormFields, string>>

export default function PledgeForm({ onSubmit, isSubmitting }: Props) {
    const [fields, setFields] = useState<FormFields>({
        name: "",
        email: "",
        phone: "",
        state: "",
        committedToVote: false,
        willEngage: null,
        reachCategory: "",
        photoDataUrl: null,
    })
    const [errors, setErrors] = useState<FormErrors>({})
    const fileInputRef = useRef<HTMLInputElement>(null)

    const set = <K extends keyof FormFields>(key: K, value: FormFields[K]) => {
        setFields((prev) => ({ ...prev, [key]: value }))
        setErrors((prev) => ({ ...prev, [key]: undefined }))
    }

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (!file.type.startsWith("image/")) {
            setErrors((prev) => ({ ...prev, photoDataUrl: "Please upload an image file" }))
            return
        }
        if (file.size > 5 * 1024 * 1024) {
            setErrors((prev) => ({ ...prev, photoDataUrl: "Image must be under 5MB" }))
            return
        }
        const reader = new FileReader()
        reader.onload = (ev) => {
            const result = ev.target?.result
            if (typeof result === "string") set("photoDataUrl", result)
        }
        reader.readAsDataURL(file)
    }

    const removePhoto = () => {
        set("photoDataUrl", null)
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    const validate = (): boolean => {
        const e: FormErrors = {}
        if (!fields.photoDataUrl)
            e.photoDataUrl = "A profile photo is required for your badge"
        if (!fields.name.trim())
            e.name = "Full name is required"
        if (!fields.email.trim())
            e.email = "Email address is required"
        else if (!/\S+@\S+\.\S+/.test(fields.email))
            e.email = "Enter a valid email address"
        if (!fields.phone.trim())
            e.phone = "Phone number is required"
        if (!fields.state)
            e.state = "Please select your state"
        if (!fields.committedToVote)
            e.committedToVote = "You must commit to vote to proceed"
        if (fields.willEngage === null)
            e.willEngage = "Please answer this question"
        if (!fields.reachCategory)
            e.reachCategory = "Please select your reach"
        setErrors(e)
        return Object.keys(e).length === 0
    }

    const handleSubmit = () => {
        if (!validate()) return
        const reachCategory = fields.reachCategory as ReachCategory
        onSubmit({
            name: fields.name.trim(),
            email: fields.email.trim(),
            phone: fields.phone.trim(),
            state: fields.state,
            committedToVote: fields.committedToVote,
            willEngage: fields.willEngage as boolean,
            reachCategory,
            starCount: REACH_TO_STARS[reachCategory],
            photoDataUrl: fields.photoDataUrl,
        })
    }

    return (
        <div className="w-full max-w-2xl mx-auto">

            <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    Official Pledge
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3">
                    I Will Vote in <span className="text-green-700">2027</span>
                </h1>
                <p className="text-gray-500 text-sm max-w-md mx-auto leading-relaxed">
                    Complete the form below to record your pledge, earn your badge,
                    and join thousands of Nigerians committed to voting.
                </p>
            </div>

            <div className="relative bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8 space-y-6">

                {/* Submitting overlay */}
                {isSubmitting && (
                    <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                            <svg className="w-8 h-8 text-green-600 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-900 font-bold text-base">Saving your pledge…</p>
                            <p className="text-gray-400 text-sm mt-1">This will only take a moment</p>
                        </div>
                    </div>
                )}

                {/* Photo upload — compulsory */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Profile Photo <span className="text-green-600 ml-1">*</span>
                        <span className="text-gray-400 font-normal ml-1">(appears on your badge)</span>
                    </label>

                    {fields.photoDataUrl ? (
                        <div className="flex items-center gap-4 p-4 bg-green-50 border-2 border-green-200 rounded-2xl">
                            <img
                                src={fields.photoDataUrl}
                                alt="Preview"
                                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
                            />
                            <div>
                                <p className="text-sm font-bold text-gray-800">Photo uploaded ✓</p>
                                <p className="text-xs text-gray-500 mt-0.5">This will appear on your badge</p>
                                <button
                                    type="button"
                                    onClick={removePhoto}
                                    disabled={isSubmitting}
                                    className="mt-2 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
                                >
                                    Remove & change photo
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isSubmitting}
                            className={`w-full border-2 border-dashed rounded-2xl py-8 flex flex-col items-center gap-2 transition-colors group ${errors.photoDataUrl
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-200 hover:border-green-400 bg-gray-50 hover:bg-green-50"
                                }`}
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${errors.photoDataUrl ? "bg-red-100" : "bg-white group-hover:bg-green-100"
                                }`}>
                                <svg className={`w-7 h-7 transition-colors ${errors.photoDataUrl ? "text-red-400" : "text-gray-400 group-hover:text-green-600"
                                    }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <p className={`text-sm font-semibold transition-colors ${errors.photoDataUrl ? "text-red-500" : "text-gray-500 group-hover:text-green-700"
                                }`}>
                                Click to upload your photo
                            </p>
                            <p className="text-xs text-gray-400">JPG, PNG or WEBP · Max 5MB</p>
                        </button>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                    />

                    {errors.photoDataUrl && (
                        <ErrorMsg message={errors.photoDataUrl} />
                    )}
                </div>

                <div className="border-t border-gray-100" />

                {/* Name */}
                <Field label="Full Name" error={errors.name} required>
                    <input
                        type="text"
                        placeholder="e.g. Amara Okafor"
                        value={fields.name}
                        onChange={(e) => set("name", e.target.value)}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.name)}
                    />
                </Field>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Field label="Email Address" error={errors.email} required>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={fields.email}
                            onChange={(e) => set("email", e.target.value)}
                            disabled={isSubmitting}
                            className={inputClass(!!errors.email)}
                        />
                    </Field>
                    <Field label="Phone Number" error={errors.phone} required>
                        <input
                            type="tel"
                            placeholder="+234 800 000 0000"
                            value={fields.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            disabled={isSubmitting}
                            className={inputClass(!!errors.phone)}
                        />
                    </Field>
                </div>

                {/* State */}
                <Field label="State of Residence" error={errors.state} required>
                    <select
                        value={fields.state}
                        onChange={(e) => set("state", e.target.value)}
                        disabled={isSubmitting}
                        className={inputClass(!!errors.state)}
                    >
                        <option value="">Select your state…</option>
                        {NIGERIAN_STATES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                        ))}
                    </select>
                </Field>

                {/* Commitment checkbox */}
                <div className={`rounded-2xl border-2 p-4 transition-colors ${fields.committedToVote
                        ? "border-green-400 bg-green-50"
                        : errors.committedToVote
                            ? "border-red-300 bg-red-50"
                            : "border-gray-200 bg-gray-50"
                    }`}>
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={fields.committedToVote}
                            onChange={(e) => set("committedToVote", e.target.checked)}
                            disabled={isSubmitting}
                            className="mt-0.5 w-5 h-5 rounded accent-green-700 cursor-pointer shrink-0"
                        />
                        <div>
                            <p className="text-sm font-bold text-gray-900">
                                I commit to vote in the 2027 general elections
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                                By checking this box, you are making a public pledge to exercise your democratic right.
                            </p>
                        </div>
                    </label>
                    {errors.committedToVote && (
                        <p className="text-xs text-red-600 mt-2 ml-8">{errors.committedToVote}</p>
                    )}
                </div>

                <div className="border-t border-gray-100" />

                {/* Will engage */}
                <Field
                    label="Are you willing to engage others within your sphere of influence?"
                    error={errors.willEngage}
                    required
                >
                    <div className="flex gap-3 mt-1">
                        {(["Yes", "No"] as const).map((option) => {
                            const val = option === "Yes"
                            const active = fields.willEngage === val
                            return (
                                <button
                                    key={option}
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => set("willEngage", val)}
                                    className={`flex-1 py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${active
                                            ? "border-green-500 bg-green-50 text-green-800"
                                            : "border-gray-200 bg-white text-gray-500 hover:border-green-300"
                                        }`}
                                >
                                    {option}
                                </button>
                            )
                        })}
                    </div>
                </Field>

                {/* Reach category */}
                <Field
                    label="How many people can you potentially reach?"
                    error={errors.reachCategory}
                    required
                >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                        {REACH_OPTIONS.map((opt) => {
                            const stars = REACH_TO_STARS[opt.value]
                            const active = fields.reachCategory === opt.value
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    disabled={isSubmitting}
                                    onClick={() => set("reachCategory", opt.value)}
                                    className={`flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-2 text-xs font-semibold transition-all duration-200 ${active
                                            ? "border-green-500 bg-green-50 text-green-800"
                                            : "border-gray-200 bg-white text-gray-500 hover:border-green-300"
                                        }`}
                                >
                                    <span className="text-yellow-400 text-sm tracking-tight">
                                        {"★".repeat(stars)}
                                    </span>
                                    <span>{opt.label}</span>
                                </button>
                            )
                        })}
                    </div>
                </Field>

                {/* Submit */}
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-3 bg-green-700 hover:bg-green-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-200 text-base mt-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Submit My Pledge
                </button>

            </div>
        </div>
    )
}

function Field({ label, error, required, children }: {
    label: string; error?: string; required?: boolean; children: React.ReactNode
}) {
    return (
        <div className="space-y-1.5">
            <label className="block text-sm font-semibold text-gray-700">
                {label}{required && <span className="text-green-600 ml-1">*</span>}
            </label>
            {children}
            {error && <ErrorMsg message={error} />}
        </div>
    )
}

function ErrorMsg({ message }: { message: string }) {
    return (
        <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
            <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {message}
        </p>
    )
}

function inputClass(hasError: boolean) {
    return `w-full px-4 py-3 rounded-xl border-2 text-sm text-gray-900 outline-none transition-colors duration-200 bg-white ${hasError ? "border-red-300 focus:border-red-400" : "border-gray-200 focus:border-green-500"
        }`
}