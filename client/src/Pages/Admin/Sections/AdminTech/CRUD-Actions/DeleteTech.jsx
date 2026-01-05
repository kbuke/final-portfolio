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
            <form className="
                bg-white flex flex-col justify-center items-center
                w-[90%] h-[35%] rounded"
                onSubmit={handleSubmit(handleDeleteTech)}
            >
                <p className="uppercase font-bold">Delete {techName}?</p>

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