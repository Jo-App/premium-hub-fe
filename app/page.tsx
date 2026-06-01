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
