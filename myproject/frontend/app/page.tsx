"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/hello/")
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1>Next.js + Django Connected</h1>
      <p>{msg}</p>
    </div>
  );
}
