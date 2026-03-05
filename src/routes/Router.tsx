import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Pledge from "../pages/Pledge";



export const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout />, children: [
            { index: true, element: <Home /> },
            { path: "pledge", element: <Pledge /> }
        ]
    }
])