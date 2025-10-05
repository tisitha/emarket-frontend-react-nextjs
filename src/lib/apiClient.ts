export async function apiFetch<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T | null> {
    try {
      const res = await fetch(`${process.env.API_URL}${endpoint}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...(options?.headers || {}),
        },
        cache: "no-store",
      });
  
      if (!res.ok) {
        console.error(`[apiFetch] HTTP ${res.status} for ${endpoint}`);
        return null;
      }
  
      const contentType = res.headers.get("content-type");
      if (!contentType?.includes("application/json")) {
        console.error(`[apiFetch] Unexpected content type: ${contentType}`);
        return null;
      }
  
      return (await res.json()) as T;
    } catch (err) {
      console.error(`[apiFetch] Fetch failed for ${endpoint}:`, err);
      return null;
    }
  }