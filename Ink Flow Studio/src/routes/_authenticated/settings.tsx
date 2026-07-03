import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Cropper, { type Area } from "react-easy-crop";

export const Route = createFileRoute("/_authenticated/settings")({
  component: ArtistSettings,
});

type SiteSettings = {
  id?: string;
  business_name: string;
  tagline: string;
  studio_name: string;
  location: string;
  instagram_username: string;
  homepage_intro: string;
  logo_url: string;
  homepage_image_url: string;
};

function ArtistSettings() {
  const [settings, setSettings] = useState<SiteSettings>({
    business_name: "SummerRose Tattoos",
    tagline: "Micro-Realism • Fine Line • Whimsical",
    studio_name: "Inkantations",
    location: "Towcester, Northampton",
    instagram_username: "@summerrosetattoos",
    homepage_intro:
      "Custom tattoos by SummerRose, based at Inkantations in Towcester, Northampton. Submit an enquiry, claim a flash design, or get a rough price before you book.",
    logo_url: "/images/Logo.png",
    homepage_image_url: "/images/Logo.png",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [homepageCropFile, setHomepageCropFile] = useState<File | null>(null);
  const [homepageCropPreview, setHomepageCropPreview] = useState("");
  const [homepageCrop, setHomepageCrop] = useState({ x: 0, y: 0 });
  const [homepageZoom, setHomepageZoom] = useState(1);
  const [homepageCroppedAreaPixels, setHomepageCroppedAreaPixels] =
    useState<Area | null>(null);

  useEffect(() => {
    async function loadSettings() {
      const { data, error } = await (supabase as any)
        .from("site_settings")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error(error);
        setMessage("Could not load settings.");
      }

      if (data) {
        setSettings({
          id: data.id,
          business_name: data.business_name ?? "SummerRose Tattoos",
          tagline: data.tagline ?? "Micro-Realism • Fine Line • Whimsical",
          studio_name: data.studio_name ?? "Inkantations",
          location: data.location ?? "Towcester, Northampton",
          instagram_username: data.instagram_username ?? "@summerrosetattoos",
          homepage_intro:
            data.homepage_intro ??
            "Custom tattoos by SummerRose, based at Inkantations in Towcester, Northampton. Submit an enquiry, claim a flash design, or get a rough price before you book.",
          logo_url: data.logo_url ?? "/images/Logo.png",
          homepage_image_url: data.homepage_image_url ?? "/images/Logo.png",
        });
      }

      setLoading(false);
    }

    loadSettings();
  }, []);

  function updateField(field: keyof SiteSettings, value: string) {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function uploadImage(
    event: React.ChangeEvent<HTMLInputElement>,
    field: "logo_url" | "homepage_image_url"
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    updateField(field, previewUrl);

    setUploading(true);
    setMessage("Image selected. Uploading now...");

    const fileExtension = file.name.split(".").pop();
    const fileName = `${field}-${Date.now()}.${fileExtension}`;

    const { error } = await supabase.storage
      .from("website-images")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error(error);
      setMessage("Image upload failed.");
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("website-images")
      .getPublicUrl(fileName);

    updateField(field, data.publicUrl);
    setMessage("Image uploaded. Click Save changes to keep it.");
    setUploading(false);
  }

  function selectHomepageImageForCrop(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setHomepageCropFile(file);
    setHomepageCropPreview(URL.createObjectURL(file));
    setHomepageCrop({ x: 0, y: 0 });
    setHomepageZoom(1);
    setHomepageCroppedAreaPixels(null);
    setMessage("Adjust the homepage image crop, then click Use this crop.");
  }

  function onHomepageCropComplete(
    _croppedArea: Area,
    croppedAreaPixels: Area
  ) {
    setHomepageCroppedAreaPixels(croppedAreaPixels);
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

  async function uploadCroppedHomepageImage() {
    if (!homepageCropPreview || !homepageCroppedAreaPixels) {
      setMessage("Please choose and position an image first.");
      return;
    }

    setUploading(true);
    setMessage("Cropping and uploading homepage image...");

    try {
      const croppedFile = await getCroppedImageFile(
        homepageCropPreview,
        homepageCroppedAreaPixels,
        `homepage-image-${Date.now()}.jpg`
      );

      const fileName = `homepage-image-${Date.now()}.jpg`;

      const { error } = await supabase.storage
        .from("website-images")
        .upload(fileName, croppedFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error(error);
        setMessage("Cropped image upload failed.");
        setUploading(false);
        return;
      }

      const { data } = supabase.storage
        .from("website-images")
        .getPublicUrl(fileName);

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

    const { error } = await (supabase as any)
      .from("site_settings")
      .update({
        business_name: settings.business_name,
        tagline: settings.tagline,
        studio_name: settings.studio_name,
        location: settings.location,
        instagram_username: settings.instagram_username,
        homepage_intro: settings.homepage_intro,
        logo_url: settings.logo_url,
        homepage_image_url: settings.homepage_image_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", settings.id);

    if (error) {
      console.error(error);
      setMessage("Something went wrong. Settings were not saved.");
    } else {
      setMessage("Settings saved successfully.");
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-semibold">Artist Settings</h1>

      <p className="mt-2 text-muted-foreground">
        Edit the main website details without touching code.
      </p>

      <div className="mt-8 rounded-2xl border bg-card p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium">Business name</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.business_name}
            onChange={(event) => updateField("business_name", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tagline</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.tagline}
            onChange={(event) => updateField("tagline", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Studio name</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.studio_name}
            onChange={(event) => updateField("studio_name", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.location}
            onChange={(event) => updateField("location", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Instagram username</label>
          <input
            className="mt-2 w-full rounded-lg border px-3 py-2"
            value={settings.instagram_username}
            onChange={(event) => updateField("instagram_username", event.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Logo image</label>

          {settings.logo_url && (
            <img
              src={settings.logo_url}
              alt="Current logo"
              className="mt-3 h-32 w-32 rounded-xl border object-cover"
            />
          )}

          <p className="mt-2 text-sm text-muted-foreground">
            Upload the logo image used around the website.
          </p>

          <label className="mt-3 inline-flex cursor-pointer items-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90">
            Choose logo image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => uploadImage(event, "logo_url")}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium">Homepage image</label>

          {settings.homepage_image_url && (
            <img
              src={settings.homepage_image_url}
              alt="Current homepage"
              className="mt-3 h-48 w-48 rounded-xl border object-cover"
            />
          )}

          <p className="mt-2 text-sm text-muted-foreground">
            Upload the main image shown on the homepage.
          </p>

          <label className="mt-3 inline-flex cursor-pointer items-center rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:opacity-90">
            Choose homepage image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={selectHomepageImageForCrop}
            />
          </label>

          {homepageCropPreview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
              <div className="w-full max-w-3xl rounded-3xl bg-background p-6 shadow-xl">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold">Crop homepage image</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Drag the image and zoom until the visible 4:5 area looks right.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="rounded-full border px-3 py-1 text-sm hover:bg-accent"
                    onClick={() => {
                      setHomepageCropFile(null);
                      setHomepageCropPreview("");
                      setHomepageCroppedAreaPixels(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>

                <div className="relative mt-5 h-[520px] overflow-hidden rounded-2xl bg-black">
                  <Cropper
                    image={homepageCropPreview}
                    crop={homepageCrop}
                    zoom={homepageZoom}
                    aspect={4 / 5}
                    onCropChange={setHomepageCrop}
                    onZoomChange={setHomepageZoom}
                    onCropComplete={onHomepageCropComplete}
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
                    value={homepageZoom}
                    onChange={(event) => setHomepageZoom(Number(event.target.value))}
                    className="mt-2 w-full"
                  />
                </div>

                <div className="mt-6 flex flex-wrap justify-end gap-3">
                  <button
                    type="button"
                    className="rounded-full border px-5 py-2 text-sm hover:bg-accent"
                    onClick={() => {
                      setHomepageCropFile(null);
                      setHomepageCropPreview("");
                      setHomepageCroppedAreaPixels(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={uploadCroppedHomepageImage}
                    disabled={uploading}
                    className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background disabled:opacity-50"
                  >
                    {uploading ? "Uploading..." : "Use this crop"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {uploading && (
          <p className="text-sm text-muted-foreground">Uploading image...</p>
        )}

        <div className="flex items-center gap-4">
          <button
            onClick={saveSettings}
            disabled={saving}
            className="rounded-full bg-foreground px-5 py-2 text-background disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>

          {message && <p className="text-sm text-muted-foreground">{message}</p>}
        </div>
      </div>
    </div>
  );
}