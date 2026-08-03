import { Footer } from "./landing/Footer";
import { ContactSection } from "./landing/ContactSection";
import { PricingSection } from "./landing/PricingSection";
import { Header } from "./landing/Header";
import { HeroSection } from "./landing/HeroSection";
import { FeaturesSection } from "./landing/FeaturesSection";
import { TestimonialsSection } from "./landing/TestimonialsSection";

export default function Landing() {

  const scrollToInit = () => {
    document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToAboutUs = () => {
    document.getElementById("about-us")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPrice = () => {
    document.getElementById("price")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <Header scrollToInit={scrollToInit} scrollToAboutUs={scrollToAboutUs} scrollToContact={scrollToContact} scrollToPrice={scrollToPrice} />
      <HeroSection />
      <FeaturesSection />
      {/* <TestimonialsSection /> DESCOMENTAR CUANDO HAYAN TESTIMONIOS EN BD (POR TENANT) */}
      <PricingSection scrollToContact={scrollToContact} />
      <ContactSection />
      <Footer scrollToInit={scrollToInit} scrollToAboutUs={scrollToAboutUs} scrollToContact={scrollToContact} scrollToPrice={scrollToPrice} />
    </main>
  );
}
