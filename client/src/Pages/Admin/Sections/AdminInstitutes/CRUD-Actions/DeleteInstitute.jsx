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
            `/api/institutes/${selectedInstituteId}`,
            setAllInstitutes,
            selectedInstituteId,
            setInstituteAction
        )
        setInstituteName(null)
        setSelectedInstituteId(null)
    }

    const deleteInstituteForm = () => {
        return(
            <form className="
                bg-white flex flex-col justify-center items-center
                w-[90%] h-[35%] rounded"
                onSubmit={handleSubmit(handleDeleteInstitute)}
            >
                <p className="uppercase font-bold">Delete {instituteName}?</p>

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