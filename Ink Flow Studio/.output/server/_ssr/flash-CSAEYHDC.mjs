import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as Leaf } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flash-CSAEYHDC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var serif = { fontFamily: "'Fraunces', serif" };
function FlashGallery() {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		supabase.from("flash_designs").select("*").order("created_at", { ascending: false }).then(({ data }) => {
			setItems(data ?? []);
			setLoading(false);
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-12 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-primary font-medium",
				children: "Flash gallery"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: serif,
				className: "mt-3 text-4xl md:text-5xl font-semibold tracking-tight",
				children: "Ready-made designs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground max-w-2xl",
				children: "Each flash design is tattooed once. Claim your favourite and I'll be in touch to arrange a date."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10",
				children: [loading && Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/5] rounded-2xl bg-muted animate-pulse" }, i)), !loading && items.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlashCard, { f }, f.id))]
			})
		]
	});
}
function FlashCard({ f }) {
	const badge = f.status === "available" ? "bg-primary/20 text-foreground border-primary/40" : f.status === "claimed" ? "bg-muted text-muted-foreground border-border" : "bg-foreground text-background border-foreground";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-card border border-border/60 overflow-hidden flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "aspect-[4/5] bg-gradient-to-br from-secondary via-background to-accent flex items-center justify-center relative",
			children: [f.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: f.image_url,
				alt: f.title,
				className: "h-full w-full object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {
				className: "h-16 w-16 text-primary/50",
				strokeWidth: 1
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: `absolute top-3 right-3 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border ${badge}`,
				children: f.status
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 flex-1 flex flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						style: serif,
						className: "text-xl font-semibold leading-tight",
						children: f.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: ["£", Number(f.price).toFixed(0)]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: [
						f.style,
						" · ",
						f.size
					]
				}),
				f.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: f.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 pt-4 border-t border-border/60",
					children: f.status === "available" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `/claim-flash/${f.id}`,
						className: "block text-center rounded-full bg-foreground text-background py-2.5 text-sm font-medium hover:opacity-90 transition",
						children: "Claim this design"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: true,
						className: "block w-full rounded-full border border-border py-2.5 text-sm text-muted-foreground cursor-not-allowed",
						children: f.status === "claimed" ? "Already claimed" : "Sold"
					})
				})
			]
		})]
	});
}
//#endregion
export { FlashGallery as component };
