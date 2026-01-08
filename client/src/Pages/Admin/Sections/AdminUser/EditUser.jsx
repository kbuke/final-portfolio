import { useEffect } from "react"
import { PopUp } from "../../../../Components/PopUp"
import { TextContainers } from "../../../../Components/TextContainers"
import { usePatchItem } from "../../../../Hooks/UsePatchItem"

export function EditUser({
    allUsers,
    setAllUsers,
    setEditUser,
    textInputObject,
    register,
    errors,
    handleSubmit,
    reset
}){

    useEffect(() => {
        if(allUsers){
            reset({
                name: allUsers?.name,
                intro: allUsers?.intro,
                cv: allUsers?.cv,
                email: allUsers?.email
            })
        }
    }, [allUsers, reset])

    const userInputArray = [
        textInputObject("text", "Name", "name", false, true),
        textInputObject("textarea", "Intro", "intro", false, true),
        textInputObject("text", "CV", "cv", false, true),
    ]

    const userEditForm = () => {
        return(
            <form className="popup-container-form" onSubmit={handleSubmit(handlePatchUser)}>
                <h1 className="popup-container-header">Edit Info</h1>
                <TextContainers 
                    inputArray={userInputArray}
                    register={register}
                    errors={errors}
                />

                <button className="bg-green-600">Edit</button>
            </form>
        )
    }

    const handlePatchUser = (formData) => {
        const patchData = {
            name: formData.name,
            intro: formData.intro,
            cv: formData.cv,
            email: formData.email
        }

        usePatchItem(
            patchData, `/api/users/${allUsers.id}`,
            setAllUsers, setEditUser
        )
    }

    return(
        <PopUp 
            formContainer={userEditForm()}
            setPopUp={setEditUser}
        />
    )
}