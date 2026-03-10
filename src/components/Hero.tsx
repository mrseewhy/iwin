

// import { Link } from "react-router-dom"

// export default function Hero() {
//     return (
//         <section className="relative bg-white overflow-hidden">

//             {/* Decorative background blobs */}
//             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-50 rounded-full -translate-y-1/3 translate-x-1/3 blur-3xl opacity-70 pointer-events-none" />
//             <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green-100 rounded-full translate-y-1/2 -translate-x-1/3 blur-2xl opacity-50 pointer-events-none" />

//             {/* Nigeria flag accent strip */}
//             <div className="absolute left-0 top-0 h-full w-1.5 flex flex-col">
//                 <div className="flex-1 bg-green-700" />
//                 <div className="flex-1 bg-white border-y border-gray-100" />
//                 <div className="flex-1 bg-green-700" />
//             </div>

//             <div className="relative max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-12 items-end w-full">

//                 {/* LEFT SIDE — padded top & bottom, vertically centered */}
//                 <div className="space-y-7 py-20 lg:py-24">

//                     {/* Election year badge */}
//                     <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-sm font-semibold px-4 py-1.5 rounded-full">
//                         <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                         2027 General Elections
//                     </div>

//                     {/* Headline — one step smaller so left col matches right col height */}
//                     <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-green-950 leading-[1.08] tracking-tight">
//                         One Nigeria.
//                         <br />
//                         <span className="text-green-700">One Voice.</span>
//                         <br />
//                         Your Vote{" "}
//                         <span className="relative inline-block">
//                             Matters.
//                             <span className="absolute -bottom-1 left-0 w-full h-1 bg-green-400 rounded-full" />
//                         </span>
//                     </h1>



//                     {/* Supporting text */}
//                     <p className="text-base text-gray-600 max-w-lg leading-relaxed">
//                         Every vote is a voice. Make a commitment to participate in the
//                         2027 elections — take the pledge, earn your badge, and inspire
//                         others around you.
//                     </p>

//                     {/* CTA row */}
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
//                         <Link
//                             to="/pledge"
//                             className="group inline-flex items-center gap-3 bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-lg shadow-green-200 hover:shadow-green-300 hover:-translate-y-0.5"
//                         >
//                             Take the Pledge
//                             <svg
//                                 className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                             </svg>
//                         </Link>
//                         <span className="text-sm text-gray-400 italic">
//                             Join thousands of Nigerians already pledging
//                         </span>
//                     </div>

//                     {/* Social proof stats */}
//                     <div className="flex items-center gap-8 pt-2 border-t border-gray-100">
//                         <div>
//                             <p className="text-2xl font-extrabold text-green-800">12k+</p>
//                             <p className="text-xs text-gray-500 mt-0.5">Pledges taken</p>
//                         </div>
//                         <div className="w-px h-10 bg-gray-200" />
//                         <div>
//                             <p className="text-2xl font-extrabold text-green-800">36</p>
//                             <p className="text-xs text-gray-500 mt-0.5">States reached</p>
//                         </div>
//                         <div className="w-px h-10 bg-gray-200" />
//                         <div>
//                             <p className="text-2xl font-extrabold text-green-800">2027</p>
//                             <p className="text-xs text-gray-500 mt-0.5">Election year</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* RIGHT SIDE — no padding-bottom so image sits flush at base */}
//                 <div className="relative flex items-end justify-center pt-16">

//                     {/* Green circle — anchored to bottom center */}
//                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[320px] h-[320px] lg:w-[440px] lg:h-[440px] bg-green-50 rounded-full pointer-events-none" />

//                     {/* Spinning dashed ring — anchored to bottom center */}
//                     <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] h-[360px] lg:w-[490px] lg:h-[490px] rounded-full border-[3px] border-dashed border-green-200 animate-[spin_30s_linear_infinite] pointer-events-none" />

//                     {/* Hero image — flush to the bottom of the section */}
//                     <img
//                         src="/img/hero-bg.png"
//                         alt="Nigerians united, ready to vote in 2027"
//                         className="relative z-10 w-auto h-[420px] lg:h-[540px] max-w-none object-contain object-bottom block"
//                     />

//                     {/* Floating badge — top left */}
//                     <div className="absolute top-20 left-0 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
//                         <div className="w-9 h-9 bg-green-100 rounded-full flex items-center justify-center shrink-0">
//                             <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                             </svg>
//                         </div>
//                         <div>
//                             <p className="text-xs font-bold text-gray-800">Pledge Verified</p>
//                             <p className="text-[10px] text-gray-400">Badge generated ✓</p>
//                         </div>
//                     </div>

