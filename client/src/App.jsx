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
    const [allPoints, setAllPoints] = useState()

    useFetch("/api/users/1", setAllUsers)
    useFetch("/api/technologies", setAllTech)
    useFetch("/api/projects", setAllProjects, [allPoints])
    useFetch("/api/emails", setAllEmails)
    useFetch("/api/socials", setAllSocials)
    useFetch("/api/institutes", setAllInstitutes)
    useFetch("/api/points", setAllPoints)


    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        control,
        setValue,
        unregister
    } = useForm()

    // Handle Inputs from user
    const textInputObject = (textType, placeholder, variableName, nullable, unique, allArray, variable, options, currentId=null) => {
        const validation = {}

        if(!nullable){
            validation.required = `Please enter ${placeholder}`
        }

        if(unique){
            validation.validate = value => {
                const exists = allArray?.some(instance => {
                    if(!instance?.variable) return false

                    const sameValue = instance[variable].toLowerCase() === value.toLowerCase()

                    const differentId = currentId? instance?.id !== currentId : true

                    return sameValue && differentId
                })

                return !exists || `${value} is already a registered ${placeholder}`
            }
        }

        return{
            type: textType,
            placeholder: `Please enter ${placeholder}`,
            name: variableName,
            options: textType==="select" ? options : null,
            validation
        }
    }

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
        setValue, unregister,

        textInputObject
    }


    return(
        <>
            <Outlet context={outletContext}/>
        </>
    )
}

export default App
