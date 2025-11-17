"use client";

import { useState } from "react";
import AuthCard from "@/components/AuthCard";

export default function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.status === 201) {
      alert("Account created! You may now login.");
    } else {
      alert("Registration failed.");
    }
  };

  return (
    <AuthCard title="Create Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        
        <input
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
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
          Register
        </button>
      </form>
    </AuthCard>
  );
}
