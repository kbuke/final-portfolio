import { useState } from "react"
import { PostTech } from "./CRUD-Actions/PostTech"
import { DeleteTech } from "./CRUD-Actions/DeleteTech"
import { PatchTech } from "./CRUD-Actions/PatchTech"
import { AdminBaseResource } from "../../../../Components/AdminBaseSection"

export function AdminTech({
    appData
}){
    const [techAction, setTechAction] = useState()
    const [techName, setTechName] = useState()
    const [selectedTechId, setSelectedTechId] = useState()

    const allTech = appData?.allTech
    const setAllTech = appData?.setAllTech
    const textInputObject = appData?.textInputObject

    const register = appData?.register 
    const errors = appData?.errors
    const handleSubmit = appData?.handleSubmit
    const setIsLoading = appData?.setIsLoading
    const reset = appData?.reset
    const control = appData?.control

    const availableTechTypes = [
        {label: "Frontend", value: "frontend"},
        {label: "Backend", value: "backend"},
        {label: "Cloud Computing", value: "cloud"},
        {label: "API", value: "api"}
    ]

    const techInputArray = [
        textInputObject("text", "Tech Name", "techName", false, true, allTech, "name", null, selectedTechId),
        textInputObject("text", "Tech Logo", "techLogo", false, true, allTech, "logo", null, selectedTechId),
        textInputObject("select", "Tech Type", "techType", false, false, allTech, "tech_type", availableTechTypes, selectedTechId)
    ]

    return(
        <>
            <AdminBaseResource 
                modelType={"Technology"}
                allInstances={allTech}
                setModelAction={setTechAction}
                setInstanceName={setTechName}
                setInstanceId={setSelectedTechId}
            />

            {techAction === "post"
                ? <PostTech
                    setAllTech={setAllTech}
                    techInputArray={techInputArray}
                    techAction={techAction}
                    setTechAction={setTechAction}
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    setIsLoading={setIsLoading}
                    reset={reset}
                    control={control}
                />
                : techAction === "delete"
                ? <DeleteTech 
                    setTechAction={setTechAction}
                    setTechName={setTechName}
                    techName={techName}
                    setSelectedTechId={setSelectedTechId}
                    selectedTechId={selectedTechId}
                    setAllTech={setAllTech}
                    handleSubmit={handleSubmit}
                />
                : techAction === "patch"
                ?   <PatchTech 
                    selectedTechId={selectedTechId}
                    reset={reset}
                    techInputArray={techInputArray}
                    setTechAction={setTechAction}
                    register={register}
                    errors={errors}
                    setAllTech={setAllTech}
                    handleSubmit={handleSubmit}
                    control={control}
                />
                : null
            }
        </>
    )
}