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
            // Create object with path and element keys 
            {
                path: "/",
                element: <Home />
            },

            {
                path: "/login",
                element: <Login />
            },

            {
                path: "/admin",
                element: <Admin />
            }
        ]
    }
])