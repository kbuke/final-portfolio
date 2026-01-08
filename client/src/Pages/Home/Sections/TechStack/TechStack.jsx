import { useState } from "react"
import { SectionUnderline } from "../../../../Components/SectionUnderline"

export function TechStack({
    appData,
    chosenTechType,
    setChosenTechType
}){
    const allTech = appData?.allTech

    const filterTech = (techType) => {
        return(
            allTech?.filter(tech => tech.tech_type === techType)
        )
    }

    const feTech = filterTech("Frontend")
    const beTech = filterTech("Backend")
    const apiTech = filterTech("API")
    const cloudTech = filterTech("Cloud Computing")

    const availableTech = ["Frontend", "Backend", "API", "Cloud Computing"]

    const renderTech = (techType) => {
        return(
            <div className="
                    flex flex-col justify-center items-center p-2 mt-3
                    w-98/100 justify-self-center
                "
            >
                <div className="
                    grid grid-cols-2 gap-2 w-full p-2
                    lg:grid-cols-3 justify-items-center lg:p-10 lg:w-[95%] rounded-xl
                    md:grid-cols-2 gap-y-5
                "
                >
                    {techType?.map((tech, index) => (
                        <div 
                            key={index}
                            className="
                                border h-20 w-35 overflow-hidden rounded
                                flex flex-col justify-center items-center bg-white lg:w-33
                                lg:h-30 text-center gap-2 border-black/40 shadow-md hover-buttons
                            "
                        >
                            <img 
                                alt={`${tech?.name}-img`}
                                src={tech?.logo}
                                className="h-10"
                            />

                            <p>{tech?.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }


    return(
        <div className="mt-10  w-full lg:relative lg:top-0 lg:mt-0 lg:h-full lg:rounded-2xl" id="tech-section">
            <div className="lg:hidden">
                <h1 className="section-heading">Tech-Stack</h1>
                <SectionUnderline />
            </div>

            <div 
                className="grid grid-cols-2 justify-items-center md:grid-cols-4"
            >
                {availableTech.map((tech, index) => (
                    <button
                        key={index}
                        className={
                            `text-white ${chosenTechType === tech
                                ? "opacity-100"
                                : "opacity-60"
                            } bg-blue-600 lg:h-15 lg:w-35`
                        }
                        onClick={() => setChosenTechType(tech)}
                    >
                        {tech}
                    </button>
                ))}
            </div>

            {chosenTechType === "Frontend"
                ? renderTech(feTech)
                : chosenTechType === "Backend"
                ? renderTech(beTech)
                : chosenTechType === "API"
                ? renderTech(apiTech)
                : chosenTechType === "Cloud Computing"
                ? renderTech(cloudTech)
                : null
            }
        </div>
    )
}