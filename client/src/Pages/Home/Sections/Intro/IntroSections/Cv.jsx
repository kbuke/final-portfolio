import { PopUp } from "../../../../../Components/PopUp";

export function Cv({
    userCv,
    setPopUp
}){
    const cvForm = (
        <img 
            src={userCv}
            className="
                h-[90%] w-[90%]
                md:w-[60%]
                lg:w-[30%]
            "
            alt="kaan-buke-cv"
        />
    )

    return(
        <PopUp 
            formContainer={cvForm}
            setPopUp={setPopUp}
        />
    )
}