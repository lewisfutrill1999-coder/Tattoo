import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowRight, Calculator } from "lucide-react";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "Tattoo Price Estimator — Sage & Ink" },
      { name: "description", content: "Get a rough tattoo price estimate based on size, detail, colour, placement and cover-up." },
    ],
  }),
  component: Estimator,
});

const serif = { fontFamily: "'Fraunces', serif" };
const sizes = { Small: 100, Medium: 220, Large: 450, "Full day": 750 } as const;
const detail = { Simple: 1, Medium: 1.35, Detailed: 1.75 } as const;
const colour = { "Black & grey": 1, Colour: 1.25 } as const;
const difficulty = { Easy: 1, Medium: 1.15, Difficult: 1.3 } as const;

function Estimator() {
  const navigate = useNavigate();
  const [size, setSize] = useState<keyof typeof sizes>("Small");
  const [det, setDet] = useState<keyof typeof detail>("Simple");
  const [col, setCol] = useState<keyof typeof colour>("Black & grey");
  const [diff, setDiff] = useState<keyof typeof difficulty>("Easy");
  const [cover, setCover] = useState(false);
  const range = useMemo(() => {
    const base = sizes[size] * detail[det] * colour[col] * difficulty[diff] * (cover ? 1.25 : 1);
    return { low: Math.round(base / 10) * 10, high: Math.round((base * 1.35) / 10) * 10 };
  }, [size, det, col, diff, cover]);
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:py-20">
      <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">Price estimator</p>
      <h1 style={serif} className="mt-3 text-4xl md:text-5xl font-semibold tracking-tight">Rough price, in seconds</h1>
      <p className="mt-3 text-muted-foreground">This is a guide only — final quote is confirmed after I've seen your reference and design.</p>
      <div className="mt-10 space-y-6 rounded-3xl border border-border/60 bg-card p-6 md:p-8">
        <Choice label="Size" value={size} setValue={setSize} options={Object.keys(sizes)} />
        <Choice label="Detail level" value={det} setValue={setDet} options={Object.keys(detail)} />
        <Choice label="Colour" value={col} setValue={setCol} options={Object.keys(colour)} />
        <Choice label="Placement difficulty" value={diff} setValue={setDiff} options={Object.keys(difficulty)} />
        <label className="flex items-center gap-3 text-sm pt-2 border-t border-border/60">
          <input type="checkbox" checked={cover} onChange={(e) => setCover(e.target.checked)} className="h-4 w-4 rounded border-border" />
          This is a cover-up
        </label>
      </div>
      <div className="mt-8 rounded-3xl bg-foreground text-background p-8">
        <div className="flex items-center gap-3 text-background/70 text-sm"><Calculator className="h-4 w-4" /> Estimated price range</div>
        <p style={serif} className="mt-2 text-5xl font-semibold tracking-tight">£{range.low} – £{range.high}</p>
        <button onClick={() => navigate({ to: "/enquiry" })} className="mt-6 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium">
          Submit as enquiry <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Choice<T extends string>({ label, value, setValue, options }: { label: string; value: T; setValue: (v: T) => void; options: string[] }) {
  return (
    <div>
      <p className="text-sm font-medium">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" onClick={() => setValue(o as T)}
            className={`rounded-full px-4 py-2 text-sm border transition ${value === o ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover:border-primary"}`}>
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}