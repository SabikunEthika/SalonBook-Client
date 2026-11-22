export type SalonService = {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
  description: string;
  image: string;
};

export const categories = ["Haircut & Styling", "Hair Coloring", "Hair Treatment", "Facial & Skincare", "Makeup", "Manicure & Pedicure", "Spa & Massage"];

export const demoServices: SalonService[] = [
  { id: "signature-cut", name: "Signature Haircut", category: "Haircut & Styling", price: 35, duration: 45, description: "A consultation-led cut, finished with a polished blow-dry.", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=85" },
  { id: "luminous-color", name: "Luminous Color", category: "Hair Coloring", price: 95, duration: 120, description: "Rich, dimensional colour tailored to your complexion and style.", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=85" },
  { id: "silk-repair", name: "Silk Repair Ritual", category: "Hair Treatment", price: 48, duration: 50, description: "Deep nourishment that leaves stressed hair smooth and luminous.", image: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&w=900&q=85" },
  { id: "radiance-facial", name: "Radiance Facial", category: "Facial & Skincare", price: 62, duration: 60, description: "A glow-restoring treatment with gentle exfoliation and hydration.", image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=85" },
  { id: "event-makeup", name: "Event Makeup", category: "Makeup", price: 75, duration: 70, description: "Camera-ready makeup that feels like the most confident version of you.", image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?auto=format&fit=crop&w=900&q=85" },
  { id: "classic-manicure", name: "Classic Manicure", category: "Manicure & Pedicure", price: 32, duration: 45, description: "Detailed nail care, shaping, and your choice of timeless colour.", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=85" },
  { id: "calm-massage", name: "Calm Body Massage", category: "Spa & Massage", price: 80, duration: 75, description: "A restorative full-body massage designed around your needs.", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=85" },
];
