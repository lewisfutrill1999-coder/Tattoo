import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BcrbWvnM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var serif = { fontFamily: "'Fraunces', serif" };
function AuthPage() {
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({ to: "/dashboard" });
		});
	}, [navigate]);
	async function onSubmit(e) {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const email = String(fd.get("email") ?? "").trim();
		const password = String(fd.get("password") ?? "");
		if (!email || password.length < 6) {
			toast.error("Enter email and a 6+ char password");
			return;
		}
		setBusy(true);
		const { error } = mode === "signin" ? await supabase.auth.signInWithPassword({
			email,
			password
		}) : await supabase.auth.signUp({
			email,
			password,
			options: { emailRedirectTo: `${window.location.origin}/dashboard` }
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		if (mode === "signup") toast.success("Account created — check your inbox if confirmation is required.");
		navigate({ to: "/dashboard" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				style: serif,
				className: "text-3xl font-semibold tracking-tight",
				children: "Artist login"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "This area is for the studio artist only."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 space-y-4 rounded-2xl border border-border/60 bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Email"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "email",
							type: "email",
							required: true,
							className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: "Password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							name: "password",
							type: "password",
							required: true,
							minLength: 6,
							className: "mt-1.5 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						disabled: busy,
						className: "w-full rounded-full bg-foreground text-background py-3 text-sm font-medium disabled:opacity-60",
						children: busy ? "..." : mode === "signin" ? "Sign in" : "Create account"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMode(mode === "signin" ? "signup" : "signin"),
						className: "w-full text-xs text-muted-foreground hover:text-foreground",
						children: mode === "signin" ? "No account? Create one" : "Have an account? Sign in"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: "After creating your first account, the developer will grant it the admin role so you can access enquiries."
			})
		]
	});
}
//#endregion
export { AuthPage as component };
