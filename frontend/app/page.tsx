import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ServicesSection } from "@/components/landing/services-section";
import { StatsSection } from "@/components/landing/stats-section";
import { DestinationsSection } from "@/components/landing/destinations-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CtaSection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { ChatWidget } from "@/features/chat/presentation/components/client/ChatWidget";

export default function Home() {
  return (
    <main className="bg-[#030712] min-h-screen overflow-x-clip">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <DestinationsSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}
