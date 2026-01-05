export function usePatch(
  body,
  url,
  id,
  setArray,
  setAction
){
    console.log(url)
    fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(updatedItem => {
        setArray(prev =>
            prev.map(item =>
            item.id === id ? updatedItem : item
            )
        );

        setAction(null);
        });
}