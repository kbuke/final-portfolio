import { useState } from "react";
import ReactSelect from "react-select"
import { Controller, set } from "react-hook-form";

export function FilterProjects({
    allTech,
    feType,
    setFeType,
    beType,
    setBeType,
    apiType,
    setApiType,
    cloudType,
    setCloudType,
    showLatest,
    setShowLatest
}){

    const availableTech = (techTypeText) => {
        return(
            allTech?.filter(tech => tech.tech_type === techTypeText)
        )
    }

    const availableFeTech = availableTech("Frontend")
    const availableBeTech = availableTech("Backend")
    const availableApiTech = availableTech("API")
    const availableCloudTech = availableTech("Cloud Computing")

    const techOptions = (techType=[]) => {
        return(
            techType?.map(tech => ({
                label: tech.name,
                value: tech.name
            }))
        )
    }

    const feOptions = techOptions(availableFeTech)
    const beOptions = techOptions(availableBeTech)
    const apiOptions = techOptions(availableApiTech)
    const cloudOptions = techOptions(availableCloudTech)

    const renderOptions = (techType, options, state, setState, highZ) => {
        return(
            <div className={`
                mt-6 flex flex-col items-center justify-center
                ${highZ ? "z-80" : "z-70"} md:grid md:grid-cols-2
                md:justify-items-center
            `}>
                <label className="font-semibold">{techType}</label>
                <ReactSelect 
                    options={[{label: "All", value: "All"}, ...(options ?? [])]}
                    value={{label: state, value: state}}
                    onChange={(selected) => setState(selected.value)}
                    className="w-3/4 text-center"
                />
            </div>
        )
    }

    const projectDateButtons = (buttonText) => {
        return(
            <button
                onClick = {() => setShowLatest(buttonText)}
                className={`
                    mt-4 text-center rounded-2xl cursor-pointer
                    bg-blue-400 shadow-md text-white h-10 w-45
                    lg:h-15 lg:w-60 text hover-buttons

                    ${showLatest != buttonText
                        ?"opacity-50" : null
                    }
                `}
            >
                {buttonText}
            </button>
        )
    }



    return(
        <>
            <div className="grid grid-cols-2 gap-4 w-[90%] justify-self-center">
                {renderOptions("FrontEnd:", feOptions, feType, setFeType, true)}
                {renderOptions("Backend:", beOptions, beType, setBeType, true)}
                {renderOptions("API", apiOptions, apiType, setApiType)}
                {renderOptions("Cloud Computing", cloudOptions, cloudType, setCloudType)}
            </div>

            <div className="
                 flex flex-row justify-center items-center
                gap-4 w-9/10 justify-self-center
            ">
                {projectDateButtons("Latest")}
                {projectDateButtons("Oldest")}
            </div>
        </>
    )
}