import { useState } from "react"
import { PostInstitute } from "./CRUD-Actions/PostInstitute"
import { DeleteInstitute } from "./CRUD-Actions/DeleteInstitute"
import { PatchInstitute } from "./CRUD-Actions/PatchInstitute"
import { AdminBaseResource } from "../../../../Components/AdminBaseSection"

export function AdminInstitutes({
    appData,
}){
    const [instituteAction, setInstituteAction] = useState()
    const [instituteName, setInstituteName] = useState()
    const [selectedInstituteId, setSelectedinstituteId] = useState()

    const allInstitutes = appData?.allInstitutes
    const setAllInstitutes = appData?.setAllInstitutes

    const register = appData?.register 
    const errors = appData?.errors
    const handleSubmit = appData?.handleSubmit
    const setIsLoading = appData?.setIsLoading
    const reset = appData?.reset
    const setValue = appData?.setValue
    const unregister = appData?.unregister

    const textInputObject = appData?.textInputObject

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
            <AdminBaseResource 
                modelType={"Institute"}
                allInstances={allInstitutes}
                setModelAction={setInstituteAction}
                setInstanceName={setInstituteName}
                setInstanceId={setSelectedinstituteId}
            />

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
                : instituteAction === "delete"
                ? <DeleteInstitute 
                    setInstituteAction={setInstituteAction}
                    setInstituteName={setInstituteName}
                    instituteName={instituteName}
                    setSelectedInstituteId={setSelectedinstituteId}
                    selectedInstituteId={selectedInstituteId}
                    setAllInstitutes={setAllInstitutes}
                    handleSubmit={handleSubmit}
                />
                : instituteAction === "patch"
                ?<PatchInstitute 
                    selectedInstituteId={selectedInstituteId}
                    reset={reset}
                    instituteInputArray={instituteInputArray}
                    setInstituteAction={setInstituteAction}
                    register={register}
                    errors={errors}
                    setValue={setValue}
                    unregister={unregister}
                    setAllInstitutes={setAllInstitutes}
                    handleSubmit={handleSubmit}
                />
                :null
            }
        </div>
    )
}