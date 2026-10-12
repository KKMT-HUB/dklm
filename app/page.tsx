import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { BenefitsSection } from "@/components/sections/benefits-section";
import { CtaSection } from "@/components/sections/cta-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ServicesSection } from "@/components/sections/services-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <BenefitsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
