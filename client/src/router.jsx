import { createBrowserRouter, Navigate } from "react-router";

import App from "./App";
import { Home } from "./Pages/Home/Home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // Create object with path and element keys 
            {
                path: "/",
                element: <Home />
            }
        ]
    }
])