import { useEffect, useState } from "react";
import { usePost } from "../../../../../../../Hooks/usePost";
import { TextContainers } from "../../../../../../../Components/TextContainers";

export function PostProjectTech({
    allTech,
    projectId,
    projectTech,
    textInputObject,
    allProjectTech,
    techAction,
    setTechAction,
    setAllProjectTech,
    handleSubmit,
    register,
    errors,
    setIsLoading,
    reset,
    control,
    successfulCrud,
    failedCrud
}){
    const [availableTech, setAvailableTech] = useState()
    const [techId, setTechId] = useState()
    const [postProjectTech, setPostProjectTech] = useState()
    const [postProjectTechError, setPostProjectTechError] = useState()

    useEffect(() => {
        if(!techAction) return 

        if(techAction === "post"){
            reset({
                techId: ""
            })
        }
    }, [])

    useEffect(() => (
        setAvailableTech(allTech?.filter(tech => 
            !projectTech?.some(
                projectTechItem => projectTechItem.id === tech.id
            )
        ))
    ), [projectId, projectTech])

    const techOptions = availableTech?.map(tech => ({
        label: tech.name,
        value: tech.id
    }))

    // textInputObject("select", "Institute", "instituteId", false, false, allProjects, "institute_id", instituteOptions, selectedProjectId)
    const projectTechArray = [
        textInputObject("select", "Tech", "techId", false, false, allProjectTech, "tech_id", techOptions, setTechId)
    ]

    const handleProjectTechPost = (formData) => {
        formData.projectId = projectId
        formData.techId = formData.techId.value

        usePost({
            endpoint: "/projecttech",
            body: formData,
            setLoading: setIsLoading, 
            setCompleted: setPostProjectTech,
            onError: () => setPostProjectTechError(true),
            setEndActionState: setTechAction,
            onSuccess: (newProjectTech) => {
                setAllProjectTech(prev => [...prev, newProjectTech])
            }
        })
    }

    return(
        <form
            onSubmit={handleSubmit(handleProjectTechPost)}
        >
            <h2>Add New Tech</h2>

            {successfulCrud(postProjectTech, "Successfully posted new tech")}
            {failedCrud(postProjectTechError, "Error posting project tech")}

            <TextContainers 
                inputArray={projectTechArray}
                register={register}
                errors={errors}
                control={control}
            />

            <div>
                <button
                    className="bg-green-500"
                    type="sub,it"
                >Submit</button>

                <button className="bg-red-600" onClick={() => setTechAction()}>
                    Cancel
                </button>
            </div>
        </form>
    )
}