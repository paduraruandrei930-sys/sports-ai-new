
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
    const team = searchParams.get("team");

    if (!team || !/^\d+$/.test(team)) {
      return NextResponse.json(
        { error: "ID-ul echipei este invalid." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${team}&last=5`,
      {
        headers: {
          "x-apisports-key": apiKey
        },
        cache: "no-store"
      }
    );

    const data = await response.json();

    if (!response.ok || (data.errors && Object.keys(data.errors).length > 0)) {
      return NextResponse.json(
        { error: "API-ul nu a returnat statisticile.", details: data.errors },
        { status: 502 }
      );
    }

    return NextResponse.json({
      matches: data.response || [],
      count: data.results || 0
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Eroare la preluarea meciurilor echipei." },
      { status: 500 }
    );
  }
}
