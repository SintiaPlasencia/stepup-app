"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";
import { Button, Card, Input, TextArea } from "../ui";

export default function NewGoalPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cadence, setCadence] = useState<"daily" | "weekly">("daily");
  const [message, setMessage] = useState("");

  const createGoal = async () => {
    setMessage("Saving...");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage("Not logged in. Redirecting...");
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("goals").insert({
      user_id: user.id,
      title,
      description,
      cadence,
    });

    if (error) setMessage(error.message);
    else router.push("/dashboard");
  };

  return (
    <div style={{ display: "grid", gap: 16, maxWidth: 680 }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 32 }}>Create a goal</h1>
        <p style={{ marginTop: 6, color: "#555" }}>
          Keep it simple. You can refine later.
        </p>
      </div>

      <Card>
        <label style={{ fontWeight: 700 }}>Goal title</label>
        <div style={{ marginTop: 8 }}>
          <Input
            placeholder="Ex: Run 20 minutes"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 14 }}>
          <label style={{ fontWeight: 700 }}>Description (optional)</label>
          <div style={{ marginTop: 8 }}>
            <TextArea
              placeholder="Why this matters to you..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: 14 }}>
          <label style={{ fontWeight: 700 }}>Cadence</label>
          <div style={{ marginTop: 8 }}>
            <select
              value={cadence}
              onChange={(e) => setCadence(e.target.value as "daily" | "weekly")}
              style={{
                width: "100%",
                padding: 12,
                borderRadius: 12,
                border: "1px solid #ddd",
              }}
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "center" }}>
          <Button onClick={createGoal} disabled={!title.trim()}>
            Save goal
          </Button>
          <a href="/dashboard" style={{ color: "#111" }}>
            Cancel
          </a>
        </div>

        {message && <p style={{ marginTop: 12, color: "#555" }}>{message}</p>}
      </Card>
    </div>
  );
}
