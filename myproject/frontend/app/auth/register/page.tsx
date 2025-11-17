    "use client";

    import { useState } from "react";

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
        <div style={{ padding: 40 }}>
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
            <input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            /><br/>

            <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            /><br/>

            <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            /><br/>

            <button type="submit">Register</button>
        </form>
        </div>
    );
    }
