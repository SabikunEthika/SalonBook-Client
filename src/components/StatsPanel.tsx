"use client";

import { useEffect, useState } from "react";
import { apiRequest, type SessionUser } from "@/lib/auth-api";

type Stats = { role: "admin" | "customer"; appointments: number; pendingAppointments: number; confirmedAppointments: number; cancelledAppointments?: number; paidAppointments?: number; customers?: number; activeServices?: number; successfulPayments?: number; paymentTotal?: number };
export function StatsPanel({ user }: { user: SessionUser }) {
  const [stats, setStats] = useState<Stats | null>(null); const [message, setMessage] = useState("Loading overview…");
  useEffect(() => { const timer = window.setTimeout(() => { void apiRequest<{ data: Stats }>("/api/dashboard/stats").then((result) => { setStats(result.data); setMessage(""); }).catch((error) => setMessage(error instanceof Error ? error.message : "Could not load overview.")); }, 0); return () => window.clearTimeout(timer); }, []);
  if (!stats) return <p className="dashboard-message">{message}</p>;
  const cards = user.role === "admin" ? [["Registered customers", stats.customers], ["Active services", stats.activeServices], ["Appointment requests", stats.appointments], ["Successful payments", stats.successfulPayments], ["Payment total", `$${stats.paymentTotal?.toFixed(2) ?? "0.00"}`]] : [["Total requests", stats.appointments], ["Pending", stats.pendingAppointments], ["Confirmed", stats.confirmedAppointments], ["Cancelled", stats.cancelledAppointments], ["Paid appointments", stats.paidAppointments]];
  return <div className="dashboard-cards stats-cards">{cards.map(([label, value]) => <article key={String(label)}><span>{label}</span><strong>{value}</strong></article>)}</div>;
}
