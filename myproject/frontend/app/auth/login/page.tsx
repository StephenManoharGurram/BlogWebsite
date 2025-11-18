"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      router.push("/auth/protected");
    } else {
      alert(data.error || "Invalid login.");
    }
  };

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-md px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded-md px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white rounded-md py-2">
          Login
        </button>

        {/* Forgot Password Link */}
        <button
          type="button"
          className="w-full text-blue-500 underline"
          onClick={() => router.push("/auth/forgot-password")}
        >
          Forgot Password?
        </button>
      </form>
    </AuthCard>
  );
}
