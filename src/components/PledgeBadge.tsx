import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import type { PledgeFormData } from "../types/pledges"

type Props = {
    data: PledgeFormData
}

// ─────────────────────────────────────────────────────────────
// BADGE TEMPLATE CONFIG
// Swap TEMPLATE_URL to your real badge design when ready.
// Update the coordinate constants to match your template layout.
// ─────────────────────────────────────────────────────────────
const TEMPLATE_URL = "https://placehold.co/800"
const CANVAS_SIZE = 800

// Where to draw each element on top of the template (in pixels)
const LAYOUT = {
    photo: { x: 400, y: 280, radius: 80 },   // center x, center y, radius
    name: { x: 400, y: 430, fontSize: 42 },   // center x, baseline y
    state: { x: 400, y: 476, fontSize: 20 },
    stars: { x: 400, y: 560, size: 36, gap: 48 },
}

export default function PledgeBadge({ data }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [badgeReady, setBadgeReady] = useState(false)
    const [shareableUrl, setShareableUrl] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadError, setUploadError] = useState<string | null>(null)

    /* ── Draw badge on mount ── */
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        setBadgeReady(false)

        const template = new Image()
        template.crossOrigin = "anonymous"

        template.onload = () => {
            // 1. Draw the template
            ctx.drawImage(template, 0, 0, CANVAS_SIZE, CANVAS_SIZE)

            // 2. Draw user photo, then remaining elements
            if (data.photoDataUrl) {
                const photo = new Image()
                photo.onload = () => {
                    drawOverlay(ctx, data, photo)
                    setBadgeReady(true)
                }
                photo.onerror = () => {
                    drawOverlay(ctx, data, null)
                    setBadgeReady(true)
                }
                photo.src = data.photoDataUrl
            } else {
                drawOverlay(ctx, data, null)
                setBadgeReady(true)
            }
        }

        template.onerror = () => {
            // Template failed to load — draw on plain background
            ctx.fillStyle = "#14532d"
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
            if (data.photoDataUrl) {
                const photo = new Image()
                photo.onload = () => { drawOverlay(ctx, data, photo); setBadgeReady(true) }
                photo.onerror = () => { drawOverlay(ctx, data, null); setBadgeReady(true) }
                photo.src = data.photoDataUrl
            } else {
                drawOverlay(ctx, data, null)
                setBadgeReady(true)
            }
        }

        template.src = TEMPLATE_URL
    }, [data])

    /* ── Upload badge PNG to get a shareable URL ── */
    const uploadBadge = async (): Promise<string | null> => {
        if (shareableUrl) return shareableUrl   // already uploaded

        const canvas = canvasRef.current
        if (!canvas) return null

        setIsUploading(true)
        setUploadError(null)

        try {
            const blob = await new Promise<Blob | null>((resolve) =>
                canvas.toBlob(resolve, "image/png"),
            )
            if (!blob) throw new Error("Could not generate badge image")

            const formData = new FormData()
            formData.append("file", blob, `badge-${Date.now()}.png`)
            formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "")

            // Upload to Cloudinary (free tier)
            // Set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in your .env
            const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            if (!cloudName) throw new Error("Cloudinary cloud name not configured")

            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
                { method: "POST", body: formData },
            )

            if (!res.ok) throw new Error("Upload failed")
            const json = await res.json() as { secure_url: string }
            setShareableUrl(json.secure_url)
            return json.secure_url
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Upload failed"
            setUploadError(`Could not upload badge: ${msg}. Try downloading instead.`)
            return null
        } finally {
            setIsUploading(false)
        }
    }

    /* ── Download PNG directly ── */
    const handleDownload = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const link = document.createElement("a")
        link.download = `IWillVote2027-${data.name.replace(/\s+/g, "-")}.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
    }

    /* ── Native share (mobile — shares actual image file) ── */
    const handleNativeShare = async () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob(resolve, "image/png"),
        )
        if (!blob) return
        const file = new File([blob], `IWillVote2027-${data.name.replace(/\s+/g, "-")}.png`, {
            type: "image/png",
        })
        if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({
                title: "I Will Vote in 2027",
                text: "I just pledged to vote in the 2027 Nigerian elections! #IWillVote2027",
                files: [file],
            }).catch(() => { }) // ignore cancellations
        }
    }

    /* ── Social share helpers ── */
    const getSocialUrl = async (platform: string): Promise<string> => {
        const url = await uploadBadge() ?? "https://iwillvote2027.ng"
        const text = encodeURIComponent("I just pledged to vote in the 2027 Nigerian elections! Join me. #IWillVote2027")
        const eurl = encodeURIComponent(url)

        switch (platform) {
            case "whatsapp": return `https://wa.me/?text=${text}%20${eurl}`
            case "twitter": return `https://twitter.com/intent/tweet?text=${text}&url=${eurl}`
            case "facebook": return `https://www.facebook.com/sharer/sharer.php?u=${eurl}`
            case "telegram": return `https://t.me/share/url?url=${eurl}&text=${text}`
            case "linkedin": return `https://www.linkedin.com/sharing/share-offsite/?url=${eurl}`
            // Instagram has no web share API — we download and prompt user to share manually
            case "instagram": return ""
            default: return "https://iwillvote2027.ng"
        }
    }

    const handleSocialShare = async (platform: string) => {
        if (platform === "instagram") {
            handleDownload()
            alert("Your badge has been downloaded! Open Instagram and share it as a post or story.")
            return
        }
        const url = await getSocialUrl(platform)
        if (url) window.open(url, "_blank", "noopener,noreferrer")
    }

    const socialPlatforms = [
        {
            id: "whatsapp",
            label: "WhatsApp",
            bg: "bg-[#25D366]",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.858L.054 23.25a.75.75 0 00.916.916l5.392-1.479A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.718 9.718 0 01-4.953-1.356l-.355-.211-3.682 1.01 1.01-3.682-.211-.355A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
                </svg>
            ),
        },
        {
            id: "twitter",
            label: "X (Twitter)",
            bg: "bg-black",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            id: "facebook",
            label: "Facebook",
            bg: "bg-[#1877F2]",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
        },
        {
            id: "telegram",
            label: "Telegram",
            bg: "bg-[#229ED9]",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
            ),
        },
        {
            id: "linkedin",
            label: "LinkedIn",
            bg: "bg-[#0A66C2]",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
            ),
        },
        {
            id: "instagram",
            label: "Instagram",
            bg: "bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]",
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
            ),
        },
    ]

    return (
        <div className="w-full max-w-2xl mx-auto">

            {/* Success header */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg className="w-8 h-8 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Pledge Recorded! 🎉</h2>
                <p className="text-gray-500 text-sm max-w-sm mx-auto">
                    Your commitment has been saved. Download your badge and share it to inspire others.
                </p>
            </div>

            <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8 space-y-6">

                {/* Badge preview */}
                <div className="relative flex justify-center">
                    {!badgeReady && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded-2xl z-10">
                            <svg className="w-8 h-8 text-green-500 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        </div>
                    )}
                    <canvas
                        ref={canvasRef}
                        width={CANVAS_SIZE}
                        height={CANVAS_SIZE}
                        className={`w-full max-w-sm rounded-2xl shadow-lg transition-opacity duration-300 ${badgeReady ? "opacity-100" : "opacity-0"
                            }`}
                    />
                </div>

                {/* Star summary */}
                <div className="text-center">
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Your influence rating</p>
                    <p className="text-2xl tracking-wide">
                        <span className="text-yellow-400">{"★".repeat(data.starCount)}</span>
                        <span className="text-gray-200">{"★".repeat(6 - data.starCount)}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                        Potential reach:{" "}
                        <span className="font-bold text-gray-700">
                            {data.reachCategory.replace(/-/g, " – ")} people
                        </span>
                    </p>
                </div>

                {/* Upload status */}
                {isUploading && (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
                        <svg className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Uploading your badge to generate a shareable link…
                    </div>
                )}
                {uploadError && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-700">
                        {uploadError}
                    </div>
                )}
                {shareableUrl && (
                    <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-xs text-green-700 flex items-center gap-2">
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Badge uploaded — sharing will include your image!
                    </div>
                )}

                {/* Download button */}
                <button
                    onClick={handleDownload}
                    disabled={!badgeReady}
                    className="w-full flex items-center justify-center gap-3 bg-green-700 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-200"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download My Badge
                </button>

                {/* Mobile native share */}
                {typeof navigator !== "undefined" && "share" in navigator && (
                    <button
                        onClick={handleNativeShare}
                        disabled={!badgeReady}
                        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-400 disabled:opacity-50 text-gray-700 font-bold py-4 rounded-xl transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                        </svg>
                        Share Badge (with image)
                    </button>
                )}

                {/* Social share grid */}
                <div>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest text-center mb-3">
                        Share on social media
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                        {socialPlatforms.map((platform) => (
                            <button
                                key={platform.id}
                                onClick={() => handleSocialShare(platform.id)}
                                disabled={!badgeReady || isUploading}
                                className={`${platform.bg} text-white rounded-2xl py-3 px-2 flex flex-col items-center gap-1.5 hover:opacity-90 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed`}
                            >
                                {platform.icon}
                                <span className="text-[11px] font-semibold">{platform.label}</span>
                            </button>
                        ))}
                    </div>
                    <p className="text-[11px] text-gray-400 text-center mt-3">
                        Clicking a platform will upload your badge and open the share dialog with your image link.
                        <br />Instagram will download your badge for you to share manually.
                    </p>
                </div>

            </div>

            <div className="text-center mt-8">
                <Link to="/" className="text-sm text-gray-400 hover:text-green-700 transition-colors">
                    ← Back to Home
                </Link>
            </div>
        </div>
    )
}

