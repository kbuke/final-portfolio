import { useEffect, useState } from "react";
import {usePost} from "../../../../../../../Hooks/usePost"
import { TextContainers } from "../../../../../../../Components/TextContainers";
import { PopUp } from "../../../../../../../Components/PopUp";

export function PostPoint({
    setAllPoints,
    pointInputArray,
    pointAction,
    setPointAction,
    register,
    errors,
    handleSubmit,
    setIsLoading,
    reset,
    selectedProjectId,
    setProjectRelation,
    successfulCrud,
    failedCrud
}){
    const [postPoint, setPostPoint] = useState()
    const [postPointError, setPostPointError] = useState()

    useEffect(() => {
        if(!pointAction) return 

        if(pointAction === "post"){
            reset({
                projectPoint: "",
            })
        }
    }, [])

    const handlePointPost = (formData) => {
        formData.projectId = selectedProjectId
        
        usePost({
            url: "/points",
            body: formData,
            setLoading: setIsLoading,
            setCompleted: setPostPoint,
            onError: () => setPostPointError(true),
            setEndActionState: setPointAction,
            onSuccess: (newPoint) => {
                setAllPoints(prev => [...prev, newPoint])
                setProjectRelation(null)
            }
        })
    }

    const newPointForm = () => {
        return(
            <form
                className="popup-container-form"
                onSubmit={handleSubmit(handlePointPost)}
            >
                <h2
                   className="popup-container-header" 
                >
                    Add New Point
                </h2>

                {successfulCrud(postPoint, "Successfully posted project point")}
                {failedCrud(postPointError, "Error posting point")}
                <TextContainers 
                    inputArray={pointInputArray}
                    register={register}
                    errors={errors}
                />

                <button className="bg-green-700">
                    Add Point
                </button>
            </form>
        )
    }

    return(
        <PopUp 
            formContainer={newPointForm()}
            setPopUp={setPointAction}
        />
    )
}