"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const email = params.get("email");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  const resetPassword = async () => {
    const res = await fetch("http://localhost:8000/api/auth/reset-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, new_password: newPassword }),
    });

    const data = await res.json();

    if (res.status === 200) {
      router.push("/auth/login");
    } else {
      alert(data.error || "Failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Reset Password</h1>
      <p>Email: {email}</p>

      <input
        placeholder="Enter OTP"
        style={{ padding: 10, width: "100%", marginTop: 20 }}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <input
        placeholder="Enter new password"
        type="password"
        style={{ padding: 10, width: "100%", marginTop: 20 }}
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <button
        onClick={resetPassword}
        style={{
          marginTop: 20,
          background: "green",
          padding: 10,
          width: "100%",
          color: "white",
        }}
      >
        Reset Password
      </button>
    </div>
  );
}
