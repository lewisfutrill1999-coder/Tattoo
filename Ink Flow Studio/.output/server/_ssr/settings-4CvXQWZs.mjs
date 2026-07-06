import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
import { t as src_default } from "../_libs/react-easy-crop.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-4CvXQWZs.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ArtistSettings() {
	const [settings, setSettings] = (0, import_react.useState)({
		business_name: "SummerRose Tattoos",
		tagline: "Micro-Realism • Fine Line • Whimsical",
		studio_name: "Inkantations",
		location: "Towcester, Northampton",
		instagram_username: "@summerrosetattoos",
		homepage_intro: "Custom tattoos by SummerRose, based at Inkantations in Towcester, Northampton. Submit an enquiry, claim a flash design, or get a rough price before you book.",
		logo_url: "/images/Logo.png",
		homepage_image_url: "/images/Logo.png",
		admin_dm_template: "Hey lovely, thank you for claiming the {design_title} flash design 🖤\n\nI’ve got your claim through the website and I’ve marked it as claimed for you.\n\nPlacement: {placement}\nPreferred dates: {preferred_dates}\n\nCan you send me any extra placement/reference details here and I’ll get back to you with next steps. My availability based on your preferred dates is:\n\nPASTE AVAILABILITY HERE\n\nLook forward to hearing back from you :) xx"
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [homepageCropFile, setHomepageCropFile] = (0, import_react.useState)(null);
	const [homepageCropPreview, setHomepageCropPreview] = (0, import_react.useState)("");
	const [homepageCrop, setHomepageCrop] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [homepageZoom, setHomepageZoom] = (0, import_react.useState)(1);
	const [homepageCroppedAreaPixels, setHomepageCroppedAreaPixels] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		async function loadSettings() {
			const { data, error } = await supabase.from("site_settings").select("*").limit(1).single();
			if (error) {
				console.error(error);
				setMessage("Could not load settings.");
			}
			if (data) setSettings({
				id: data.id,
				business_name: data.business_name ?? "SummerRose Tattoos",
				tagline: data.tagline ?? "Micro-Realism • Fine Line • Whimsical",
				studio_name: data.studio_name ?? "Inkantations",
				location: data.location ?? "Towcester, Northampton",
				instagram_username: data.instagram_username ?? "@summerrosetattoos",
				homepage_intro: data.homepage_intro ?? "Custom tattoos by SummerRose, based at Inkantations in Towcester, Northampton. Submit an enquiry, claim a flash design, or get a rough price before you book.",
				logo_url: data.logo_url ?? "/images/Logo.png",
				homepage_image_url: data.homepage_image_url ?? "/images/Logo.png",
				admin_dm_template: data.admin_dm_template ?? "Hey lovely, thank you for claiming the {design_title} flash design 🖤\n\nI’ve got your claim through the website and I’ve marked it as claimed for you.\n\nPlacement: {placement}\nPreferred dates: {preferred_dates}\n\nCan you send me any extra placement/reference details here and I’ll get back to you with next steps. My availability based on your preferred dates is:\n\nPASTE AVAILABILITY HERE\n\nLook forward to hearing back from you :) xx"
			});
			setLoading(false);
		}
		loadSettings();
	}, []);
	function updateField(field, value) {
		setSettings((current) => ({
			...current,
			[field]: value
		}));
	}
	async function uploadImage(event, field) {
		const file = event.target.files?.[0];
		if (!file) return;
		updateField(field, URL.createObjectURL(file));
		setUploading(true);
		setMessage("Image selected. Uploading now...");
		const fileExtension = file.name.split(".").pop();
		const fileName = `${field}-${Date.now()}.${fileExtension}`;
		const { error } = await supabase.storage.from("website-images").upload(fileName, file, {
			cacheControl: "3600",
			upsert: true
		});
		if (error) {
			console.error(error);
			setMessage("Image upload failed.");
			setUploading(false);
			return;
		}
		const { data } = supabase.storage.from("website-images").getPublicUrl(fileName);
		updateField(field, data.publicUrl);
		setMessage("Image uploaded. Click Save changes to keep it.");
		setUploading(false);
	}
	function selectHomepageImageForCrop(event) {
		const file = event.target.files?.[0];
		if (!file) return;
		setHomepageCropFile(file);
		setHomepageCropPreview(URL.createObjectURL(file));
		setHomepageCrop({
			x: 0,
			y: 0
		});
		setHomepageZoom(1);
		setHomepageCroppedAreaPixels(null);
		setMessage("Adjust the homepage image crop, then click Use this crop.");
	}
	function onHomepageCropComplete(_croppedArea, croppedAreaPixels) {
		setHomepageCroppedAreaPixels(croppedAreaPixels);
	}
	function createImage(url) {
		return new Promise((resolve, reject) => {
			const image = new Image();
			image.addEventListener("load", () => resolve(image));
			image.addEventListener("error", (error) => reject(error));
			image.setAttribute("crossOrigin", "anonymous");
			image.src = url;
		});
	}
	async function getCroppedImageFile(imageSrc, cropPixels, fileName) {
		const image = await createImage(imageSrc);
		const canvas = document.createElement("canvas");
		const context = canvas.getContext("2d");
		if (!context) throw new Error("Could not create image crop.");
		canvas.width = cropPixels.width;
		canvas.height = cropPixels.height;
		context.drawImage(image, cropPixels.x, cropPixels.y, cropPixels.width, cropPixels.height, 0, 0, cropPixels.width, cropPixels.height);
		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (!blob) {
					reject(/* @__PURE__ */ new Error("Could not crop image."));
					return;
				}
				resolve(new File([blob], fileName, { type: "image/jpeg" }));
			}, "image/jpeg");
		});
	}
	async function uploadCroppedHomepageImage() {
		if (!homepageCropPreview || !homepageCroppedAreaPixels) {
			setMessage("Please choose and position an image first.");
			return;
		}
		setUploading(true);
		setMessage("Cropping and uploading homepage image...");
		try {
			const croppedFile = await getCroppedImageFile(homepageCropPreview, homepageCroppedAreaPixels, `homepage-image-${Date.now()}.jpg`);
			const fileName = `homepage-image-${Date.now()}.jpg`;
			const { error } = await supabase.storage.from("website-images").upload(fileName, croppedFile, {
				cacheControl: "3600",
				upsert: true
			});
			if (error) {
				console.error(error);
				setMessage("Cropped image upload failed.");
				setUploading(false);
				return;
			}
			const { data } = supabase.storage.from("website-images").getPublicUrl(fileName);
			updateField("homepage_image_url", data.publicUrl);
			setHomepageCropFile(null);
			setHomepageCropPreview("");
			setHomepageCroppedAreaPixels(null);
			setMessage("Homepage image cropped and uploaded. Click Save changes to keep it.");
		} catch (error) {
			console.error(error);
			setMessage("Something went wrong while cropping the image.");
		}
		setUploading(false);
	}
	async function saveSettings() {
		setSaving(true);
		setMessage("");
		if (!settings.id) {
			setMessage("Settings could not be saved because no settings record was found.");
			setSaving(false);
			return;
		}
		const { error } = await supabase.from("site_settings").update({
			business_name: settings.business_name,
			tagline: settings.tagline,
			studio_name: settings.studio_name,
			location: settings.location,
			instagram_username: settings.instagram_username,
			homepage_intro: settings.homepage_intro,
			logo_url: settings.logo_url,
			homepage_image_url: settings.homepage_image_url,
			admin_dm_template: settings.admin_dm_template,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", settings.id);
		if (error) {
			console.error(error);
			setMessage("Something went wrong. Settings were not saved.");
		} else setMessage("Settings saved successfully.");
		setSaving(false);
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-4xl px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Loading settings..." })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold",
				children: "Artist Settings"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Edit the main website details without touching code."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border bg-card p-6 space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium",
						children: "Business name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-2 w-full rounded-lg border px-3 py-2",
						value: settings.business_name,
						onChange: (event) => updateField("business_name", event.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium",
						children: "Tagline"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-2 w-full rounded-lg border px-3 py-2",
						value: settings.tagline,
						onChange: (event) => updateField("tagline", event.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium",
						children: "Studio name"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-2 w-full rounded-lg border px-3 py-2",
						value: settings.studio_name,
						onChange: (event) => updateField("studio_name", event.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium",
						children: "Location"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-2 w-full rounded-lg border px-3 py-2",
						value: settings.location,
						onChange: (event) => updateField("location", event.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-sm font-medium",
						children: "Instagram username"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "mt-2 w-full rounded-lg border px-3 py-2",
						value: settings.instagram_username,
						onChange: (event) => updateField("instagram_username", event.target.value)
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium",
							children: "Admin Instagram DM reply template"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "This is the message you can copy from the Flash Claims page when replying to a customer on Instagram."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "mt-2 min-h-64 w-full rounded-lg border px-3 py-2",
							value: settings.admin_dm_template,
							onChange: (event) => updateField("admin_dm_template", event.target.value)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted-foreground",
							children: [
								"You can use: ",
								"{design_title}",
								", ",
								"{placement}",
								", ",
								"{preferred_dates}"
							]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium",
							children: "Logo image"
						}),
						settings.logo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: settings.logo_url,
							alt: "Current logo",
							className: "mt-3 h-32 w-32 rounded-xl border object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Upload the logo image used around the website."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 inline-flex cursor-pointer items-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90",
							children: ["Choose logo image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: (event) => uploadImage(event, "logo_url")
							})]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium",
							children: "Homepage image"
						}),
						settings.homepage_image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: settings.homepage_image_url,
							alt: "Current homepage",
							className: "mt-3 h-48 w-48 rounded-xl border object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Upload the main image shown on the homepage."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 inline-flex cursor-pointer items-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90",
							children: ["Choose homepage image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "file",
								accept: "image/*",
								className: "hidden",
								onChange: selectHomepageImageForCrop
							})]
						}),
						homepageCropPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "w-full max-w-3xl rounded-3xl bg-background p-6 shadow-xl",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-xl font-semibold",
											children: "Crop homepage image"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted-foreground",
											children: "Drag the image and zoom until the visible 4:5 area looks right."
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "rounded-full border px-3 py-1 text-sm hover:bg-accent",
											onClick: () => {
												setHomepageCropFile(null);
												setHomepageCropPreview("");
												setHomepageCroppedAreaPixels(null);
											},
											children: "Cancel"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative mt-5 h-[520px] overflow-hidden rounded-2xl bg-black",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(src_default, {
											image: homepageCropPreview,
											crop: homepageCrop,
											zoom: homepageZoom,
											aspect: 4 / 5,
											onCropChange: setHomepageCrop,
											onZoomChange: setHomepageZoom,
											onCropComplete: onHomepageCropComplete,
											showGrid: false
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "block text-sm font-medium",
											children: "Zoom"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: "1",
											max: "3",
											step: "0.05",
											value: homepageZoom,
											onChange: (event) => setHomepageZoom(Number(event.target.value)),
											className: "mt-2 w-full"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 flex flex-wrap justify-end gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "rounded-full border px-5 py-2 text-sm hover:bg-accent",
											onClick: () => {
												setHomepageCropFile(null);
												setHomepageCropPreview("");
												setHomepageCroppedAreaPixels(null);
											},
											children: "Cancel"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: uploadCroppedHomepageImage,
											disabled: uploading,
											className: "rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background disabled:opacity-50",
											children: uploading ? "Uploading..." : "Use this crop"
										})]
									})
								]
							})
						})
					] }),
					uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Uploading image..."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: saveSettings,
							disabled: saving,
							className: "rounded-full bg-foreground px-5 py-2 text-background disabled:opacity-50",
							children: saving ? "Saving..." : "Save changes"
						}), message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: message
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { ArtistSettings as component };
