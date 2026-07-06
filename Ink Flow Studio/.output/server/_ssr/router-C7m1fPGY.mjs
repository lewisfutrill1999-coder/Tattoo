import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
import { A as redirect, c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$13 } from "./claim-flash._id-DFpYq8u1.mjs";
import { t as Route$14 } from "./dashboard-D7jZQad3.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-C7m1fPGY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-UMJeelJX.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$12 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "SummerRose Tattoos" },
			{
				name: "description",
				content: "Bespoke tattoos, flash designs, aftercare and price estimates. Submit an enquiry or claim a flash design."
			},
			{
				name: "author",
				content: "SummerRose Tattoos"
			},
			{
				property: "og:title",
				content: "SummerRose Tattoos"
			},
			{
				property: "og:description",
				content: "Bespoke tattoos, flash designs, aftercare and price estimates. Submit an enquiry or claim a flash design."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:title",
				content: "SummerRose Tattoos"
			},
			{
				name: "twitter:description",
				content: "Bespoke tattoos, flash designs, aftercare and price estimates. Submit an enquiry or claim a flash design."
			},
			{
				property: "og:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/312743fc-876b-4bec-9efa-c42cfe2d8ba0/id-preview-13ef1960--b8919ed0-d904-4b41-8936-ac372cdc625f.lovable.app-1782981592800.png"
			},
			{
				name: "twitter:image",
				content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/312743fc-876b-4bec-9efa-c42cfe2d8ba0/id-preview-13ef1960--b8919ed0-d904-4b41-8936-ac372cdc625f.lovable.app-1782981592800.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$12.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-screen flex flex-col",
			style: { fontFamily: "'Inter', system-ui, sans-serif" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})
			]
		})
	});
}
function SiteHeader() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center justify-between px-4 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-lg font-semibold tracking-tight",
				style: { fontFamily: "'Fraunces', serif" },
				children: "SummerRose Tattoos"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "hidden md:flex items-center gap-6 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/flash",
						className: "hover:text-foreground transition-colors",
						children: "Flash"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/aftercare",
						className: "hover:text-foreground transition-colors",
						children: "Aftercare"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/estimate",
						className: "hover:text-foreground transition-colors",
						children: "Estimate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/enquiry",
						className: "inline-flex items-center rounded-full bg-foreground text-background px-4 py-2 text-xs font-medium hover:opacity-90 transition",
						children: "Book enquiry"
					})
				]
			})]
		})
	});
}
function SiteFooter() {
	const [settings, setSettings] = (0, import_react.useState)({
		business_name: "SummerRose Tattoos",
		tagline: "Micro-Realism • Fine Line • Whimsical",
		instagram_username: "@summerrosetattoos"
	});
	(0, import_react.useEffect)(() => {
		supabase.from("site_settings").select("business_name, tagline, instagram_username").limit(1).single().then(({ data, error }) => {
			if (error) {
				console.error(error);
				return;
			}
			if (data) setSettings({
				business_name: data.business_name ?? "SummerRose Tattoos",
				tagline: data.tagline ?? "Micro-Realism • Fine Line • Whimsical",
				instagram_username: data.instagram_username ?? "@summerrosetattoos"
			});
		});
	}, []);
	const instagramUrl = `https://www.instagram.com/${settings.instagram_username.replace("@", "")}/`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "border-t border-border/60 mt-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-semibold text-foreground",
				style: { fontFamily: "'Fraunces', serif" },
				children: settings.business_name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1",
				children: settings.tagline
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "mailto:Demo@Demo.com",
						className: "hover:text-foreground",
						children: "demo@demo.com"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: instagramUrl,
						target: "_blank",
						rel: "noreferrer",
						className: "hover:text-foreground",
						children: settings.instagram_username
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "hover:text-foreground",
						children: "Artist login"
					})
				]
			})]
		})
	});
}
var $$splitComponentImporter$11 = () => import("./flash-CSAEYHDC.mjs");
var Route$11 = createFileRoute("/flash")({
	head: () => ({ meta: [{ title: "Flash Designs — Sage & Ink" }, {
		name: "description",
		content: "Browse available flash tattoo designs and claim your favourite."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./estimate-DQ_jQwzE.mjs");
var Route$10 = createFileRoute("/estimate")({
	head: () => ({ meta: [{ title: "Tattoo Price Estimator — Sage & Ink" }, {
		name: "description",
		content: "Get a rough tattoo price estimate based on size, detail, colour, placement and cover-up."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./enquiry-2Ye8OZrO.mjs");
var Route$9 = createFileRoute("/enquiry")({
	head: () => ({ meta: [{ title: "Tattoo Enquiry — Sage & Ink" }, {
		name: "description",
		content: "Submit a custom tattoo enquiry: idea, style, size, placement, budget and reference images."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./auth-BcrbWvnM.mjs");
var Route$8 = createFileRoute("/auth")({
	head: () => ({ meta: [{ title: "Artist login — Sage & Ink" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./aftercare-CI_0zJYR.mjs");
var Route$7 = createFileRoute("/aftercare")({
	head: () => ({ meta: [{ title: "Tattoo Aftercare Guide — Sage & Ink" }, {
		name: "description",
		content: "How to look after your new tattoo — the first 24 hours, weeks 2–4, warning signs and touch-ups."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./route-Di7iQBCH.mjs");
var Route$6 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({ to: "/auth" });
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./routes-BEmROMQr.mjs");
var Route$5 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./enquiry.thanks-UDFKonh7.mjs");
var Route$4 = createFileRoute("/enquiry/thanks")({
	head: () => ({ meta: [{ title: "Enquiry received — Sage & Ink" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./settings-4CvXQWZs.mjs");
var Route$3 = createFileRoute("/_authenticated/settings")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./manage-flash-8Z2mZoOy.mjs");
var Route$2 = createFileRoute("/_authenticated/manage-flash")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./flash-claims-C_0KVgFp.mjs");
var Route$1 = createFileRoute("/_authenticated/flash-claims")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./enquiries-BTrVFBG-.mjs");
var Route = createFileRoute("/_authenticated/enquiries")({
	head: () => ({ meta: [{ title: "Enquiries — Sage & Ink" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var FlashRoute = Route$11.update({
	id: "/flash",
	path: "/flash",
	getParentRoute: () => Route$12
});
var EstimateRoute = Route$10.update({
	id: "/estimate",
	path: "/estimate",
	getParentRoute: () => Route$12
});
var EnquiryRoute = Route$9.update({
	id: "/enquiry",
	path: "/enquiry",
	getParentRoute: () => Route$12
});
var AuthRoute = Route$8.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$12
});
var AftercareRoute = Route$7.update({
	id: "/aftercare",
	path: "/aftercare",
	getParentRoute: () => Route$12
});
var AuthenticatedRouteRoute = Route$6.update({
	id: "/_authenticated",
	getParentRoute: () => Route$12
});
var IndexRoute = Route$5.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$12
});
var EnquiryThanksRoute = Route$4.update({
	id: "/thanks",
	path: "/thanks",
	getParentRoute: () => EnquiryRoute
});
var ClaimFlashIdRoute = Route$13.update({
	id: "/claim-flash/$id",
	path: "/claim-flash/$id",
	getParentRoute: () => Route$12
});
var AuthenticatedSettingsRoute = Route$3.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedManageFlashRoute = Route$2.update({
	id: "/manage-flash",
	path: "/manage-flash",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedFlashClaimsRoute = Route$1.update({
	id: "/flash-claims",
	path: "/flash-claims",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedEnquiriesRoute = Route.update({
	id: "/enquiries",
	path: "/enquiries",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedDashboardRoute: Route$14.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedEnquiriesRoute,
	AuthenticatedFlashClaimsRoute,
	AuthenticatedManageFlashRoute,
	AuthenticatedSettingsRoute
};
var AuthenticatedRouteRouteWithChildren = AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren);
var EnquiryRouteChildren = { EnquiryThanksRoute };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
	AftercareRoute,
	AuthRoute,
	EnquiryRoute: EnquiryRoute._addFileChildren(EnquiryRouteChildren),
	EstimateRoute,
	FlashRoute,
	ClaimFlashIdRoute
};
var routeTree = Route$12._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
