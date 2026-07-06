import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { c as Clock, i as Shield, l as Check, n as Sun, s as Droplet, t as TriangleAlert } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/aftercare-CI_0zJYR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var serif = { fontFamily: "'Fraunces', serif" };
var sections = [
	{
		icon: Clock,
		title: "First 24 hours",
		body: [
			"Leave the wrap on for 2–4 hours (or overnight if second-skin).",
			"Wash gently with lukewarm water and unscented soap.",
			"Pat dry with a clean paper towel — never rub.",
			"Apply a very thin layer of aftercare balm."
		]
	},
	{
		icon: Droplet,
		title: "Days 2 – 7",
		body: [
			"Wash 2–3× daily and moisturise lightly after each wash.",
			"Expect scabbing, itching and a little colour on your clothes.",
			"Do NOT pick, scratch or peel.",
			"Keep it out of direct sun and away from pets."
		]
	},
	{
		icon: Sun,
		title: "Weeks 2 – 4",
		body: [
			"The tattoo will look dull and flaky — this is normal.",
			"Keep moisturising until skin feels smooth again.",
			"Avoid pools, saunas, hot tubs and long baths.",
			"Slowly reintroduce gentle exercise."
		]
	},
	{
		icon: Shield,
		title: "What to avoid",
		body: [
			"Direct sunlight and tanning beds for at least 4 weeks.",
			"Swimming or soaking (baths, pools, sea) for 2–3 weeks.",
			"Tight clothing that rubs the area.",
			"Shaving over the tattoo until fully healed."
		]
	},
	{
		icon: TriangleAlert,
		title: "Warning signs",
		body: [
			"Spreading redness, heat or swelling after day 3.",
			"Yellow/green discharge or a bad smell.",
			"Fever, chills or feeling unwell.",
			"If you see any of these — contact a GP promptly."
		]
	},
	{
		icon: Check,
		title: "When to request a touch-up",
		body: [
			"Wait a minimum of 6 weeks after your appointment.",
			"Small patchy spots on fine line pieces are common.",
			"Message me with a clear healed photo in daylight."
		]
	}
];
var checklist = [
	"Wrap removed and area washed",
	"Washing 2–3× a day",
	"Moisturiser applied lightly",
	"Kept out of the sun",
	"No swimming or soaking",
	"No picking or scratching"
];
function Aftercare() {
	const [checked, setChecked] = (0, import_react.useState)({});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-4 py-12 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-primary font-medium",
				children: "Aftercare"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: serif,
				className: "mt-3 text-4xl md:text-5xl font-semibold tracking-tight",
				children: "Healing your tattoo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground max-w-2xl",
				children: "Follow these steps carefully for the first month. If anything doesn't look right, message me a photo — I'd rather hear from you early."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid md:grid-cols-2 gap-4 mt-10",
				children: sections.map(({ icon: Icon, title, body }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card border border-border/60 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-9 w-9 rounded-full bg-secondary flex items-center justify-center text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-semibold",
							children: title
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-2 text-sm text-muted-foreground list-disc pl-5",
						children: body.map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: b }, b))
					})]
				}, title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-3xl bg-foreground text-background p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						style: serif,
						className: "text-2xl font-semibold",
						children: "Healing checklist"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-background/70 text-sm",
						children: "Tick each step as you go — saves for this session only."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-6 grid sm:grid-cols-2 gap-3",
						children: checklist.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3 rounded-xl bg-background/5 border border-background/10 px-4 py-3 cursor-pointer hover:bg-background/10 transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: !!checked[i],
								onChange: (e) => setChecked({
									...checked,
									[i]: e.target.checked
								}),
								className: "h-4 w-4"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: checked[i] ? "line-through text-background/50" : "",
								children: item
							})]
						}) }, item))
					})
				]
			})
		]
	});
}
//#endregion
export { Aftercare as component };
