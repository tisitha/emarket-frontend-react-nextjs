export type FetchMode = "no-store" | "cache" | "revalidate";

export async function apiFetch<T>(
  endpoint: string,
  {
    method = "GET",
    body,
    headers,
    mode = "no-store",
    revalidateSeconds = 60,
  }: {
    method?: string;
    body?: any;
    headers?: HeadersInit;
    mode?: FetchMode;
    revalidateSeconds?: number;
  } = {}
): Promise<T | undefined> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    let cacheOption: RequestInit = {};

    if (mode === "no-store") cacheOption = { cache: "no-store" };
    else if (mode === "cache") cacheOption = { cache: "force-cache" };
    else if (mode === "revalidate") cacheOption = { next: { revalidate: revalidateSeconds } };

    const res = await fetch(`${apiUrl}${endpoint}`, {
      method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      ...cacheOption,
    });

    if (!res.ok) {
      console.error(`[apiFetch] HTTP ${res.status} on ${endpoint}`);
      return undefined;
    }

    return (await res.json()) as T;
  } catch (err) {
    console.error(`[apiFetch] Fetch failed for ${endpoint}:`, err);
    return undefined;
  }
}
