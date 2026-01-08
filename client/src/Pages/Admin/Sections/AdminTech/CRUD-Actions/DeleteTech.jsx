import { PopUp } from "../../../../../Components/PopUp"
import { useDelete } from "../../../../../Hooks/useDelete"

export function DeleteTech({
    setTechAction,
    setTechName,
    techName,
    setSelectedTechId,
    selectedTechId,
    setAllTech,
    handleSubmit
}){
    const handleDeleteTech = () => {
        useDelete(
            `/api/technologies/${selectedTechId}`,
            setAllTech,
            selectedTechId,
            setTechAction
        )
        setTechName(null)
        setSelectedTechId(null)
    }

    const deleteTechForm = () => {
        return(
            <form className="popup-container-form"
                onSubmit={handleSubmit(handleDeleteTech)}
            >
                <p className="popup-container-header">Delete {techName}?</p>

                <button className="bg-red-600">
                    Delete
                </button>
            </form>
        )
    }
    return(
        <PopUp 
            formContainer={deleteTechForm()}
            setPopUp={setTechAction}
        />
    )
}