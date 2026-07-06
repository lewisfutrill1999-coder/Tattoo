import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Leaf } from "lucide-react";

export const Route = createFileRoute("/flash")({
  head: () => ({
    meta: [
      { title: "Flash Designs — Sage & Ink" },
      { name: "description", content: "Browse available flash tattoo designs and claim your favourite." },
    ],
  }),
  component: FlashGallery,
});

const serif = { fontFamily: "'Fraunces', serif" };

type Flash = {
  id: string;
  title: string;
  style: string | null;
  size: string | null;
  price: number | null;
  description: string | null;
  image_url: string | null;
  status: "available" | "claimed" | "sold";
};

function FlashGallery() {
  const [items, setItems] = useState<Flash[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (supabase.from("flash_designs") as any).select("*").order("created_at", { ascending: false })
      .then(({ data }: any) => { setItems(data ?? []); setLoading(false); });
  }, []);
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Flash gallery</p>
      <h1 style={serif} className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Ready-made designs</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">Each flash design is tattooed once. Claim your favourite and I'll be in touch to arrange a date.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {loading && Array.from({ length: 6 }).map((_, i) => <div key={i} className="aspect-[4/5] rounded-2xl bg-muted animate-pulse" />)}
        {!loading && items.map((f) => <FlashCard key={f.id} f={f} />)}
      </div>
    </div>
  );
}

function FlashCard({ f }: { f: Flash }) {
  const badge = f.status === "available" ? "bg-primary/20 text-foreground border-primary/40"
    : f.status === "claimed" ? "bg-muted text-muted-foreground border-border"
      : "bg-foreground text-background border-foreground";
  return (
    <div className="rounded-2xl bg-card border border-border/60 overflow-hidden flex flex-col">
      <div className="aspect-[4/5] bg-gradient-to-br from-secondary via-background to-accent flex items-center justify-center relative">
        {f.image_url ? <img src={f.image_url} alt={f.title} className="h-full w-full object-cover" />
          : <Leaf className="h-16 w-16 text-primary/50" strokeWidth={1} />}
        <span className={`absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${badge}`}>{f.status}</span>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 style={serif} className="text-xl font-semibold leading-tight">{f.title}</h3>
          <span className="font-medium">£{Number(f.price).toFixed(0)}</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{f.style} · {f.size}</p>
        {f.description && <p className="mt-3 text-sm text-muted-foreground">{f.description}</p>}
        <div className="mt-5 pt-4 border-t border-border/60">
          {f.status === "available" ? (
            <a
              href={`/claim-flash/${f.id}`}
              className="block text-center rounded-full bg-foreground text-background py-2.5 text-sm font-medium hover:opacity-90 transition"
            >
              Claim this design
            </a>
          ) : (
            <button disabled className="block w-full rounded-full border border-border py-2.5 text-sm text-muted-foreground cursor-not-allowed">
              {f.status === "claimed" ? "Already claimed" : "Sold"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}