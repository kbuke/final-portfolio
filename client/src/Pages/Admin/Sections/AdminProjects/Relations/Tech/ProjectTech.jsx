import { useState } from "react"
import { PopUp } from "../../../../../../Components/PopUp"
import { DeletePoint } from "../ProjectPoints/CrudActions/DeletePoint"
import { DeleteProjectTech } from "./CrudActions/DeleteProjectTech"
import { PostProjectTech } from "./CrudActions/PostProjectTech"

export function ProjectTech({
    allTech,
    selectedProject,
    setProjectRelation,
    selectedProjectId,
    projectName,
    allProjectTech,
    setAllProjectTech,
    handleSubmit,
    register,
    errors,
    setIsLoading,
    reset,
    control,
    textInputObject,
    successfulCrud,
    failedCrud
}){
    const [techAction, setTechAction] = useState()
    const [techId, setTechId] = useState()

    const projectTech = selectedProject?.tech

    const specificTech = (type) => {
        return(
            projectTech?.filter(tech => tech.tech_type === type)
        )
    }

    const feTech = specificTech("Frontend")
    const beTech = specificTech("Backend")
    const apiTech = specificTech("API")
    const cloudTech = specificTech("Cloud Computing")

    const renderTech = (techType, tech) => {
        return(
            <div>
                <p className="justify-self-center font-bold"> 
                    {tech}
                </p>

                {techType?.map((tech, index) => (
                    <div
                        key={index}
                        className="
                            bg-black/60 text-white rounded-xl flex flex-col justify-center items-center h-35 w-25 mb-2 justify-self-center"
                    >
                        <img 
                            src={tech?.logo}
                            alt={`${tech?.name}-image`}
                            className="h-10 rounded-full w-10"
                        />

                        <p>{tech?.name}</p>
                        
                        <button
                            className="h-10 w-14 bg-red-500"
                            onClick={() => {
                                setTechAction("delete")
                                setTechId(tech?.id)
                            }}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        )
    }

    const projectTechForm = () => {
        return(
            <div className="h-[90%] w-[90%] bg-white flex flex-col justify-center p-4">
                <h2 className="self-center font-bold uppercase text-[30px]">
                    {projectName} Tech
                </h2>

                <button 
                    className="post-instance-button self-center"
                    onClick={() => setTechAction("post")}
                >
                    Add Tech</button>

                <div
                    className="grid grid-cols-2 p-4 gap-4 justify-center"
                >
                    {renderTech(feTech, "Frontend")}
                    {renderTech(beTech, "Backend")}
                    {renderTech(apiTech, "API")}
                    {renderTech(cloudTech, "Cloud")}
                </div>
            </div>
        )
    }

    return(
        <>
            <PopUp 
                formContainer={
                    techAction === "delete"
                        ? <DeleteProjectTech 
                            allProjectTech={allProjectTech}
                            setAllProjectTech={setAllProjectTech}
                            setTechAction={setTechAction}
                            techId={techId}
                            setTechId={setTechId}
                            setProjectRelation={setProjectRelation}
                            handleSubmit={handleSubmit}
                            selectedProjectId={selectedProjectId}
                        />
                        : techAction === "post"
                        ? <PostProjectTech 
                            allTech={allTech}
                            projectId={selectedProjectId}
                            projectTech={projectTech}
                            textInputObject={textInputObject}
                            allProjectTech={allProjectTech}
                            setAllProjectTech={setAllProjectTech}
                            handleSubmit={handleSubmit}
                            register = {register}
                            errors = {errors}
                            setIsLoading = {setIsLoading}
                            reset = {reset}
                            control = {control}
                            techAction={techAction}
                            setTechAction={setTechAction}
                            successfulCrud={successfulCrud}
                            failedCrud={failedCrud}
                        />
                        : projectTechForm()
                }
                setPopUp={setProjectRelation}
            />
        </>
    )
}