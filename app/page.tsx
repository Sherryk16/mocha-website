import { HeroSlider } from "@/components/home/hero-slider";
import HeroSection from "@/components/home/hero-section";
import { BrandsShowcase } from "@/components/home/brands-showcase";
import { ValueProps } from "@/components/home/value-props";
import { ContactSection } from "@/components/home/contact-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CATEGORIES, getFeaturedProducts } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const featuredCategories = CATEGORIES.filter((c) =>
    featured.some((p) => p.category === c.slug)
  ).slice(0, 3);

  const grouped = featuredCategories.map((c) => ({
    slug: c.slug,
    label: c.label,
    products: featured.filter((p) => p.category === c.slug),
  }));

  return (
    <>
      <HeroSlider />
      <FeaturedProducts grouped={grouped} />
      <HeroSection />
      <BrandsShowcase />
      <ValueProps />
      <ContactSection />
    </>
  );
}
