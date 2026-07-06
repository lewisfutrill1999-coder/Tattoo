import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as StatusPill } from "./dashboard-D7jZQad3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquiries-BTrVFBG-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var serif = { fontFamily: "'Fraunces', serif" };
var STATUSES = [
	"new",
	"reviewing",
	"quoted",
	"booked",
	"completed",
	"declined"
];
function EnquiriesPage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [open, setOpen] = (0, import_react.useState)(null);
	async function load() {
		setLoading(true);
		const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
		setRows(data ?? []);
		setLoading(false);
	}
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	async function updateStatus(id, status) {
		const { error } = await supabase.from("enquiries").update({
			status,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id);
		if (error) toast.error(error.message);
		else {
			toast.success("Status updated");
			load();
		}
	}
	async function saveNotes(id, notes) {
		const { error } = await supabase.from("enquiries").update({
			artist_notes: notes,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id);
		if (error) toast.error(error.message);
		else toast.success("Notes saved");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dashboard",
				className: "text-sm text-muted-foreground hover:text-foreground",
				children: "← Dashboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: serif,
				className: "mt-3 text-4xl font-semibold tracking-tight",
				children: "Enquiries"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-3",
				children: [
					loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: "Loading..."
					}),
					!loading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted-foreground text-sm",
						children: "No enquiries yet."
					}),
					rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border/60 bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setOpen(open === r.id ? null : r.id),
							className: "w-full text-left p-5 grid grid-cols-2 md:grid-cols-7 gap-3 items-center hover:bg-secondary/40 transition",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: r.full_name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: r.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground truncate md:col-span-2",
									children: r.idea
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: r.style
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: r.budget || "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { s: r.status })
							]
						}), open === r.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border/60 p-5 grid md:grid-cols-2 gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "text-sm space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Placement",
										v: r.placement
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Size",
										v: r.size
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Colour",
										v: r.colour
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Cover-up?",
										v: r.is_cover_up ? "Yes" : "No"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Preferred dates",
										v: r.preferred_dates
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Budget",
										v: r.budget
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Phone",
										v: r.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Reference",
										v: r.reference_image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											className: "text-primary underline",
											target: "_blank",
											rel: "noreferrer",
											href: r.reference_image_url,
											children: "Open"
										}) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
										k: "Medical",
										v: r.medical_notes
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium mb-1.5",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-2",
									children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => updateStatus(r.id, s),
										className: `text-xs uppercase tracking-wider px-3 py-1.5 rounded-full border transition ${r.status === s ? "bg-foreground text-background border-foreground" : "bg-background border-border hover:border-primary"}`,
										children: s
									}, s))
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium mb-1.5",
									children: "Private artist notes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesEditor, {
									initial: r.artist_notes ?? "",
									onSave: (v) => saveNotes(r.id, v)
								})] })]
							})]
						})]
					}, r.id))
				]
			})
		]
	});
}
function Row({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-3 gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-muted-foreground",
			children: k
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "col-span-2",
			children: v || "—"
		})]
	});
}
function NotesEditor({ initial, onSave }) {
	const [v, setV] = (0, import_react.useState)(initial);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		value: v,
		onChange: (e) => setV(e.target.value),
		rows: 4,
		maxLength: 2e3,
		className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm",
		placeholder: "Only visible to you..."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		onClick: () => onSave(v),
		className: "mt-2 rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium",
		children: "Save notes"
	})] });
}
//#endregion
export { EnquiriesPage as component };
