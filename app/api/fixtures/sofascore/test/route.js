
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.APISH_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "APISH_API_KEY lipsește din Vercel." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      "https://api.api.sh/sofascore/v1/search?q=arsenal&type=teams&sport=football",
      {
        headers: { "x-api-key": apiKey },
        cache: "no-store"
      }
    );

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.ok ? 200 : response.status
    });
  } catch {
    return NextResponse.json(
      { error: "Conexiunea API.SH a eșuat." },
      { status: 500 }
    );
  }
}
