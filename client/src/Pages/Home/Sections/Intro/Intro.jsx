import { useEffect, useState } from "react"
import frontMan from "../../../../Resources/front-man.png"
import { Cv } from "./IntroSections/Cv"

export function Intro({
    appData
}){
    const [frontendTech, setFrontendTech] = useState()
    const [openCv, setOpenCv] = useState()

    const userInfo = appData?.allUsers

    const userCv = userInfo?.cv

    const allTech = appData?.allTech

    useEffect(() => (
        setFrontendTech(allTech?.filter(tech => tech?.tech_type === "Frontend"))
    ), [allTech])

    return(
        <div className="user-intro-section">
            <p>
                {userInfo?.intro}
            </p>

            <div className="intro-button-container">
                <button className="cv-button" onClick={() => setOpenCv(true)}>
                    C.V.
                </button>

                <a className="
                    contact-button w-40 h-15 mt-5 rounded-xl text-white text-center flex justify-center items-center
                " href="#contact-section">
                    Contact Me
                </a>
            </div>

            <div>
                <img 
                    src={frontMan}
                />
            </div>

            {openCv
                ? <Cv 
                    userCv={userCv}
                    setPopUp={setOpenCv}
                />
                : null
            }
        </div>
    )
}