import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings")({
  component: ArtistSettings,
});

function ArtistSettings() {
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
            defaultValue="SummerRose Tattoos"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tagline</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            defaultValue="Micro-Realism • Fine Line • Whimsical"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Studio name</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            defaultValue="Inkantations"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            defaultValue="Towcester, Northampton"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Instagram username</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            defaultValue="@summerrosetattoos"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Homepage intro text</label>
          <textarea
            className="mt-2 min-h-28 w-full rounded-lg border px-3 py-2"
            defaultValue="Custom tattoos by SummerRose, based at Inkantations in Towcester, Northampton. Submit an enquiry, claim a flash design, or get a rough price before you book."
          />
        </div>

        <button className="rounded-full bg-foreground px-5 py-2 text-background">
          Save changes
        </button>
      </div>
    </div>
  );
}