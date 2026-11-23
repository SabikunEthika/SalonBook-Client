"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, signOut, type SessionUser } from "@/lib/auth-api";
import { AppointmentPanel } from "@/components/AppointmentPanel";
import { ProfilePanel } from "@/components/ProfilePanel";
import { CustomerPanel } from "@/components/CustomerPanel";
import { ServiceAdminPanel } from "@/components/ServiceAdminPanel";
import { StatsPanel } from "@/components/StatsPanel";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [message, setMessage] = useState("Loading your dashboard…");

  useEffect(() => {
    let active = true;
    void getSession().then((session) => {
      if (!active) return;
      if (!session?.user || session.user.isBlocked) { router.replace("/sign-in"); return; }
      setUser(session.user); setMessage("");
    }).catch(() => {
      if (active) { setMessage("We could not load your session. Please sign in again."); router.replace("/sign-in"); }
    });
    return () => { active = false; };
  }, [router]);

  async function handleSignOut() { try { await signOut(); } finally { router.replace("/"); } }

  if (!user) return <main className="page-loader"><span>✦</span><p>{message}</p></main>;
  return <main className="dashboard-page"><aside><Link className="brand" href="/"><span>✦</span> SalonBook</Link><p className="eyebrow">{user.role} dashboard</p><nav><a href="#overview">Overview</a><a href="#appointments">Appointments</a>{user.role === "admin" ? <><a href="#services-admin">Services</a><a href="#customers">Customers</a></> : null}<a href="#profile">My profile</a></nav><button className="sidebar-logout" onClick={() => void handleSignOut()}>Log out</button></aside><section><div id="overview"><p className="eyebrow">Welcome back</p><h1>Hello, {user.name.split(" ")[0]}.</h1><p className="dashboard-lead">Keep track of every appointment request and its confirmation status in one place.</p><StatsPanel user={user} /></div><div id="appointments"><AppointmentPanel user={user} /></div>{user.role === "admin" ? <><ServiceAdminPanel /><div id="customers"><CustomerPanel /></div></> : null}<ProfilePanel user={user} /></section></main>;
}
