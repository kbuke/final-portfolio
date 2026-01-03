import { SectionUnderline } from "../../../../Components/SectionUnderline";
import { SendEmail } from "./ContactComponents/SendEmail";
import { SocialMedia } from "./ContactComponents/SocialMedia";

export function Contact({
    appData
}){
    return(
        <div className="p-2 mb-5" id="contact-section">
            <h1 className="section-heading">
                Contact
            </h1>
            <SectionUnderline />

            <div className="
                justify-self-center w-full
                md:grid md:grid-cols-[3fr_7fr] md:gap-2 md:mt-3 md:justify-center md:items-center
                md:p-2 md:bg-linear-to-br from-blue-500/60 to-blue-700/60 md:rounded-2xl
                lg:w-[93%] lg:p-10
            ">
                <SocialMedia 
                    appData={appData}
                />

                <SendEmail 
                    appData={appData}
                />
            </div>
        </div>
    )
}