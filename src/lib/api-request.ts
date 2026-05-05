type FetchParams = {
  baseUrl: string;
  endpoint?: string;
};

export async function apiRequest({ baseUrl, endpoint }: FetchParams) {
  const fullUrl = `${baseUrl}${endpoint ?? ""}`;

  try {
    if (typeof window === "undefined") {
      const res = await fetch(fullUrl, {
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0",
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return {
          ok: false,
          error: res.statusText || "Ocurrio un error",
        };
      }

      const data = await res.json();

      return {
        ok: true,
        data,
      };
    }

    const res = await fetch(
      `/api/api-fetch?endpoint=${encodeURIComponent(fullUrl)}`,
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        ok: false,
        error: res.statusText || "Ocurrio un error",
      };
    }

    if (!data.ok) {
      return {
        ok: false,
        error: data.error,
      };
    }

    return {
      ok: true,
      data: data.data,
    };
  } catch (err) {
    let message = "Error desconocido";
    if (err instanceof Error) message = err.message;

    return {
      ok: false,
      status: null,
      error: message,
    };
  }
}
