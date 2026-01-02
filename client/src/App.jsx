import { useState } from "react"
import { Outlet } from "react-router"

import { useFetch } from "./Hooks/useFetch"
import { useForm } from "react-hook-form"

function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [allUsers, setAllUsers] = useState()
    const [allTech, setAllTech] = useState()
    const [allProjects, setAllProjects] = useState()
    const [allEmails, setAllEmails] = useState()

    useFetch("/api/users/1", setAllUsers)
    useFetch("/api/technologies", setAllTech)
    useFetch("/api/projects", setAllProjects)
    useFetch("/api/emails", setAllEmails)

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        control
    } = useForm()

    const outletContext = {
        isLoading, setIsLoading,
        allUsers, setAllUsers,
        allTech, setAllTech,
        allEmails, setAllEmails,
        allProjects, setAllProjects,

        register, handleSubmit,
        errors, reset, control
    }


    return(
        <>
            <Outlet context={outletContext}/>
        </>
    )
}

export default App
