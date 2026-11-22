import Link from "next/link";

export function SiteHeader() {
  return <header className="site-header"><Link className="brand" href="/"><span>✦</span> SalonBook</Link><nav aria-label="Main navigation"><Link href="/services">Services</Link><Link href="/#experience">Our experience</Link></nav><div className="header-actions"><Link href="/sign-in" className="text-link">Sign in</Link><Link href="/sign-up" className="button button-small">Book now</Link></div></header>;
}
