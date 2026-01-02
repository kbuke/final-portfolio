import { SectionUnderline } from "../../../../Components/SectionUnderline";
import { SendEmail } from "./ContactComponents/SendEmail";
import { SocialMedia } from "./ContactComponents/SocialMedia";

export function Contact({
    appData
}){
    return(
        <div className="p-2">
            <h1 className="section-heading">
                Contact
            </h1>
            <SectionUnderline />

            {/* <SocialMedia /> */}

            <SendEmail 
                appData={appData}
            />
        </div>
    )
}