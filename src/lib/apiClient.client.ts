import { toast } from "sonner";

export async function apiFetchClient<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T | null | true> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options?.headers || {}),
      },
      credentials: "include",
    });

    if (res.status == 200 || res.status == 201) {
      return (await res.json()) as T;
    } else if (res.status == 202 || res.status == 204) {
      return true;
    } else {
      console.error("[apiFetch/client] HTTP error:", res.status);
      const errdata: errdataType = await res.json();
      if (errdata.detail) {
        toast.error(errdata.detail);
      }
      if (errdata.errors) {
        errdata.errors.forEach((item) => {
          toast.error(item.field + " - " + item.message);
        });
      }
      return null;
    }
  } catch (err) {
    console.error("[apiFetch/client]", err);
    return null;
  }
}
