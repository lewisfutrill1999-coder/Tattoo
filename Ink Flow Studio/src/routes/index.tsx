import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Sparkles, Heart, Calculator, Leaf } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Home,
});

type Flash = { id: string; title: string; style: string; size: string; price: number; status: string };

const serif = { fontFamily: "'Fraunces', serif" };

function Home() {
  const [flash, setFlash] = useState<Flash[]>([]);
  useEffect(() => {
    (supabase.from("flash_designs") as any)
      .select("id,title,style,size,price,status")
      .eq("status", "available")
      .limit(4)
      .then(({ data }: any) => setFlash(data ?? []));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid md:grid-cols-5 gap-10 items-center">
          <div className="md:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Independent tattoo studio</p>
            <h1 style={serif} className="mt-4 text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight">
              Thoughtful ink,<br/>made just for you.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Fine line, botanical and blackwork tattoos by appointment. Submit an enquiry, claim a flash design, or get a rough price before you book.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/enquiry" className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition">
                Submit tattoo enquiry <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/flash" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-accent transition">
                View flash designs
              </Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-accent via-secondary to-muted border border-border/60 relative overflow-hidden">
              <div className="absolute inset-8 rounded-2xl border border-foreground/10 flex items-center justify-center">
                <Leaf className="h-20 w-20 text-primary/70" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ActionCard to="/enquiry" icon={<Sparkles className="h-5 w-5" />} title="Tattoo enquiry" desc="Tell me about your custom piece." />
          <ActionCard to="/flash" icon={<Leaf className="h-5 w-5" />} title="Flash designs" desc="Ready-made pieces to claim." />
          <ActionCard to="/aftercare" icon={<Heart className="h-5 w-5" />} title="Aftercare guide" desc="Heal your tattoo the right way." />
          <ActionCard to="/estimate" icon={<Calculator className="h-5 w-5" />} title="Price estimate" desc="Rough budget in 30 seconds." />
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-border/60 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <h2 style={serif} className="text-3xl md:text-4xl font-semibold tracking-tight">How booking works</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-10">
            {[
              { n: "01", t: "Submit enquiry", d: "Share your idea, reference images and preferred dates." },
              { n: "02", t: "Quote & date", d: "I'll review and reply within 3–5 days with a quote and date." },
              { n: "03", t: "Deposit & book", d: "A small deposit secures your appointment." },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl bg-card p-6 border border-border/60">
                <p className="text-xs font-mono text-primary">{s.n}</p>
                <h3 className="mt-2 font-semibold text-lg">{s.t}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured flash */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <h2 style={serif} className="text-3xl md:text-4xl font-semibold tracking-tight">Featured flash</h2>
            <p className="mt-2 text-muted-foreground">Available now — first to claim gets it.</p>
          </div>
          <Link to="/flash" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {flash.length === 0 ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-muted animate-pulse" />
            ))
          ) : flash.map((f) => (
            <Link key={f.id} to="/flash" className="group rounded-2xl bg-card border border-border/60 overflow-hidden hover:shadow-lg transition">
              <div className="aspect-square bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
                <Leaf className="h-12 w-12 text-primary/60 group-hover:scale-110 transition" strokeWidth={1} />
              </div>
              <div className="p-4">
                <p className="font-medium">{f.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{f.style} · £{Number(f.price).toFixed(0)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="rounded-3xl bg-foreground text-background p-10 md:p-16">
          <h2 style={serif} className="text-3xl md:text-4xl font-semibold tracking-tight">Ready when you are.</h2>
          <p className="mt-3 text-background/70 max-w-lg">Studio visits by appointment only. Reach out via enquiry form or DM on Instagram.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/enquiry" className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium">Start enquiry <ArrowRight className="h-4 w-4" /></Link>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm">@sageandink</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function ActionCard({ to, icon, title, desc }: { to: string; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <Link to={to} className="group rounded-2xl bg-card border border-border/60 p-6 hover:border-primary hover:shadow-md transition">
      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent transition">{icon}</div>
      <h3 className="mt-4 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </Link>
  );
}
