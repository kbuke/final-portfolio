import { useEffect, useState } from "react";
import { useFetch } from "../../../../../Hooks/useFetch";
import { TextContainers } from "../../../../../Components/TextContainers";
import { PopUp } from "../../../../../Components/PopUp";
import { usePatch } from "../../../../../Hooks/usePatch";

export function PatchProject({
    selectedProjectId,
    reset,
    projectInputArray,
    setProjectAction,
    register,
    errors,
    setValue,
    unregister,
    setAllProjects,
    handleSubmit,
    control
}){
    const [selectedProject, setSelectedProject] = useState()

    useFetch(`api/projects/${selectedProjectId}`, setSelectedProject, [selectedProjectId])

    useEffect(() => {
        if(selectedProject){
            reset({
                projectName: selectedProject.name,
                projectIntro: selectedProject.intro,
                projectImg: selectedProject.img,
                projectStartDate: selectedProject.start_date,
                projectEndDate: selectedProject.end_date,
                webUrl: selectedProject.web_url,
                gitUrl: selectedProject.git_url,
                instituteId: selectedProject.institute_id
            })
        }
    }, [selectedProject, reset])

    const handlePatchProject = (formData) => {
        console.log(formData)
        const patchData = {
            projectName: formData.projectName,
            projectIntro: formData.projectIntro,
            projectImg: formData.projectImg,
            projectStartDate: formData.projectStartDate,
            projectEndDate: formData.projectEndDate,
            webUrl: formData.webUrl,
            gitUrl: formData.girUrl,
            instituteId: formData.instituteId.value
        }

        usePatch(
            patchData, `/api/projects/${selectedProjectId}`,
            selectedProjectId, setAllProjects, setProjectAction
        )
    }

    const patchProjectForm = () => {
        return(
            <form className="
                bg-white h-[90%] w-[90%] rounded flex flex-col
                justify-center items-center"
                onSubmit={handleSubmit(handlePatchProject)}
            >
                <h2>Edit {selectedProject?.name}</h2>

                <TextContainers 
                    inputArray={projectInputArray}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    unregister={unregister}
                    endDate={"projectEndDate"}
                    control={control}
                />

                <button className="bg-blue-700 uppercase">
                    Submit Edit
                </button>
            </form>
        )
    }

    return(
        <PopUp 
            formContainer={patchProjectForm()}
            setPopUp={setProjectAction}
        />
    )
}