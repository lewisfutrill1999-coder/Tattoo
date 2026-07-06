import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-EK7ooqGN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var serif = { fontFamily: "'Fraunces', serif" };
function Dashboard() {
	const navigate = useNavigate();
	const [stats, setStats] = (0, import_react.useState)({
		total: 0,
		new: 0,
		quoted: 0,
		booked: 0,
		claims: 0
	});
	const [recent, setRecent] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		(async () => {
			const sb = supabase;
			const [a, b, c, d, e, r] = await Promise.all([
				sb.from("enquiries").select("*", {
					count: "exact",
					head: true
				}),
				sb.from("enquiries").select("*", {
					count: "exact",
					head: true
				}).eq("status", "new"),
				sb.from("enquiries").select("*", {
					count: "exact",
					head: true
				}).eq("status", "quoted"),
				sb.from("enquiries").select("*", {
					count: "exact",
					head: true
				}).eq("status", "booked"),
				sb.from("flash_claims").select("*", {
					count: "exact",
					head: true
				}),
				sb.from("enquiries").select("id,full_name,idea,style,status,created_at").order("created_at", { ascending: false }).limit(5)
			]);
			setStats({
				total: a.count ?? 0,
				new: b.count ?? 0,
				quoted: c.count ?? 0,
				booked: d.count ?? 0,
				claims: e.count ?? 0
			});
			setRecent(r.data ?? []);
			setLoading(false);
		})();
	}, []);
	async function signOut() {
		await supabase.auth.signOut();
		navigate({ to: "/auth" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.2em] text-primary font-medium",
					children: "Artist"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					style: serif,
					className: "mt-2 text-4xl font-semibold tracking-tight",
					children: "Dashboard"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/settings",
							className: "rounded-full border border-border px-4 py-2 text-sm hover:bg-accent",
							children: "Edit website"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/manage-flash",
							className: "rounded-full border border-border px-4 py-2 text-sm hover:bg-accent",
							children: "Manage flash"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/flash-claims",
							className: "rounded-full border border-border px-4 py-2 text-sm hover:bg-accent",
							children: "Flash claims"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/enquiries",
							className: "rounded-full border border-border px-4 py-2 text-sm hover:bg-accent",
							children: "Manage enquiries"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: signOut,
							className: "rounded-full bg-foreground text-background px-4 py-2 text-sm",
							children: "Sign out"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-5 gap-4 mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Total enquiries",
						value: stats.total
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "New",
						value: stats.new,
						highlight: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Quoted",
						value: stats.quoted
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Booked",
						value: stats.booked
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Flash claims",
						value: stats.claims
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 rounded-2xl border border-border/60 bg-card overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 py-4 border-b border-border/60 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Recent enquiries"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/enquiries",
						className: "text-sm text-primary hover:underline",
						children: "View all →"
					})]
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-8 text-center text-muted-foreground text-sm",
					children: "Loading..."
				}) : recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-8 text-center text-muted-foreground text-sm",
					children: "No enquiries yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
							className: "bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-5 py-3",
									children: "Client"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-5 py-3",
									children: "Idea"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-5 py-3",
									children: "Style"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-5 py-3",
									children: "Status"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "text-left px-5 py-3",
									children: "Received"
								})
							] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: recent.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-t border-border/60",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 font-medium",
									children: r.full_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-muted-foreground max-w-xs truncate",
									children: r.idea
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: r.style
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { s: r.status })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-5 py-3 text-muted-foreground",
									children: new Date(r.created_at).toLocaleDateString()
								})
							]
						}, r.id)) })]
					})
				})]
			})
		]
	});
}
function Stat({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-2xl border p-5 ${highlight ? "bg-foreground text-background border-foreground" : "bg-card border-border/60"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `text-xs uppercase tracking-wider ${highlight ? "text-background/60" : "text-muted-foreground"}`,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			style: serif,
			className: "mt-2 text-3xl font-semibold",
			children: value
		})]
	});
}
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
export { StatusPill, Dashboard as component };
