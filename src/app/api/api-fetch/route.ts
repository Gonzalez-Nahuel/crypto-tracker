import { ALLOWED_DOMAINS } from "@/constants";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const endpoint = searchParams.get("endpoint");

  if (!endpoint) {
    return NextResponse.json(
      { ok: false, error: "Missing endpoint param" },
      { status: 400 },
    );
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(decodeURIComponent(endpoint));
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid URL" },
      { status: 400 },
    );
  }

  if (!ALLOWED_DOMAINS.includes(parsedUrl.hostname)) {
    return NextResponse.json(
      { ok: false, error: "Domain not allowed" },
      { status: 403 },
    );
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    const res = await fetch(parsedUrl, {
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
        { status: res.status },
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
