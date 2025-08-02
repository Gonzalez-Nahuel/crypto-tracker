export async function fetchFromCoinGecko(path: string, params?: string) {
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/${path}+${params ? `?${params}` : ""}`
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      return {
        ok: false,
        status: res.status,
        error: errorData?.error || "Ocurrio un error",
      };
    }

    const data = await res.json();
    return {
      ok: true,
      data,
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
