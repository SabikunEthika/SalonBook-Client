import { demoServices, type SalonService } from "@/data/services";
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
type ServerService = { _id: string; serviceName: string; category: string; price: number; duration: number; description: string; image: string };
export async function getLiveServices(): Promise<SalonService[]> {
  try {
    const response = await fetch(`${apiUrl}/api/services?status=active&limit=24`, { next: { revalidate: 60 } });
    if (!response.ok) return demoServices;
    const payload = await response.json() as { data?: ServerService[] };
    return payload.data?.map((service) => ({ id: service._id, name: service.serviceName, category: service.category, price: service.price, duration: service.duration, description: service.description, image: service.image })) ?? demoServices;
  } catch { return demoServices; }
}
