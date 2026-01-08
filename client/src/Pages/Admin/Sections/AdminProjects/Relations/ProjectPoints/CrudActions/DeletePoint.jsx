import { useDelete } from "../../../../../../../Hooks/useDelete"

export function DeletePoint({
    point,
    setPointAction,
    setSelectedPointId,
    selectedPointId,
    setAllPoints,
    setProjectRelation,
    handleSubmit
}){
    const handleDeletePoint = () => {
        useDelete(
            `/points/${selectedPointId}`,
            setAllPoints,
            selectedPointId,
            setProjectRelation
        )
    }

    return(
        <form 
            className="bg-white h-[90%] w-[90%] rounded flex flex-col justify-center items-center"
            onSubmit={handleSubmit(handleDeletePoint)}
        >
            <h2 className="font-bold uppercase text-[25px]">Delete Point</h2>

            <p className="text-blue-400 font-bold">{point}</p>

            <div className="flex flex-row gap-2">
                <button className="bg-red-400" type="submit">Delete</button>

                <button 
                    className="bg-green-400"
                    onClick={() => {
                        setPointAction(null)
                        setSelectedPointId(null)
                    }}
                    type="button"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}