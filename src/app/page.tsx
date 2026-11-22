import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ServiceCard } from "@/components/ServiceCard";
import { categories } from "@/data/services";
import { getLiveServices } from "@/lib/services-api";

export default async function Home() {
  const services = await getLiveServices();
  return <><SiteHeader /><main>
    <section className="hero"><div className="hero-copy"><p className="eyebrow">Your time. Your glow.</p><h1>Care that looks<br /><em>like you.</em></h1><p className="hero-text">Book a moment of care with skilled professionals, thoughtful treatments, and a salon experience made around you.</p><Link href="/services" className="button">Explore salon services <span>→</span></Link><div className="hero-note"><span className="avatar-stack"><i>J</i><i>A</i><i>M</i></span><p><b>4.9 / 5</b> from 2,000+ happy guests</p></div></div><div className="hero-image"><Image src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1500&q=90" alt="Hair stylist creating a beautiful haircut" fill priority sizes="(max-width: 850px) 100vw, 50vw" /><div className="hero-badge"><span>Since</span><b>2012</b><span>in self-care</span></div></div></section>
    <section className="section" id="services"><div className="section-heading"><div><p className="eyebrow">Loved by our guests</p><h2>Small rituals.<br /><em>Big difference.</em></h2></div><Link href="/services" className="text-link">See all services <span>→</span></Link></div><div className="services-grid">{services.slice(0, 6).map((service) => <ServiceCard key={service.id} service={service} />)}</div></section>
    <section className="category-section"><div><p className="eyebrow">Find your ritual</p><h2>What are you in<br /><em>the mood for?</em></h2></div><div className="category-list">{categories.map((category, index) => <Link key={category} href={`/services?category=${encodeURIComponent(category)}`}><span>0{index + 1}</span>{category}<b>↗</b></Link>)}</div></section>
    <section className="experience" id="experience"><div className="experience-image"><Image src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=1200&q=85" alt="Relaxing salon treatment" fill sizes="(max-width: 850px) 100vw, 50vw" /></div><div className="experience-copy"><p className="eyebrow">The SalonBook way</p><h2>Made for the<br /><em>unhurried moment.</em></h2><p>From your first consultation to your final touch, every detail is designed to make you feel at home in your own skin.</p><div className="metrics"><div><strong>12+</strong><span>Years of care</span></div><div><strong>30k</strong><span>Appointments booked</span></div><div><strong>18</strong><span>Expert artists</span></div></div><Link href="/services" className="button button-light">Find your service <span>→</span></Link></div></section>
  </main><SiteFooter /></>;
}
