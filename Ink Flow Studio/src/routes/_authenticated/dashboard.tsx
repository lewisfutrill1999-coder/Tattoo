import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Sage & Ink" }] }),
  component: Dashboard,
});

const serif = { fontFamily: "'Fraunces', serif" };

function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total: 0, new: 0, quoted: 0, booked: 0, claims: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    const sb = supabase as any;
    const [a, b, c, d, e, r] = await Promise.all([
      sb.from("enquiries").select("*", { count: "exact", head: true }),
      sb.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      sb.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "quoted"),
      sb.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "booked"),
      sb.from("flash_claims").select("*", { count: "exact", head: true }),
      sb.from("enquiries").select("id,full_name,idea,style,status,created_at").order("created_at", { ascending: false }).limit(5),
    ]);
    setStats({ total: a.count ?? 0, new: b.count ?? 0, quoted: c.count ?? 0, booked: d.count ?? 0, claims: e.count ?? 0 });
    setRecent(r.data ?? []);
    setLoading(false);
  })(); }, []);

  async function signOut() { await supabase.auth.signOut(); navigate({ to: "/auth" }); }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Artist</p>
          <h1 style={serif} className="mt-2 text-4xl font-semibold tracking-tight">Dashboard</h1>
        </div>
          <div className="flex gap-2">
            <Link
              to="/settings"
              className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
            >
              Edit website
            </Link>

            <Link
              to="/enquiries"
              className="rounded-full border border-border px-4 py-2 text-sm hover:bg-accent"
            >
              Manage enquiries
            </Link>

            <button
              onClick={signOut}
              className="rounded-full bg-foreground text-background px-4 py-2 text-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
        <Stat label="Total enquiries" value={stats.total} />
        <Stat label="New" value={stats.new} highlight />
        <Stat label="Quoted" value={stats.quoted} />
        <Stat label="Booked" value={stats.booked} />
        <Stat label="Flash claims" value={stats.claims} />
      </div>
      <div className="mt-10 rounded-2xl border border-border/60 bg-card overflow-hidden">
        <div className="px-5 py-4 border-b border-border/60 flex items-center justify-between">
          <h2 className="font-semibold">Recent enquiries</h2>
          <Link to="/enquiries" className="text-sm text-primary hover:underline">View all →</Link>
        </div>
        {loading ? <div className="p-8 text-center text-muted-foreground text-sm">Loading...</div>
        : recent.length === 0 ? <div className="p-8 text-center text-muted-foreground text-sm">No enquiries yet.</div>
        : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr><th className="text-left px-5 py-3">Client</th><th className="text-left px-5 py-3">Idea</th><th className="text-left px-5 py-3">Style</th><th className="text-left px-5 py-3">Status</th><th className="text-left px-5 py-3">Received</th></tr>
              </thead>
              <tbody>
                {recent.map((r) => (
                  <tr key={r.id} className="border-t border-border/60">
                    <td className="px-5 py-3 font-medium">{r.full_name}</td>
                    <td className="px-5 py-3 text-muted-foreground max-w-xs truncate">{r.idea}</td>
                    <td className="px-5 py-3">{r.style}</td>
                    <td className="px-5 py-3"><StatusPill s={r.status} /></td>
                    <td className="px-5 py-3 text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${highlight ? "bg-foreground text-background border-foreground" : "bg-card border-border/60"}`}>
      <p className={`text-xs uppercase tracking-wider ${highlight ? "text-background/60" : "text-muted-foreground"}`}>{label}</p>
      <p style={serif} className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}

export function StatusPill({ s }: { s: string }) {
  const colours: Record<string, string> = {
    new: "bg-primary/25 text-foreground border-primary/40",
    reviewing: "bg-accent text-accent-foreground border-border",
    quoted: "bg-secondary text-secondary-foreground border-border",
    booked: "bg-foreground text-background border-foreground",
    completed: "bg-muted text-muted-foreground border-border",
    declined: "bg-destructive/20 text-destructive border-destructive/30",
  };
  return <span className={`text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${colours[s] ?? ""}`}>{s}</span>;
}