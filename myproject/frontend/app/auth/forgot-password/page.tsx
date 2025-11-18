"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log("Sending email:", email);

    const res = await fetch("http://127.0.0.1:8000/api/auth/forgot-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }), // <-- IMPORTANT!
    });

    const data = await res.json();

    console.log("Response:", data);

    if (res.status === 200) {
      alert("Reset OTP sent! Check Django terminal.");
      router.push(`/auth/reset-password?email=${email}`);
    } else {
      alert(data.error || "Failed to send reset OTP");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Forgot Password</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          style={{ padding: 10, width: "100%", marginTop: 20 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          style={{
            marginTop: 20,
            padding: 10,
            background: "blue",
            color: "white",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Send Reset OTP
        </button>
      </form>
    </div>
  );
}
