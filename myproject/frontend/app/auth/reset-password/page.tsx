"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [timer, setTimer] = useState(0);
  const [otpSent, setOtpSent] = useState(false);

  // Start countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // === RESET PASSWORD ===
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

  // === RESEND OTP ===
  const resendOtp = async () => {
    if (!email) {
      alert("No email found");
      return;
    }

    const res = await fetch("http://127.0.0.1:8000/api/auth/forgot-password/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("A new OTP has been sent to your email");
      setOtpSent(true);
      setTimer(30); // Wait 30 sec before resending again
    } else {
      alert(data.error || "Failed to resend OTP");
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
        style={{
          width: "100%",
          padding: 10,
          marginTop: 20,
          background: "green",
          color: "white",
        }}
      >
        Reset Password
      </button>

      {/* RESEND OTP SECTION */}
      <button
        onClick={resendOtp}
        disabled={timer > 0}
        style={{
          width: "100%",
          padding: 10,
          marginTop: 15,
          background: timer > 0 ? "gray" : "orange",
          color: "white",
          cursor: timer > 0 ? "not-allowed" : "pointer",
        }}
      >
        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
      </button>
    </div>
  );
}
