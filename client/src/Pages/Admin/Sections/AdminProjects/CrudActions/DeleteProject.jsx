import { PopUp } from "../../../../../Components/PopUp"
import { useDelete } from "../../../../../Hooks/useDelete"

export function DeleteProject({
    setProjectAction,
    setProjectName,
    projectName,
    setSelectedProjectId,
    selectedProjectId,
    setAllProjects,
    handleSubmit
}){
    const handleDeleteProject = () => {
        useDelete(
            `/projects/${selectedProjectId}`,
            setAllProjects,
            selectedProjectId,
            setProjectAction
        )
        setProjectName(null)
        setSelectedProjectId(null)
    }

    const deleteProjectForm = () => {
        return(
            <form className="
                bg-white flex flex-col justify-center items-center
                w-[90%] h-[35%] rounded"
                onSubmit={handleSubmit(handleDeleteProject)}
            >
                <p className="uppercase font-bold">Delete {projectName}?</p>

                <button className="bg-red-600">
                    Delete
                </button>
            </form>
        )
    }
    return(
        <PopUp 
            formContainer={deleteProjectForm()}
            setPopUp={setProjectAction}
        />
    )
}