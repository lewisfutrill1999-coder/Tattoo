import { n as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as supabase } from "./client-BfjlK6Km.mjs";
import { t as src_default } from "../_libs/react-easy-crop.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/manage-flash-8Z2mZoOy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ManageFlashDesigns() {
	const [form, setForm] = (0, import_react.useState)({
		title: "",
		description: "",
		style: "",
		size: "",
		price: "",
		status: "available",
		image_url: "",
		original_image_url: ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [message, setMessage] = (0, import_react.useState)("");
	const [flashDesigns, setFlashDesigns] = (0, import_react.useState)([]);
	const [loadingFlash, setLoadingFlash] = (0, import_react.useState)(true);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [editForm, setEditForm] = (0, import_react.useState)({
		title: "",
		description: "",
		style: "",
		size: "",
		price: "",
		status: "available",
		image_url: "",
		original_image_url: ""
	});
	const [flashCropPreview, setFlashCropPreview] = (0, import_react.useState)("");
	const [flashCrop, setFlashCrop] = (0, import_react.useState)({
		x: 0,
		y: 0
	});
	const [flashZoom, setFlashZoom] = (0, import_react.useState)(1);
	const [flashCroppedAreaPixels, setFlashCroppedAreaPixels] = (0, import_react.useState)(null);
	const [uploadingImage, setUploadingImage] = (0, import_react.useState)(false);
	const [flashImageTarget, setFlashImageTarget] = (0, import_react.useState)("new");
	const [flashCropFile, setFlashCropFile] = (0, import_react.useState)(null);
	async function loadFlashDesigns() {
		setLoadingFlash(true);
		const { data, error } = await supabase.from("flash_designs").select("id,title,description,style,size,price,status,image_url,original_image_url").order("created_at", { ascending: false });
		if (error) {
			console.error(error);
			setMessage("Could not load flash designs.");
		} else setFlashDesigns(data ?? []);
		setLoadingFlash(false);
	}
	(0, import_react.useEffect)(() => {
		loadFlashDesigns();
	}, []);
	function updateField(field, value) {
		setForm((current) => ({
			...current,
			[field]: value
		}));
	}
	function startEditingFlash(design) {
		setEditingId(design.id);
		setEditForm({
			title: design.title ?? "",
			description: design.description ?? "",
			style: design.style ?? "",
			size: design.size ?? "",
			price: design.price !== null ? String(design.price) : "",
			status: design.status,
			image_url: design.image_url ?? "",
			original_image_url: design.original_image_url ?? design.image_url ?? ""
		});
		setMessage("Editing flash design.");
	}
	function updateEditField(field, value) {
		setEditForm((current) => ({
			...current,
			[field]: value
		}));
	}
	function cancelEditingFlash() {
		setEditForm({
			title: "",
			description: "",
			style: "",
			size: "",
			price: "",
			status: "available",
			image_url: "",
			original_image_url: ""
		});
		setMessage("");
	}
	function selectFlashImageForCrop(event, target) {
		const file = event.target.files?.[0];
		if (!file) return;
		setFlashImageTarget(target);
		setFlashCropFile(file);
		setFlashCropPreview(URL.createObjectURL(file));
		setFlashCrop({
			x: 0,
			y: 0
		});
		setFlashZoom(1);
		setFlashCroppedAreaPixels(null);
		setMessage("Adjust the flash image crop, then click Use this crop.");
	}
	function recropCurrentFlashImage() {
		const imageToCrop = editForm.original_image_url || editForm.image_url;
		if (!imageToCrop) {
			setMessage("There is no image to crop.");
			return;
		}
		setFlashImageTarget("edit");
		setFlashCropFile(null);
		setFlashCropPreview(imageToCrop);
		setFlashCrop({
			x: 0,
			y: 0
		});
		setFlashZoom(1);
		setFlashCroppedAreaPixels(null);
		setMessage("Adjust the existing original image crop, then click Use this crop.");
	}
	function onFlashCropComplete(_croppedArea, croppedAreaPixels) {
		setFlashCroppedAreaPixels(croppedAreaPixels);
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
	async function uploadCroppedFlashImage() {
		if (!flashCropPreview || !flashCroppedAreaPixels) {
			setMessage("Please choose and position a flash image first.");
			return;
		}
		setUploadingImage(true);
		setMessage("Cropping and uploading flash image...");
		try {
			let originalImageUrl = "";
			if (flashCropFile) {
				const originalFileName = `flash-original-${Date.now()}-${flashCropFile.name}`;
				const { error: originalUploadError } = await supabase.storage.from("website-images").upload(originalFileName, flashCropFile, {
					cacheControl: "3600",
					upsert: true
				});
				if (originalUploadError) {
					console.error(originalUploadError);
					setMessage("Original flash image upload failed.");
					setUploadingImage(false);
					return;
				}
				const { data: originalData } = supabase.storage.from("website-images").getPublicUrl(originalFileName);
				originalImageUrl = originalData.publicUrl;
			}
			const croppedFileName = `flash-design-${Date.now()}.jpg`;
			const croppedFile = await getCroppedImageFile(flashCropPreview, flashCroppedAreaPixels, croppedFileName);
			const { error: croppedUploadError } = await supabase.storage.from("website-images").upload(croppedFileName, croppedFile, {
				cacheControl: "3600",
				upsert: true
			});
			if (croppedUploadError) {
				console.error(croppedUploadError);
				setMessage("Flash image upload failed.");
				setUploadingImage(false);
				return;
			}
			const { data: croppedData } = supabase.storage.from("website-images").getPublicUrl(croppedFileName);
			if (flashImageTarget === "edit") {
				updateEditField("image_url", croppedData.publicUrl);
				if (originalImageUrl) updateEditField("original_image_url", originalImageUrl);
				setMessage("Flash image cropped. Click Save changes to keep it.");
			} else {
				updateField("image_url", croppedData.publicUrl);
				if (originalImageUrl) updateField("original_image_url", originalImageUrl);
				setMessage("Flash image uploaded. Fill in the details, then save the design.");
			}
			setFlashCropFile(null);
			setFlashCropPreview("");
			setFlashCroppedAreaPixels(null);
		} catch (error) {
			console.error(error);
			setMessage("Something went wrong while cropping the flash image.");
		}
		setUploadingImage(false);
	}
	async function saveFlashDesign() {
		setSaving(true);
		setMessage("");
		if (!form.title.trim()) {
			setMessage("Please add a title before saving.");
			setSaving(false);
			return;
		}
		const priceNumber = form.price ? Number(form.price) : null;
		const { error } = await supabase.from("flash_designs").insert({
			title: form.title,
			description: form.description,
			style: form.style,
			size: form.size,
			price: priceNumber,
			status: form.status,
			image_url: form.image_url,
			original_image_url: form.original_image_url,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		});
		if (error) {
			console.error(error);
			setMessage("Something went wrong. Flash design was not saved.");
		} else {
			setMessage("Flash design saved successfully.");
			setForm({
				title: "",
				description: "",
				style: "",
				size: "",
				price: "",
				status: "available",
				image_url: "",
				original_image_url: ""
			});
			loadFlashDesigns();
		}
		setSaving(false);
	}
	async function deleteFlashDesign(id) {
		if (!window.confirm("Are you sure you want to delete this flash design? This cannot be undone.")) return;
		setMessage("");
		const { error } = await supabase.from("flash_designs").delete().eq("id", id);
		if (error) {
			console.error(error);
			setMessage("Something went wrong. Flash design was not deleted.");
			return;
		}
		setMessage("Flash design deleted.");
		loadFlashDesigns();
	}
	async function updateFlashStatus(id, status) {
		setMessage("");
		const { error } = await supabase.from("flash_designs").update({
			status,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", id);
		if (error) {
			console.error(error);
			setMessage("Something went wrong. Flash status was not updated.");
			return;
		}
		setMessage("Flash status updated.");
		loadFlashDesigns();
	}
	async function saveEditedFlashDesign() {
		if (!editingId) return;
		setSaving(true);
		setMessage("");
		if (!editForm.title.trim()) {
			setMessage("Please add a title before saving.");
			setSaving(false);
			return;
		}
		const priceNumber = editForm.price ? Number(editForm.price) : null;
		const { error } = await supabase.from("flash_designs").update({
			title: editForm.title,
			description: editForm.description,
			style: editForm.style,
			size: editForm.size,
			price: priceNumber,
			status: editForm.status,
			image_url: editForm.image_url,
			original_image_url: editForm.original_image_url,
			updated_at: (/* @__PURE__ */ new Date()).toISOString()
		}).eq("id", editingId);
		if (error) {
			console.error(error);
			setMessage("Something went wrong. Flash design was not updated.");
		} else {
			setMessage("Flash design updated successfully.");
			cancelEditingFlash();
			loadFlashDesigns();
		}
		setSaving(false);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-semibold",
				children: "Manage Flash Designs"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Add, edit and manage available tattoo flash designs."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Add new flash design"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "block text-sm font-medium",
								children: "Flash image"
							}),
							form.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: form.image_url,
								alt: "Selected flash design",
								className: "mt-3 aspect-[4/5] w-48 rounded-xl border object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: "Upload the image customers will see for this flash design."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 inline-flex cursor-pointer items-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90",
								children: ["Choose flash image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*",
									className: "hidden",
									onChange: (event) => selectFlashImageForCrop(event, "new")
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium",
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "mt-2 w-full rounded-lg border px-3 py-2",
							value: form.title,
							onChange: (event) => updateField("title", event.target.value),
							placeholder: "Example: Fine line butterfly"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "mt-2 min-h-24 w-full rounded-lg border px-3 py-2",
							value: form.description,
							onChange: (event) => updateField("description", event.target.value),
							placeholder: "Short description of the design"
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium",
									children: "Style"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "mt-2 w-full rounded-lg border px-3 py-2",
									value: form.style,
									onChange: (event) => updateField("style", event.target.value),
									placeholder: "Fine line"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium",
									children: "Size"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "mt-2 w-full rounded-lg border px-3 py-2",
									value: form.size,
									onChange: (event) => updateField("size", event.target.value),
									placeholder: "Approx. 5cm"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium",
									children: "Price"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "mt-2 w-full rounded-lg border px-3 py-2",
									value: form.price,
									onChange: (event) => updateField("price", event.target.value),
									placeholder: "80"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "mt-2 w-full rounded-lg border px-3 py-2",
							value: form.status,
							onChange: (event) => updateField("status", event.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "available",
									children: "Available"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "claimed",
									children: "Claimed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sold",
									children: "Sold"
								})
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: saveFlashDesign,
							disabled: saving,
							className: "rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background disabled:opacity-50",
							children: saving ? "Saving..." : "Save flash design"
						}),
						message && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: message
						})
					]
				})]
			}),
			editingId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Edit flash design"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium",
							children: "Title"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "mt-2 w-full rounded-lg border px-3 py-2",
							value: editForm.title,
							onChange: (event) => updateEditField("title", event.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium",
							children: "Description"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "mt-2 min-h-24 w-full rounded-lg border px-3 py-2",
							value: editForm.description,
							onChange: (event) => updateEditField("description", event.target.value)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-5 md:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium",
									children: "Style"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "mt-2 w-full rounded-lg border px-3 py-2",
									value: editForm.style,
									onChange: (event) => updateEditField("style", event.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium",
									children: "Size"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "mt-2 w-full rounded-lg border px-3 py-2",
									value: editForm.size,
									onChange: (event) => updateEditField("size", event.target.value)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "block text-sm font-medium",
									children: "Price"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "mt-2 w-full rounded-lg border px-3 py-2",
									value: editForm.price,
									onChange: (event) => updateEditField("price", event.target.value)
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "block text-sm font-medium",
							children: "Status"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "mt-2 w-full rounded-lg border px-3 py-2",
							value: editForm.status,
							onChange: (event) => updateEditField("status", event.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "available",
									children: "Available"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "claimed",
									children: "Claimed"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "sold",
									children: "Sold"
								})
							]
						})] }),
						editForm.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: editForm.image_url,
							alt: "Flash design preview",
							className: "aspect-[4/5] w-48 rounded-xl border object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Replace the image completely, or re-crop the current saved image."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex cursor-pointer items-center rounded-full border px-5 py-2 text-sm hover:bg-accent",
								children: ["Replace flash image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/*",
									className: "hidden",
									onChange: (event) => selectFlashImageForCrop(event, "edit")
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: recropCurrentFlashImage,
								className: "rounded-full border px-5 py-2 text-sm hover:bg-accent",
								children: "Re-crop current image"
							})]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: saveEditedFlashDesign,
								disabled: saving,
								className: "rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background disabled:opacity-50",
								children: saving ? "Saving..." : "Save changes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: cancelEditingFlash,
								className: "rounded-full border px-5 py-2 text-sm hover:bg-accent",
								children: "Cancel"
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-2xl border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Saved flash designs"
				}), loadingFlash ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "Loading flash designs..."
				}) : flashDesigns.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted-foreground",
					children: "No flash designs have been added yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4 md:grid-cols-2",
					children: flashDesigns.map((design) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border p-4",
						children: [
							design.image_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: design.image_url,
								alt: design.title,
								className: "mb-4 aspect-[4/5] w-full rounded-lg object-cover"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-semibold",
									children: design.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										design.style || "No style",
										" • ",
										design.size || "No size"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									className: "rounded-full border bg-background px-3 py-1 text-xs capitalize",
									value: design.status,
									onChange: (event) => updateFlashStatus(design.id, event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "available",
											children: "Available"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "claimed",
											children: "Claimed"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "sold",
											children: "Sold"
										})
									]
								})]
							}),
							design.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: design.description
							}),
							design.price !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-sm font-medium",
								children: ["£", design.price]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2 border-t pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => startEditingFlash(design),
									className: "rounded-full border px-4 py-2 text-sm hover:bg-accent",
									children: "Edit"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => deleteFlashDesign(design.id),
									className: "rounded-full border border-destructive/40 px-4 py-2 text-sm text-destructive hover:bg-destructive/10",
									children: "Delete"
								})]
							})
						]
					}, design.id))
				})]
			}),
			flashCropPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-3xl rounded-3xl bg-background p-6 shadow-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold",
								children: "Crop flash image"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: "Drag the image and zoom until the visible 4:5 area looks right."
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full border px-3 py-1 text-sm hover:bg-accent",
								onClick: () => {
									setFlashCropPreview("");
									setFlashCroppedAreaPixels(null);
								},
								children: "Cancel"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative mt-5 h-[520px] overflow-hidden rounded-2xl bg-black",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(src_default, {
								image: flashCropPreview,
								crop: flashCrop,
								zoom: flashZoom,
								aspect: 4 / 5,
								onCropChange: setFlashCrop,
								onZoomChange: setFlashZoom,
								onCropComplete: onFlashCropComplete,
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
								value: flashZoom,
								onChange: (event) => setFlashZoom(Number(event.target.value)),
								className: "mt-2 w-full"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap justify-end gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-full border px-5 py-2 text-sm hover:bg-accent",
								onClick: () => {
									setFlashCropPreview("");
									setFlashCroppedAreaPixels(null);
								},
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: uploadCroppedFlashImage,
								disabled: uploadingImage,
								className: "rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background disabled:opacity-50",
								children: uploadingImage ? "Uploading..." : "Use this crop"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { ManageFlashDesigns as component };
