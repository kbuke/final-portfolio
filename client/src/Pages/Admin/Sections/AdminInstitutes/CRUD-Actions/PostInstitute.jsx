import { useEffect, useState } from "react";
import { PopUp } from "../../../../../Components/PopUp";
import { TextContainers } from "../../../../../Components/TextContainers";
import { usePost } from "../../../../../Hooks/usePost";

export function PostInstitute({
    setAllInstitutes,
    allInstitutes,
    instituteInputArray,
    instituteAction,
    setInstituteAction,
    register,
    errors,
    handleSubmit,
    setIsLoading,
    reset,
    setValue,
    unregister
}){
    const [postInstitute, setPostInstitute] = useState()
    const [postInstanceError, setPostInstanceError] = useState()

    useEffect(() => {
        if(!instituteAction) return

        if(instituteAction === "post"){
            reset()
        }
    }, [])

    const handleInstitutePost = (formData) => {
        if(formData.instituteEndDate === undefined){
            formData.instituteEndDate===null
        }
        console.log(formData)
        usePost({
            url: "/api/institutes",
            body: formData,
            setLoading: setIsLoading,
            setCompleted: setPostInstitute,
            onError: () => setPostInstanceError(true),
            setEndActionState: setInstituteAction,
            onSuccess: (newInstitute) => {
                setAllInstitutes(prev => [...prev, newInstitute])
            }
        })
    }

    const newInstituteForm = () => {
        return(
            <form 
                className="bg-white h-140 w-70 rounded flex flex-col justify-center items-center"
                onSubmit={handleSubmit(handleInstitutePost)}
            >
                <h2 className="
                    font-bold uppercase tracking-wider text-red-500 underline underline-offset-3
                    mb-3 text-12
                ">
                    Add New Institute
                </h2>
                <TextContainers 
                    inputArray={instituteInputArray}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    unregister={unregister}
                    endDate={"instituteEndDate"}
                />

                <button className="bg-green-700">
                    Add Institute
                </button>
            </form>
        )
    }

    return(
        <PopUp 
            formContainer={newInstituteForm()}
            setPopUp={setInstituteAction}
        />
    )
}