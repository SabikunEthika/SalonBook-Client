"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, type SessionUser } from "@/lib/auth-api";
import { AppointmentPanel } from "@/components/AppointmentPanel";

export default function DashboardPage() {
  const router = useRouter(); const [user, setUser] = useState<SessionUser | null>(null); const [message, setMessage] = useState("Loading your dashboard…");
  useEffect(() => { let active = true; void getSession().then((session) => { if (!active) return; if (!session?.user || session.user.isBlocked) { router.replace("/sign-in"); return; } setUser(session.user); setMessage(""); }).catch(() => { if (active) { setMessage("We could not load your session. Please sign in again."); router.replace("/sign-in"); } }); return () => { active = false; }; }, [router]);
  if (!user) return <main className="page-loader"><span>✦</span><p>{message}</p></main>;
  return <main className="dashboard-page"><aside><Link className="brand" href="/"><span>✦</span> SalonBook</Link><p className="eyebrow">{user.role} dashboard</p><nav><Link href="/dashboard">Overview</Link><Link href="/dashboard">Appointments</Link><Link href="/dashboard">My profile</Link></nav></aside><section><p className="eyebrow">Welcome back</p><h1>Hello, {user.name.split(" ")[0]}.</h1><p className="dashboard-lead">Keep track of every appointment request and its confirmation status in one place.</p><div className="dashboard-cards"><article><span>Account type</span><strong>{user.role}</strong><p>{user.email}</p></article></div><AppointmentPanel user={user} /></section></main>;
}
