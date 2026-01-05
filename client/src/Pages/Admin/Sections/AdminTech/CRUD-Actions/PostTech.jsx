import { useEffect, useState } from "react";
import { usePost } from "../../../../../Hooks/usePost";
import { TextContainers } from "../../../../../Components/TextContainers";
import { PopUp } from "../../../../../Components/PopUp";
import ReactSelect from "react-select"

export function PostTech({
    setAllTech,
    techInputArray,
    techAction,
    setTechAction,
    register,
    errors,
    handleSubmit,
    setIsLoading,
    reset,
    setValue,
    unregister,
    control
}){
    const [postTech, setPostTech] = useState()
    const [postTechError, setPostTechError] = useState()

    useEffect(() => {
        if(!techAction) return 

        if(techAction === "post"){
            reset({
                techName: "",
                techLogo: "",
                techType: ""
            })
        }
    }, [])

    const handleTechPost = (formData) => {
        formData.techType = formData.techType.label
        console.log(formData)
        
        usePost({
            url: "/api/technologies",
            body: formData,
            setLoading: setIsLoading,
            setCompleted: setPostTech,
            onError: () => setPostTechError(true),
            setEndActionState: setTechAction,
            onSuccess: (newTech) => {
                setAllTech(prev => [...prev, newTech])
            }
        })
    }

    const newTechForm = () => {
        return(
            <form
                className="bg-white h-140 w-70 rounded flex flex-col justify-center items-center"
                onSubmit={handleSubmit(handleTechPost)}
            >
                <h2
                   className="
                        font-bold uppercase tracking-wider text-red-500 underline underline-offset-3
                        mb-3 text-12" 
                >
                    Add New Tech
                </h2>
                <TextContainers 
                    inputArray={techInputArray}
                    register={register}
                    errors={errors}
                    control={control}
                />

                <button className="bg-green-700">
                    Add Tech
                </button>
            </form>
        )
    }

    return(
        <PopUp 
            formContainer={newTechForm()}
            setPopUp={setTechAction}
        />
    )
}