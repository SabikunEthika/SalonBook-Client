"use client";

import { useMemo, useState } from "react";
import { ServiceCard } from "@/components/ServiceCard";
import { categories, type SalonService } from "@/data/services";

export function ServicesExplorer({ services: sourceServices }: { services: SalonService[] }) {
  const [search, setSearch] = useState(""); const [category, setCategory] = useState("All"); const [sort, setSort] = useState("featured");
  const services = useMemo(() => sourceServices.filter((service) => (category === "All" || service.category === category) && service.name.toLowerCase().includes(search.toLowerCase())).toSorted((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0), [sourceServices, category, search, sort]);
  return <section className="explorer"><div className="filter-row"><label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search services" aria-label="Search services" /></label><label className="select-box">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></label></div><div className="category-pills"><button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")}>All services</button>{categories.map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}</button>)}</div><p className="result-count">{services.length} services to choose from</p><div className="services-grid">{services.map((service) => <ServiceCard key={service.id} service={service} />)}</div>{services.length === 0 ? <p className="empty-state">No services match that search. Try another word or category.</p> : null}</section>;
}
