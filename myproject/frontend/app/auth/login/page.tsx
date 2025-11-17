"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.status === 200) {
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      router.push("/auth/protected");
    } else {
      alert("Invalid login.");
    }
  };

  return (
    <AuthCard title="Login">
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          type="password"
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </AuthCard>
  );
}
