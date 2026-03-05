import { NavLink } from "react-router-dom"

export default function Navbar() {

    const linkStyle = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "text-green-700 font-semibold"
            : "text-gray-700 hover:text-green-700"

    return (
        <nav className="w-full border-b bg-white">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo / Site Name */}
                <NavLink
                    to="/"
                    className="text-lg font-bold text-green-800"
                >
                    IWillVote2027
                </NavLink>

                {/* Navigation */}
                <div className="flex items-center gap-6">

                    <NavLink
                        to="/"
                        className={linkStyle}
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/pledge"
                        className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition font-medium"
                    >
                        Pledge
                    </NavLink>

                </div>
            </div>
        </nav>
    )
}