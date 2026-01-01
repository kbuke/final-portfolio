import { useEffect, useState } from "react"
import frontMan from "../../../../Resources/front-man.png"

export function Intro({
    appData
}){
    const [frontendTech, setFrontendTech] = useState()

    const userInfo = appData?.allUsers

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
                <button className="cv-button">
                    C.V.
                </button>

                <button className="contact-button">
                    Contact Me
                </button>
            </div>

            <div>
                <img 
                    src={frontMan}
                />
            </div>
        </div>
    )
}