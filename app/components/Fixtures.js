"use client";

import { useEffect, useState } from "react";

export default function Fixtures() {
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadMatches() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/fixtures?date=${date}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Eroare la încărcarea meciurilor.");
        }

        setMatches(data.matches || []);
      } catch (err) {
        setError(err.message);
        setMatches([]);
      } finally {
        setLoading(false);
      }
    }

    loadMatches();
  }, [date]);

  return (
    <section style={{ marginTop: 30 }}>
      <label style={{ display: "block", marginBottom: 10 }}>
        Alege data meciurilor:
      </label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
          background: "#172235",
          color: "white",
          border: "1px solid #334155"
        }}
      />

      {loading && <p>Se încarcă meciurile...</p>}
      {error && <p style={{ color: "#ff6b6b" }}>{error}</p>}

      {!loading && !error && matches.length === 0 && (
        <p>Nu există meciuri pentru această dată.</p>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {matches.map((match) => (
          <article
            key={match.fixture.id}
            style={{
              background: "#111c2e",
              border: "1px solid #26364e",
              borderRadius: 12,
              padding: 18
            }}
          >
            <p style={{ color: "#21d4a0", marginTop: 0 }}>
              {match.league.name}
            </p>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 12
            }}>
              <strong>{match.teams.home.name}</strong>
              <span style={{ color: "#21d4a0" }}>VS</span>
              <strong>{match.teams.away.name}</strong>
            </div>

            <p style={{ color: "#9ca3af", marginBottom: 0 }}>
              {new Date(match.fixture.date).toLocaleTimeString("ro-RO", {
                hour: "2-digit",
                minute: "2-digit"
              })}
              {" · "}
              {match.fixture.status.long}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
