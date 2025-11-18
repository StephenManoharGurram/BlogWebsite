"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const sendOTP = async () => {
    const res = await fetch("http://localhost:8000/api/auth/forgot-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.status === 200) {
      router.push(`/auth/reset-password?email=${email}`);
    } else {
      alert(data.error || "Failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter email"
        style={{ padding: 10, width: "100%", marginTop: 20 }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={sendOTP}
        style={{
          marginTop: 20,
          background: "blue",
          padding: 10,
          width: "100%",
          color: "white",
        }}
      >
        Send OTP
      </button>
    </div>
  );
}
