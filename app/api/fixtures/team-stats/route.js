
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
    const season = searchParams.get("season") || String(new Date().getFullYear());

    if (!team || !/^\d+$/.test(team)) {
      return NextResponse.json(
        { error: "ID-ul echipei este invalid." },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://v3.football.api-sports.io/fixtures?team=${team}&season=${season}`,
      {
        headers: {
          "x-apisports-key": apiKey
        },
        cache: "no-store"
      }
    );

    const data = await response.json();

    if (!response.ok || Object.keys(data.errors || {}).length > 0) {
      return NextResponse.json(
        { error: "Eroare API", details: data.errors },
        { status: 502 }
      );
    }

    const completed = (data.response || [])
      .filter(match =>
        ["FT", "AET", "PEN"].includes(match.fixture.status.short)
      )
      .sort((a, b) =>
        new Date(b.fixture.date) - new Date(a.fixture.date)
      )
      .slice(0, 5);

    return NextResponse.json({
      team: Number(team),
      season: Number(season),
      matches: completed,
      count: completed.length
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Nu s-au putut prelua meciurile echipei." },
      { status: 500 }
    );
  }
}

}
