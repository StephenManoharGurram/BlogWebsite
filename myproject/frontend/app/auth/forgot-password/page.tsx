"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const sendOtp = async () => {
    if (!email) return alert("Enter an email.");

    const res = await fetch("http://127.0.0.1:8000/api/auth/forgot-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("OTP sent!");
      router.push(`/auth/reset-password?email=${email}`);
    } else {
      alert(data.error || "Failed to send OTP");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 20 }}
      />

      <button
        onClick={sendOtp}
        style={{ width: "100%", padding: 10, marginTop: 20, background: "blue", color: "white" }}
      >
        Send OTP
      </button>
    </div>
  );
}
