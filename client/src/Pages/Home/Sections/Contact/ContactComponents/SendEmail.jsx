import { SecondaryTitleUnderline } from "../../../../../Components/SecondaryTitleUnderline"
import { TextContainers } from "../../../../../Components/TextContainers"
import { useState } from "react"
import { usePost } from "../../../../../Hooks/usePost"
import { LoadingIcon } from "../../../../../Components/LoadingIcon"

export function SendEmail({
    appData
}){
    const [emailError, setEmailError] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const allEmails = appData?.allEmails
    const setAllEmails = appData?.setAllEmails

    const register = appData?.register
    const handleSubmit = appData?.handleSubmit
    const errors = appData?.errors
    const isLoading = appData?.isLoading
    const setIsLoading = appData?.setIsLoading

    const handleNewEmail = (formData) => {
        usePost({
            url: "/api/emails",
            body: formData,
            setLoading: setIsLoading,
            setCompleted: setEmailSent,
            onError: () => setEmailError(true),
            onSuccess: (newEmail) => {
                setAllEmails(prev => [...prev, newEmail])
            }
        })
    }

    const emailArray = [
        {
            type: "text",
            placeholder: "Please enter your email address",
            name: "senderEmail",
            validation: {
                required: "Please enter your email address",
                pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address"
                }
            }
        },

        {
            type: "text",
            placeholder: "Please enter email subject",
            name: "emailSubject",
            validation: {
                required: "Please enter email subject"
            }
        },

        {
            type: "textarea",
            placeholder: "Please enter your message",
            name: "emailMessage",
            validation: {
                required: "Please enter your message"
            }
        }
    ]

    return(
        <form
            className="
                rounded-2xl mt-3 justify-center items-center p-3 flex flex-col
                bg-linear-to-br from-purple-300 to-purple-500
            "
            onSubmit={handleSubmit(handleNewEmail)}
        >
            <h2 className="secondary-header text-red-200">
                Email Me
            </h2>
            <SecondaryTitleUnderline />
            
            {/* <TextContainers 
                inputArray = {emailArray}
                register = {register}
                errors = {errors}
            /> */}
            {isLoading
                ? <LoadingIcon />
                : emailSent
                ? <div className="bg-linear-to-r from-green-500 to-green-700 text-white p-1 w-9/10 text-center rounded-xl">
                    Email Sent
                </div> 
                : emailError
                ? <div className="bg-linear-to-r from-red-500 to-red-700 text-white p-1 w-9/10 text-center rounded-xl">
                    Email Failed to Send
                </div>
                : <TextContainers 
                    inputArray = {emailArray}
                    register = {register}
                    errors = {errors} 
                />
            }

            {emailSent
                ? null 
                : <button
                    className="bg-linear-to-br from-green-500 to-green-700"
                >
                    Send Email
                </button>
            }
        </form>
    )
}