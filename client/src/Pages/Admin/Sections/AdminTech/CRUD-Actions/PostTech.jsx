import { useEffect, useState } from "react";
import { usePost } from "../../../../../Hooks/usePost";
import { TextContainers } from "../../../../../Components/TextContainers";
import { PopUp } from "../../../../../Components/PopUp";

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
            endpoint: "/technologies",
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
                className="popup-container-form"
                onSubmit={handleSubmit(handleTechPost)}
            >
                {postTech
                    ? <div className="successful-crud">
                        Posted New Tech
                    </div>
                    : null
                }

                {postTechError
                    ? <div className="unsuccessful-crud">
                        {postTechError}
                    </div>
                    : null
                }


                <h2
                   className="popup-container-header" >
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