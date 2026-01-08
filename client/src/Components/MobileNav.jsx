export function MobileNav(){

    const availableOptions = [
        "Intro",
        "Tech",
        "Projects",
        "Contact"
    ]

    return(
        <div
            className="
                bg-black w-full z-100 flex justify-center items-center
                text-white gap-4 h-20 sticky top-0 lg:hidden
            "
        >
            {availableOptions.map((option, index) => (
                <a key={index}
                    className="border p-2 rounded w-2/5 text-center"
                    href={`#${option.toLowerCase()}-section`}
                >
                    {option}
                </a>
            ))}
        </div>
    )
}