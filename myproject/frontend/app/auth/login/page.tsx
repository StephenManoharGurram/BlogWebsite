    "use client";

    import { useState } from "react";
    import { useRouter } from "next/navigation";

    export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ username: "", password: "" });

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
        <div style={{ padding: 40 }}>
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
            <input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            /><br/>

            <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            /><br/>

            <button type="submit">Login</button>
        </form>
        </div>
    );
    }
