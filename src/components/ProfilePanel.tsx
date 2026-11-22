"use client";

import { useState, type FormEvent } from "react";
import { apiRequest, type SessionUser } from "@/lib/auth-api";

type ProfileResponse = { data: Pick<SessionUser, "name" | "email" | "role"> & { image?: string; phone?: string } };

export function ProfilePanel({ user }: { user: SessionUser }) {
  const [name, setName] = useState(user.name); const [image, setImage] = useState(""); const [phone, setPhone] = useState(""); const [message, setMessage] = useState(""); const [saving, setSaving] = useState(false);
  async function saveProfile(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaving(true); setMessage(""); try { const result = await apiRequest<ProfileResponse>("/api/users/me", { method: "PATCH", body: JSON.stringify({ name, ...(image ? { image } : {}), ...(phone ? { phone } : {}) }) }); setName(result.data.name); setMessage("Profile updated successfully."); } catch (error) { setMessage(error instanceof Error ? error.message : "Could not update your profile."); } finally { setSaving(false); } }
  return <section id="profile" className="profile-panel"><div><p className="eyebrow">My profile</p><h2>Keep your details current</h2></div><form onSubmit={saveProfile}><label>Name<input required minLength={2} value={name} onChange={(event) => setName(event.target.value)} /></label><label>Email<input value={user.email} disabled /></label><label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Optional" /></label><label>Profile image URL<input type="url" value={image} onChange={(event) => setImage(event.target.value)} placeholder="Optional — ImgBB upload comes next" /></label><button className="button" disabled={saving}>{saving ? "Saving…" : "Save profile"}</button></form>{message ? <p className="dashboard-message">{message}</p> : null}</section>;
}