//                     {/* Floating badge — mid right */}
//                     <div className="absolute bottom-24 right-0 z-20 bg-green-700 text-white rounded-2xl shadow-xl px-4 py-3">
//                         <p className="text-xs font-bold">🗳️ My vote counts</p>
//                         <p className="text-[10px] opacity-80 mt-0.5">#IWillVoteIn2027</p>
//                     </div>

//                 </div>
//             </div>
//         </section>
//     )
// }


import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <section className="relative bg-white overflow-hidden">

            {/* Soft green glow — top right */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
                style={{ background: "radial-gradient(circle at 80% 10%, rgba(187,247,208,0.5) 0%, transparent 65%)" }} />
            {/* Soft glow — bottom left */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
                style={{ background: "radial-gradient(circle at 10% 90%, rgba(220,252,231,0.6) 0%, transparent 60%)" }} />

            {/* Nigeria flag stripe — left edge */}
            <div className="absolute left-0 top-0 h-full w-1 flex flex-col pointer-events-none">
                <div className="flex-1 bg-green-600" />
                <div className="flex-1 bg-gray-200" />
                <div className="flex-1 bg-green-600" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-8 items-center lg:items-end">

                {/* LEFT — copy */}
                <div className="py-16 lg:pt-24 lg:pb-0 space-y-6">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 text-green-800 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        2027 General Elections
                    </div>

                    {/* Headline */}
                    <div>
                        <p className="text-gray-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
                            It's an
                        </p>
                        <h1 className="font-black text-green-950 leading-[0.9] tracking-tight text-5xl md:text-6xl">
                            <span className="text-green-600">IMPORTANT</span>
                            <br />
                            ELECTION!
                        </h1>

                        <div className="flex items-center gap-3 my-4">
                            <div className="h-px bg-green-400 w-8" />
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">
                                Because I know better
                            </p>
                            <div className="h-px bg-gray-200 flex-1" />
                        </div>

                        <p className="text-gray-400 text-sm font-bold mb-0.5">I WILL VOTE</p>
                        <p className="font-black text-green-600 leading-none tracking-tight text-4xl md:text-5xl">
                            FOR COURAGE
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                            <div className="h-1 w-14 bg-green-500 rounded-full" />
                            <div className="h-1 w-5 bg-green-300 rounded-full" />
                            <div className="h-1 w-2 bg-green-200 rounded-full" />
                        </div>
                    </div>

                    {/* Supporting text */}
                    <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                        Every vote is a voice. Make a commitment to participate in the
                        2027 elections — take the pledge, earn your badge, and inspire
                        others around you.
                    </p>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <Link
                            to="/pledge"
                            className="group inline-flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-green-200"
                        >
                            Take the Pledge
                            <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <span className="text-gray-400 text-xs italic">
                            Join thousands of Nigerians already pledging
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-6 border-t border-gray-100 pb-0 md:pb-12">
                        {[
                            { value: "12k+", label: "Pledges" },
                            { value: "36", label: "States" },
                            { value: "2027", label: "Election" },
                        ].map((s, i) => (
                            <div key={s.label} className="flex items-center gap-6">
                                {i > 0 && <div className="w-px h-7 bg-gray-200" />}
                                <div>
                                    <p className="text-lg font-black text-green-700">{s.value}</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT — image, shown on all screen sizes */}
                <div className="relative flex items-end justify-center">

                    {/* Green circle base */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 lg:w-80 lg:h-80 bg-green-50 rounded-full pointer-events-none" />

                    {/* Spinning dashed ring */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 lg:w-96 lg:h-96 rounded-full border-2 border-dashed border-green-200 animate-[spin_25s_linear_infinite] pointer-events-none" />

                    {/* Hero image */}
                    <img
                        src="/img/hero-bg.png"
                        alt="Nigerians united, ready to vote in 2027"
                        className="relative z-10 w-auto h-[320px] lg:h-[460px] max-w-full object-contain object-bottom block"
                    />

                    {/* Floating verified badge */}
                    <div className="absolute top-10 left-0 z-20 bg-white rounded-2xl shadow-xl border border-gray-100 px-3 py-2.5 flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-800">Pledge Verified</p>
                            <p className="text-[10px] text-gray-400">Badge generated ✓</p>
                        </div>
                    </div>

                    {/* Floating vote badge */}
                    <div className="absolute bottom-16 right-0 z-20 bg-green-700 text-white rounded-2xl shadow-lg shadow-green-200 px-3 py-2.5">
                        <p className="text-xs font-black">🗳️ My vote counts</p>
                        <p className="text-[10px] opacity-70 mt-0.5">#IWillVoteIn2027</p>
                    </div>
                </div>

            </div>
        </section>
    )
}