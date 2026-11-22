import Link from "next/link";
export default function NotFound() { return <main className="not-found"><p className="eyebrow">404</p><h1>That page has wandered off.</h1><p>Let&apos;s bring you back to something beautiful.</p><Link href="/" className="button">Back home <span>→</span></Link></main>; }
