"use client";
export default function Error({ reset }: { reset: () => void }) { return <main className="not-found"><p className="eyebrow">Something went wrong</p><h1>Let&apos;s try that again.</h1><p>We couldn&apos;t load this part of SalonBook just now.</p><button className="button" onClick={reset}>Try again <span>→</span></button></main>; }
