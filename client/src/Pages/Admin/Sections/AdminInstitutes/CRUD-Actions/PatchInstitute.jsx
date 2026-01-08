import { useEffect, useState } from "react";
import { useFetch } from "../../../../../Hooks/useFetch";
import { TextContainers } from "../../../../../Components/TextContainers";
import { PopUp } from "../../../../../Components/PopUp";
import { usePatch } from "../../../../../Hooks/usePatch";

export function PatchInstitute({
    selectedInstituteId,
    reset,
    instituteInputArray,
    setInstituteAction,
    register,
    errors,
    setValue,
    unregister,
    setAllInstitutes,
    handleSubmit
}){
    const [selectedInstitute, setSelectedInstitute] = useState()

    useFetch(`/institutes/${selectedInstituteId}`, setSelectedInstitute, [selectedInstituteId])

    useEffect(() => {
        if(selectedInstitute){
            reset({
                instituteName: selectedInstitute.name,
                instituteLogo: selectedInstitute.logo,
                instituteInfo: selectedInstitute.info,
                instituteStartDate: selectedInstitute.start_date,
                instituteEndDate: selectedInstitute.end_date
            })
        }
    }, [selectedInstitute, reset])

    const handlePatchInstitute = (formData) => {
        const patchData = {
            instituteName: formData.instituteName,
            instituteLogo: formData.instituteLogo,
            instituteInfo: formData.instituteInfo,
            instituteStartDate: formData.instituteStartDate,
            instituteEndDate: formData.instituteEndDate
        }

        usePatch(
            patchData, `/api/institutes/${selectedInstituteId}`,
            selectedInstituteId, setAllInstitutes, setInstituteAction
        )
    }

    const patchInstituteForm = () => {
        return(
            <form className="popup-container-form"
                onSubmit={handleSubmit(handlePatchInstitute)}
            >
                <h2 className="popup-container-header">Edit {selectedInstitute?.name}</h2>

                <TextContainers 
                    inputArray={instituteInputArray}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    unregister={unregister}
                    endDate={"instituteEndDate"}
                />

                <button className="bg-blue-700 uppercase">
                    Submit Edit
                </button>
            </form>
        )
    }

    return(
        <PopUp 
            formContainer={patchInstituteForm()}
            setPopUp={setInstituteAction}
        />
    )
}