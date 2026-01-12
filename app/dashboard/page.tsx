"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import { Button, Card } from "../ui";

type Goal = {
  id: string;
  title: string;
  description: string | null;
  cadence: string;
  created_at: string;
};

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes.user;

      if (!user) {
        window.location.href = "/login";
        return;
      }

      setEmail(user.email ?? null);

      const { data } = await supabase
        .from("goals")
        .select("id,title,description,cadence,created_at")
        .order("created_at", { ascending: false });

      setGoals((data ?? []) as Goal[]);
      setLoading(false);
    };

    load();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 32 }}>Dashboard</h1>
          <p style={{ marginTop: 6, color: "#555" }}>
            Logged in as <b>{email ?? "..."}</b>
          </p>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <Link href="/new-goal" style={{ textDecoration: "none" }}>
            <Button>+ New goal</Button>
          </Link>
          <button
            onClick={logout}
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Log out
          </button>
        </div>
      </div>

      {loading ? (
        <Card>
          <p style={{ margin: 0 }}>Loading your goals...</p>
        </Card>
      ) : goals.length === 0 ? (
        <Card>
          <h2 style={{ marginTop: 0 }}>No goals yet</h2>
          <p style={{ color: "#555" }}>
            Create your first goal and start your streak.
          </p>
          <Link href="/new-goal" style={{ textDecoration: "none" }}>
            <Button>Create your first goal</Button>
          </Link>
        </Card>
      ) : (
        <div style={{ display: "grid", gap: 12 }}>
          {goals.map((g) => (
            <Card key={g.id}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{g.title}</div>
                  {g.description ? (
                    <div style={{ marginTop: 6, color: "#555" }}>{g.description}</div>
                  ) : (
                    <div style={{ marginTop: 6, color: "#888" }}>No description</div>
                  )}
                </div>

                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      display: "inline-block",
                      padding: "6px 10px",
                      borderRadius: 999,
                      border: "1px solid #ddd",
                      fontWeight: 700,
                      fontSize: 12,
                    }}
                  >
                    {g.cadence.toUpperCase()}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
