import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { d as ArrowRight, u as Calculator } from "../_libs/lucide-react.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estimate-DQ_jQwzE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var serif = { fontFamily: "'Fraunces', serif" };
var sizes = {
	Small: 100,
	Medium: 220,
	Large: 450,
	"Full day": 750
};
var detail = {
	Simple: 1,
	Medium: 1.35,
	Detailed: 1.75
};
var colour = {
	"Black & grey": 1,
	Colour: 1.25
};
var difficulty = {
	Easy: 1,
	Medium: 1.15,
	Difficult: 1.3
};
function Estimator() {
	const navigate = useNavigate();
	const [size, setSize] = (0, import_react.useState)("Small");
	const [det, setDet] = (0, import_react.useState)("Simple");
	const [col, setCol] = (0, import_react.useState)("Black & grey");
	const [diff, setDiff] = (0, import_react.useState)("Easy");
	const [cover, setCover] = (0, import_react.useState)(false);
	const range = (0, import_react.useMemo)(() => {
		const base = sizes[size] * detail[det] * colour[col] * difficulty[diff] * (cover ? 1.25 : 1);
		return {
			low: Math.round(base / 10) * 10,
			high: Math.round(base * 1.35 / 10) * 10
		};
	}, [
		size,
		det,
		col,
		diff,
		cover
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-12 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-primary font-medium",
				children: "Price estimator"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: serif,
				className: "mt-3 text-4xl md:text-5xl font-semibold tracking-tight",
				children: "Rough price, in seconds"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "This is a guide only — final quote is confirmed after I've seen your reference and design."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-6 rounded-3xl border border-border/60 bg-card p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						label: "Size",
						value: size,
						setValue: setSize,
						options: Object.keys(sizes)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						label: "Detail level",
						value: det,
						setValue: setDet,
						options: Object.keys(detail)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						label: "Colour",
						value: col,
						setValue: setCol,
						options: Object.keys(colour)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Choice, {
						label: "Placement difficulty",
						value: diff,
						setValue: setDiff,
						options: Object.keys(difficulty)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 text-sm pt-2 border-t border-border/60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: cover,
							onChange: (e) => setCover(e.target.checked),
							className: "h-4 w-4 rounded border-border"
						}), "This is a cover-up"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-3xl bg-foreground text-background p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-background/70 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-4 w-4" }), " Estimated price range"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						style: serif,
						className: "mt-2 text-5xl font-semibold tracking-tight",
						children: [
							"£",
							range.low,
							" – £",
							range.high
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => navigate({ to: "/enquiry" }),
						className: "mt-6 inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium",
						children: ["Submit as enquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					})
				]
			})
		]
	});
}
function Choice({ label, value, setValue, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm font-medium",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-2 flex flex-wrap gap-2",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => setValue(o),
			className: `rounded-full px-4 py-2 text-sm border transition ${value === o ? "bg-foreground text-background border-foreground" : "bg-background text-foreground border-border hover:border-primary"}`,
			children: o
		}, o))
	})] });
}
//#endregion
export { Estimator as component };
