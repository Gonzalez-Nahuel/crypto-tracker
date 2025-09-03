type FetchParams = {
  path: string;
  params?: string;
};

export async function fetchFromCoinGecko({ path, params }: FetchParams) {
  try {
    const res = await fetch(
      `/api/coingecko?endpoint=${path}${params ? `?${params}` : ""}`
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
