import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/settings")({
  component: ArtistSettings,
});

type SiteSettings = {
  id?: string;
  business_name: string;
  tagline: string;
  studio_name: string;
  location: string;
  instagram_username: string;
  homepage_intro: string;
};

function ArtistSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    business_name: "SummerRose Tattoos",
    tagline: "Micro-Realism • Fine Line • Whimsical",
    studio_name: "Inkantations",
    location: "Towcester, Northampton",
    instagram_username: "@summerrosetattoos",
    homepage_intro:
      "Custom tattoos by SummerRose, based at Inkantations in Towcester, Northampton. Submit an enquiry, claim a flash design, or get a rough price before you book.",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await (supabase as any)
        .from("site_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error(error);
        setMessage("Could not load settings.");
      }

      if (data) {
        setSettings({
          id: data.id,
          business_name: data.business_name ?? "SummerRose Tattoos",
          tagline: data.tagline ?? "Micro-Realism • Fine Line • Whimsical",
          studio_name: data.studio_name ?? "Inkantations",
          location: data.location ?? "Towcester, Northampton",
          instagram_username: data.instagram_username ?? "@summerrosetattoos",
          homepage_intro:
            data.homepage_intro ??
            "Custom tattoos by SummerRose, based at Inkantations in Towcester, Northampton. Submit an enquiry, claim a flash design, or get a rough price before you book.",
        });
      }

      setLoading(false);
    }

    loadSettings();
  }, []);

  function updateField(field: keyof SiteSettings, value: string) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function saveSettings() {
    setSaving(true);
    setMessage("");

    if (!settings.id) {
      setMessage("Settings could not be saved because no settings record was found.");
      setSaving(false);
      return;
    }

    const { error } = await (supabase as any)
      .from("site_settings")
      .update({
        business_name: settings.business_name,
        tagline: settings.tagline,
        studio_name: settings.studio_name,
        location: settings.location,
        instagram_username: settings.instagram_username,
        homepage_intro: settings.homepage_intro,
        updated_at: new Date().toISOString(),
      })
      .eq("id", settings.id);

    if (error) {
      console.error(error);
      setMessage("Something went wrong. Settings were not saved.");
    } else {
      setMessage("Settings saved successfully.");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Artist Settings</h1>

      <p className="mt-2 text-muted-foreground">
        Edit the main website details without touching code.
      </p>

      <div className="mt-8 rounded-2xl border bg-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium">Business name</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.business_name}
            onChange={(event) => updateField("business_name", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tagline</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.tagline}
            onChange={(event) => updateField("tagline", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Studio name</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.studio_name}
            onChange={(event) => updateField("studio_name", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.location}
            onChange={(event) => updateField("location", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Instagram username</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.instagram_username}
            onChange={(event) => updateField("instagram_username", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Homepage intro text</label>
          <textarea
            className="mt-2 min-h-28 w-full rounded-lg border px-3 py-2"
            value={settings.homepage_intro}
            onChange={(event) => updateField("homepage_intro", event.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="rounded-full bg-foreground px-5 py-2 text-background disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
      </div>
    </div>
  );
}