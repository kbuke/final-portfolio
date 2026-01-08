import { PopUp } from "../../../../../Components/PopUp"
import { useDelete } from "../../../../../Hooks/useDelete"

export function DeleteInstitute({
    setInstituteAction,
    setInstituteName,
    instituteName,
    setSelectedInstituteId,
    selectedInstituteId,
    setAllInstitutes,
    handleSubmit
}){
    const handleDeleteInstitute = () => {
        useDelete(
            `/institutes/${selectedInstituteId}`,
            setAllInstitutes,
            selectedInstituteId,
            setInstituteAction
        )
        setInstituteName(null)
        setSelectedInstituteId(null)
    }

    const deleteInstituteForm = () => {
        return(
            <form className="popup-container-form"
                onSubmit={handleSubmit(handleDeleteInstitute)}
            >
                <p className="popup-container-header">Delete {instituteName}?</p>

                <button className="bg-red-600">
                    Delete
                </button>
            </form>
        )
    }
    return(
        <PopUp 
            formContainer={deleteInstituteForm()}
            setPopUp={setInstituteAction}
        />
    )
}