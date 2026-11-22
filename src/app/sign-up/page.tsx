import { AuthForm } from "@/components/AuthForm";
import { SiteHeader } from "@/components/SiteHeader";
export default function SignUpPage() { return <><SiteHeader /><main className="auth-page"><section><p className="eyebrow">A little time for you</p><h1>Let&apos;s get <em>started.</em></h1><p>Create an account to request appointments and keep every detail in one place.</p><AuthForm mode="sign-up" /></section></main></>; }
