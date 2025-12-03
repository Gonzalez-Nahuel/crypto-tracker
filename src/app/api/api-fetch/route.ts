import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(`${decodeURIComponent(endpoint!)}`, {
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        {
          ok: false,
          error: res.statusText || "Ocurrio un error",
        },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json({ ok: true, data }, { status: 200 });
  } catch (err) {
    let message = "Error desconocido";
    if (err instanceof Error) message = err.message;

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
