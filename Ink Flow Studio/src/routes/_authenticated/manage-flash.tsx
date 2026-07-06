import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Cropper, { type Area } from "react-easy-crop";

export const Route = createFileRoute("/_authenticated/manage-flash")({
    component: ManageFlashDesigns,
});

type FlashForm = {
    title: string;
    description: string;
    style: string;
    size: string;
    price: string;
    status: string;
    image_url: string;
};

type FlashDesign = {
    id: string;
    title: string;
    description: string | null;
    style: string | null;
    size: string | null;
    price: number | null;
    status: string;
    image_url: string | null;
};

function ManageFlashDesigns() {
    const [form, setForm] = useState<FlashForm>({
        title: "",
        description: "",
        style: "",
        size: "",
        price: "",
        status: "available",
        image_url: "",
    });

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [flashDesigns, setFlashDesigns] = useState<FlashDesign[]>([]);
    const [loadingFlash, setLoadingFlash] = useState(true);
    const [flashCropPreview, setFlashCropPreview] = useState("");
    const [flashCrop, setFlashCrop] = useState({ x: 0, y: 0 });
    const [flashZoom, setFlashZoom] = useState(1);
    const [flashCroppedAreaPixels, setFlashCroppedAreaPixels] =
        useState<Area | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);

    async function loadFlashDesigns() {
        setLoadingFlash(true);

        const { data, error } = await (supabase as any)
            .from("flash_designs")
            .select("id,title,description,style,size,price,status,image_url")
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            setMessage("Could not load flash designs.");
        } else {
            setFlashDesigns(data ?? []);
        }

        setLoadingFlash(false);
    }

    useEffect(() => {
        loadFlashDesigns();
    }, []);

    function updateField(field: keyof FlashForm, value: string) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    function selectFlashImageForCrop(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setFlashCropPreview(URL.createObjectURL(file));
        setFlashCrop({ x: 0, y: 0 });
        setFlashZoom(1);
        setFlashCroppedAreaPixels(null);
        setMessage("Adjust the flash image crop, then click Use this crop.");
    }

    function onFlashCropComplete(_croppedArea: Area, croppedAreaPixels: Area) {
        setFlashCroppedAreaPixels(croppedAreaPixels);
    }

    function createImage(url: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.addEventListener("load", () => resolve(image));
            image.addEventListener("error", (error) => reject(error));
            image.setAttribute("crossOrigin", "anonymous");
            image.src = url;
        });
    }

    async function getCroppedImageFile(
        imageSrc: string,
        cropPixels: Area,
        fileName: string
    ): Promise<File> {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Could not create image crop.");
        }

        canvas.width = cropPixels.width;
        canvas.height = cropPixels.height;

        context.drawImage(
            image,
            cropPixels.x,
            cropPixels.y,
            cropPixels.width,
            cropPixels.height,
            0,
            0,
            cropPixels.width,
            cropPixels.height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("Could not crop image."));
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
            const fileName = `flash-design-${Date.now()}.jpg`;

            const croppedFile = await getCroppedImageFile(
                flashCropPreview,
                flashCroppedAreaPixels,
                fileName
            );

            const { error } = await supabase.storage
                .from("website-images")
                .upload(fileName, croppedFile, {
                    cacheControl: "3600",
                    upsert: true,
                });

            if (error) {
                console.error(error);
                setMessage("Flash image upload failed.");
                setUploadingImage(false);
                return;
            }

            const { data } = supabase.storage
                .from("website-images")
                .getPublicUrl(fileName);

            updateField("image_url", data.publicUrl);
            setFlashCropPreview("");
            setFlashCroppedAreaPixels(null);
            setMessage("Flash image uploaded. Fill in the details, then save the design.");
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

        const { error } = await (supabase as any).from("flash_designs").insert({
            title: form.title,
            description: form.description,
            style: form.style,
            size: form.size,
            price: priceNumber,
            status: form.status,
            image_url: form.image_url,
            updated_at: new Date().toISOString(),
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
            });

            loadFlashDesigns();
        }

        setSaving(false);
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="text-3xl font-semibold">Manage Flash Designs</h1>

            <p className="mt-2 text-muted-foreground">
                Add, edit and manage available tattoo flash designs.
            </p>

            <div className="mt-8 rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-semibold">Add new flash design</h2>

                <div className="mt-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium">Flash image</label>

                        {form.image_url && (
                            <img
                                src={form.image_url}
                                alt="Selected flash design"
                                className="mt-3 aspect-[4/5] w-48 rounded-xl border object-cover"
                            />
                        )}

                        <p className="mt-2 text-sm text-muted-foreground">
                            Upload the image customers will see for this flash design.
                        </p>

                        <label className="mt-3 inline-flex cursor-pointer items-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90">
                            Choose flash image
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={selectFlashImageForCrop}
                            />
                        </label>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            className="mt-2 w-full rounded-lg border px-3 py-2"
                            value={form.title}
                            onChange={(event) => updateField("title", event.target.value)}
                            placeholder="Example: Fine line butterfly"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            className="mt-2 min-h-24 w-full rounded-lg border px-3 py-2"
                            value={form.description}
                            onChange={(event) =>
                                updateField("description", event.target.value)
                            }
                            placeholder="Short description of the design"
                        />
                    </div>

                    <div className="grid gap-5 md:grid-cols-3">
                        <div>
                            <label className="block text-sm font-medium">Style</label>
                            <input
                                className="mt-2 w-full rounded-lg border px-3 py-2"
                                value={form.style}
                                onChange={(event) => updateField("style", event.target.value)}
                                placeholder="Fine line"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Size</label>
                            <input
                                className="mt-2 w-full rounded-lg border px-3 py-2"
                                value={form.size}
                                onChange={(event) => updateField("size", event.target.value)}
                                placeholder="Approx. 5cm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Price</label>
                            <input
                                className="mt-2 w-full rounded-lg border px-3 py-2"
                                value={form.price}
                                onChange={(event) => updateField("price", event.target.value)}
                                placeholder="80"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Status</label>
                        <select
                            className="mt-2 w-full rounded-lg border px-3 py-2"
                            value={form.status}
                            onChange={(event) => updateField("status", event.target.value)}
                        >
                            <option value="available">Available</option>
                            <option value="claimed">Claimed</option>
                            <option value="sold">Sold</option>
                        </select>
                    </div>

                    <button
                        type="button"
                        onClick={saveFlashDesign}
                        disabled={saving}
                        className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save flash design"}
                    </button>

                    {message && <p className="text-sm text-muted-foreground">{message}</p>}

                </div>
            </div>

            <div className="mt-8 rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-semibold">Saved flash designs</h2>

                {loadingFlash ? (
                    <p className="mt-4 text-sm text-muted-foreground">Loading flash designs...</p>
                ) : flashDesigns.length === 0 ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                        No flash designs have been added yet.
                    </p>
                ) : (
                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                        {flashDesigns.map((design) => (
                            <div key={design.id} className="rounded-xl border p-4">
                                {design.image_url && (
                                    <img
                                        src={design.image_url}
                                        alt={design.title}
                                        className="mb-4 aspect-[4/5] w-full rounded-lg object-cover"
                                    />
                                )}

                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold">{design.title}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {design.style || "No style"} • {design.size || "No size"}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-secondary px-3 py-1 text-xs capitalize">
                                        {design.status}
                                    </span>
                                </div>

                                {design.description && (
                                    <p className="mt-3 text-sm text-muted-foreground">
                                        {design.description}
                                    </p>
                                )}

                                {design.price !== null && (
                                    <p className="mt-3 text-sm font-medium">£{design.price}</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {flashCropPreview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-3xl rounded-3xl bg-background p-6 shadow-xl">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-semibold">Crop flash image</h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Drag the image and zoom until the visible 4:5 area looks right.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="rounded-full border px-3 py-1 text-sm hover:bg-accent"
                                onClick={() => {
                                    setFlashCropPreview("");
                                    setFlashCroppedAreaPixels(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>

                        <div className="relative mt-5 h-[520px] overflow-hidden rounded-2xl bg-black">
                            <Cropper
                                image={flashCropPreview}
                                crop={flashCrop}
                                zoom={flashZoom}
                                aspect={4 / 5}
                                onCropChange={setFlashCrop}
                                onZoomChange={setFlashZoom}
                                onCropComplete={onFlashCropComplete}
                                showGrid={false}
                            />
                        </div>

                        <div className="mt-5">
                            <label className="block text-sm font-medium">Zoom</label>
                            <input
                                type="range"
                                min="1"
                                max="3"
                                step="0.05"
                                value={flashZoom}
                                onChange={(event) => setFlashZoom(Number(event.target.value))}
                                className="mt-2 w-full"
                            />
                        </div>

                        <div className="mt-6 flex flex-wrap justify-end gap-3">
                            <button
                                type="button"
                                className="rounded-full border px-5 py-2 text-sm hover:bg-accent"
                                onClick={() => {
                                    setFlashCropPreview("");
                                    setFlashCroppedAreaPixels(null);
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={uploadCroppedFlashImage}
                                disabled={uploadingImage}
                                className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background disabled:opacity-50"
                            >
                                {uploadingImage ? "Uploading..." : "Use this crop"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}