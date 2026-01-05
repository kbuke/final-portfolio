import { useEffect, useState } from "react";
import { PopUp } from "../../../../../Components/PopUp";
import { TextContainers } from "../../../../../Components/TextContainers";
import { usePost } from "../../../../../Hooks/usePost";

export function PostProject({
    setAllProjects,
    allProjects,
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
    control
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
        console.log(formData)
        // if(formData.instituteEndDate === undefined){
        //     formData.instituteEndDate===null
        // }  
        formData.instituteId = formData.instituteId.value

        usePost({
            url: "/api/projects",
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
                className="bg-white h-140 w-70 rounded flex flex-col justify-center items-center"
                onSubmit={handleSubmit(handleProjectPost)}
            >
                <h2 className="
                    font-bold uppercase tracking-wider text-red-500 underline underline-offset-3
                    mb-3 text-12
                ">
                    Add New Project
                </h2>
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