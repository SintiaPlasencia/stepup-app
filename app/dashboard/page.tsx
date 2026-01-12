"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();
      setEmail(data.user?.email ?? null);
    };
    loadUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>

      {email ? (
        <>
          <p>You’re logged in as <b>{email}</b></p>
          <button onClick={logout} style={{ marginTop: 12, padding: 12 }}>
            Log out
          </button>
        </>
      ) : (
        <a href="/login">Go to login</a>
      )}
    </main>
  );
}
