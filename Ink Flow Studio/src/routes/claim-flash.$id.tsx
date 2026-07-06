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
type ClaimFormData = z.infer<typeof schema>;

function ClaimPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [design, setDesign] = useState<any>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submittedClaim, setSubmittedClaim] = useState<ClaimFormData | null>(null);
  const [copied, setCopied] = useState(false);

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

    setSubmittedClaim(parsed.data);
    setSubmitting(false);
    setDone(true);
  }

  if (design === null) return <div className="mx-auto max-w-xl px-4 py-20 text-center text-muted-foreground">Loading...</div>;

  if (done) {
    const instagramMessage = `Hi SummerRose, I’ve just submitted a flash claim through your website.

    Design:
    Title: ${design?.title ?? "Flash design"}
    Style: ${design?.style || "Not provided"}
    Size: ${design?.size || "Not provided"}
    Price: ${design?.price !== null && design?.price !== undefined
            ? `£${Number(design.price).toFixed(0)}`
            : "Price TBC"
          }

    Name: ${submittedClaim?.full_name ?? ""}
    Email: ${submittedClaim?.email ?? ""}
    Phone: ${submittedClaim?.phone || "Not provided"}
    Placement: ${submittedClaim?.placement || "Not provided"}
    Preferred dates: ${submittedClaim?.preferred_dates || "Not provided"}

    I’d like to arrange the next steps through Instagram.`;

    async function copyInstagramMessage() {
      await navigator.clipboard.writeText(instagramMessage);
      setCopied(true);
    }

    return (
      <div className="mx-auto max-w-2xl px-4 py-24">
        <div className="rounded-3xl border bg-card p-6 md:p-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
            <Check className="h-7 w-7 text-primary" />
          </div>

          <h1 style={serif} className="mt-6 text-3xl font-semibold">
            Claim submitted
          </h1>

          <p className="mt-3 text-muted-foreground">
            Your claim for <strong>{design?.title}</strong> has been saved. Please
            now message me on Instagram so we can arrange the next steps.
          </p>

          {design?.image_url && (
            <img
              src={design.image_url}
              alt={design?.title}
              className="mx-auto mt-6 aspect-[4/5] w-48 rounded-2xl border object-cover"
            />
          )}

          <div className="mt-8 rounded-2xl bg-muted/40 p-4 text-left">
            <p className="text-sm font-medium">Copy this Instagram message:</p>

            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-background p-4 text-sm text-muted-foreground">
              {instagramMessage}
            </pre>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={copyInstagramMessage}
              className="rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium"
            >
              {copied ? "Message copied" : "Copy Instagram message"}
            </button>

            <a
              href="https://ig.me/m/summerrosetattoos"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium"
            >
              Open Instagram DM
            </a>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <Link to="/flash" className="text-sm text-muted-foreground hover:text-foreground">
              More flash
            </Link>

            <button
              onClick={() => navigate({ to: "/" })}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Home
            </button>
          </div>
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