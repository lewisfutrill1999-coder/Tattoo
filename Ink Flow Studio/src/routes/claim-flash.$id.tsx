import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Check } from "lucide-react";

export const Route = createFileRoute("/claim-flash/$id")({
  head: () => ({ meta: [{ title: "Claim flash design — Sage & Ink" }] }),
  component: ClaimPage,
});

const serif = { fontFamily: "'Fraunces', serif" };
const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-ring";

const schema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  placement: z.string().trim().max(120).optional().or(z.literal("")),
  preferred_dates: z.string().trim().max(200).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm the consent checkbox" }) }),
});

function ClaimPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState<any>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (supabase.from("flash_designs") as any).select("*").eq("id", id).maybeSingle()
      .then(({ data }: any) => setDesign(data));
  }, [id]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const fd = new FormData(e.currentTarget);

    const raw = {
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      placement: String(fd.get("placement") ?? ""),
      preferred_dates: String(fd.get("preferred_dates") ?? ""),
      consent: fd.get("consent") === "on",
    };

    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }

    setSubmitting(true);

    const { data: updatedDesigns, error: statusError } = await (supabase as any)
      .from("flash_designs")
      .update({
        status: "claimed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .eq("status", "available")
      .select("id");

    if (statusError) {
      console.error(statusError);
      toast.error("Something went wrong while claiming this design.");
      setSubmitting(false);
      return;
    }

    if (!updatedDesigns || updatedDesigns.length === 0) {
      toast.error("Sorry, this design has already been claimed.");
      setSubmitting(false);
      return;
    }

    const { error } = await (supabase.from("flash_claims") as any).insert({
      flash_id: id,
      ...parsed.data,
    });

    if (error) {
      console.error(error);

      await (supabase as any)
        .from("flash_designs")
        .update({
          status: "available",
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      toast.error("Something went wrong.");
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setDone(true);
  }

  if (design === null) return <div className="mx-auto max-w-xl px-4 py-20 text-center text-muted-foreground">Loading...</div>;

  if (done) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center"><Check className="h-7 w-7 text-primary" /></div>
        <h1 style={serif} className="mt-6 text-3xl font-semibold">Claim submitted</h1>
        <p className="mt-3 text-muted-foreground">I'll reach out shortly to confirm your appointment for <strong>{design?.title}</strong>.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/flash" className="rounded-full border border-border px-6 py-3 text-sm">More flash</Link>
          <button onClick={() => navigate({ to: "/" })} className="rounded-full bg-foreground text-background px-6 py-3 text-sm">Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-20">
      <Link to="/flash" className="text-sm text-muted-foreground hover:text-foreground">← Back to flash</Link>
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-primary font-medium">Claim design</p>
      <h1 style={serif} className="mt-3 text-4xl font-semibold tracking-tight">{design?.title ?? "Flash design"}</h1>
      {design && <p className="mt-2 text-muted-foreground">{design.style} · {design.size} · £{Number(design.price).toFixed(0)}</p>}
      <form onSubmit={onSubmit} className="mt-10 space-y-6 rounded-3xl border border-border/60 bg-card p-6 md:p-8">
        <Field label="Full name"><input name="full_name" required maxLength={120} className={inputCls} /></Field>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="Email"><input name="email" type="email" required maxLength={255} className={inputCls} /></Field>
          <Field label="Phone (optional)"><input name="phone" maxLength={40} className={inputCls} /></Field>
        </div>
        <Field label="Preferred placement"><input name="placement" maxLength={120} className={inputCls} placeholder="e.g. inner forearm" /></Field>
        <Field label="Preferred dates"><input name="preferred_dates" maxLength={200} className={inputCls} placeholder="e.g. any weekday in April" /></Field>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 rounded border-border" />
          <span>I understand this claim is subject to the artist's confirmation and is not a booked appointment yet.</span>
        </label>
        <button disabled={submitting} className="w-full rounded-full bg-foreground text-background py-3 font-medium hover:opacity-90 disabled:opacity-60 transition">
          {submitting ? "Sending..." : "Submit claim"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-sm font-medium">{label}</span><div className="mt-1.5">{children}</div></label>;
}