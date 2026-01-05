import { useEffect, useState } from "react";
import { useFetch } from "../../../../../Hooks/useFetch";
import { TextContainers } from "../../../../../Components/TextContainers";
import { PopUp } from "../../../../../Components/PopUp";
import { usePatch } from "../../../../../Hooks/usePatch";

export function PatchTech({
    selectedTechId,
    reset,
    techInputArray,
    setTechAction,
    register,
    errors,
    setAllTech,
    handleSubmit,
    control
}){
    const [selectedTech, setSelectedTech] = useState()

    useFetch(`api/technologies/${selectedTechId}`, setSelectedTech, [selectedTechId])

    useEffect(() => {
        if(selectedTech){
            reset({
                techName: selectedTech.name,
                techLogo: selectedTech.logo,
                techType: selectedTech.tech_type,
            })
        }
    }, [selectedTech, reset])

    const handlePatchTech = (formData) => {
        const patchData = {
            techName: formData.techName,
            techLogo: formData.techLogo,
            techType: formData.techType.label
        }

        usePatch(
            patchData, `/api/technologies/${selectedTechId}`,
            selectedTechId, setAllTech, setTechAction
        )
    }

    const patchTechForm = () => {
        return(
            <form className="
                bg-white h-[90%] w-[90%] rounded flex flex-col
                justify-center items-center"
                onSubmit={handleSubmit(handlePatchTech)}
            >
                <h2>Edit {selectedTech?.name}</h2>

                <TextContainers 
                    inputArray={techInputArray}
                    register={register}
                    errors={errors}
                    control={control}
                />

                <button className="bg-blue-700 uppercase">
                    Submit Edit
                </button>
            </form>
        )
    }

    return(
        <PopUp 
            formContainer={patchTechForm()}
            setPopUp={setTechAction}
        />
    )
}