import HeroClient from "./HeroClient";
import { getHeroSlides, getHomeSettings, getContactConfig } from "@/app/lib/api";

export default async function HeroSection() {
  const [slides, settings, contact] = await Promise.all([
    getHeroSlides().catch(() => []),
    getHomeSettings().catch(() => null),
    getContactConfig().catch(() => null),
  ]);
  return <HeroClient slides={slides} settings={settings} phone={contact?.main_phone ?? "1600-0000"} />;
}
