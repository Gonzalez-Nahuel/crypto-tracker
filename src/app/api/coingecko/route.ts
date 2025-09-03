import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint") ?? "global";

    const res = await fetch(`https://api.coingecko.com/api/v3/${endpoint}`, {
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: res.statusText || "Ocurrio un error" },
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
