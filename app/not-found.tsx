import Link from "next/link";

import { Container, Heading } from "@/components/ui/layout";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-coffee-600">
        404
      </p>
      <Heading className="mt-2">This page wandered off.</Heading>
      <p className="mt-3 max-w-md text-coffee-700">
        Looks like that link is empty. Let's get you back to something
        delicious.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button size="lg">Back to home</Button>
        </Link>
        <Link href="/products">
          <Button size="lg" variant="outline">
            Browse products
          </Button>
        </Link>
      </div>
    </Container>
  );
}
