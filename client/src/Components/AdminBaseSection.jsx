import { useState } from "react"

export function AdminBaseResource({
    modelType,
    allInstances,
    setModelAction,
    setInstanceName,
    setInstanceId,
    setProjectRelation
}){

    //Render edit and delete buttons
    const instanceEditAndDeleteButtons = (buttonText, action, instanceName, instanceId) => {
        return(
            <button
                onClick={() => {
                    setModelAction(action)
                    setInstanceName(instanceName)
                    setInstanceId(instanceId)
                }}
                className={`${action === "patch"
                    ? "edit-instance-button"
                    : "delete-instance-button"
                }`}
            >
                {buttonText}
            </button>
        )
    }

    //Render span containers for things like dates and tech-types
    const renderSpan = (spanText, instanceValue) => {
        return(
            <p>
                <span className="font-bold">{spanText}</span>
                {instanceValue}
            </p>
        )
    }

    // Check these instances exist
    const checkExists = (instanceVariable) => {
        return(
            instanceVariable? instanceVariable : null
        )
    }


    return(
        <>
            <div className="instance-div-container">
                <h1 className="admin-section-header">{modelType}</h1>

                <button 
                    className="post-instance-button"
                    onClick={() => setModelAction("post")}
                >
                    Add {modelType}
                </button>
            </div>

            {allInstances.map((instance, index) => {

                const instanceName = checkExists(instance?.name)
                const instanceImg = checkExists(instance?.img)
                const instanceLogo = checkExists(instance?.logo)
                const instanceInfo = checkExists(instance?.info)
                const instanceIntro = checkExists(instance?.intro)
                const instanceStartDate = checkExists(instance?.start_date)
                const instanceEndDate = checkExists(instance?.end_date)
                const instanceTechType = checkExists(instance.tech_type)
                
                const projectInstitute = checkExists(instance.institute)
                const projectWebUrl = checkExists(instance?.web_url)
                const projectGitUrl = checkExists(instance?.git_url)

                return(
                    <div
                        key={index}
                        className="border-b-2 p-2"
                    >
                        <h2 className="instance-section-header">
                            {instanceName}
                        </h2>

                        <div className="flex gap-2 mb-2 justify-center">
                            {instanceEditAndDeleteButtons("Edit", "patch", instance?.name, instance?.id)}
                            {instanceEditAndDeleteButtons("Delete", "delete", instance?.name, instance?.id)}
                        </div>

                        {(instanceImg || instanceLogo) && (
                            <img 
                                src={instanceImg || instanceLogo}
                                className="instance-img"
                            />
                        )}

                        {instanceStartDate ? renderSpan("Start Date: ", instanceStartDate) : null}
                        {instanceEndDate ? renderSpan("End Date: ", instanceEndDate) : null}
                        {instanceTechType ? renderSpan("Tech Type: ", instanceTechType) : null}


                        {(instanceInfo || instanceIntro) && (
                            <p>
                                {instanceInfo || instanceIntro}
                            </p>
                        )}

                        {/* Project Specific */}
                        {modelType === "Project"
                            ? <div>
                                <h2
                                    className="justify-self-center font-bold text-[20px] text-blue-500 uppercase"
                                >
                                    Project Specifics
                                </h2>

                                {renderSpan("Completed at: ", projectInstitute?.name)}
                                {renderSpan("Web URL: ", projectWebUrl)}
                                {renderSpan("Git URL: ", projectGitUrl)}
                                <div className="flex flex-row gap-2">
                                    <button
                                        className="bg-linear-to-r from-purple-400 to-purple-700 uppercase"
                                        onClick={() => {
                                            setProjectRelation("points")
                                            setInstanceId(instance?.id)
                                            setInstanceName(instance?.name)
                                        }}
                                    >
                                        Points
                                    </button>

                                    <button
                                        className="bg-linear-to-r from-yellow-400 to-yellow-700 uppercase"
                                        onClick={() => {
                                            setProjectRelation("tech")
                                            setInstanceId(instance?.id)
                                            setInstanceName(instance?.name)
                                        }}
                                    >
                                        Tech
                                    </button>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                )
            })}
        </>

    )
}