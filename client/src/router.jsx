import { createBrowserRouter, Navigate } from "react-router";

import App from "./App";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Admin } from "./Pages/Admin/Admin";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "admin",
                element: <Admin />
            },
            {
                path: "*",
                element: <Navigate to="/" replace />
            }
        ]
    }
]);
