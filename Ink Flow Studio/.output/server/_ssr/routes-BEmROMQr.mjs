import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { a as Leaf, d as ArrowRight, o as Heart, r as Sparkles, u as Calculator } from "../_libs/lucide-react.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BEmROMQr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var serif = { fontFamily: "'Fraunces', serif" };
function Home() {
	const [flash, setFlash] = (0, import_react.useState)([]);
	const [settings, setSettings] = (0, import_react.useState)({
		business_name: "SummerRose Tattoos",
		tagline: "Micro-Realism • Fine Line • Whimsical",
		studio_name: "Inkantations",
		location: "Towcester, Northampton",
		instagram_username: "@summerrosetattoos",
		homepage_intro: "Custom tattoos by SummerRose, based at Inkantations in Towcester, Northampton. Submit an enquiry, claim a flash design, or get a rough price before you book.",
		logo_url: "/images/Logo.png",
		homepage_image_url: "/images/Logo.png"
	});
	(0, import_react.useEffect)(() => {
		supabase.from("flash_designs").select("id,title,style,size,price,status,image_url").eq("status", "available").limit(4).then(({ data }) => setFlash(data ?? []));
		supabase.from("site_settings").select("*").limit(1).single().then(({ data, error }) => {
			if (error) {
				console.error(error);
				return;
			}
			if (data) setSettings({
				business_name: data.business_name ?? "SummerRose Tattoos",
				tagline: data.tagline ?? "Micro-Realism • Fine Line • Whimsical",
				studio_name: data.studio_name ?? "Inkantations",
				location: data.location ?? "Towcester, Northampton",
				instagram_username: data.instagram_username ?? "@summerrosetattoos",
				homepage_intro: data.homepage_intro ?? "Custom tattoos by SummerRose, based at Inkantations in Towcester, Northampton. Submit an enquiry, claim a flash design, or get a rough price before you book.",
				logo_url: data.logo_url ?? "/images/Logo.png",
				homepage_image_url: data.homepage_image_url ?? "/images/Logo.png"
			});
		});
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pt-16 pb-24 md:pt-24 md:pb-32",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-5 gap-10 items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.2em] text-primary font-medium",
							children: settings.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							style: serif,
							className: "mt-4 text-5xl md:text-7xl font-semibold leading-[1.05] tracking-tight",
							children: [
								settings.business_name,
								",",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"made just for you."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-lg text-muted-foreground max-w-xl",
							children: settings.homepage_intro
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/enquiry",
								className: "inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition",
								children: ["Submit tattoo enquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/flash",
								className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium hover:bg-accent transition",
								children: "View flash designs"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "md:col-span-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/5] rounded-3xl bg-gradient-to-br from-accent via-secondary to-muted border border-border/60 relative overflow-hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-8 rounded-2xl border border-foreground/10 flex items-center justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: settings.homepage_image_url,
								alt: `${settings.business_name} homepage image`,
								className: "h-full w-full object-cover"
							})
						})
					})
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						to: "/enquiry",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-5 w-5" }),
						title: "Tattoo enquiry",
						desc: "Tell me about your custom piece."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						to: "/flash",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-5 w-5" }),
						title: "Flash designs",
						desc: "Ready-made pieces to claim."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						to: "/aftercare",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "h-5 w-5" }),
						title: "Aftercare guide",
						desc: "Heal your tattoo the right way."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionCard, {
						to: "/estimate",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calculator, { className: "h-5 w-5" }),
						title: "Price estimate",
						desc: "Rough budget in 30 seconds."
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border/60 bg-secondary/40",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: serif,
					className: "text-3xl md:text-4xl font-semibold tracking-tight",
					children: "How booking works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid md:grid-cols-3 gap-8 mt-10",
					children: [
						{
							n: "01",
							t: "Submit enquiry",
							d: "Share your idea, reference images and preferred dates."
						},
						{
							n: "02",
							t: "Quote & date",
							d: "I'll review and reply within 3–5 days with a quote and date."
						},
						{
							n: "03",
							t: "Deposit & book",
							d: "A small deposit secures your appointment."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-card p-6 border border-border/60",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-mono text-primary",
								children: s.n
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-semibold text-lg",
								children: s.t
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: s.d
							})
						]
					}, s.n))
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-20",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4 flex-wrap",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					style: serif,
					className: "text-3xl md:text-4xl font-semibold tracking-tight",
					children: "Featured flash"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-muted-foreground",
					children: "Available now — first to claim gets it."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/flash",
					className: "text-sm text-primary hover:underline",
					children: "View all →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8",
				children: flash.length === 0 ? Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square rounded-2xl bg-muted animate-pulse" }, i)) : flash.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/flash",
					className: "group rounded-2xl bg-card border border-border/60 overflow-hidden hover:shadow-lg transition",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "aspect-[4/5] bg-gradient-to-br from-secondary to-accent flex items-center justify-center overflow-hidden",
						children: f.image_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: f.image_url,
							alt: f.title,
							className: "h-full w-full object-cover transition group-hover:scale-105"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {
							className: "h-12 w-12 text-primary/60 group-hover:scale-110 transition",
							strokeWidth: 1
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: f.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: [
								f.style || "Flash",
								" · ",
								f.price !== null ? `£${Number(f.price).toFixed(0)}` : "Price TBC"
							]
						})]
					})]
				}, f.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 pb-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-3xl bg-foreground text-background p-10 md:p-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-background/70 max-w-lg",
					children: [
						"Appointments are available at ",
						settings.studio_name,
						" in ",
						settings.location,
						" by enquiry only. Reach out via the enquiry form or DM me on Instagram."
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/enquiry",
						className: "inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-3 text-sm font-medium",
						children: ["Start enquiry ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "https://www.instagram.com/summerrosetattoos/",
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex items-center gap-2 rounded-full border border-background/30 px-6 py-3 text-sm",
						children: settings.instagram_username
					})]
				})]
			})
		})
	] });
}
function ActionCard({ to, icon, title, desc }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group rounded-2xl bg-card border border-border/60 p-6 hover:border-primary hover:shadow-md transition",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-primary group-hover:bg-accent transition",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: desc
			})
		]
	});
}
//#endregion
export { Home as component };
