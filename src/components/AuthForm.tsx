"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { authRequest, getSession, signInWithGoogle, signOut } from "@/lib/auth-api";

export function AuthForm({ mode, adminOnly = false }: { mode: "sign-in" | "sign-up"; adminOnly?: boolean }) {
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
    const image = String(form.get("image") ?? "").trim();

    if (isSignUp && (!/[A-Z]/.test(password) || !/[a-z]/.test(password))) {
      setError("Password must include at least one uppercase and one lowercase letter.");
      return;
    }
    setError("");
    setIsSubmitting(true);
    try {
      await authRequest(
        isSignUp ? "/sign-up/email" : "/sign-in/email",
        isSignUp ? { name, email, password, ...(image ? { image } : {}) } : { email, password },
      );
      const session = await getSession();
      if (!session?.user) {
        throw new Error(
          isSignUp
            ? "Your account was created, but we could not start your session. Please sign in."
            : "We could not start your session. Please try again.",
        );
      }
      const isAdmin = session.user.role === "admin";
      if (adminOnly && !isAdmin) { await signOut(); throw new Error("This portal is reserved for administrators."); }
      if (!adminOnly && !isSignUp && isAdmin) { await signOut(); throw new Error("Administrators must use the admin portal."); }
      window.dispatchEvent(new Event("salonbook:auth-change"));
      router.replace("/dashboard");
      router.refresh();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleSignIn() {
    setError("");
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Google sign-in is unavailable.");
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {isSignUp ? <label>Full name<input name="name" required minLength={2} placeholder="Your full name" /></label> : null}
      <label>Email address<input name="email" type="email" required placeholder="you@example.com" /></label>
      <label>Password<input name="password" type="password" required minLength={6} placeholder={isSignUp ? "At least 6 characters" : "Password"} /></label>
      {isSignUp ? <label>Profile image URL (optional)<input name="image" type="url" placeholder="https://example.com/photo.jpg" /></label> : null}
      {error ? <p className="form-error" role="alert">{error}</p> : null}
      <button className="button" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Please wait…" : isSignUp ? "Create account" : "Sign in"} <span>→</span>
      </button>
      {!adminOnly ? (
        <>
          <div className="auth-divider"><span>or</span></div>
          <button className="google-button" type="button" disabled={isSubmitting} onClick={() => void handleGoogleSignIn()}>Continue with Google</button>
        </>
      ) : null}
      {isSignUp ? (
        <p className="auth-switch">Already have an account? <Link href="/sign-in">Sign in</Link></p>
      ) : !adminOnly ? (
        <p className="auth-switch">New to SalonBook? <Link href="/sign-up">Create an account</Link></p>
      ) : null}
    </form>
  );
}