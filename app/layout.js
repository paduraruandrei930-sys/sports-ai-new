export const metadata = {
  title: "SPORTS AI 2.0",
  description: "Football Analytics and Predictions"
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
