"use client";

import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/auth-api";

type Transaction = { _id: string; customerId: { name: string; email: string } | null; amount: number; currency: string; stripeSessionId: string; status: "paid" | "failed"; createdAt: string; appointmentId?: { appointmentDate: string; timeSlot: string; servicePrice: number; serviceId?: { serviceName: string; category: string } | null } | null };
type Response = { data: Transaction[] };

export function TransactionPanel() {
  const [items, setItems] = useState<Transaction[]>([]);
  const [message, setMessage] = useState("Loading transactions…");
  const load = useCallback(async () => { try { const result = await apiRequest<Response>("/api/transactions"); setItems(result.data); setMessage(""); } catch (error) { setMessage(error instanceof Error ? error.message : "Could not load transactions."); } }, []);
  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);
  return <section id="transactions" className="transaction-panel"><div className="panel-heading"><div><p className="eyebrow">Transactions</p><h2>Payment history</h2></div><button className="refresh-button" onClick={() => void load()}>Refresh</button></div>{message ? <p className="dashboard-message" role="status">{message}</p> : null}{items.length > 0 ? <div className="transaction-list">{items.map((item) => <article key={item._id}><div><p className="eyebrow">{item.appointmentId?.appointmentDate ?? "Appointment"} · {item.appointmentId?.timeSlot ?? ""}</p><h3>{item.appointmentId?.serviceId?.serviceName ?? "Salon appointment"}</h3><p>{item.appointmentId?.serviceId?.category ?? "Service"} · {item.customerId?.name ?? "Customer unavailable"} ({item.customerId?.email ?? "No email"})</p><p>Stripe session: {item.stripeSessionId.slice(0, 18)}…</p></div><div className="transaction-amount"><strong>{item.currency.toUpperCase()} {item.amount.toFixed(2)}</strong><span className={`status ${item.status === "paid" ? "paid" : "cancelled"}`}>{item.status}</span></div></article>)}</div> : !message ? <p className="dashboard-message">No transactions yet. Verified Stripe payments will appear here.</p> : null}</section>;
}
