import { BASE_URL } from "../Config/config";

export function useDelete(endpoint, setState, instanceId, setDelete) {
  fetch(`${BASE_URL}${endpoint}`, { method: "DELETE" })
    .then(res => {
      if (res.ok) {
        setState(prev => prev.filter(item => item.id !== instanceId));
      }
    })
    .finally(() => setDelete?.(null));
}
