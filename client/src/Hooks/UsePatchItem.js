import { BASE_URL } from "../Config/config";

export function usePatchItem(body, endpoint, setItem, setAction) {
  fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then(res => res.json())
    .then(updatedItem => {
      setItem(updatedItem);
      setAction?.(null);
    });
}