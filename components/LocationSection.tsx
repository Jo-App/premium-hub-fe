import LocationClient from "./LocationClient";
import { getLocationCategories, getHomeSettings } from "@/app/lib/api";

export default async function LocationSection() {
  const [categories, settings] = await Promise.all([
    getLocationCategories().catch(() => []),
    getHomeSettings().catch(() => null),
  ]);
  return <LocationClient categories={categories} settings={settings} />;
}
