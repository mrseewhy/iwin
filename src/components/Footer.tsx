export default function Footer() {
    return (
        <footer className="border-t ">
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">

                {/* Left */}
                <p>
                    © {new Date().getFullYear()} I Will Vote 2027. All rights reserved.
                </p>

                {/* Links */}
                <div className="flex items-center gap-6">
                    <a
                        href="/"
                        className="hover:text-green-700 transition"
                    >
                        Home
                    </a>

                    <a
                        href="/pledge"
                        className="hover:text-green-700 transition"
                    >
                        Pledge
                    </a>
                </div>

            </div>
        </footer>
    )
}