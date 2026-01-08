import { useState, useMemo } from "react"
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
    const [allPoints, setAllPoints] = useState([])
    const [allProjectTech, setAllProjectTech] = useState([])

    useFetch("/users/1", setAllUsers)
    useFetch("/technologies", setAllTech)
    useFetch("/projects", setAllProjects)
    useFetch("/emails", setAllEmails)
    useFetch("/socials", setAllSocials)
    useFetch("/institutes", setAllInstitutes)
    useFetch("/points", setAllPoints)
    useFetch("/projecttech", setAllProjectTech)

    console.log("hi there")


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
    const textInputObject = (textType, placeholder, variableName, nullable, unique, allArray, variable, options, currentId=null, dependantVriable, defaultValue=null) => {
        const validation = {}

        if(!nullable){
            validation.required = `Please enter ${placeholder}`
        }

        if(unique){
            validation.validate = value => {
                if(!value) return true
                
                const exists = allArray?.some(instance => {
                    if(!instance?.[variable])return false
                    const sameValue = instance[variable].toLowerCase() === value.toLowerCase()
                    const differentId = currentId ? instance.id !== currentId : true
                    return sameValue && differentId
                })
                return !exists || `${value} is already a registered ${placeholder}`
            }
        }

        // Mark end_date fields
        const isEndDate = variable === "end_date"

        return {
            type: textType,
            placeholder: `Please enter ${placeholder}`,
            name: variableName,
            options: textType==="select" ? options : null,
            validation,
            isEndDate,
            defaultValue
        }
    }


    const outletContext = useMemo(() => ({
        isLoading, setIsLoading,
        loggedUser, setLoggedUser,

        allUsers, setAllUsers,
        allTech, setAllTech,
        allEmails, setAllEmails,
        allProjects, setAllProjects,
        allSocials, setAllSocials,
        allInstitutes, setAllInstitutes,
        allPoints, setAllPoints,
        allProjectTech, setAllProjectTech,

        register,
        handleSubmit,
        errors,
        reset,
        control,
        setValue,
        unregister,

        textInputObject
    }), [
        isLoading,
        loggedUser,

        allUsers,
        allTech,
        allEmails,
        allProjects,
        allSocials,
        allInstitutes,
        allPoints,
        allProjectTech,

        register,
        handleSubmit,
        errors,
        reset,
        control,
        setValue,
        unregister,
        textInputObject
    ])



    return(
        <>
            <Outlet context={outletContext}/>
        </>
    )
}

export default App
