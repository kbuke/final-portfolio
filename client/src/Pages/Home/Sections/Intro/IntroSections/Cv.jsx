import { PopUp } from "../../../../../Components/PopUp";

export function Cv({
    userCv,
    setPopUp
}){
    console.log(userCv)
    const cvForm = (
        <img 
            src={userCv}
            className="h-[90%] w-[90%]"
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