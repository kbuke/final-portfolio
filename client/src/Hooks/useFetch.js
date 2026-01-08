import { useEffect } from "react";
import { BASE_URL } from "../Config/config";

export function useFetch(endpoint, setState, dependencies = []) {
  useEffect(() => {
    if (!endpoint || endpoint.includes("undefined")) return;

    const controller = new AbortController();

    fetch(`${BASE_URL}${endpoint}`, { signal: controller.signal })
      .then(r => {
        if (r.ok) return r.json();
        throw r;
      })
      .then(data => setState(data))
      .catch(e => {
        if (e.name === "AbortError") return;
        console.error("Fetch error:", e);
      });

    return () => controller.abort();
  }, [endpoint, ...dependencies]);
}

