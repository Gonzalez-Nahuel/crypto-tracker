type FetchParams = {
  baseUrl: string;
  endpoint?: string;
};

export async function apiRequest({ baseUrl, endpoint }: FetchParams) {
  const fullUrl = `${baseUrl}${endpoint ?? ""}`;

  try {
    const res = await fetch(
      `/api/api-fetch?endpoint=${encodeURIComponent(fullUrl)}`
    );

    const data = await res.json();

    console.log("repeat");

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
