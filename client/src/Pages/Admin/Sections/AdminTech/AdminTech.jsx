import { useState } from "react"
import { PostTech } from "./CRUD-Actions/PostTech"
import ReactSelect from "react-select"
import { DeleteTech } from "./CRUD-Actions/DeleteTech"
import { PatchTech } from "./CRUD-Actions/PatchTech"

export function AdminTech({
    appData,
    spanContainer
}){
    const [techAction, setTechAction] = useState()
    const [techName, setTechName] = useState()
    const [selectedTechId, setSelectedTechId] = useState()

    const allTech = appData?.allTech
    const setAllTech = appData?.setAllTech

    const register = appData?.register 
    const errors = appData?.errors
    const handleSubmit = appData?.handleSubmit
    const setIsLoading = appData?.setIsLoading
    const reset = appData?.reset
    const control = appData?.control


    const adminTechDeleteEditButtons = (buttonText, action, techName, techId) => {
        return(
            <button 
                onClick={() => {
                    setTechAction(action)
                    setTechName(techName)
                    setSelectedTechId(techId)
                }}
                className={`${action === "patch"
                    ? "edit-instance-button"
                    : "delete-instance-button"
                }`}
            >
                {buttonText}
            </button>
        )
    }

    const textInput = (placholderText, variableName, unique, allArray, currentId=null) => {
        const validation = {
            required: `Please enter ${placholderText}`
        }

        if (unique) {
            validation.validate = value => {
            const exists = allArray?.some(instance => {
                if(!instance?.name) return false

                const sameName = instance.name.toLowerCase() === value.toLowerCase()

                const differentId = currentId ? instance?.id !== currentId : true

                return sameName && differentId
            })

            return !exists || `${value} is already a registered ${placholderText}`
            }
        }

        return {
            type: "text",
            placeholder: `Please enter ${placholderText}`,
            name: variableName,
            validation
        }
    }

    const availableTechTypes = [
        {label: "Frontend", value: "frontend"},
        {label: "Backend", value: "backend"},
        {label: "Cloud Computing", value: "cloud"},
        {label: "API", value: "api"}
    ]

   const selectTechType = () => {
    return(
        {
            type:"select",
            name: "techType",
            options: availableTechTypes
        }
    )
   }

    const techInputArray = [
        textInput("Tech Name", "techName", true, allTech, selectedTechId),
        textInput("Tech Logo", "techLogo", true, allTech, selectedTechId),
        selectTechType()
    ]

    console.log(techAction)

    return(
        <>
            <div className="instance-div-container">
                <h1 className="admin-section-header">Technologies</h1>

                <button
                    className="post-instance-button"
                    onClick={() => setTechAction("post")}
                >
                    Add Tech
                </button>
            </div>

            {allTech.map((tech, index) => {
                return(
                    <div
                        key={index}
                        className="border-b p-2"
                    >
                        <h2 className="instance-section-header">
                            {tech?.name}
                        </h2>

                        <div className="flex gap-2 mb-2 justify-center">
                            {adminTechDeleteEditButtons("Edit Tech", "patch", tech?.name, tech?.id)}
                            {adminTechDeleteEditButtons("Delete Tech", "delete", tech?.name, tech?.id)}
                        </div>

                        {spanContainer("Tech-Type: ", tech?.tech_type)}

                        <img 
                            src={tech?.logo}
                            className="instance-img"
                        />
                    </div>
                )
            })}

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