export async function apiFetchClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
      credentials: "include",
    });

    if (!res.ok) {
      console.error("[apiFetch/client] HTTP error:", res.status);
      return null;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error("[apiFetch/client]", err);
    return null;
  }
}
