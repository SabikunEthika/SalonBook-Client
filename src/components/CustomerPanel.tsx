"use client";

import { useCallback, useEffect, useState } from "react";
import { apiRequest } from "@/lib/auth-api";

type Customer = { id: string; name: string; email: string; phone?: string; isBlocked: boolean; createdAt: string };
type CustomersResponse = { data: Customer[] };

export function CustomerPanel() {
  const [customers, setCustomers] = useState<Customer[]>([]); const [message, setMessage] = useState("Loading customers…"); const [updatingId, setUpdatingId] = useState("");
  const load = useCallback(async () => { try { const result = await apiRequest<CustomersResponse>("/api/users"); setCustomers(result.data); setMessage(""); } catch (error) { setMessage(error instanceof Error ? error.message : "Could not load customers."); } }, []);
  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);
  async function setBlocked(customer: Customer) { setUpdatingId(customer.id); setMessage(""); try { await apiRequest(`/api/users/${customer.id}/block`, { method: "PATCH", body: JSON.stringify({ isBlocked: !customer.isBlocked }) }); await load(); } catch (error) { setMessage(error instanceof Error ? error.message : "Could not update customer access."); } finally { setUpdatingId(""); } }
  return <section className="customer-panel"><div className="panel-heading"><div><p className="eyebrow">Manage users</p><h2>Registered customers</h2></div><button className="refresh-button" onClick={() => void load()}>Refresh</button></div>{message ? <p className="dashboard-message">{message}</p> : null}{customers.length > 0 ? <div className="customer-list">{customers.map((customer) => <article key={customer.id}><div><h3>{customer.name}</h3><p>{customer.email}{customer.phone ? ` · ${customer.phone}` : ""}</p></div><div className="customer-actions"><span className={`status ${customer.isBlocked ? "cancelled" : "confirmed"}`}>{customer.isBlocked ? "Blocked" : "Active"}</span><button disabled={updatingId === customer.id} onClick={() => void setBlocked(customer)}>{updatingId === customer.id ? "Saving…" : customer.isBlocked ? "Unblock" : "Block"}</button></div></article>)}</div> : !message ? <p className="dashboard-message">No customers have registered yet.</p> : null}</section>;
}
