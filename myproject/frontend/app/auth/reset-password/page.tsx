"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const resetPassword = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/auth/reset-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        otp,
        new_password: newPassword,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("Password reset successful!");
      router.push("/auth/login");
    } else {
      alert(data.error || "Reset failed");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Reset Password</h2>
      <p>Email: {email}</p>

      <input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 20 }}
      />

      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 20 }}
      />

      <button
        onClick={resetPassword}
        style={{ width: "100%", padding: 10, marginTop: 20, background: "green", color: "white" }}
      >
        Reset Password
      </button>
    </div>
  );
}
