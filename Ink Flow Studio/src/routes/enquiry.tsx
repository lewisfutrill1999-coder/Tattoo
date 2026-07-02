import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Tattoo Enquiry — Sage & Ink" },
      { name: "description", content: "Submit a custom tattoo enquiry: idea, style, size, placement, budget and reference images." },
    ],
  }),
  component: EnquiryPage,
});

const STYLES = ["Fine line", "Neo traditional", "Floral", "Script", "Blackwork", "Colour", "Cover-up", "Other"];
const serif = { fontFamily: "'Fraunces', serif" };

const schema = z.object({
  full_name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  idea: z.string().trim().min(10, "Please describe your idea in a little more detail").max(2000),
  style: z.string().min(1, "Select a style"),
  placement: z.string().trim().max(120).optional().or(z.literal("")),
  size: z.string().trim().max(120).optional().or(z.literal("")),
  colour: z.string().max(60).optional().or(z.literal("")),
  is_cover_up: z.boolean(),
  reference_image_url: z.string().trim().max(500).optional().or(z.literal("")),
  preferred_dates: z.string().trim().max(200).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  medical_notes: z.string().trim().max(1000).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm the consent checkbox" }) }),
});

function EnquiryPage() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const raw = {
      full_name: String(fd.get("full_name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      idea: String(fd.get("idea") ?? ""),
      style: String(fd.get("style") ?? ""),
      placement: String(fd.get("placement") ?? ""),
      size: String(fd.get("size") ?? ""),
      colour: String(fd.get("colour") ?? ""),
      is_cover_up: fd.get("is_cover_up") === "on",
      reference_image_url: String(fd.get("reference_image_url") ?? ""),
      preferred_dates: String(fd.get("preferred_dates") ?? ""),
      budget: String(fd.get("budget") ?? ""),
      medical_notes: String(fd.get("medical_notes") ?? ""),
      consent: fd.get("consent") === "on",
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setSubmitting(true);
    const { error } = await (supabase.from("enquiries") as any).insert(parsed.data);
    setSubmitting(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    navigate({ to: "/enquiry/thanks" });
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Custom tattoo</p>
      <h1 style={serif} className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Tell me about your idea</h1>
      <p className="mt-3 text-muted-foreground">Fill this in as best you can — the more detail, the better the quote. All fields other than the ones marked optional are required.</p>

      <form onSubmit={onSubmit} className="mt-10 space-y-6 rounded-3xl border border-border/60 bg-card p-6 md:p-8">
        <Grid>
          <Field label="Full name"><input name="full_name" required maxLength={120} className={inputCls} /></Field>
          <Field label="Email"><input name="email" type="email" required maxLength={255} className={inputCls} /></Field>
        </Grid>
        <Field label="Phone (optional)"><input name="phone" maxLength={40} className={inputCls} /></Field>

        <Field label="Describe your tattoo idea">
          <textarea name="idea" required rows={5} maxLength={2000} className={inputCls} placeholder="e.g. A single-needle wildflower sprig on my forearm, with peonies and small filler leaves..." />
        </Field>

        <Grid>
          <Field label="Style">
            <select name="style" required className={inputCls} defaultValue="">
              <option value="" disabled>Select style</option>
              {STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </Field>
          <Field label="Placement on body"><input name="placement" maxLength={120} className={inputCls} placeholder="e.g. inner forearm" /></Field>
        </Grid>

        <Grid>
          <Field label="Approximate size"><input name="size" maxLength={120} className={inputCls} placeholder='e.g. 4"×3"' /></Field>
          <Field label="Colour or black & grey">
            <select name="colour" className={inputCls} defaultValue="">
              <option value="">— choose —</option>
              <option>Black and grey</option>
              <option>Colour</option>
              <option>Not sure yet</option>
            </select>
          </Field>
        </Grid>

        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" name="is_cover_up" className="h-4 w-4 rounded border-border" />
          This is a cover-up of an existing tattoo
        </label>

        <Field label="Reference image URL (optional)">
          <input name="reference_image_url" maxLength={500} className={inputCls} placeholder="Paste a link (Instagram, Pinterest, Dropbox...)" />
          <p className="mt-1 text-xs text-muted-foreground">Upload images to a shared folder or Instagram post and paste the link.</p>
        </Field>

        <Grid>
          <Field label="Preferred appointment dates"><input name="preferred_dates" maxLength={200} className={inputCls} placeholder="e.g. weekends in March" /></Field>
          <Field label="Budget range">
            <select name="budget" className={inputCls} defaultValue="">
              <option value="">— choose —</option>
              <option>Under £150</option>
              <option>£150 – £300</option>
              <option>£300 – £600</option>
              <option>£600 – £1000</option>
              <option>£1000+</option>
              <option>Full day rate</option>
            </select>
          </Field>
        </Grid>

        <Field label="Medical concerns or allergies (optional)">
          <textarea name="medical_notes" rows={3} maxLength={1000} className={inputCls} placeholder="Anything I should know about — allergies, medication, skin conditions." />
        </Field>

        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-1 h-4 w-4 rounded border-border" />
          <span>I understand this is an <strong>enquiry, not a confirmed booking</strong>. The artist will review and reply to arrange a quote and date.</span>
        </label>

        <button disabled={submitting} className="w-full rounded-full bg-foreground text-background py-3 font-medium hover:opacity-90 disabled:opacity-60 transition">
          {submitting ? "Sending..." : "Submit enquiry"}
        </button>
      </form>
    </div>
  );
}

const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-ring";
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="text-sm font-medium">{label}</span><div className="mt-1.5">{children}</div></label>;
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid md:grid-cols-2 gap-4">{children}</div>;
}