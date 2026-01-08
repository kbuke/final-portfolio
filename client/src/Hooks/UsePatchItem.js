export function usePatchItem(
  body,
  url,
  setItem,
  setAction
){
    fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(updatedItem => {
            setItem(updatedItem)
            setAction(null)
        })
}
