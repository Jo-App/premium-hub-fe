import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ProjectOverview from "@/components/ProjectOverview";
import LocationSection from "@/components/LocationSection";
import FloorPlanSection from "@/components/FloorPlanSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
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
      <div className="md:hidden h-14" />
    </>
  );
}
