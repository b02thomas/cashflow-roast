import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StatsRow } from "@/components/StatsRow";
import { ScoreVisualization } from "@/components/ScoreVisualization";
import { HowItWorks } from "@/components/HowItWorks";
import { RolesBadges } from "@/components/RolesBadges";
import { SocialProofCarousel } from "@/components/SocialProofCarousel";
import { TemplateGallery } from "@/components/TemplateGallery";
import { PricingCards } from "@/components/PricingCards";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--background)]">
      <Navbar />
      <HeroSection />
      <StatsRow />
      <ScoreVisualization />
      <HowItWorks />
      <RolesBadges />
      <SocialProofCarousel />
      <TemplateGallery />
      <PricingCards />
      <FinalCTA />
      <Footer />
    </main>
  );
}
