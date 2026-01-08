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
                justify-self-center w-full mt-2
                md:grid md:grid-cols-[3fr_7fr] md:gap-2 md:mt-3 md:justify-center md:items-center
                md:p-2 md:bg-linear-to-br md:rounded-2xl bg-gray-200
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