import { AuthForm } from "@/components/AuthForm";
import { SiteHeader } from "@/components/SiteHeader";
export default function SignInPage() { return <><SiteHeader /><main className="auth-page"><section><p className="eyebrow">Welcome back</p><h1>Good to see <em>you.</em></h1><p>Sign in to manage your appointments and book your next moment of care.</p><AuthForm mode="sign-in" /></section></main></>; }
