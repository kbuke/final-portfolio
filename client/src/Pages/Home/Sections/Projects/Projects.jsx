import { ProjectLinkButtons } from "../../../../Components/Buttons/ProjectLinkButtons"
import { SectionUnderline } from "../../../../Components/SectionUnderline"
import computerScreen from "../../../../Resources/computer-screen.png"

export function Projects({
    appData
}){
    const allProjects = appData?.allProjects

    console.log(allProjects)

    return(
        <div>
            <h1 className="section-heading">
                Projects
            </h1>
            <SectionUnderline />

            {allProjects?.map((project, index) => {

                const projectPoints = project?.points

                const projectTech = project?.tech

                const projectGitUrl = project?.git_url
                const projectWebUrl = project?.web_url

                const filterTech = (techType) => {
                    return(
                        projectTech?.filter(tech => tech.tech_type === techType)
                    )
                }

                const fETech = filterTech("Frontend")
                const bETech = filterTech("Backend")

                const renderTech = (technology, text) => {
                    return(
                        <div className="p-5">
                            <h3 className="text-center mb-3 font-bold uppercase tracking-wider">
                                {text}
                            </h3>

                            <div className="grid grid-cols-2">
                                {technology.map((tech, index) => (
                                    <img 
                                        key={index}
                                        src={tech?.logo}
                                        className="h-15 w-15 p-3 rounded-full border justify-self-center"
                                    />
                                ))}
                            </div>
                        </div>
                    )
                } 

                const projectLinkButton = (dependant, text, buttonType) => (
                    dependant 
                        ? <ProjectLinkButtons 
                            buttonText={text}
                            link={dependant}
                            buttonType={buttonType}
                        />
                        : null
                )

                return(
                    <div
                        key={index}
                        className="specific-project-container"
                    >
                        <div className="specific-project-img-container">
                            <img 
                                src={computerScreen}
                                className="computer-screen"
                            />

                            <img 
                                src={project?.img}
                                className="project-img"
                            />
                        </div>

                        <div
                            className="specific-project-info"
                        >
                            <h2 className="project-title">
                                {project?.name}
                            </h2>

                            <div className="w-4/5 h-1 bg-linear-to-r from-purple-500 to-green-500 justify-self-center mb-3"></div>

                            <p className="flex justify-self-center mb-2 font-bold">
                                {project?.start_date}{" - "} 
                                    <span className={`${project?.end_date
                                        ? null 
                                        :"text-red-500"}`
                                    }>
                                        {project?.end_date
                                            ? project.end_date
                                            : "In Progress"    
                                        }
                                    </span>
                            </p>

                            <p className="text-center mb-2">
                                {project?.intro}
                            </p>

                            <ul className="list-disc pl-5 space-y-1">
                                {projectPoints.map((point, index) => (
                                    <li key={index}>
                                        {point?.point}
                                    </li>
                                ))}
                            </ul>

                            <div className="grid grid-cols-2">
                                {renderTech(fETech, "Frontend")}
                                {renderTech(bETech, "Backend")}
                            </div>
                        </div>

                        <div className="project-button-div">
                            {projectLinkButton(projectGitUrl, "GitHub Repo", "git-repo-button")}

                            {projectLinkButton(projectWebUrl, "Web App", "web-link-button")}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}