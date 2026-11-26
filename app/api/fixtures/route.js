import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const apiKey = process.env.API_SPORTS_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Cheia API nu este configurată." },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "Data trebuie să fie YYYY-MM-DD." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?date=${date}`,
      {
        headers: {
          "x-apisports-key": apiKey
        },
        cache: "no-store"
      }
    );

    const data = await response.json();

    if (!response.ok || data.errors?.length) {
      return NextResponse.json(
        { error: "Eroare API", details: data.errors },
        { status: response.status || 502 }
      );
    }

    return NextResponse.json({
      matches: data.response || [],
      count: data.results || 0
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Nu s-au putut încărca meciurile." },
      { status: 500 }
    );
  }
}
