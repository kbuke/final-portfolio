import { useState } from "react"
import { ProjectLinkButtons } from "../../../../Components/Buttons/ProjectLinkButtons"
import { SecondaryTitleUnderline } from "../../../../Components/SecondaryTitleUnderline"
import { SectionUnderline } from "../../../../Components/SectionUnderline"
import computerScreen from "../../../../Resources/computer-screen.png"
import { FilterProjects } from "./FilterProjects"
import { useMemo } from "react"

export function Projects({
    appData
}){
    const [feType, setFeType] = useState("All")
    const [beType, setBeType] = useState("All")
    const [apiType, setApiType] = useState("All")
    const [cloudType, setCloudType] = useState("All")

    const [showLatest, setShowLatest] = useState("Latest")

    const allProjects = appData?.allProjects
    const allTech = appData?.allTech

    const renderDates = (variable) => {
        return(
            <p className="flex self-center mb-2 font-bold">
                {variable?.start_date && new Date(variable?.start_date).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric"
                })} {" - "}
                <span className={`${variable?.end_date ? "" : "text-red-500"}`}>
                    {variable?.end_date
                        ? new Date(variable?.end_date).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric"
                        })
                        : "In Progress"
                    }
                </span>
            </p>
        )
    }

    const filteredProjects = useMemo(() => {
        if (!allProjects) return []

        let projects = [...allProjects]

        const matchesTech = (project, techType, selected) => {
            if (selected === "All") return true
            return project.tech?.some(
                tech => tech.tech_type === techType && tech.name === selected
            )
        }

        projects = projects.filter(project =>
            matchesTech(project, "Frontend", feType) &&
            matchesTech(project, "Backend", beType) &&
            matchesTech(project, "API", apiType) &&
            matchesTech(project, "Cloud Computing", cloudType)
        )

        projects.sort((a, b) => {
            const aDate = new Date(a.start_date)
            const bDate = new Date(b.start_date)
            return showLatest === "Latest" ? bDate - aDate : aDate - bDate
        })

        return projects
    }, [
        allProjects,
        feType,
        beType,
        apiType,
        cloudType,
        showLatest
    ])


    return(
        <div className="mt-10 md:mt-5 lg:mt-10 z-10" id="projects-section">
            <h1 className="section-heading">
                Projects
            </h1>
            <SectionUnderline />

            <FilterProjects 
                allProjects={allProjects}
                allTech={allTech}
                feType={feType}
                setFeType={setFeType}
                beType={beType}
                setBeType={setBeType}
                apiType={apiType}
                setApiType={setApiType}
                cloudType={cloudType}
                setCloudType={setCloudType}
                showLatest={showLatest}
                setShowLatest={setShowLatest}
            />

            {filteredProjects?.map((project, index) => {

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
                const apiTech = filterTech("API")
                const cloudTech = filterTech("Cloud Computing")

                const techBlocks = [
                    {data: fETech, label: "Frontend"},
                    {data: bETech, label: "Backend"},
                    {data: apiTech, label: "API"},
                    {data: cloudTech, label: "Cloud Tech"}
                ].filter(block => block?.data?.length > 0)

                const shouldHaveRightBorder = (index) => {
                    const isLeftColumn = index % 2 === 0
                    const hasRightSibling = index + 1 < techBlocks.length
                return isLeftColumn && hasRightSibling
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
                        lg:w-[90%] lg:mt-5
                    "
                    key={index}>
                        <div
                            style={{backgroundImage: `url(${project?.img})`}}
                            className="
                                hidden md:block bg-center bg-cover md:rounded-2xl blur-md scale-110 absolute inset-0
                            "
                        />
                            <div
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

                                        {renderDates(project)}


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
                                            {techBlocks.map((block, index) => (
                                                <div
                                                    key={block.label}
                                                    className={`
                                                        p-5 flex flex-col items-center justify-center
                                                        ${shouldHaveRightBorder(index) ? "border-r" : ""}
                                                    `}
                                                >
                                                    <h3 className="text-center mb-3 font-bold uppercase tracking-wider">
                                                        {block.label}
                                                    </h3>

                                                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                                                        {block.data.map((tech, i) => (
                                                            <img 
                                                                key={i}
                                                                src={tech.logo}
                                                                className="
                                                                    h-15 w-15 p-3 rounded-full border justify-self-center
                                                                    md:p-0 md:h-17 md:w-17 bg-white flex items-center
                                                                "
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>



                                        <div className="project-button-div">
                                            {projectLinkButton(projectGitUrl, "GitHub Repo", "git-repo-button")}

                                            {projectLinkButton(projectWebUrl, "Web App", "web-link-button")}
                                        </div>
                                    </div>
                            </div>
                    </div>
                )
            })}
        </div>
    )
}