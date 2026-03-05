import { Link } from "react-router-dom"

export default function Hero() {
    return (
        <section className="bg-white">
            <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

                {/* LEFT SIDE */}
                <div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
                        One Nigeria. <br />
                        One Voice. <br />
                        Your Vote Matters.
                    </h1>

                    <p className="mt-6 text-lg text-gray-700 max-w-xl">
                        Make a commitment to participate in the 2027 elections.
                        Take the pledge and share your badge with others.
                    </p>

                    <div className="mt-8">
                        <Link
                            to="/pledge"
                            className="inline-block bg-green-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Take the Pledge
                        </Link>
                    </div>

                </div>


                {/* RIGHT SIDE */}
                <div className="relative">

                    <img
                        src="/img/hero-bg.jpg"
                        alt="Citizens voting"
                        className="rounded-2xl  w-full object-cover"
                    />

                </div>

            </div>
        </section>
    )
}