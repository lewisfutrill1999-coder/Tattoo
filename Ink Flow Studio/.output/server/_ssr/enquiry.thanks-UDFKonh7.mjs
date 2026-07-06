import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { l as Check } from "../_libs/lucide-react.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquiry.thanks-UDFKonh7.js
var import_jsx_runtime = require_jsx_runtime();
function Thanks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-7 w-7 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: { fontFamily: "'Fraunces', serif" },
				className: "mt-6 text-4xl font-semibold tracking-tight",
				children: "Enquiry received"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: "Thank you — the artist will review your enquiry and respond within a few days with a quote and available dates."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "rounded-full border border-border px-6 py-3 text-sm",
					children: "Back home"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/flash",
					className: "rounded-full bg-foreground text-background px-6 py-3 text-sm",
					children: "Browse flash"
				})]
			})
		]
	});
}
//#endregion
export { Thanks as component };
