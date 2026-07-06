globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-06T16:17:47.998Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/aftercare-oybLb1pY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f6-ac/qoMJp1LLakWmSBEfijx0VwFs\"",
		"mtime": "2026-07-06T16:17:46.542Z",
		"size": 4854,
		"path": "../public/assets/aftercare-oybLb1pY.js"
	},
	"/assets/auth-ukBzZ6K0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9c6-JlrPAO9IxLdsU0IrjqFgiKECOmY\"",
		"mtime": "2026-07-06T16:17:46.542Z",
		"size": 2502,
		"path": "../public/assets/auth-ukBzZ6K0.js"
	},
	"/assets/calculator-BIP3E072.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-ALJYL5Q3UUKB5uzWSBqkVx5b05Y\"",
		"mtime": "2026-07-06T16:17:46.542Z",
		"size": 642,
		"path": "../public/assets/calculator-BIP3E072.js"
	},
	"/assets/check-Dxeyoov_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-WklQjXSbhA1BHlTlHniMRlQYRmM\"",
		"mtime": "2026-07-06T16:17:46.542Z",
		"size": 124,
		"path": "../public/assets/check-Dxeyoov_.js"
	},
	"/assets/claim-flash._id-Cm-QfcRj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1bef-ggUdHNe7d/nhs7a0liOaIRNaes8\"",
		"mtime": "2026-07-06T16:17:46.542Z",
		"size": 7151,
		"path": "../public/assets/claim-flash._id-Cm-QfcRj.js"
	},
	"/assets/createLucideIcon-DeQrcgrh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-cR1PODv03KUfJz4HloEEypYngbs\"",
		"mtime": "2026-07-06T16:17:46.542Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-DeQrcgrh.js"
	},
	"/assets/dashboard-DrFhb_pK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1456-0szum8Iqr9RfNwM6TM+wUYoexZU\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 5206,
		"path": "../public/assets/dashboard-DrFhb_pK.js"
	},
	"/assets/enquiries-BCATD4qk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1085-rsJJb+wMM1/rhDtVH5MCyeQ8qZY\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 4229,
		"path": "../public/assets/enquiries-BCATD4qk.js"
	},
	"/assets/enquiry-Cfr7A71y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19ae-jWDUCgkMQzybSo2bHjKhTgoMcKg\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 6574,
		"path": "../public/assets/enquiry-Cfr7A71y.js"
	},
	"/assets/enquiry.thanks-P-PcPQWU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"417-osMPLD90ujIfdxB8rnC/uAKz9BQ\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 1047,
		"path": "../public/assets/enquiry.thanks-P-PcPQWU.js"
	},
	"/assets/estimate-Bm4hMqqr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b81-0zGX5j4gVQKk2XBv/ULGluJEN+M\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 2945,
		"path": "../public/assets/estimate-Bm4hMqqr.js"
	},
	"/assets/flash-BH-ysHwN.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bb7-v9YdL7mdAGDyI9TvpUKySLk8Rxo\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 2999,
		"path": "../public/assets/flash-BH-ysHwN.js"
	},
	"/assets/flash-claims-C62eJRGp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f2-xxKP1pPT+AhzDp1tvJ9XSVcrHyw\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 9458,
		"path": "../public/assets/flash-claims-C62eJRGp.js"
	},
	"/assets/index.module-3EhAGa4j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5fad-ff50pE2pFmOGNHeSAMnr+BSmrdc\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 24493,
		"path": "../public/assets/index.module-3EhAGa4j.js"
	},
	"/assets/jsx-runtime-bzQ4Vb5N.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"20d8-vMfP+4a4ykIjbw4InHkj3E5HWt0\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 8408,
		"path": "../public/assets/jsx-runtime-bzQ4Vb5N.js"
	},
	"/assets/leaf-BqNTITyB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"109-HctHHU46+rFtcbMekgBq2KWgYdg\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 265,
		"path": "../public/assets/leaf-BqNTITyB.js"
	},
	"/assets/link-DniAkY7w.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"114a-/G9dEBTaeO9RS3UcMoOZrlA0sfQ\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 4426,
		"path": "../public/assets/link-DniAkY7w.js"
	},
	"/assets/manage-flash-DvkG1pvz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b3a-C98mXjLQyXBKIXuVLzkpErNdTWE\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 15162,
		"path": "../public/assets/manage-flash-DvkG1pvz.js"
	},
	"/assets/matchContext-mH6aKBB8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2cb-Azz0TJUjpeHxFMGQmSn5MD70u30\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 715,
		"path": "../public/assets/matchContext-mH6aKBB8.js"
	},
	"/assets/react-dom-DUKFG4MT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dda-2jwqka4uWIJMCW44vChkyRB+fA4\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 3546,
		"path": "../public/assets/react-dom-DUKFG4MT.js"
	},
	"/assets/route-CXLew8XR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-WV0LjA9UFwxnZxyDpTOTokVMO8c\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 141,
		"path": "../public/assets/route-CXLew8XR.js"
	},
	"/assets/routes-DkKxpt5L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2123-q63ywdL1SzUEBpkZmkohe9Og7UU\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 8483,
		"path": "../public/assets/routes-DkKxpt5L.js"
	},
	"/assets/settings-DLrnnx5y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a54-Sz+gCywixy+WKYdTYxvG9Ry2WHs\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 10836,
		"path": "../public/assets/settings-DLrnnx5y.js"
	},
	"/assets/index-EMULbnpD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"95735-qOZl+Salu8W3pcrbUM9UPjv6AJs\"",
		"mtime": "2026-07-06T16:17:46.542Z",
		"size": 612149,
		"path": "../public/assets/index-EMULbnpD.js"
	},
	"/assets/styles-UMJeelJX.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"14f59-TLAzE6GkACXM+LdBPzjewKnqYvs\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 85849,
		"path": "../public/assets/styles-UMJeelJX.css"
	},
	"/assets/useRouter-Rvnm1DNS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b2-nALXoe7Rhv1dDN2XmhXQrP2Xw4I\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 690,
		"path": "../public/assets/useRouter-Rvnm1DNS.js"
	},
	"/assets/useStore-DWhJx06P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4875-x2ERzopQ0r1+tbssHe5yhq/eRko\"",
		"mtime": "2026-07-06T16:17:46.543Z",
		"size": 18549,
		"path": "../public/assets/useStore-DWhJx06P.js"
	},
	"/images/Logo.png": {
		"type": "image/png",
		"etag": "\"1c0a3-eI5HhEhvorXqmvF316/tj4zAmwA\"",
		"mtime": "2026-07-06T16:17:47.994Z",
		"size": 114851,
		"path": "../public/images/Logo.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_BDB4ni = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_BDB4ni
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
