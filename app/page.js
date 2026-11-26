import Fixtures from "./components/Fixtures";

export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#080d18",
      color: "white",
      fontFamily: "Arial, sans-serif",
      padding: "30px 6%"
    }}>
      <h1>
        SPORTS <span style={{ color: "#21d4a0" }}>AI</span>
      </h1>

      <p>Football Analytics & Predictions</p>

      <h2>Meciurile zilei</h2>

      <Fixtures />
    </main>
  );
}
