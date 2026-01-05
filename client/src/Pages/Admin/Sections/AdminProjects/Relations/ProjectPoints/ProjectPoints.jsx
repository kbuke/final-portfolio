import { useState } from "react";
import { PopUp } from "../../../../../../Components/PopUp";
import { useFetch } from "../../../../../../Hooks/useFetch";
import { DeletePoint } from "./CrudActions/DeletePoint";

export function ProjectPoints({
    setSelectedProjectId,
    selectedProjectId,
    setProjectRelation,
    selectedProject,
    allPoints, 
    setAllPoints,
    handleSubmit
}){
    const [pointAction, setPointAction] = useState()
    const [selectedPointId, setSelectedPointId] = useState()
    const [selectedPoint, setSelectedPoint] = useState()

    const projectPoints = selectedProject?.points

    useFetch(`/api/points/${selectedPointId}`, setSelectedPoint, [selectedPointId])
    

    const specificProjectPoints = () => {
        return(
            <div className="bg-white h-[90%] w-[90%] flex flex-col justify-center items-center overflow-y-auto">
                <h2 className="font-bold uppercase text-[25px]">{selectedProject?.name} Points</h2>
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
                        : specificProjectPoints()
                }
                setPopUp={setProjectRelation}
            />
        </>
    )
}