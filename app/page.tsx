import { HeroSlider } from "@/components/home/hero-slider";
import { FeaturedProducts } from "@/components/home/featured-products";
import { WelcomeSection } from "@/components/home/welcome-section";
import { ValueProps } from "@/components/home/value-props";
import { AboutSection } from "@/components/home/about-section";
import { ContactSection } from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedProducts grouped={undefined} />
      <WelcomeSection />
      <ContactSection />
      <ValueProps />
      <AboutSection />
    </>
  );
}
