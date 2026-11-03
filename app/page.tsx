import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";

import { CtaSection } from "@/components/sections/cta-section";
import { ServicesSection } from "@/components/sections/services-section";
import {HeroSection} from "@/components/sections/hero-preview";
import { TextBar } from "@/components/sections/text-bar";
import { TeachersSection } from "@/components/sections/teachers-section";
import { PrayerSection } from "@/components/sections/prayer";
import { WhyChooseSection } from "@/components/sections/why-choose";


export default function HomePage() {
  return (
    <><TextBar />
      <Navbar />
      <main id="main">
         <div id="home">
        <HeroSection />
        </div>
         <div id="about">
        <AboutSection /></div>
         <div id="prayer">
        <PrayerSection /></div>
         <div id="teachers">
        <TeachersSection /></div>
         <div id="why-choose">
        <WhyChooseSection /></div>
         <div id="services">
        <ServicesSection /></div>
       

        
      </main>
      <Footer />
    </>
  );
}
