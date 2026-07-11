import { Footer } from "./landing/Footer";
import { ContactSection } from "./landing/ContactSection";
import { PricingSection } from "./landing/PricingSection";
import { Header } from "./landing/Header";
import { HeroSection } from "./landing/HeroSection";
import { FeaturesSection } from "./landing/FeaturesSection";

export default function Landing() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPrice = () => {
    document.getElementById("price")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <Header scrollToContact={scrollToContact} scrollToPrice={scrollToPrice} />
      <HeroSection scrollToContact={scrollToContact} />
      <FeaturesSection />
      <PricingSection scrollToContact={scrollToContact} />
      <ContactSection />
      <Footer />
    </main>
  );
}
