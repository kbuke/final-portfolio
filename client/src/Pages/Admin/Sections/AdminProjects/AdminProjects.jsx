import { useState } from "react"
import { AdminBaseResource } from "../../../../Components/AdminBaseSection"
import { ProjectPoints } from "./Relations/ProjectPoints/ProjectPoints"
import { useFetch } from "../../../../Hooks/useFetch"
import { PostProject } from "./CrudActions/PostProject"
import { DeleteProject } from "./CrudActions/DeleteProject"
import { PatchProject } from "./CrudActions/PatchProject"
import { ProjectTech } from "./Relations/Tech/ProjectTech"

export function AdminProjects({
    appData,
    successfulCrud,
    failedCrud
}){
    const [projectAction, setProjectAction] = useState()
    const [projectName, setProjectName] = useState()
    const [selectedProjectId, setSelectedProjectId] = useState()
    const [projectRelation, setProjectRelation] = useState()
    const [selectedProject, setSelectedProject] = useState()

    const allProjects = appData?.allProjects
    const setAllProjects = appData?.setAllProjects
    const textInputObject = appData?.textInputObject

    const allPoints = appData?.allPoints
    const setAllPoints = appData?.setAllPoints

    const allTech = appData?.allTech

    const allProjectTech = appData?.allProjectTech
    const setAllProjectTech = appData?.setAllProjectTech

    const allInstitutes = appData?.allInstitutes

    useFetch(`/projects/${selectedProjectId}`, setSelectedProject, [selectedProjectId, allPoints])

    const register = appData?.register 
    const errors = appData?.errors
    const handleSubmit = appData?.handleSubmit
    const setIsLoading = appData?.setIsLoading
    const reset = appData?.reset
    const setValue = appData?.setValue
    const unregister = appData?.unregister
    const control = appData?.control

    const instituteOptions = allInstitutes?.map(institute => ({
        label: institute.name,
        value: institute.id
    }));


    const projectTextArray = [
        // textInputObject = (textType, placeholder, variableName, nullable, unique, allArray, variable, options, currentId=null)
        textInputObject("text", "Project Name", "projectName", false, true, allProjects, "name", null, selectedProjectId),
        textInputObject("textarea", "Project Intro", "projectIntro", false, true, allProjects, "intro", null, selectedProjectId),
        textInputObject("text", "Project Img", "projectImg", false, true, allProjects, "img", null, selectedProjectId),
        textInputObject("select", "Institute", "instituteId", false, false, allProjects, "institute_id", instituteOptions, selectedProjectId),
        textInputObject("date", "Project Start", "projectStartDate", false, false, allProjects, "start_date", null, selectedProjectId),
        textInputObject("date", "Project End", "projectEndDate", true, false, allProjects, "end_date", null, selectedProjectId),
        textInputObject("text", "Web URL", "webUrl", true, true, allProjects, "web_url", null, selectedProjectId),
        textInputObject("text", "Git URL", "gitUrl", true, true, allProjects, "git_url", null, selectedProjectId)
    ]

    return(
        <>
            <AdminBaseResource 
                modelType={"Project"}
                allInstances={allProjects}
                setModelAction={setProjectAction}
                setInstanceName={setProjectName}
                setInstanceId={setSelectedProjectId}
                setProjectRelation={setProjectRelation}
            />

            {projectRelation === "points"
                ? <ProjectPoints 
                    setSelectedProjectId={setSelectedProjectId}
                    selectedProjectId={selectedProjectId}
                    setProjectRelation={setProjectRelation}
                    selectedProject={selectedProject}
                    allPoints={allPoints}
                    setAllPoints={setAllPoints}
                    handleSubmit={handleSubmit}
                    textInputObject={textInputObject}
                    register={register}
                    errors={errors}
                    setIsLoading={setIsLoading}
                    reset={reset}
                    successfulCrud={successfulCrud}
                    failedCrud={failedCrud}
                />
                : null
            }

            {projectRelation === "tech"
                ? <ProjectTech 
                    allTech={allTech}
                    selectedProject={selectedProject}
                    setProjectRelation={setProjectRelation}
                    selectedProjectId={selectedProjectId}
                    projectName={projectName}
                    allProjectTech={allProjectTech}
                    setAllProjectTech={setAllProjectTech}
                    handleSubmit={handleSubmit}
                    register={register}
                    errors={errors}
                    setIsLoading={setIsLoading}
                    reset={reset}
                    control={control}
                    textInputObject={textInputObject}
                    successfulCrud={successfulCrud}
                    failedCrud={failedCrud}
                />
                : null
            }

            {projectAction === "post"
                ?   <PostProject 
                    setAllProjects={setAllProjects}
                    projectInputArray={projectTextArray}
                    projectAction={projectAction}
                    setProjectAction={setProjectAction}
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    setIsLoading={setIsLoading}
                    reset={reset}
                    setValue={setValue}
                    unregister={unregister}
                    control={control}
                    successfulCrud={successfulCrud}
                    failedCrud={failedCrud}
                />
                : null
            }

            {projectAction === "delete"
                ? <DeleteProject 
                    setProjectAction={setProjectAction}
                    setProjectName={setProjectName}
                    projectName={projectName}
                    setSelectedProjectId={setSelectedProjectId}
                    selectedProjectId={selectedProjectId}
                    setAllProjects={setAllProjects}
                    handleSubmit={handleSubmit}
                />
                : null
            }

            {projectAction === "patch"
                ? <PatchProject 
                    selectedProjectId={selectedProjectId}
                    reset={reset}
                    projectInputArray={projectTextArray}
                    setProjectAction={setProjectAction}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    unregister={unregister}
                    setAllProjects={setAllProjects}
                    handleSubmit={handleSubmit}
                    control={control}
                    allProjects={allProjects}
                />
                : null
            }
        </> 
    )
}