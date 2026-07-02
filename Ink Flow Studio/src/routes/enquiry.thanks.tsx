import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/enquiry/thanks")({
  head: () => ({ meta: [{ title: "Enquiry received — Sage & Ink" }] }),
  component: Thanks,
});

function Thanks() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <div className="mx-auto h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
        <Check className="h-7 w-7 text-primary" />
      </div>
      <h1 style={{ fontFamily: "'Fraunces', serif" }} className="mt-6 text-4xl font-semibold tracking-tight">Enquiry received</h1>
      <p className="mt-4 text-muted-foreground">Thank you — the artist will review your enquiry and respond within a few days with a quote and available dates.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link to="/" className="rounded-full border border-border px-6 py-3 text-sm">Back home</Link>
        <Link to="/flash" className="rounded-full bg-foreground text-background px-6 py-3 text-sm">Browse flash</Link>
      </div>
    </div>
  );
}