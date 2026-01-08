import { useState } from "react"
import { EditUser } from "./EditUser"

export function AdminUser({
    appData
}){
    const [editUser, setEditUser] = useState()

    const allUsers = appData?.allUsers
    const setAllUsers = appData?.setAllUsers
    const textInputObject = appData?.textInputObject
    const register = appData?.register 
    const errors = appData?.errors 
    const handleSubmit = appData?.handleSubmit
    const reset = appData?.reset

    const renderUserInfo = (text, value) => {
        return(
            <p>
                <span className="font-bold uppercase">{text}</span>
                {value}
            </p>
        )
    }

    return(
        <div className="instance-div-container">
            <h1 className="admin-section-header">User Info</h1>
            <button 
                className="edit-instance-button"
                onClick={() => setEditUser("patch")}
            >
                Edit Info
            </button>

            <div className="mt-2 self-start">
                {renderUserInfo("Name: ", allUsers?.name)}
                {renderUserInfo("Email: ", allUsers?.email)}
                {renderUserInfo("Intro: ", allUsers?.intro)}
                <img 
                    src={allUsers?.cv}
                    className="border"
                />
            </div>

            {editUser === "patch"
                ? <EditUser 
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                    setEditUser={setEditUser}
                    textInputObject={textInputObject}
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    reset={reset}
                />
                : null
            }
        </div>
    )
}