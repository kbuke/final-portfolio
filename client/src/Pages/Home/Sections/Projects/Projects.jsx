import { ProjectLinkButtons } from "../../../../Components/Buttons/ProjectLinkButtons"
import { SecondaryTitleUnderline } from "../../../../Components/SecondaryTitleUnderline"
import { SectionUnderline } from "../../../../Components/SectionUnderline"
import computerScreen from "../../../../Resources/computer-screen.png"

export function Projects({
    appData
}){
    const allProjects = appData?.allProjects

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

                const projectInstitute = project?.institute
                console.log(projectInstitute)

                const filterTech = (techType) => {
                    return(
                        projectTech?.filter(tech => tech.tech_type === techType)
                    )
                }

                const fETech = filterTech("Frontend")
                const bETech = filterTech("Backend")

                const renderTech = (technology, text, rightBorder) => {
                    return(
                        technology.length > 0
                            ? <div className={`p-5 justify-center items-center ${rightBorder ? `border-r` : null}`}>
                                <h3 className="text-center mb-3 font-bold uppercase tracking-wider">
                                    {text}
                                </h3>

                                <div className="grid grid-cols-2 md:gap-2">
                                    {technology.map((tech, index) => (
                                        <img 
                                            key={index}
                                            src={tech?.logo}
                                            className="
                                                h-15 w-15 p-3 rounded-full border justify-self-center
                                                md:p-0 md:h-17 md:w-17
                                            "
                                        />
                                    ))}
                                </div>
                            </div>
                            : null
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
                    <div className="
                        relative overflow-hidden mt-3 
                        md:w-[98%] md:rounded-2xl md:justify-self-center
                        lg:w-[93%] lg:mt-5
                    ">
                        <div
                            style={{backgroundImage: `url(${project?.img})`}}
                            className="
                                hidden md:block bg-center bg-cover md:rounded-2xl blur-md scale-110 absolute inset-0
                            "
                        />
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
                                        <h2 className="secondary-header">
                                            {project?.name}
                                        </h2>

                                        <SecondaryTitleUnderline />

                                        <p className="flex self-center mb-2 font-bold">
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
                                            {renderTech(fETech, "Frontend", true)}
                                            {renderTech(bETech, "Backend")}
                                        </div>

                                        <div className="project-button-div">
                                            {projectLinkButton(projectGitUrl, "GitHub Repo", "git-repo-button")}

                                            {projectLinkButton(projectWebUrl, "Web App", "web-link-button")}
                                        </div>
                                    </div>

                                    <div className="
                                        hidden
                                        md:flex
                                        md:gap-4
                                        md:col-span-2
                                        md:border-t
                                        md:border-white
                                        md:justify-self-center
                                        md:p-3
                                        md:w-[65%]
                                        md:justify-center
                                        md:items-center
                                    ">
                                        <img 
                                            src={projectInstitute?.logo}
                                            className="h-20 w-20 rounded-full"
                                        />

                                        <div className="text-center">
                                            <h3 className="font-bold uppercase text-[20px] underline decoration-double tracking-wider underline-offset-4 decoration-amber-600">
                                                {projectInstitute?.name}
                                            </h3>
                                            <p className="mt-2">{projectInstitute?.start_date} - {projectInstitute?.end_date}</p>
                                            <p>{projectInstitute?.info}</p>
                                        </div>
                                    </div>
                            </div>
                    </div>
                )
            })}
        </div>
    )
}