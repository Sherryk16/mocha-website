import { HeroSlider } from "@/components/home/hero-slider";
import { MixMatchSection } from "@/components/home/mix-match-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { PartnersSection } from "@/components/home/partners-section";
import { WelcomeSection } from "@/components/home/welcome-section";
import { ValueProps } from "@/components/home/value-props";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <MixMatchSection />
      <FeaturedProducts grouped={undefined} />
      <PartnersSection />
      <WelcomeSection />
      <ContactSection />
      <ValueProps />
      <AboutSection />
    </>
  );
}
