"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") || "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleReset = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/auth/reset-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, new_password: newPassword }),
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("Password reset successful!");
      router.push("/auth/login");
    } else {
      alert(data.error || "Failed to reset password");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Reset Password</h1>
      <p>Email: {email}</p>

      <form onSubmit={handleReset}>
        <input
          style={{ padding: 10, width: "100%", marginTop: 20 }}
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <input
          type="password"
          style={{ padding: 10, width: "100%", marginTop: 20 }}
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          style={{
            marginTop: 20,
            padding: 10,
            background: "green",
            color: "white",
            width: "100%",
            cursor: "pointer",
          }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}
