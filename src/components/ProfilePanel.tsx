"use client";

import { useState, type FormEvent } from "react";
import { apiRequest, uploadImage, type SessionUser } from "@/lib/auth-api";

type ProfileResponse = { data: Pick<SessionUser, "name" | "email" | "role"> & { image?: string; phone?: string } };

export function ProfilePanel({ user }: { user: SessionUser }) {
  const [name, setName] = useState(user.name); const [image, setImage] = useState<File | null>(null); const [phone, setPhone] = useState(""); const [message, setMessage] = useState(""); const [saving, setSaving] = useState(false);
  async function saveProfile(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaving(true); setMessage(""); try { const imageUrl = image ? await uploadImage(image) : undefined; const result = await apiRequest<ProfileResponse>("/api/users/me", { method: "PATCH", body: JSON.stringify({ name, ...(imageUrl ? { image: imageUrl } : {}), ...(phone ? { phone } : {}) }) }); setName(result.data.name); setMessage("Profile updated successfully."); } catch (error) { setMessage(error instanceof Error ? error.message : "Could not update your profile."); } finally { setSaving(false); } }
  return <section id="profile" className="profile-panel"><div><p className="eyebrow">My profile</p><h2>Keep your details current</h2></div><form onSubmit={saveProfile}><label>Name<input required minLength={2} value={name} onChange={(event) => setName(event.target.value)} /></label><label>Email<input value={user.email} disabled /></label><label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Optional" /></label><label>Profile image<input type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] ?? null)} /></label><button className="button" disabled={saving}>{saving ? "Saving…" : "Save profile"}</button></form>{message ? <p className="dashboard-message">{message}</p> : null}</section>;
}
