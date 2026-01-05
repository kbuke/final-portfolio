export function useDelete(url, setState, instanceId, setDelete){
    fetch(url, {
        method: "DELETE"
    })
        .then(r => {
            if(r.ok){
                setState(states => states.filter(state => state.id !== instanceId))
            }
        })
        .then(() => setDelete(null))
}