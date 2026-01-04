import { useState } from "react"
import { Outlet } from "react-router"

import { useFetch } from "./Hooks/useFetch"
import { useForm } from "react-hook-form"

function App() {
    const [isLoading, setIsLoading] = useState(false)
    const [loggedUser, setLoggedUser] = useState()
    const [allUsers, setAllUsers] = useState()
    const [allTech, setAllTech] = useState()
    const [allProjects, setAllProjects] = useState()
    const [allEmails, setAllEmails] = useState()
    const [allSocials, setAllSocials] = useState()
    const [allInstitutes, setAllInstitutes] = useState()

    useFetch("/api/users/1", setAllUsers)
    useFetch("/api/technologies", setAllTech)
    useFetch("/api/projects", setAllProjects)
    useFetch("/api/emails", setAllEmails)
    useFetch("/api/socials", setAllSocials)
    useFetch("/api/institutes", setAllInstitutes)


    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        control,
        setValue,
        unregister
    } = useForm()

    const outletContext = {
        isLoading, setIsLoading,
        loggedUser, setLoggedUser,
        allUsers, setAllUsers,
        allTech, setAllTech,
        allEmails, setAllEmails,
        allProjects, setAllProjects,
        allSocials, setAllSocials,
        allInstitutes, setAllInstitutes,

        register, handleSubmit,
        errors, reset, control,
        setValue, unregister
    }


    return(
        <>
            <Outlet context={outletContext}/>
        </>
    )
}

export default App
