import { useEffect } from "react";
import { TextContainers } from "../../../../../../../Components/TextContainers";
import { PopUp } from "../../../../../../../Components/PopUp";
import { usePatch } from "../../../../../../../Hooks/usePatch";

export function PatchPoint({
    selectedPointId,
    selectedProjectId,
    selectedPoint,
    reset,
    pointInputArray,
    setPointAction,
    register,
    errors,
    setAllPoints,
    handleSubmit
}){
    useEffect(() => {
        if (!selectedPoint) return

        reset({
            projectPoint: selectedPoint.point
        })
    }, [selectedPointId])

    const handlePatchPoint = (formData) => {
        const patchData = {
            projectPoint: formData.projectPoint,
            projectId: selectedProjectId
        }

        usePatch(
            patchData, `/api/points/${selectedPointId}`,
            selectedPointId, setAllPoints, setPointAction
        )
    }

    const patchPointForm = () => {
        return(
            <form className="
                bg-white h-[90%] w-[90%] rounded flex flex-col
                justify-center items-center"
                onSubmit={handleSubmit(handlePatchPoint)}
            >
                <h2>Edit Point</h2>

                <TextContainers 
                    inputArray={pointInputArray}
                    register={register}
                    errors={errors}
                />

                <button className="bg-blue-700 uppercase">
                    Submit Edit
                </button>
            </form>
        )
    }

    return(
        <PopUp 
            formContainer={patchPointForm()}
            setPopUp={setPointAction}
        />
    )
}