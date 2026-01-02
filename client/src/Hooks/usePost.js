export async function usePost({
    url,
    body,
    onSuccess,
    onError,
    setLoading,
    setCompleted,
    setEndActionState,
    credentials = "same-origin"
}) {
    setLoading?.(true)
    setCompleted?.(false)

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials,
            body: JSON.stringify(body)
        })

        if (!res.ok) {
            const err = await res.json()
            throw new Error(err?.error || "Something went wrong")
        }

        const data = await res.json()

        onSuccess?.(data)

        setCompleted?.(true)

        if (setEndActionState) {
            setEndActionState(null)
        }

        return data

    } catch (err) {
        console.error(err)
        onError?.(err.message)
    } finally {
        setLoading?.(false)
    }
}