import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer"><div><Link className="brand" href="/"><span>✦</span> SalonBook</Link><p>Thoughtful salon care, made simple to book.</p></div><div><h3>Explore</h3><Link href="/services">Services</Link><Link href="/sign-in">My appointments</Link></div><div><h3>Visit us</h3><p>18 Rosewood Avenue<br />Dhaka, Bangladesh</p><p>Tue–Sun · 10am–8pm</p></div><div><h3>Stay connected</h3><p>hello@salonbook.com<br />+880 1700 000000</p></div><p className="copyright">© 2026 SalonBook. Made for your best self.</p></footer>;
}
