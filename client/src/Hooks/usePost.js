import { BASE_URL } from "../Config/config";

export async function usePost({
  endpoint,
  body,
  onSuccess,
  onError,
  setLoading,
  setCompleted,
  setEndActionState,
  credentials = "same-origin",
}) {
  setLoading?.(true);
  setCompleted?.(false);

  console.log("Posting to:", `${BASE_URL}${endpoint}`);


  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials,
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.error || "Something went wrong");
    }

    const data = await res.json();

    onSuccess?.(data);
    setCompleted?.(true);
    setEndActionState?.(null);

    return data;
  } catch (err) {
    console.error(err);
    onError?.(err.message);
  } finally {
    setLoading?.(false);
  }
}
