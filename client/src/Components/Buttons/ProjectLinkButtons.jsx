export function ProjectLinkButtons({
    buttonText,
    link,
    buttonType
}){
    return(
        <button className={`
            ${buttonType} hover-buttons
        `}>
            <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {buttonText}
            </a>
        </button>
    )
}