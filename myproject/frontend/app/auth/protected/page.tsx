    "use client";

    import { useEffect, useState } from "react";
    import { useRouter } from "next/navigation";
    import { fetchWithAuth } from "@/utils/auth";


    export default function ProtectedPage() {
    const router = useRouter();
    const [message, setMessage] = useState("");

        useEffect(() => {
    async function loadData() {
        const res = await fetchWithAuth("http://127.0.0.1:8000/api/secret/");
        if (!res) {
        router.push("/auth/login");
        return;
        }

        const data = await res.json();
        setMessage(data.message);
    }

    loadData();
    }, []);


    return (
        <div style={{ padding: 40 }}>
        <h1>Protected Page</h1>
        <p>{message}</p>
         <button
            onClick={() => router.push("/auth/profile")}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
            >
            Go to Profile
        </button>

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
