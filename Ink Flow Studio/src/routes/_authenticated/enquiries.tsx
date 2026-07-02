import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { StatusPill } from "./dashboard";

export const Route = createFileRoute("/_authenticated/enquiries")({
  head: () => ({ meta: [{ title: "Enquiries — Sage & Ink" }] }),
  component: EnquiriesPage,
});

const serif = { fontFamily: "'Fraunces', serif" };
const STATUSES = ["new", "reviewing", "quoted", "booked", "completed", "declined"];

function EnquiriesPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await (supabase.from("enquiries") as any).select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    const { error } = await (supabase.from("enquiries") as any).update({ status, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Status updated"); load(); }
  }
  async function saveNotes(id: string, notes: string) {
    const { error } = await (supabase.from("enquiries") as any).update({ artist_notes: notes, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error(error.message); else toast.success("Notes saved");
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">← Dashboard</Link>
      <h1 style={serif} className="mt-3 text-4xl font-semibold tracking-tight">Enquiries</h1>
      <div className="mt-8 space-y-3">
        {loading && <p className="text-muted-foreground text-sm">Loading...</p>}
        {!loading && rows.length === 0 && <p className="text-muted-foreground text-sm">No enquiries yet.</p>}
        {rows.map((r) => (
          <div key={r.id} className="rounded-2xl border border-border/60 bg-card">
            <button onClick={() => setOpen(open === r.id ? null : r.id)} className="w-full text-left p-5 grid grid-cols-2 md:grid-cols-7 gap-3 items-center hover:bg-secondary/40 transition">
              <div className="md:col-span-2">
                <p className="font-medium">{r.full_name}</p>
                <p className="text-xs text-muted-foreground">{r.email}</p>
              </div>
              <p className="text-sm text-muted-foreground truncate md:col-span-2">{r.idea}</p>
              <p className="text-sm">{r.style}</p>
              <p className="text-sm text-muted-foreground">{r.budget || "—"}</p>
              <StatusPill s={r.status} />
            </button>
            {open === r.id && (
              <div className="border-t border-border/60 p-5 grid md:grid-cols-2 gap-6">
                <dl className="text-sm space-y-2">
                  <Row k="Placement" v={r.placement} />
                  <Row k="Size" v={r.size} />
                  <Row k="Colour" v={r.colour} />
                  <Row k="Cover-up?" v={r.is_cover_up ? "Yes" : "No"} />
                  <Row k="Preferred dates" v={r.preferred_dates} />
                  <Row k="Budget" v={r.budget} />
                  <Row k="Phone" v={r.phone} />
                  <Row k="Reference" v={r.reference_image_url ? <a className="text-primary underline" target="_blank" rel="noreferrer" href={r.reference_image_url}>Open</a> : "—"} />
                  <Row k="Medical" v={r.medical_notes} />
                </dl>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-1.5">Status</p>
                    <div className="flex flex-wrap gap-2">
                      {STATUSES.map((s) => (
                        <button key={s} onClick={() => updateStatus(r.id, s)}
                          className={`text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition ${r.status === s ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:border-primary"}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1.5">Private artist notes</p>
                    <NotesEditor initial={r.artist_notes ?? ""} onSave={(v) => saveNotes(r.id, v)} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return <div className="grid grid-cols-3 gap-3"><dt className="text-muted-foreground">{k}</dt><dd className="col-span-2">{v || "—"}</dd></div>;
}

function NotesEditor({ initial, onSave }: { initial: string; onSave: (v: string) => void }) {
  const [v, setV] = useState(initial);
  return (
    <div>
      <textarea value={v} onChange={(e) => setV(e.target.value)} rows={4} maxLength={2000}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="Only visible to you..." />
      <button onClick={() => onSave(v)} className="mt-2 rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium">Save notes</button>
    </div>
  );
}