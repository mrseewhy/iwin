import { useState, useEffect, useMemo } from "react"
import {
    collection,
    getDocs,
    orderBy,
    query,
    type Timestamp,
} from "firebase/firestore"
import { db } from "../../lib/firebase"
import { useAdminAuth } from "../../hooks/useAdminAuth"
import { NIGERIAN_STATES, REACH_OPTIONS } from "../../types/pledges"

/* ── Types ──────────────────────────────────────────────── */

type PledgeRecord = {
    id: string
    name: string
    email: string
    phone: string
    state: string
    committedToVote: boolean
    willEngage: boolean
    reachCategory: string
    starCount: number
    createdAt: Timestamp | null
}

const PAGE_SIZE = 20

/* ── Component ──────────────────────────────────────────── */

export default function AdminDashboard() {
    const { user, logout } = useAdminAuth()

    const [records, setRecords] = useState<PledgeRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [selected, setSelected] = useState<Set<string>>(new Set())
    const [page, setPage] = useState(1)

    // Filters
    const [filterState, setFilterState] = useState("")
    const [filterReach, setFilterReach] = useState("")
    const [filterEngage, setFilterEngage] = useState("")
    const [searchQuery, setSearchQuery] = useState("")

    /* ── Fetch all pledges ── */
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const q = query(collection(db, "pledges"), orderBy("createdAt", "desc"))
                const snap = await getDocs(q)
                const data = snap.docs.map((d) => ({
                    id: d.id,
                    ...(d.data() as Omit<PledgeRecord, "id">),
                }))
                setRecords(data)
            } catch (err) {
                setError("Failed to load pledges. Check your Firestore permissions.")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    /* ── Filtered + searched records ── */
    const filtered = useMemo(() => {
        return records.filter((r) => {
            if (filterState && r.state !== filterState) return false
            if (filterReach && r.reachCategory !== filterReach) return false
            if (filterEngage === "yes" && !r.willEngage) return false
            if (filterEngage === "no" && r.willEngage) return false
            if (searchQuery) {
                const q = searchQuery.toLowerCase()
                if (
                    !r.name.toLowerCase().includes(q) &&
                    !r.email.toLowerCase().includes(q) &&
                    !r.phone.includes(q)
                ) return false
            }
            return true
        })
    }, [records, filterState, filterReach, filterEngage, searchQuery])

    /* ── Pagination ── */
    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
    const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

    // Reset to page 1 whenever filters change
    useEffect(() => { setPage(1) }, [filterState, filterReach, filterEngage, searchQuery])

    /* ── Selection helpers ── */
    const toggleOne = (id: string) => {
        setSelected((prev) => {
            const next = new Set(prev)
            next.has(id) ? next.delete(id) : next.add(id)
            return next
        })
    }

    const toggleAll = () => {
        if (selected.size === paginated.length) {
            setSelected(new Set())
        } else {
            setSelected(new Set(paginated.map((r) => r.id)))
        }
    }

    const clearSelection = () => setSelected(new Set())

    /* ── Export ── */
    const exportToCSV = (rows: PledgeRecord[]) => {
        const headers = [
            "Name", "Email", "Phone", "State",
            "Committed to Vote", "Will Engage", "Reach Category",
            "Star Count", "Date",
        ]
        const escape = (v: string) => `"${v.replace(/"/g, '""')}"`
        const lines = [
            headers.join(","),
            ...rows.map((r) => [
                escape(r.name),
                escape(r.email),
                escape(r.phone),
                escape(r.state),
                r.committedToVote ? "Yes" : "No",
                r.willEngage ? "Yes" : "No",
                escape(r.reachCategory),
                r.starCount,
                r.createdAt ? formatDate(r.createdAt) : "N/A",
            ].join(",")),
        ]
        const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8;" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `IWillVote2027-pledges-${new Date().toISOString().slice(0, 10)}.csv`
        a.click()
        URL.revokeObjectURL(url)
    }

    const handleExportAll = () => exportToCSV(filtered)
    const handleExportSelected = () => {
        const rows = records.filter((r) => selected.has(r.id))
        exportToCSV(rows)
    }

    /* ── Stats ── */
    const stats = useMemo(() => ({
        total: records.length,
        engage: records.filter((r) => r.willEngage).length,
        states: new Set(records.map((r) => r.state)).size,
        avgStars: records.length
            ? (records.reduce((s, r) => s + r.starCount, 0) / records.length).toFixed(1)
            : "0",
    }), [records])

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Top navbar */}
            <header className="bg-green-950 border-b border-white/10 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <p className="text-lg font-extrabold text-white tracking-tight">
                        IWillVoteIn<span className="text-green-400">2027</span>
                        <span className="text-white/40 font-normal text-sm ml-2">Admin</span>
                    </p>
                    <div className="flex items-center gap-4">
                        <span className="text-white/50 text-xs hidden sm:block">{user?.email}</span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-all"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Sign out
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">

                {/* Stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Total Pledges", value: stats.total, icon: "🗳️" },
                        { label: "Will Engage", value: stats.engage, icon: "🤝" },
                        { label: "States Covered", value: stats.states, icon: "📍" },
                        { label: "Avg Star Rating", value: `${stats.avgStars} ★`, icon: "⭐" },
                    ].map((s) => (
                        <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                            <p className="text-2xl mb-1">{s.icon}</p>
                            <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Filters + search */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">

                        {/* Search */}
                        <div className="relative lg:col-span-1">
                            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search name, email, phone…"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 text-sm outline-none transition-colors"
                            />
                        </div>

                        {/* State filter */}
                        <select
                            value={filterState}
                            onChange={(e) => setFilterState(e.target.value)}
                            className="px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 text-sm outline-none transition-colors"
                        >
                            <option value="">All States</option>
                            {NIGERIAN_STATES.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>

                        {/* Reach filter */}
                        <select
                            value={filterReach}
                            onChange={(e) => setFilterReach(e.target.value)}
                            className="px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 text-sm outline-none transition-colors"
                        >
                            <option value="">All Reach Levels</option>
                            {REACH_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>

                        {/* Engage filter */}
                        <select
                            value={filterEngage}
                            onChange={(e) => setFilterEngage(e.target.value)}
                            className="px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-green-500 text-sm outline-none transition-colors"
                        >
                            <option value="">All (Engage)</option>
                            <option value="yes">Will Engage</option>
                            <option value="no">Won't Engage</option>
                        </select>
                    </div>

                    {/* Active filter summary */}
                    {(filterState || filterReach || filterEngage || searchQuery) && (
                        <div className="flex items-center gap-2 mt-3 flex-wrap">
                            <span className="text-xs text-gray-400">Showing {filtered.length} of {records.length} records</span>
                            <button
                                onClick={() => {
                                    setFilterState("")
                                    setFilterReach("")
                                    setFilterEngage("")
                                    setSearchQuery("")
                                }}
                                className="text-xs text-red-500 hover:text-red-700 font-semibold"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>

                {/* Action bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                        {selected.size > 0 && (
                            <>
                                <span className="text-sm text-gray-600 font-semibold">
                                    {selected.size} selected
                                </span>
                                <button
                                    onClick={handleExportSelected}
                                    className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all"
                                >
                                    <DownloadIcon />
                                    Export selected
                                </button>
                                <button
                                    onClick={clearSelection}
                                    className="text-xs text-gray-400 hover:text-gray-600 font-semibold px-2 py-2"
                                >
                                    Clear
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        onClick={handleExportAll}
                        className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-400 text-gray-700 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                    >
                        <DownloadIcon />
                        Export all ({filtered.length})
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
                            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                            Loading pledges…
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center py-20 text-red-500 text-sm gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {error}
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-2">
                            <svg className="w-10 h-10 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <p className="text-sm">No pledges match your filters</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-100 bg-gray-50">
                                        <th className="px-4 py-3 text-left">
                                            <input
                                                type="checkbox"
                                                checked={selected.size === paginated.length && paginated.length > 0}
                                                onChange={toggleAll}
                                                className="rounded accent-green-700 cursor-pointer"
                                            />
                                        </th>
                                        {["Name", "Email", "Phone", "State", "Reach", "Stars", "Engages", "Date"].map((h) => (
                                            <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {paginated.map((r) => (
                                        <tr
                                            key={r.id}
                                            className={`hover:bg-gray-50 transition-colors ${selected.has(r.id) ? "bg-green-50" : ""
                                                }`}
                                        >
                                            <td className="px-4 py-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.has(r.id)}
                                                    onChange={() => toggleOne(r.id)}
                                                    className="rounded accent-green-700 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-gray-900 whitespace-nowrap">
                                                {r.name}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                                {r.email}
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                                                {r.phone}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                                                    {r.state}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                                                {r.reachCategory.replace(/-/g, " – ")}
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className="text-yellow-400 tracking-tight">
                                                    {"★".repeat(r.starCount)}
                                                </span>
                                                <span className="text-gray-200 tracking-tight">
                                                    {"★".repeat(6 - r.starCount)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${r.willEngage
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-gray-100 text-gray-500"
                                                    }`}>
                                                    {r.willEngage ? "✓ Yes" : "No"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                                                {r.createdAt ? formatDate(r.createdAt) : "—"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!loading && !error && totalPages > 1 && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-400">
                            Page {page} of {totalPages} · {filtered.length} records
                        </p>
                        <div className="flex items-center gap-2">
                            <PaginationBtn
                                onClick={() => setPage(1)}
                                disabled={page === 1}
                                label="«"
                            />
                            <PaginationBtn
                                onClick={() => setPage((p) => p - 1)}
                                disabled={page === 1}
                                label="‹"
                            />

                            {/* Page number buttons */}
                            {getPageNumbers(page, totalPages).map((p, i) =>
                                p === "…" ? (
                                    <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p as number)}
                                        className={`w-9 h-9 rounded-xl text-sm font-bold transition-all ${p === page
                                            ? "bg-green-700 text-white"
                                            : "bg-white border border-gray-200 text-gray-600 hover:border-green-400"
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ),
                            )}

                            <PaginationBtn
                                onClick={() => setPage((p) => p + 1)}
                                disabled={page === totalPages}
                                label="›"
                            />
                            <PaginationBtn
                                onClick={() => setPage(totalPages)}
                                disabled={page === totalPages}
                                label="»"
                            />
                        </div>
                    </div>
                )}

            </main>
        </div>
    )
}

/* ── Sub-components ─────────────────────────────────────── */

function PaginationBtn({
    onClick, disabled, label,
}: {
    onClick: () => void; disabled: boolean; label: string
}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="w-9 h-9 rounded-xl bg-white border border-gray-200 text-gray-600 hover:border-green-400 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-bold transition-all"
        >
            {label}
        </button>
    )
}

function DownloadIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
    )
}

/* ── Helpers ────────────────────────────────────────────── */

function formatDate(ts: Timestamp): string {
    return ts.toDate().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    })
}

function getPageNumbers(current: number, total: number): (number | "…")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

    const pages: (number | "…")[] = [1]

    if (current > 3) pages.push("…")
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        pages.push(i)
    }
    if (current < total - 2) pages.push("…")
    pages.push(total)

    return pages
}