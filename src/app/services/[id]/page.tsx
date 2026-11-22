import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { demoServices } from "@/data/services";

export function generateStaticParams() { return demoServices.map(({ id }) => ({ id })); }

export default async function ServiceDetails({ params }: PageProps<"/services/[id]">) {
  const { id } = await params; const service = demoServices.find((item) => item.id === id); if (!service) notFound();
  return <><SiteHeader /><main className="detail-page"><div className="detail-crumb"><Link href="/services">Services</Link><span>/</span>{service.name}</div><div className="detail-grid"><div className="detail-image"><Image src={service.image} alt={service.name} fill priority sizes="(max-width: 850px) 100vw, 55vw" /></div><div className="detail-copy"><p className="eyebrow">{service.category}</p><h1>{service.name}</h1><p>{service.description} Let our specialists shape the session around exactly what you need today.</p><div className="detail-meta"><div><span>Duration</span><b>{service.duration} minutes</b></div><div><span>Investment</span><b>${service.price}</b></div></div><div className="booking-box"><h2>Ready when you are.</h2><p>Sign in to choose an appointment date and available time.</p><Link className="button" href={`/sign-in?redirect=/services/${service.id}`}>Sign in to book <span>→</span></Link></div></div></div></main><SiteFooter /></>;
}
