import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ServicesExplorer } from "./services-explorer";

export default function ServicesPage() { return <><SiteHeader /><main className="browse-page"><div className="browse-intro"><p className="eyebrow">Our service menu</p><h1>Find time for <em>you.</em></h1><p>Explore treatments carefully chosen to help you feel restored, confident, and entirely yourself.</p></div><ServicesExplorer /></main><SiteFooter /></>; }
