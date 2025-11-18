"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";

export default function VerifyOTPPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email");

  const [otp, setOtp] = useState("");

  const verifyOTP = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/auth/verify-otp/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      router.push("/auth/protected");
    } else {
      alert(data.error);
    }
  };

  return (
    <AuthCard title="Enter OTP">
      <form onSubmit={verifyOTP} className="space-y-4">

        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="6-digit OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Verify
        </button>
      </form>
    </AuthCard>
  );
}
