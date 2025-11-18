"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function OTPPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const sendOTP = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/auth/send-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.status === 200) {
      router.push(`/auth/verify-otp?email=${email}`);
    } else {
      alert("Failed to send OTP");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Enter Email for OTP</h1>

      <form onSubmit={sendOTP}>
        <input
          style={{ padding: 10, marginTop: 20, width: "100%" }}
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
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
          Send OTP
        </button>
      </form>
    </div>
  );
}
