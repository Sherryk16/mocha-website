import { Container, Eyebrow, Heading } from "@/components/ui/layout";
import { IconStar } from "@/components/ui/icons";

const TESTIMONIALS = [
  {
    quote:
      "White Rhino's Signature Blend is the workhorse of our café menu. It pulls beautifully on espresso and holds up under milk. We've cut our recipe-tweaking time in half since we switched.",
    author: "Maya R.",
    role: "Owner · The Daily Pour, Detroit",
  },
  {
    quote:
      "Standing-order pricing on Pistachio Verde Sauce has been a game-changer. Same-week delivery, locked-in pricing, and a real human on the phone when I need to adjust.",
    author: "Devon T.",
    role: "GM · Café 15401, Dearborn",
  },
  {
    quote:
      "The Coffee Bean Corral lots come with full traceability. My customers ask about origin now — and I have an actual answer.",
    author: "Avery L.",
    role: "Head Roaster · Ember Coffee, Ann Arbor",
  },
];

export function Testimonials() {
  return (
    <section className="bg-coffee-50">
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>What our clients are saying</Eyebrow>
          <Heading className="mt-2">Cafés that run on Mocha.</Heading>
          <p className="mt-3 text-coffee-700">
            A handful of the businesses that have built their beverage program
            on Mocha Wholesale.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.author}
              className="flex h-full flex-col justify-between rounded-2xl border border-coffee-200 bg-white p-6 smooth-shadow"
            >
              <div>
                <div className="flex items-center gap-0.5 text-coffee-700">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-coffee-800">
                  “{t.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-5 border-t border-coffee-200 pt-4 text-xs">
                <p className="font-semibold text-coffee-900">{t.author}</p>
                <p className="text-coffee-500">{t.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
