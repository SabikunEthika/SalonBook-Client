import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function AdminSignInPage() { return <main className="auth-page"><section><p className="eyebrow">SalonBook administration</p><h1>Admin <em>portal.</em></h1><p>Authorized administrators can manage services, appointments, customers, and payments here.</p><AuthForm mode="sign-in" adminOnly /><p className="auth-switch"><Link href="/sign-in">Customer sign-in</Link></p></section></main>; }