/* ── Canvas overlay drawing ─────────────────────────────── */

function drawOverlay(
    ctx: CanvasRenderingContext2D,
    data: PledgeFormData,
    photo: HTMLImageElement | null,
) {
    const { x: px, y: py, radius: pr } = LAYOUT.photo

    // Circular photo or initials
    ctx.save()
    ctx.beginPath()
    ctx.arc(px, py, pr, 0, Math.PI * 2)
    ctx.closePath()

    if (photo) {
        ctx.clip()
        ctx.drawImage(photo, px - pr, py - pr, pr * 2, pr * 2)
    } else {
        ctx.fillStyle = "#dcfce7"
        ctx.fill()
        ctx.fillStyle = "#15803d"
        ctx.font = `bold ${pr * 0.75}px sans-serif`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(
            data.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase(),
            px, py,
        )
        ctx.textBaseline = "alphabetic"
    }
    ctx.restore()

    // White border ring
    ctx.beginPath()
    ctx.arc(px, py, pr + 5, 0, Math.PI * 2)
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 5
    ctx.stroke()

    // Name
    ctx.fillStyle = "#111827"
    ctx.font = `bold ${LAYOUT.name.fontSize}px sans-serif`
    ctx.textAlign = "center"
    ctx.fillText(data.name, LAYOUT.name.x, LAYOUT.name.y)

    // State
    ctx.fillStyle = "#6b7280"
    ctx.font = `${LAYOUT.state.fontSize}px sans-serif`
    ctx.fillText(data.state, LAYOUT.state.x, LAYOUT.state.y)

    // Stars
    const { x: sx, y: sy, size, gap } = LAYOUT.stars
    const total = 6
    const startX = sx - ((total - 1) * gap) / 2

    for (let i = 0; i < total; i++) {
        drawStar(ctx, startX + i * gap, sy, size, i < data.starCount ? "#f59e0b" : "#e5e7eb")
    }
}

function drawStar(
    ctx: CanvasRenderingContext2D,
    cx: number, cy: number, size: number, color: string,
) {
    const spikes = 5
    const outer = size / 2
    const inner = outer * 0.4
    let rot = (Math.PI / 2) * 3

    ctx.beginPath()
    ctx.moveTo(cx, cy - outer)
    for (let i = 0; i < spikes; i++) {
        ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer)
        rot += Math.PI / spikes
        ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner)
        rot += Math.PI / spikes
    }
    ctx.lineTo(cx, cy - outer)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()
}