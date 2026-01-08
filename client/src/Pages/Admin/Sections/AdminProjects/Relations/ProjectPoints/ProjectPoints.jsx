import { useState } from "react";
import { PopUp } from "../../../../../../Components/PopUp";
import { useFetch } from "../../../../../../Hooks/useFetch";
import { DeletePoint } from "./CrudActions/DeletePoint";
import { PostPoint } from "./CrudActions/PostPoint";
import { PatchProject } from "../../CrudActions/PatchProject";
import { PatchPoint } from "./CrudActions/PatchPoint";

export function ProjectPoints({
    selectedProjectId,
    setProjectRelation,
    selectedProject,
    allPoints, 
    setAllPoints,
    handleSubmit,
    textInputObject,
    register,
    errors,
    setIsLoading,
    reset,
    successfulCrud,
    failedCrud
}){
    const [pointAction, setPointAction] = useState()
    const [selectedPointId, setSelectedPointId] = useState()
    const [selectedPoint, setSelectedPoint] = useState()

    const projectPoints = selectedProject?.points

    useFetch(`/points/${selectedPointId}`, setSelectedPoint, [selectedPointId, projectPoints])

    const projectPointInputArray = [
        textInputObject("text", "Project Point", "projectPoint", false, false, allPoints, "point", null)
    ]
    

    const specificProjectPoints = () => {
        return(
            <div className="bg-white h-[90%] w-[90%] flex flex-col justify-center items-center overflow-y-auto">
                <h2 className="font-bold uppercase text-[25px]">{selectedProject?.name} Points</h2>

                <button 
                    className="post-instance-button"
                    onClick={() => setPointAction("post")}
                >
                    Add Point
                </button>

                {projectPoints?.map((specificPoint, index) => (
                    <div 
                        key={index}
                        className="border-b p-2"
                    >
                        {specificPoint?.point}

                        <div className="flex flex-row justify-center items-center gap-4">
                            <button
                                className="bg-red-400 h-10 w-20"
                                onClick={() => {
                                    setPointAction("delete")
                                    setSelectedPointId(specificPoint?.id)
                                }}
                            >
                                Delete
                            </button>

                            <button
                                className="bg-blue-400 h-10 w-20"
                                onClick={() => {
                                    setPointAction("patch")
                                    setSelectedPointId(specificPoint?.id)
                                }}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
    return(
        <>
            <PopUp 
                formContainer={
                    pointAction === "delete"
                        ? <DeletePoint 
                            point={selectedPoint?.point}
                            setPointAction={setPointAction}
                            setSelectedPointId={setSelectedPointId}
                            selectedPointId={selectedPointId}
                            allPoints={allPoints}
                            setAllPoints={setAllPoints}
                            setProjectRelation={setProjectRelation}
                            handleSubmit={handleSubmit}
                        />
                        : pointAction === "post"
                        ? <PostPoint 
                            setAllPoints={setAllPoints}
                            pointInputArray={projectPointInputArray}
                            pointAction={pointAction}
                            setPointAction={setPointAction}
                            register={register}
                            errors={errors}
                            handleSubmit={handleSubmit}
                            setIsLoading={setIsLoading}
                            reset={reset}
                            selectedProjectId={selectedProjectId}
                            setProjectRelation={setProjectRelation}
                            successfulCrud={successfulCrud}
                            failedCrud={failedCrud}
                        />
                        : pointAction === "patch"
                        ? <PatchPoint 
                            selectedPointId={selectedPointId}
                            selectedProjectId={selectedProjectId}
                            selectedPoint={selectedPoint}
                            reset={reset}
                            pointInputArray={projectPointInputArray}
                            setPointAction={setPointAction}
                            register={register}
                            errors={errors}
                            setAllPoints={setAllPoints}
                            handleSubmit={handleSubmit}
                        />
                        : specificProjectPoints()
                }
                setPopUp={setProjectRelation}
            />
        </>
    )
}