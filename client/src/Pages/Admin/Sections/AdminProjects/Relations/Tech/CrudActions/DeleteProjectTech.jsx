import { useEffect, useState } from "react"
import { useDelete } from "../../../../../../../Hooks/useDelete"

export function DeleteProjectTech({
    allProjectTech,
    setAllProjectTech,
    setTechAction,
    techId,
    setTechId,
    handleSubmit,
    selectedProjectId
}){
    const [selectedProjectTech, setSelectedProjectTech] = useState()

    useEffect(() => (
        setSelectedProjectTech(allProjectTech.find(item => 
            item.project_id === selectedProjectId &&
            item.tech_id === techId
        ))
    ), [techId, selectedProjectId])

    const chosenProjectTechId = selectedProjectTech?.id

    const handleDeletePoint = () => {
        useDelete(
            `/projecttech/${chosenProjectTechId}`,
            setAllProjectTech,
            setTechId,
            setTechAction
        )
    }

    return(
        <form
            className="h-[90%] w-[90%] bg-white flex flex-col justify-center p-4"
            onSubmit={handleSubmit(handleDeletePoint)}
        >
            <h2 className="justify-self-center self-center">Delete Tech?</h2>

            <div className="flex flex-row gap-2">
                <button 
                    className="bg-red-500"
                    type="submit"
                >
                    Delete
                </button>

                <button 
                    className="bg-blue-500"
                    type="button"
                    onClick={() => {
                        setTechId()
                        setTechAction()
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}