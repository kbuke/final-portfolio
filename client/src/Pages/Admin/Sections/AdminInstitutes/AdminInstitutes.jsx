import { useState } from "react"
import { PostInstitute } from "./CRUD-Actions/PostInstitute"

export function AdminInstitutes({
    appData
}){
    const [instituteAction, setInstituteAction] = useState()

    const allInstitutes = appData?.allInstitutes
    const setAllInstitutes = appData?.setAllInstitutes

    const register = appData?.register 
    const errors = appData?.errors
    const handleSubmit = appData?.handleSubmit
    const setIsLoading = appData?.setIsLoading
    const reset = appData?.reset
    const setValue = appData?.setValue
    const unregister = appData?.unregister

    const instituteInputArray = [
        {
            type: "text",
            placeholder: "Please enter institute name",
            name: "instituteName",
            validation: {
                required: "Please enter the institutes name", 
                validate: value => {
                    const exists = allInstitutes.some(
                        institute => institute?.name?.toLowerCase() === value.toLowerCase()
                    )
                    return !exists || `${value} is already a registered institute`
                }
            }
        },

        {
            type: "text",
            placeholder: "Please enter institute logo",
            name: "instituteLogo",
            validation: {
                required: "Please enter institute logo"
            }
        },

        {
            type: "textarea",
            placeholder: "Please enter institute info",
            name: "instituteInfo",
            validation: {
                required: "Please enter info about institute"
            }
        },

        {
            type: "date",
            placeholder: null,
            name: "instituteStartDate",
            label: "Institute Start Date",
            validation: {
                required: "Please enter institute start date"
            }
        },

        {
            type: "date",
            placeholder: null,
            label: "Institute End Date",
            name: "instituteEndDate",
            endDate: true,
            validation: {
                validate: (endDate, formValues) => {
                    if(!endDate) return true

                    const startDate = formValues.instituteStartDate
                    if(!startDate) return true

                    return(
                        new Date(endDate) > new Date(startDate) ||
                        "End date must be after the start date"
                    )
                }
            }
        } 
    ]

    return(
        <div>
            <div className="flex flex-col justify-center items-center border-b p-2">
                <h1>Institutes</h1>

                <button
                    className="bg-linear-to-r from-green-500 to-green-600"
                    onClick={() => setInstituteAction("post")}
                >
                    Add Institute
                </button>
            </div>

            {allInstitutes.map((institute, index) => {
                return(
                    <div
                        key={index}
                    >
                        <h2>
                            {institute?.name}
                        </h2>
                    </div>
                )
            })}

            {instituteAction === "post"
                ? <PostInstitute 
                    setAllInstitutes={setAllInstitutes}
                    allInstitutes={allInstitutes}
                    instituteInputArray={instituteInputArray}
                    instituteAction={instituteAction}
                    setInstituteAction={setInstituteAction}
                    register={register}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    setIsLoading={setIsLoading}
                    reset={reset}
                    setValue={setValue}
                    unregister={unregister}
                />
                : null
            }
        </div>
    )
}