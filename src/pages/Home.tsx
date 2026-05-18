import { Navbar } from "../components/layout/NavBar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/ui/Hero";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { AboutSection } from "@/components/ui/AboutSection";
import { MissionVisionSection } from "@/components/ui/MissionVisionSection";
import { ValuesSection } from "@/components/ui/ValuesSection";
import { DonationBanner } from "@/components/ui/DonationBanner";
import { ProjectsSection } from "@/components/ui/ProjectsSection";

export default function Home() {
  useScrollReveal();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-cream)]">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <AboutSection />
        <MissionVisionSection />
        <ValuesSection />
        <ProjectsSection />
        <DonationBanner />
      </div>
      <Footer />
    </div>
  );
}
