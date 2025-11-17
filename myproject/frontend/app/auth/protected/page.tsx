    "use client";

    import { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";

    export default function ProtectedPage() {
    const router = useRouter();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const access = localStorage.getItem("access");

        if (!access) {
        router.push("/auth/login");
        return;
        }

        fetch("http://127.0.0.1:8000/api/secret/", {
        headers: { Authorization: `Bearer ${access}` },
        })
        .then(async (res) => {
            if (res.status === 401) router.push("/auth/login");
            const data = await res.json();
            setMessage(data.message);
        })
        .catch(() => router.push("/auth/login"));
    }, []);

    return (
        <div style={{ padding: 40 }}>
        <h1>Protected Page</h1>
        <p>{message}</p>

        <button
            onClick={() => {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            router.push("/auth/login");
            }}
        >
            Logout
        </button>
        </div>
    );
    }
