import { useEffect, useState } from "react";
import { PopUp } from "../../../../../Components/PopUp";
import { TextContainers } from "../../../../../Components/TextContainers";
import { usePost } from "../../../../../Hooks/usePost";

export function PostProject({
    setAllProjects,
    projectInputArray,
    projectAction,
    setProjectAction,
    register,
    errors,
    handleSubmit,
    setIsLoading,
    reset,
    setValue,
    unregister,
    control,
    successfulCrud,
    failedCrud
}){
    const [postProject, setPostProject] = useState()
    const [postProjecteError, setPostProjectError] = useState()

    useEffect(() => {
        if(!projectAction) return

        if(projectAction === "post"){
            reset({
                projectName: "",
                projectIntro: "",
                projectImg: "",
                projectStartDate: "",
                projectEndDate: "",
                webUrl: "",
                gitUrl: "",
                instituteId: ""
            })
        }
    }, [])

    const handleProjectPost = (formData) => {
        formData.instituteId = formData.instituteId.value
        console.log(formData)

        usePost({
            endpoint: "/projects",
            body: formData,
            setLoading: setIsLoading,
            setCompleted: setPostProject,
            onError: () => setPostProjectError(true),
            setEndActionState: setProjectAction,
            onSuccess: (newProject) => {
                setAllProjects(prev => [...prev, newProject])
            }
        })
    }

    const newProjectForm = () => {
        return(
            <form 
                className="popup-container-form"
                onSubmit={handleSubmit(handleProjectPost)}
            >
                <h2 className="popup-container-header">
                    Add New Project
                </h2>

                {successfulCrud(postProject, "Successfully posted project")}
                {failedCrud(postProjecteError, "Error posting project")}


                <TextContainers 
                    inputArray={projectInputArray}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    unregister={unregister}
                    endDate={"instituteEndDate"}
                    control={control}
                />

                <button className="bg-green-700">
                    Add Institute
                </button>
            </form>
        )
    }

    return(
        <PopUp 
            formContainer={newProjectForm()}
            setPopUp={setProjectAction}
        />
    )
}