import { BASE_URL } from "../Config/config";

export function usePatch(body, endpoint, id, setArray, setAction) {
  fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(updatedItem => {
      setArray(prev => prev.map(item => (item.id === id ? updatedItem : item)));
      setAction?.(null);
    });
}