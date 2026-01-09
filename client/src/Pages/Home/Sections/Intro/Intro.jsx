import { useState } from "react"
import { TechStack } from "../TechStack/TechStack"
import { PopUp } from "../../../../Components/PopUp"

export function Intro({
    appData,
    faceMe
}){
    const [openCv, setOpenCv] = useState()
    const [chosenTechType, setChosenTechType] = useState("All")

    const userInfo = appData?.allUsers

    const userCv = userInfo?.cv
    const renderCv = <img 
        src={userCv}
        alt="my-cv"
        className="z-100"
    />

    return(
        <>
            <div
                className="
                    flex flex-col lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-4 
                    lg:p-4 lg:w-98/100 lg:justify-self-center 
                "
                id="intro-section"
            >
                <div>
                    <h1 className="uppercase font-extrabold justify-self-center ml-2 text-[60px]">
                        {userInfo?.name}
                    </h1>

                    <p className="lg:font-semibold ml-2 justify-self-center whitespace-pre-wrap  lg:w-3/5">
                        {userInfo?.intro}
                    </p>
 
                    <div className="flex gap-2 justify-center">
                        <button className="cv-button hover-buttons" onClick={() => setOpenCv(true)}>
                            C.V.
                        </button>

                        <a className="
                            green-button hover-buttons
                            " href="#contact-section"
                        >
                            Contact Me
                        </a>
                    </div>

                    <img 
                        src={faceMe}
                        alt="face-pic"
                        className="md:w-3/5 md:justify-self-center md:h-80"
                    />
                </div>

                <TechStack 
                    appData={appData}
                    chosenTechType={chosenTechType}
                    setChosenTechType={setChosenTechType}
                />
            </div>

            {openCv
                ? <PopUp 
                    setPopUp={setOpenCv}
                    formContainer={renderCv}
                />
                : null
            }
        </>
    )
}