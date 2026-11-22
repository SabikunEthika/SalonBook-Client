import Image from "next/image";
import Link from "next/link";
import type { SalonService } from "@/data/services";

export function ServiceCard({ service }: { service: SalonService }) {
  return <article className="service-card"><div className="service-image"><Image src={service.image} alt={service.name} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /></div><div className="service-copy"><p className="eyebrow">{service.category}</p><div className="card-title"><h3>{service.name}</h3><strong>${service.price}</strong></div><p>{service.description}</p><div className="card-footer"><span>{service.duration} min</span><Link href={`/services/${service.id}`}>View details <span aria-hidden>→</span></Link></div></div></article>;
}
