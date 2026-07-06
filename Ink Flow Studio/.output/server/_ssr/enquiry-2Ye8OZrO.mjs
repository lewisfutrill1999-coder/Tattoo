import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as stringType, n as literalType, r as objectType, t as booleanType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquiry-2Ye8OZrO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STYLES = [
	"Fine line",
	"Neo traditional",
	"Floral",
	"Script",
	"Blackwork",
	"Colour",
	"Cover-up",
	"Other"
];
var serif = { fontFamily: "'Fraunces', serif" };
var schema = objectType({
	full_name: stringType().trim().min(1).max(120),
	email: stringType().trim().email().max(255),
	phone: stringType().trim().max(40).optional().or(literalType("")),
	idea: stringType().trim().min(10, "Please describe your idea in a little more detail").max(2e3),
	style: stringType().min(1, "Select a style"),
	placement: stringType().trim().max(120).optional().or(literalType("")),
	size: stringType().trim().max(120).optional().or(literalType("")),
	colour: stringType().max(60).optional().or(literalType("")),
	is_cover_up: booleanType(),
	reference_image_url: stringType().trim().max(500).optional().or(literalType("")),
	preferred_dates: stringType().trim().max(200).optional().or(literalType("")),
	budget: stringType().trim().max(60).optional().or(literalType("")),
	medical_notes: stringType().trim().max(1e3).optional().or(literalType("")),
	consent: literalType(true, { errorMap: () => ({ message: "Please confirm the consent checkbox" }) })
});
function EnquiryPage() {
	const navigate = useNavigate();
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const raw = {
			full_name: String(fd.get("full_name") ?? ""),
			email: String(fd.get("email") ?? ""),
			phone: String(fd.get("phone") ?? ""),
			idea: String(fd.get("idea") ?? ""),
			style: String(fd.get("style") ?? ""),
			placement: String(fd.get("placement") ?? ""),
			size: String(fd.get("size") ?? ""),
			colour: String(fd.get("colour") ?? ""),
			is_cover_up: fd.get("is_cover_up") === "on",
			reference_image_url: String(fd.get("reference_image_url") ?? ""),
			preferred_dates: String(fd.get("preferred_dates") ?? ""),
			budget: String(fd.get("budget") ?? ""),
			medical_notes: String(fd.get("medical_notes") ?? ""),
			consent: fd.get("consent") === "on"
		};
		const parsed = schema.safeParse(raw);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
			return;
		}
		setSubmitting(true);
		const { error } = await supabase.from("enquiries").insert(parsed.data);
		setSubmitting(false);
		if (error) {
			toast.error("Something went wrong. Please try again.");
			return;
		}
		navigate({ to: "/enquiry/thanks" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-12 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.2em] text-primary font-medium",
				children: "Custom tattoo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: serif,
				className: "mt-3 text-4xl md:text-5xl font-semibold tracking-tight",
				children: "Tell me about your idea"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted-foreground",
				children: "Fill this in as best you can — the more detail, the better the quote. All fields other than the ones marked optional are required."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-10 space-y-6 rounded-3xl border border-border/60 bg-card p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Full name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "full_name",
							required: true,
							maxLength: 120,
							className: inputCls
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Email",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "email",
							type: "email",
							required: true,
							maxLength: 255,
							className: inputCls
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Phone (optional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "phone",
							maxLength: 40,
							className: inputCls
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Describe your tattoo idea",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: "idea",
							required: true,
							rows: 5,
							maxLength: 2e3,
							className: inputCls,
							placeholder: "e.g. A single-needle wildflower sprig on my forearm, with peonies and small filler leaves..."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Style",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							name: "style",
							required: true,
							className: inputCls,
							defaultValue: "",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								disabled: true,
								children: "Select style"
							}), STYLES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s
							}, s))]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Placement on body",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "placement",
							maxLength: 120,
							className: inputCls,
							placeholder: "e.g. inner forearm"
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Approximate size",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "size",
							maxLength: 120,
							className: inputCls,
							placeholder: "e.g. 4\"×3\""
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Colour or black & grey",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							name: "colour",
							className: inputCls,
							defaultValue: "",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— choose —"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Black and grey" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Colour" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Not sure yet" })
							]
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							name: "is_cover_up",
							className: "h-4 w-4 rounded border-border"
						}), "This is a cover-up of an existing tattoo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
						label: "Reference image URL (optional)",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "reference_image_url",
							maxLength: 500,
							className: inputCls,
							placeholder: "Paste a link (Instagram, Pinterest, Dropbox...)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Upload images to a shared folder or Instagram post and paste the link."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Grid, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred appointment dates",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "preferred_dates",
							maxLength: 200,
							className: inputCls,
							placeholder: "e.g. weekends in March"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Budget range",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							name: "budget",
							className: inputCls,
							defaultValue: "",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "— choose —"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Under £150" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "£150 – £300" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "£300 – £600" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "£600 – £1000" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "£1000+" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Full day rate" })
							]
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Medical concerns or allergies (optional)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							name: "medical_notes",
							rows: 3,
							maxLength: 1e3,
							className: inputCls,
							placeholder: "Anything I should know about — allergies, medication, skin conditions."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							name: "consent",
							className: "mt-1 h-4 w-4 rounded border-border"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"I understand this is an ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "enquiry, not a confirmed booking" }),
							". The artist will review and reply to arrange a quote and date."
						] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: submitting,
						className: "w-full rounded-full bg-foreground text-background py-3 font-medium hover:opacity-90 disabled:opacity-60 transition",
						children: submitting ? "Sending..." : "Submit enquiry"
					})
				]
			})
		]
	});
}
var inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-ring";
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm font-medium",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1.5",
			children
		})]
	});
}
function Grid({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid md:grid-cols-2 gap-4",
		children
	});
}
//#endregion
export { EnquiryPage as component };
