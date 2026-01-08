import { useOutletContext } from "react-router"
import { Intro } from "./Sections/Intro/Intro"
import { Projects } from "./Sections/Projects/Projects"
import { Contact } from "./Sections/Contact/Contact"
import { MobileNav } from "../../Components/MobileNav"
import faceMe from "../../Resources/face-img.png"

export function Home(){

    const appData = useOutletContext()

    return(
        <div>
            <MobileNav />

            <Intro 
                appData={appData}
                faceMe={faceMe}
            />

            <Projects 
                appData={appData}
            />

            <Contact 
                appData={appData}
            />
        </div>
    )
}