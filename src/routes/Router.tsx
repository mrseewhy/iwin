import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import Pledge from "../pages/Pledge"
import AdminLogin from "../pages/admin/AdminLogin"
import AdminDashboard from "../pages/admin/AdminDashboard"
import AdminRoute from "../components/admin/AdminRoute"

export const router = createBrowserRouter([
    // ── Public site ──────────────────────────────────────────
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "pledge", element: <Pledge /> },
        ],
    },

    // ── Admin (no MainLayout — standalone pages) ─────────────
    {
        path: "/admin/login",
        element: <AdminLogin />,
    },
    {
        path: "/admin/dashboard",
        element: (
            <AdminRoute>
                <AdminDashboard />
            </AdminRoute>
        ),
    },
])