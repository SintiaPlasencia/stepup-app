"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN") {
        window.location.href = "/dashboard";
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  const sendMagicLink = async () => {
    setMessage("Sending link...");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/dashboard",
      },
    });

    if (error) setMessage(error.message);
    else setMessage("Check your email for the login link!");
  };

  return (
    <main style={{ padding: 24, maxWidth: 420 }}>
      <h1>StepUp Login</h1>
      <p>Enter your email to get a magic login link.</p>

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        style={{ width: "100%", padding: 12, marginTop: 12 }}
      />

      <button onClick={sendMagicLink} style={{ marginTop: 12, padding: 12 }}>
        Send login link
      </button>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </main>
  );
}
