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
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("salonbook:toast", { detail: { message, tone: "error" } }));
    throw new Error(message);
  }
  return data;
}

export async function getSession(): Promise<{ user: SessionUser } | null> {
  return authRequest("/get-session") as Promise<{ user: SessionUser } | null>;
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`, { credentials: "include", ...options, headers: { "content-type": "application/json", ...options.headers } });
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    const message = typeof data === "object" && data && "message" in data && typeof data.message === "string" ? data.message : "We could not complete that request. Please try again.";
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("salonbook:toast", { detail: { message, tone: "error" } }));
    throw new Error(message);
  }
  return data as T;
}

export async function signOut() { return authRequest("/sign-out", {}); }

export async function signInWithGoogle(callbackURL = `${window.location.origin}/dashboard`) {
  const response = await fetch(`${apiUrl}/api/auth/sign-in/social`, { method: "POST", headers: { "content-type": "application/json" }, credentials: "include", body: JSON.stringify({ provider: "google", callbackURL }) });
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok || !data || typeof data !== "object" || !("url" in data) || typeof data.url !== "string") {
    const message = typeof data === "object" && data && "message" in data && typeof data.message === "string" ? data.message : "Google sign-in is not configured yet.";
    throw new Error(message);
  }
  window.location.assign(data.url);
}

export async function uploadImage(file: File): Promise<string> {
  const body = new FormData(); body.append("image", file);
  const response = await fetch(`${apiUrl}/api/uploads/image`, { method: "POST", credentials: "include", body });
  const data: unknown = await response.json().catch(() => null);
  if (!response.ok || !data || typeof data !== "object" || !("data" in data) || !data.data || typeof data.data !== "object" || !("url" in data.data) || typeof data.data.url !== "string") throw new Error("Could not upload that image.");
  return data.data.url;
}
