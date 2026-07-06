import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-D7jZQad3.js
var import_jsx_runtime = require_jsx_runtime();
var $$splitComponentImporter = () => import("./dashboard-EK7ooqGN.mjs");
var Route = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [{ title: "Dashboard — SummerRose Tattoos" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
function StatusPill({ s }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border ${{
			new: "bg-primary/25 text-foreground border-primary/40",
			reviewing: "bg-accent text-accent-foreground border-border",
			quoted: "bg-secondary text-secondary-foreground border-border",
			booked: "bg-foreground text-background border-foreground",
			completed: "bg-muted text-muted-foreground border-border",
			declined: "bg-destructive/20 text-destructive border-destructive/30"
		}[s] ?? ""}`,
		children: s
	});
}
//#endregion
export { StatusPill as n, Route as t };
