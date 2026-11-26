
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const apiKey = process.env.APISH_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "APISH_API_KEY nu este configurată." },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://api.api.sh/sofascore/v1/search?q=arsenal&type=teams&sport=football",
      {
        headers: {
          "x-api-key": apiKey
        },
        cache: "no-store"
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: "Eroare API.SH", details: data },
        { status: response.status }
      );
    }

    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json(
      { error: "Conexiunea cu SofaScore a eșuat." },
      { status: 500 }
    );
  }
}
