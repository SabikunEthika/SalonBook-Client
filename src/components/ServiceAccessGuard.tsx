"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { getSession } from "@/lib/auth-api";

export function ServiceAccessGuard({ serviceId, children }: { serviceId: string; children: ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    let active = true;
    getSession().then((session) => {
      if (!active) return;
      if (!session?.user) {
        router.replace(`/sign-in?redirect=${encodeURIComponent(`/services/${serviceId}`)}`);
        return;
      }
      setAllowed(true);
    }).catch(() => router.replace(`/sign-in?redirect=${encodeURIComponent(`/services/${serviceId}`)}`));
    return () => { active = false; };
  }, [router, serviceId]);
  if (!allowed) return <main className="page-loader" aria-label="Checking access"><span>✦</span><p>Checking your access…</p></main>;
  return <>{children}</>;
}
