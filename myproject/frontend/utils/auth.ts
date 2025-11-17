export async function refreshToken() {
  const refresh = localStorage.getItem("refresh");

  if (!refresh) return null;

  const res = await fetch("http://127.0.0.1:8000/api/auth/refresh/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (res.status === 200) {
    const data = await res.json();
    localStorage.setItem("access", data.access);
    return data.access;
  }

  return null;
}

export async function fetchWithAuth(url: string) {
  // 1. Try with existing access token
  let access = localStorage.getItem("access");

  let res = await fetch(url, {
    headers: { Authorization: `Bearer ${access}` },
  });

  // 2. If access token is expired → refresh it
  if (res.status === 401) {
    access = await refreshToken();

    if (!access) return null;

    // retry request with new token
    res = await fetch(url, {
      headers: { Authorization: `Bearer ${access}` },
    });
  }

  return res;
}
