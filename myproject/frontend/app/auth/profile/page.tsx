"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/utils/auth";
import AuthCard from "@/components/AuthCard";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      const res = await fetchWithAuth("http://127.0.0.1:8000/api/auth/me/");

      if (!res) {
        router.push("/auth/login");
        return;
      }

      const data = await res.json();
      setUser(data);
    }

    loadUser();
  }, []);

  if (!user) {
    return (
      <AuthCard title="Loading Profile...">
        <p>Please wait...</p>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Profile">
      <div className="space-y-3">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>

        <button
          onClick={() => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            router.push("/auth/login");
          }}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </AuthCard>
  );
}
