import { useOutletContext } from "react-router"
import { Intro } from "./Sections/Intro/Intro"
import { Projects } from "./Sections/Projects/Projects"

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
        </div>
    )
}