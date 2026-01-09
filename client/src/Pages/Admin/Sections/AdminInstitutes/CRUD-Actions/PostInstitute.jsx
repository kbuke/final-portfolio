import { useEffect, useState } from "react";
import { PopUp } from "../../../../../Components/PopUp";
import { TextContainers } from "../../../../../Components/TextContainers";
import { usePost } from "../../../../../Hooks/usePost";

export function PostInstitute({
    setAllInstitutes,
    instituteInputArray,
    instituteAction,
    setInstituteAction,
    register,
    errors,
    handleSubmit,
    setIsLoading,
    reset,
    setValue,
    unregister,
    successfulCrud,
    failedCrud
}){
    const [postInstitute, setPostInstitute] = useState()
    const [postInstanceError, setPostInstanceError] = useState()


    useEffect(() => {
        if(!instituteAction) return

        if(instituteAction === "post"){
            reset({
                instituteName: "",
                instituteLogo: "",
                instituteInfo: "",
                instituteStartDate: "",
                instituteEndDate: ""
            })
        }
    }, [])

    const handleInstitutePost = async (formData) => {
        if(formData.instituteEndDate === ""){
            formData.instituteEndDate=null
        }

        const result = await (usePost({
            endpoint: "/institutes",
            body: formData,
            setLoading: setIsLoading,
            setCompleted: setPostInstitute,
            onError: () => setPostInstanceError(true),
            setEndActionState: setInstituteAction,
            onSuccess: (newInstitute) => {
                setAllInstitutes(prev => [...prev, newInstitute])
            }
        }))
    }

    const newInstituteForm = () => {
        return(
            <form 
                className="popup-container-form"
                onSubmit={handleSubmit(handleInstitutePost)}
            >
                <h2 className="popup-container-header">
                    Add New Institute
                </h2>

                {successfulCrud(postInstitute, "New Institute Posted")}
                {failedCrud(postInstanceError, "Failed to created Institute")}


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