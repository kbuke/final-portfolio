import { useOutletContext } from "react-router"
import { Intro } from "./Sections/Intro/Intro"
import { Projects } from "./Sections/Projects/Projects"
import { Contact } from "./Sections/Contact/Contact"

export function Home(){
    const appData = useOutletContext()

    return(
        <div>
            <Intro 
                appData={appData}
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