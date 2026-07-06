import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flash-claims-C_0KVgFp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FlashClaims() {
	const [claims, setClaims] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [message, setMessage] = (0, import_react.useState)("");
	const [siteSettings, setSiteSettings] = (0, import_react.useState)(null);
	const [copiedClaimId, setCopiedClaimId] = (0, import_react.useState)(null);
	const [pendingStatusChange, setPendingStatusChange] = (0, import_react.useState)(null);
	const [statusFilter, setStatusFilter] = (0, import_react.useState)("all");
	async function loadClaims() {
		setLoading(true);
		const { data, error } = await supabase.from("flash_claims").select("id,flash_id,full_name,email,phone,customer_instagram,placement,preferred_dates,consent,status,created_at,flash_designs(title,image_url,style,size,price,status)").order("created_at", { ascending: false });
		const { data: settingsData } = await supabase.from("site_settings").select("admin_dm_template").limit(1).maybeSingle();
		setSiteSettings(settingsData ?? null);
		if (error) {
			console.error(error);
			setMessage("Could not load flash claims.");
		} else setClaims(data ?? []);
		setLoading(false);
	}
	function updateClaimStatus(claim, newStatus) {
		setPendingStatusChange({
			claim,
			newStatus,
			flashStatus: newStatus === "booked" ? "sold" : newStatus === "declined" ? "available" : "claimed"
		});
	}
	async function confirmClaimStatusChange() {
		if (!pendingStatusChange) return;
		const { claim, newStatus, flashStatus } = pendingStatusChange;
		setMessage("");
		const { error: claimError } = await supabase.from("flash_claims").update({
			status: newStatus,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", claim.id);
		if (claimError) {
			console.error(claimError);
			setMessage("Something went wrong. Claim status was not updated.");
			setPendingStatusChange(null);
			return;
		}
		if (claim.flash_id) {
			const { error: flashError } = await supabase.from("flash_designs").update({
				status: flashStatus,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", claim.flash_id);
			if (flashError) {
				console.error(flashError);
				setMessage("Claim status updated, but the flash design status could not be updated.");
				setPendingStatusChange(null);
				loadClaims();
				return;
			}
		}
		setMessage("Claim and flash design status updated.");
		setPendingStatusChange(null);
		loadClaims();
	}
	(0, import_react.useEffect)(() => {
		loadClaims();
	}, []);
	const statusCounts = {
		all: claims.length,
		new: claims.filter((claim) => claim.status === "new").length,
		contacted: claims.filter((claim) => claim.status === "contacted").length,
		booked: claims.filter((claim) => claim.status === "booked").length,
		declined: claims.filter((claim) => claim.status === "declined").length
	};
	const filteredClaims = statusFilter === "all" ? claims : claims.filter((claim) => claim.status === statusFilter);
	function getInstagramHandle(instagram) {
		if (!instagram) return "";
		return instagram.trim().replace("@", "").replace("https://www.instagram.com/", "").replace("https://instagram.com/", "").split("/")[0].split("?")[0];
	}
	function getInstagramDmUrl(instagram) {
		const handle = getInstagramHandle(instagram);
		if (!handle) return "";
		return `https://ig.me/m/${handle}`;
	}
	function buildAdminDmReply(claim, template) {
		return template.replaceAll("{name}", claim.full_name || "lovely").replaceAll("{first_name}", claim.full_name?.split(" ")[0] || "lovely").replaceAll("{design_title}", claim.flash_designs?.title || "the flash design").replaceAll("{placement}", claim.placement || "Not provided").replaceAll("{preferred_dates}", claim.preferred_dates || "Not provided");
	}
	async function copyAdminDmReply(claim) {
		const messageToCopy = buildAdminDmReply(claim, siteSettings?.admin_dm_template || "Hey lovely, thank you for claiming the {design_title} flash design 🖤\n\nI’ve got your claim through the website and I’ve marked it as claimed for you.\n\nPlacement: {placement}\nPreferred dates: {preferred_dates}\n\nCan you send me any extra placement/reference details here and I’ll get back to you with next steps. My availability based on your preferred dates is:\n\nPASTE AVAILABILITY HERE\n\nLook forward to hearing back from you :) xx");
		await navigator.clipboard.writeText(messageToCopy);
		setCopiedClaimId(claim.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold",
				children: "Flash Claims"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "View and manage customer claims for flash designs."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					{
						value: "all",
						label: "All"
					},
					{
						value: "new",
						label: "New"
					},
					{
						value: "contacted",
						label: "Contacted"
					},
					{
						value: "booked",
						label: "Booked"
					},
					{
						value: "declined",
						label: "Declined"
					}
				].map((filter) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setStatusFilter(filter.value),
					className: `rounded-full border px-4 py-2 text-sm ${statusFilter === filter.value ? "bg-foreground text-background" : "hover:bg-accent"}`,
					children: [
						filter.label,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-1 rounded-full bg-background/20 px-2",
							children: statusCounts[filter.value]
						})
					]
				}, filter.value))
			}),
			message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted-foreground",
				children: message
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Customer claims"
				}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "Loading flash claims..."
				}) : filteredClaims.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "No flash claims have been submitted yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 space-y-4",
					children: filteredClaims.map((claim) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border p-4",
						children: [
							claim.flash_designs && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex gap-4 rounded-xl bg-muted/40 p-3",
								children: [claim.flash_designs.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: claim.flash_designs.image_url,
									alt: claim.flash_designs.title,
									className: "h-32 w-24 rounded-lg object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs uppercase tracking-[0.15em] text-muted-foreground",
										children: "Claimed flash"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 font-semibold",
										children: claim.flash_designs.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: [
											claim.flash_designs.style || "No style",
											" •",
											" ",
											claim.flash_designs.size || "No size"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-medium",
										children: claim.flash_designs.price !== null ? `£${Number(claim.flash_designs.price).toFixed(0)}` : "Price TBC"
									})
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-semibold",
										children: claim.full_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: claim.email
									}),
									claim.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: claim.phone
									}),
									claim.customer_instagram && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											"Instagram:",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: getInstagramDmUrl(claim.customer_instagram),
												target: "_blank",
												rel: "noreferrer",
												className: "font-medium text-foreground underline",
												children: ["@", getInstagramHandle(claim.customer_instagram)]
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex flex-wrap gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => copyAdminDmReply(claim),
											className: "rounded-full border px-4 py-2 text-sm font-medium hover:bg-accent",
											children: copiedClaimId === claim.id ? "DM copied" : "Copy DM reply"
										}), claim.customer_instagram && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: getInstagramDmUrl(claim.customer_instagram),
											target: "_blank",
											rel: "noreferrer",
											className: "rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90",
											children: "Open Instagram DM"
										})]
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "rounded-full border bg-background px-3 py-1 text-xs capitalize",
									value: claim.status,
									onChange: (event) => updateClaimStatus(claim, event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "new",
											children: "New"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "contacted",
											children: "Contacted"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "booked",
											children: "Booked"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "declined",
											children: "Declined"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 grid gap-3 text-sm md:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Placement:"
										}),
										" ",
										claim.placement || "Not provided"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Preferred dates:"
										}),
										" ",
										claim.preferred_dates || "Not provided"
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Submitted:"
										}),
										" ",
										new Date(claim.created_at).toLocaleString()
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: "Consent:"
										}),
										" ",
										claim.consent ? "Yes" : "No"
									] })
								]
							})
						]
					}, claim.id))
				})]
			}),
			pendingStatusChange && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-lg rounded-3xl bg-background p-6 shadow-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold",
							children: "Confirm status change"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: [
								"Are you sure you want to change this claim to",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium capitalize text-foreground",
									children: pendingStatusChange.newStatus
								}),
								"?"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-2xl border bg-muted/30 p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "This will also update the flash design:"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-3 list-disc space-y-2 pl-5 text-muted-foreground",
								children: [
									pendingStatusChange.newStatus === "booked" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The customer claim will be marked as Booked." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The flash design will be marked as Sold." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Customers will no longer be able to claim this design." })
									] }),
									pendingStatusChange.newStatus === "declined" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The customer claim will be marked as Declined." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The flash design will become Available again." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Other customers will be able to claim this design." })
									] }),
									pendingStatusChange.newStatus === "contacted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The customer claim will be marked as Contacted." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The flash design will remain Claimed." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Other customers will not be able to claim this design." })
									] }),
									pendingStatusChange.newStatus === "new" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The customer claim will be marked as New." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "The flash design will remain Claimed." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Other customers will not be able to claim this design." })
									] })
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPendingStatusChange(null),
								className: "rounded-full border px-5 py-2 text-sm hover:bg-accent",
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: confirmClaimStatusChange,
								className: "rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background",
								children: "Confirm change"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { FlashClaims as component };
