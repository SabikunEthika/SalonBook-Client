"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authRequest } from "@/lib/auth-api";

export function AuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSignUp = mode === "sign-up";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();
    if (isSignUp && (!/[A-Z]/.test(password) || !/[a-z]/.test(password))) {
      setError("Password must include at least one uppercase and one lowercase letter.");
      return;
    }
    setError(""); setIsSubmitting(true);
    try {
      await authRequest(isSignUp ? "/sign-up/email" : "/sign-in/email", isSignUp ? { name, email, password } : { email, password });
      window.dispatchEvent(new Event("salonbook:auth-change"));
      router.replace("/dashboard"); router.refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Something went wrong.");
    } finally { setIsSubmitting(false); }
  }

  return <form onSubmit={handleSubmit} noValidate>
    {isSignUp ? <label>Full name<input name="name" required minLength={2} placeholder="Your full name" /></label> : null}
    <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
    <label>Password<input name="password" type="password" required minLength={6} placeholder={isSignUp ? "At least 6 characters" : "••••••••"} /></label>
    {error ? <p className="form-error" role="alert">{error}</p> : null}
    <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Please wait…" : isSignUp ? "Create account" : "Sign in"} <span>→</span></button>
    {isSignUp ? <p className="auth-switch">Already have an account? <Link href="/sign-in">Sign in</Link></p> : <p className="auth-switch">New to SalonBook? <Link href="/sign-up">Create an account</Link></p>}
  </form>;
}
