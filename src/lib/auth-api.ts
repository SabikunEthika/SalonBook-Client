const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export type SessionUser = { id: string; name: string; email: string; role: "admin" | "customer"; isBlocked: boolean };

export async function authRequest(path: string, body?: Record<string, string>) {
  const response = await fetch(`${apiUrl}/api/auth${path}`, {
    method: body ? "POST" : "GET",
    headers: body ? { "content-type": "application/json" } : undefined,
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof data === "object" && data && "message" in data && typeof data.message === "string" ? data.message : "We could not complete that request. Please try again.";
    throw new Error(message);
  }
  return data;
}

export async function getSession(): Promise<{ user: SessionUser } | null> {
  return authRequest("/get-session") as Promise<{ user: SessionUser } | null>;
}
