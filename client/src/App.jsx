import { useState } from "react"
import { Outlet } from "react-router"

import { useFetch } from "./Hooks/useFetch"

function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [allUsers, setAllUsers] = useState()
    const [allTech, setAllTech] = useState()
    const [allProjects, setAllProjects] = useState()

    useFetch("/api/users/1", setAllUsers)
    useFetch("/api/technologies", setAllTech)
    useFetch("/api/projects", setAllProjects)

    const outletContext = {
        isLoading, setIsLoading,
        allUsers, setAllUsers,
        allTech, setAllTech,
        allProjects, setAllProjects
    }


    return(
        <>
            <Outlet context={outletContext}/>
        </>
    )
}

export default App
