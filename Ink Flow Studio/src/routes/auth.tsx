import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Artist login — Sage & Ink" }] }),
  component: AuthPage,
});

const serif = { fontFamily: "'Fraunces', serif" };

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    if (!email || password.length < 6) { toast.error("Enter email and a 6+ char password"); return; }
    setBusy(true);
    const { error } = mode === "signin"
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/dashboard` } });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    if (mode === "signup") toast.success("Account created — check your inbox if confirmation is required.");
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="mx-auto max-w-md px-4 py-20">
      <h1 style={serif} className="text-3xl font-semibold tracking-tight">Artist login</h1>
      <p className="mt-2 text-sm text-muted-foreground">This area is for the studio artist only.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-2xl border border-border/60 bg-card p-6">
        <label className="block"><span className="text-sm font-medium">Email</span>
          <input name="email" type="email" required className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <label className="block"><span className="text-sm font-medium">Password</span>
          <input name="password" type="password" required minLength={6} className="mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
        </label>
        <button disabled={busy} className="w-full rounded-full bg-foreground text-background py-3 text-sm font-medium disabled:opacity-60">
          {busy ? "..." : mode === "signin" ? "Sign in" : "Create account"}
        </button>
        <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="w-full text-xs text-muted-foreground hover:text-foreground">
          {mode === "signin" ? "No account? Create one" : "Have an account? Sign in"}
        </button>
      </form>
      <p className="mt-4 text-xs text-muted-foreground">After creating your first account, the developer will grant it the admin role so you can access enquiries.</p>
    </div>
  );
}