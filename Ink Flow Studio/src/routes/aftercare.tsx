import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, AlertTriangle, Clock, Droplet, Sun, Shield } from "lucide-react";

export const Route = createFileRoute("/aftercare")({
  head: () => ({
    meta: [
      { title: "Tattoo Aftercare Guide — Sage & Ink" },
      { name: "description", content: "How to look after your new tattoo — the first 24 hours, weeks 2–4, warning signs and touch-ups." },
    ],
  }),
  component: Aftercare,
});

const serif = { fontFamily: "'Fraunces', serif" };

const sections = [
  { icon: Clock, title: "First 24 hours", body: ["Leave the wrap on for 2–4 hours (or overnight if second-skin).", "Wash gently with lukewarm water and unscented soap.", "Pat dry with a clean paper towel — never rub.", "Apply a very thin layer of aftercare balm."] },
  { icon: Droplet, title: "Days 2 – 7", body: ["Wash 2–3× daily and moisturise lightly after each wash.", "Expect scabbing, itching and a little colour on your clothes.", "Do NOT pick, scratch or peel.", "Keep it out of direct sun and away from pets."] },
  { icon: Sun, title: "Weeks 2 – 4", body: ["The tattoo will look dull and flaky — this is normal.", "Keep moisturising until skin feels smooth again.", "Avoid pools, saunas, hot tubs and long baths.", "Slowly reintroduce gentle exercise."] },
  { icon: Shield, title: "What to avoid", body: ["Direct sunlight and tanning beds for at least 4 weeks.", "Swimming or soaking (baths, pools, sea) for 2–3 weeks.", "Tight clothing that rubs the area.", "Shaving over the tattoo until fully healed."] },
  { icon: AlertTriangle, title: "Warning signs", body: ["Spreading redness, heat or swelling after day 3.", "Yellow/green discharge or a bad smell.", "Fever, chills or feeling unwell.", "If you see any of these — contact a GP promptly."] },
  { icon: Check, title: "When to request a touch-up", body: ["Wait a minimum of 6 weeks after your appointment.", "Small patchy spots on fine line pieces are common.", "Message me with a clear healed photo in daylight."] },
];

const checklist = ["Wrap removed and area washed","Washing 2–3× a day","Moisturiser applied lightly","Kept out of the sun","No swimming or soaking","No picking or scratching"];

function Aftercare() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Aftercare</p>
      <h1 style={serif} className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Healing your tattoo</h1>
      <p className="mt-3 text-muted-foreground max-w-2xl">Follow these steps carefully for the first month. If anything doesn't look right, message me a photo — I'd rather hear from you early.</p>
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        {sections.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-2xl bg-card border border-border/60 p-6">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-primary"><Icon className="h-4 w-4" /></div>
              <h2 className="font-semibold">{title}</h2>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5">
              {body.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-3xl bg-foreground text-background p-8">
        <h2 style={serif} className="text-2xl font-semibold">Healing checklist</h2>
        <p className="mt-1 text-background/70 text-sm">Tick each step as you go — saves for this session only.</p>
        <ul className="mt-6 grid sm:grid-cols-2 gap-3">
          {checklist.map((item, i) => (
            <li key={item}>
              <label className="flex items-center gap-3 rounded-xl bg-background/5 border border-background/10 px-4 py-3 cursor-pointer hover:bg-background/10 transition">
                <input type="checkbox" checked={!!checked[i]} onChange={(e) => setChecked({ ...checked, [i]: e.target.checked })} className="h-4 w-4" />
                <span className={checked[i] ? "line-through text-background/50" : ""}>{item}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}