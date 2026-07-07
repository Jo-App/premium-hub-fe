import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProjectOverview from "@/components/ProjectOverview";
import LocationSection from "@/components/LocationSection";
import FloorPlanSection from "@/components/FloorPlanSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";
import PopupModal from "@/components/PopupModal";
import { getActivePopups } from "@/app/lib/api";

// 빌드 시점에 백엔드로 프리렌더(SSG)하지 않고 요청 시점에 렌더링한다.
// 백엔드(NEXT_PUBLIC_API_URL)가 Vercel 빌드 서버에서 도달 불가여도 빌드가 실패하지 않도록.
export const dynamic = "force-dynamic";

export default async function Home() {
  const popups = await getActivePopups().catch(() => []);

  return (
    <>
      <Header />
      <main className="pt-14 md:pt-16">
        <HeroSection />
        <FeaturesSection />
        <ProjectOverview />
        <LocationSection />
        <FloorPlanSection />
        <ContactSection />
      </main>
      <Footer />
      <FloatingCTA />
      <PopupModal popups={popups} />
      <div className="md:hidden h-14" />
    </>
  );
}
