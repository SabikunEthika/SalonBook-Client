"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSession, signOut, type SessionUser } from "@/lib/auth-api";

export function SiteHeader() {
  const [user, setUser] = useState<SessionUser | null>(null);
  useEffect(() => {
    let active = true;
    const sync = () => { void getSession().then((session) => { if (active) setUser(session?.user ?? null); }).catch(() => { if (active) setUser(null); }); };
    sync();
    window.addEventListener("salonbook:auth-change", sync);
    return () => { active = false; window.removeEventListener("salonbook:auth-change", sync); };
  }, []);
  async function handleSignOut() { await signOut(); setUser(null); window.dispatchEvent(new Event("salonbook:auth-change")); }
  return <header className="site-header"><Link className="brand" href="/"><span>✦</span> SalonBook</Link><nav aria-label="Main navigation"><Link href="/services">Services</Link><Link href="/#experience">Our experience</Link></nav><div className="header-actions">{user ? <details className="profile-menu"><summary className="profile-trigger">Hi, {user.name.split(" ")[0]}</summary><div className="profile-dropdown"><Link href="/dashboard">Dashboard</Link><Link href="/dashboard#profile">My profile</Link><button className="header-logout" onClick={() => void handleSignOut()}>Log out</button></div></details> : <><Link href="/sign-in" className="text-link">Sign in</Link><Link href="/sign-up" className="button button-small">Book now</Link></>}</div></header>;
}
