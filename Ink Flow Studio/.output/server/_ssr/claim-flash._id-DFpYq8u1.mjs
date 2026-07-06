import { f as lazyRouteComponent, p as createFileRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, n as literalType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/claim-flash._id-DFpYq8u1.js
var $$splitComponentImporter = () => import("./claim-flash._id-aAxw5-HL.mjs");
var Route = createFileRoute("/claim-flash/$id")({
	head: () => ({ meta: [{ title: "Claim flash design — Sage & Ink" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
objectType({
	full_name: stringType().trim().min(1).max(120),
	email: stringType().trim().email().max(255),
	phone: stringType().trim().max(40).optional().or(literalType("")),
	customer_instagram: stringType().trim().max(80).optional().or(literalType("")),
	placement: stringType().trim().max(120).optional().or(literalType("")),
	preferred_dates: stringType().trim().max(200).optional().or(literalType("")),
	consent: literalType(true, { errorMap: () => ({ message: "Please confirm the consent checkbox" }) })
});
//#endregion
export { Route as t };
