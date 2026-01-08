import { useState } from "react"
import { PostInstitute } from "./CRUD-Actions/PostInstitute"
import { DeleteInstitute } from "./CRUD-Actions/DeleteInstitute"
import { PatchInstitute } from "./CRUD-Actions/PatchInstitute"
import { AdminBaseResource } from "../../../../Components/AdminBaseSection"
import { text } from "@fortawesome/fontawesome-svg-core"

export function AdminInstitutes({
    appData,
    successfulCrud,
    failedCrud
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
        textInputObject("text", "Institute Name", "instituteName", false, true, allInstitutes, "name", null, selectedInstituteId),
        textInputObject("text", "Institute Logo", "instituteLogo", false, true, allInstitutes, "logo", null, selectedInstituteId),
        textInputObject("textarea", "Institute Info", "instituteInfo", false, true, allInstitutes, "info", null, selectedInstituteId),
        textInputObject("date", "Start Date", "instituteStartDate", false, false, allInstitutes, "start_date"),
        textInputObject("date", "End Date", "instituteEndDate", true, false, allInstitutes, "end_date", null, selectedInstituteId, "instituteStartDate")
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
                    successfulCrud={successfulCrud}
                    failedCrud={failedCrud}
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