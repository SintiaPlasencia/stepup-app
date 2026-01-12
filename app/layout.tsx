import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StepUp",
  description: "Small actions. Real change. Every day.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Arial" }}>
        <header
          style={{
            position: "sticky",
            top: 0,
            background: "white",
            borderBottom: "1px solid #eee",
            zIndex: 10,
          }}
        >
          <div
            style={{
              maxWidth: 980,
              margin: "0 auto",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <a href="/" style={{ textDecoration: "none", color: "black" }}>
              <span style={{ fontWeight: 800, fontSize: 18 }}>StepUp</span>
              <span style={{ marginLeft: 10, color: "#666", fontSize: 13 }}>
                Small actions. Real change.
              </span>
            </a>

            <nav style={{ display: "flex", gap: 12 }}>
              <a href="/dashboard" style={{ color: "#111", textDecoration: "none" }}>
                Dashboard
              </a>
              <a href="/new-goal" style={{ color: "#111", textDecoration: "none" }}>
                New Goal
              </a>
            </nav>
          </div>
        </header>

        <main style={{ maxWidth: 980, margin: "0 auto", padding: "18px 16px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
