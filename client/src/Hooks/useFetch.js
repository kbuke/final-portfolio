import { useEffect } from "react";

export function useFetch(url, setState, dependencies = []) {
    useEffect(() => {
        if (!url || url.includes("undefined")) return;

        const controller = new AbortController();

        fetch(url, { signal: controller.signal })
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
    }, [url, ...dependencies]);
}
