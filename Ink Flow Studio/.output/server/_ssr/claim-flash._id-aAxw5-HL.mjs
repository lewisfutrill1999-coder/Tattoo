import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { l as Check } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
import { _ as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as stringType, n as literalType, r as objectType } from "../_libs/zod.mjs";
import { t as Route } from "./claim-flash._id-DFpYq8u1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/claim-flash._id-aAxw5-HL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var serif = { fontFamily: "'Fraunces', serif" };
var inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring focus:border-ring";
var schema = objectType({
	full_name: stringType().trim().min(1).max(120),
	email: stringType().trim().email().max(255),
	phone: stringType().trim().max(40).optional().or(literalType("")),
	customer_instagram: stringType().trim().max(80).optional().or(literalType("")),
	placement: stringType().trim().max(120).optional().or(literalType("")),
	preferred_dates: stringType().trim().max(200).optional().or(literalType("")),
	consent: literalType(true, { errorMap: () => ({ message: "Please confirm the consent checkbox" }) })
});
function ClaimPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const [design, setDesign] = (0, import_react.useState)(null);
	const [done, setDone] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [submittedClaim, setSubmittedClaim] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.from("flash_designs").select("*").eq("id", id).maybeSingle().then(({ data }) => setDesign(data));
	}, [id]);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const raw = {
			full_name: String(fd.get("full_name") ?? ""),
			email: String(fd.get("email") ?? ""),
			phone: String(fd.get("phone") ?? ""),
			customer_instagram: String(fd.get("customer_instagram") ?? ""),
			placement: String(fd.get("placement") ?? ""),
			preferred_dates: String(fd.get("preferred_dates") ?? ""),
			consent: fd.get("consent") === "on"
		};
		const parsed = schema.safeParse(raw);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
			return;
		}
		setSubmitting(true);
		const { data: updatedDesigns, error: statusError } = await supabase.from("flash_designs").update({
			status: "claimed",
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id).eq("status", "available").select("id");
		if (statusError) {
			console.error(statusError);
			toast.error("Something went wrong while claiming this design.");
			setSubmitting(false);
			return;
		}
		if (!updatedDesigns || updatedDesigns.length === 0) {
			toast.error("Sorry, this design has already been claimed.");
			setSubmitting(false);
			return;
		}
		const { error } = await supabase.from("flash_claims").insert({
			flash_id: id,
			...parsed.data
		});
		if (error) {
			console.error(error);
			await supabase.from("flash_designs").update({
				status: "available",
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", id);
			toast.error("Something went wrong.");
			setSubmitting(false);
			return;
		}
		setSubmittedClaim(parsed.data);
		setSubmitting(false);
		setDone(true);
	}
	if (design === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-xl px-4 py-20 text-center text-muted-foreground",
		children: "Loading..."
	});
	if (done) {
		const instagramMessage = `Hi SummerRose, I’ve just submitted a flash claim through your website.

    Design:
    Title: ${design?.title ?? "Flash design"}
    Style: ${design?.style || "Not provided"}
    Size: ${design?.size || "Not provided"}
    Price: ${design?.price !== null && design?.price !== void 0 ? `£${Number(design.price).toFixed(0)}` : "Price TBC"}

    Name: ${submittedClaim?.full_name ?? ""}
    Instagram: ${submittedClaim?.customer_instagram || "Not provided"}
    Email: ${submittedClaim?.email ?? ""}
    Phone: ${submittedClaim?.phone || "Not provided"}
    Placement: ${submittedClaim?.placement || "Not provided"}
    Preferred dates: ${submittedClaim?.preferred_dates || "Not provided"}

    I’d like to arrange the next steps through Instagram.`;
		async function copyInstagramMessage() {
			await navigator.clipboard.writeText(instagramMessage);
			setCopied(true);
		}
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-2xl px-4 py-24",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl border bg-card p-6 md:p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mx-auto h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-7 w-7 text-primary" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						style: serif,
						className: "mt-6 text-3xl font-semibold",
						children: "Claim submitted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-muted-foreground",
						children: [
							"Your claim for ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: design?.title }),
							" has been saved. Please now message me on Instagram so we can arrange the next steps."
						]
					}),
					design?.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: design.image_url,
						alt: design?.title,
						className: "mx-auto mt-6 aspect-[4/5] w-48 rounded-2xl border object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 rounded-2xl bg-muted/40 p-4 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Copy this Instagram message:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-3 whitespace-pre-wrap rounded-xl bg-background p-4 text-sm text-muted-foreground",
							children: instagramMessage
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: copyInstagramMessage,
							className: "rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium",
							children: copied ? "Message copied" : "Copy Instagram message"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://ig.me/m/summerrosetattoos",
							target: "_blank",
							rel: "noreferrer",
							className: "rounded-full border border-border px-6 py-3 text-sm font-medium",
							children: "Open Instagram DM"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex justify-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/flash",
							className: "text-sm text-muted-foreground hover:text-foreground",
							children: "More flash"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate({ to: "/" }),
							className: "text-sm text-muted-foreground hover:text-foreground",
							children: "Home"
						})]
					})
				]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-12 md:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/flash",
				className: "text-sm text-muted-foreground hover:text-foreground",
				children: "← Back to flash"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs uppercase tracking-[0.2em] text-primary font-medium",
				children: "Claim design"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: serif,
				className: "mt-3 text-4xl font-semibold tracking-tight",
				children: design?.title ?? "Flash design"
			}),
			design && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted-foreground",
				children: [
					design.style,
					" · ",
					design.size,
					" · £",
					Number(design.price).toFixed(0)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-10 space-y-6 rounded-3xl border border-border/60 bg-card p-6 md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Full name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "full_name",
							required: true,
							maxLength: 120,
							className: inputCls
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid md:grid-cols-2 gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "email",
								type: "email",
								required: true,
								maxLength: 255,
								className: inputCls
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone (optional)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								name: "phone",
								maxLength: 40,
								className: inputCls
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Instagram username",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "customer_instagram",
							maxLength: 80,
							className: inputCls,
							placeholder: "@yourusername"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred placement",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "placement",
							maxLength: 120,
							className: inputCls,
							placeholder: "e.g. inner forearm"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Preferred dates",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "preferred_dates",
							maxLength: 200,
							className: inputCls,
							placeholder: "e.g. any weekday in April"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							name: "consent",
							className: "mt-1 h-4 w-4 rounded border-border"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "I understand this claim is subject to the artist's confirmation and is not a booked appointment yet." })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: submitting,
						className: "w-full rounded-full bg-foreground text-background py-3 font-medium hover:opacity-90 disabled:opacity-60 transition",
						children: submitting ? "Sending..." : "Submit claim"
					})
				]
			})
		]
	});
}
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
//#endregion
export { ClaimPage as component };
