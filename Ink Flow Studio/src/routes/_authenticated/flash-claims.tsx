import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/flash-claims")({
    component: FlashClaims,
});

type FlashClaim = {
    id: string;
    flash_id: string | null;
    full_name: string;
    email: string;
    phone: string | null;
    customer_instagram: string | null;
    placement: string | null;
    preferred_dates: string | null;
    consent: boolean;
    status: string;
    created_at: string;
    flash_designs: {
        title: string;
        image_url: string | null;
        style: string | null;
        size: string | null;
        price: number | null;
        status: string;
    } | null;
};

function FlashClaims() {
    const [claims, setClaims] = useState<FlashClaim[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [pendingStatusChange, setPendingStatusChange] = useState<{
        claim: FlashClaim;
        newStatus: string;
        flashStatus: string;
    } | null>(null);
    const [statusFilter, setStatusFilter] = useState<
        "all" | "new" | "contacted" | "booked" | "declined"
    >("all");

    async function loadClaims() {
        setLoading(true);

        const { data, error } = await (supabase as any)
            .from("flash_claims")
            .select(
                "id,flash_id,full_name,email,phone,customer_instagram,placement,preferred_dates,consent,status,created_at,flash_designs(title,image_url,style,size,price,status)"
            )
            .order("created_at", { ascending: false });

        if (error) {
            console.error(error);
            setMessage("Could not load flash claims.");
        } else {
            setClaims(data ?? []);
        }

        setLoading(false);
    }

    function updateClaimStatus(claim: FlashClaim, newStatus: string) {
        const flashStatus =
            newStatus === "booked"
                ? "sold"
                : newStatus === "declined"
                    ? "available"
                    : "claimed";

        setPendingStatusChange({
            claim,
            newStatus,
            flashStatus,
        });
    }

    async function confirmClaimStatusChange() {
        if (!pendingStatusChange) {
            return;
        }

        const { claim, newStatus, flashStatus } = pendingStatusChange;

        setMessage("");

        const { error: claimError } = await (supabase as any)
            .from("flash_claims")
            .update({
                status: newStatus,
                updated_at: new Date().toISOString(),
            })
            .eq("id", claim.id);

        if (claimError) {
            console.error(claimError);
            setMessage("Something went wrong. Claim status was not updated.");
            setPendingStatusChange(null);
            return;
        }

        if (claim.flash_id) {
            const { error: flashError } = await (supabase as any)
                .from("flash_designs")
                .update({
                    status: flashStatus,
                    updated_at: new Date().toISOString(),
                })
                .eq("id", claim.flash_id);

            if (flashError) {
                console.error(flashError);
                setMessage(
                    "Claim status updated, but the flash design status could not be updated."
                );
                setPendingStatusChange(null);
                loadClaims();
                return;
            }
        }

        setMessage("Claim and flash design status updated.");
        setPendingStatusChange(null);
        loadClaims();
    }

    useEffect(() => {
        loadClaims();
    }, []);

    const statusCounts = {
        all: claims.length,
        new: claims.filter((claim) => claim.status === "new").length,
        contacted: claims.filter((claim) => claim.status === "contacted").length,
        booked: claims.filter((claim) => claim.status === "booked").length,
        declined: claims.filter((claim) => claim.status === "declined").length,
    };

    const filteredClaims =
        statusFilter === "all"
            ? claims
            : claims.filter((claim) => claim.status === statusFilter);

    function getInstagramHandle(instagram: string | null) {
        if (!instagram) {
            return "";
        }

        return instagram
            .trim()
            .replace("@", "")
            .replace("https://www.instagram.com/", "")
            .replace("https://instagram.com/", "")
            .split("/")[0]
            .split("?")[0];
    }

    function getInstagramDmUrl(instagram: string | null) {
        const handle = getInstagramHandle(instagram);

        if (!handle) {
            return "";
        }

        return `https://ig.me/m/${handle}`;
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="text-3xl font-semibold">Flash Claims</h1>

            <p className="mt-2 text-muted-foreground">
                View and manage customer claims for flash designs.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
                {[
                    { value: "all", label: "All" },
                    { value: "new", label: "New" },
                    { value: "contacted", label: "Contacted" },
                    { value: "booked", label: "Booked" },
                    { value: "declined", label: "Declined" },
                ].map((filter) => (
                    <button
                        key={filter.value}
                        type="button"
                        onClick={() =>
                            setStatusFilter(
                                filter.value as "all" | "new" | "contacted" | "booked" | "declined"
                            )
                        }
                        className={`rounded-full border px-4 py-2 text-sm ${statusFilter === filter.value
                            ? "bg-foreground text-background"
                            : "hover:bg-accent"
                            }`}
                    >
                        {filter.label}{" "}
                        <span className="ml-1 rounded-full bg-background/20 px-2">
                            {statusCounts[filter.value as keyof typeof statusCounts]}
                        </span>
                    </button>
                ))}
            </div>

            {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}

            <div className="mt-8 rounded-2xl border bg-card p-6">
                <h2 className="text-xl font-semibold">Customer claims</h2>

                {loading ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                        Loading flash claims...
                    </p>
                ) : filteredClaims.length === 0 ? (
                    <p className="mt-4 text-sm text-muted-foreground">
                        No flash claims have been submitted yet.
                    </p>
                ) : (
                    <div className="mt-6 space-y-4">
                        {filteredClaims.map((claim) => (
                            <div key={claim.id} className="rounded-xl border p-4">
                                {claim.flash_designs && (
                                    <div className="mb-4 flex gap-4 rounded-xl bg-muted/40 p-3">
                                        {claim.flash_designs.image_url && (
                                            <img
                                                src={claim.flash_designs.image_url}
                                                alt={claim.flash_designs.title}
                                                className="h-32 w-24 rounded-lg object-cover"
                                            />
                                        )}

                                        <div>
                                            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                                                Claimed flash
                                            </p>

                                            <h3 className="mt-1 font-semibold">{claim.flash_designs.title}</h3>

                                            <p className="mt-1 text-sm text-muted-foreground">
                                                {claim.flash_designs.style || "No style"} •{" "}
                                                {claim.flash_designs.size || "No size"}
                                            </p>

                                            <p className="mt-1 text-sm font-medium">
                                                {claim.flash_designs.price !== null
                                                    ? `£${Number(claim.flash_designs.price).toFixed(0)}`
                                                    : "Price TBC"}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex flex-wrap items-start justify-between gap-4">
                                    <div>
                                        <h3 className="font-semibold">{claim.full_name}</h3>
                                        <p className="mt-1 text-sm text-muted-foreground">
                                            {claim.email}
                                        </p>
                                        {claim.phone && (
                                            <p className="text-sm text-muted-foreground">
                                                {claim.phone}
                                            </p>
                                        )}

                                        {claim.customer_instagram && (
                                            <p className="text-sm text-muted-foreground">
                                                Instagram:{" "}
                                                <a
                                                    href={getInstagramDmUrl(claim.customer_instagram)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="font-medium text-foreground underline"
                                                >
                                                    @{getInstagramHandle(claim.customer_instagram)}
                                                </a>
                                            </p>
                                        )}
                                    </div>

                                    <select
                                        className="rounded-full border bg-background px-3 py-1 text-xs capitalize"
                                        value={claim.status}
                                        onChange={(event) => updateClaimStatus(claim, event.target.value)}
                                    >
                                        <option value="new">New</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="booked">Booked</option>
                                        <option value="declined">Declined</option>
                                    </select>
                                </div>

                                <div className="mt-4 grid gap-3 text-sm md:grid-cols-2">
                                    <p>
                                        <span className="font-medium">Placement:</span>{" "}
                                        {claim.placement || "Not provided"}
                                    </p>

                                    <p>
                                        <span className="font-medium">Preferred dates:</span>{" "}
                                        {claim.preferred_dates || "Not provided"}
                                    </p>

                                    <p>
                                        <span className="font-medium">Submitted:</span>{" "}
                                        {new Date(claim.created_at).toLocaleString()}
                                    </p>

                                    <p>
                                        <span className="font-medium">Consent:</span>{" "}
                                        {claim.consent ? "Yes" : "No"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {pendingStatusChange && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
                    <div className="w-full max-w-lg rounded-3xl bg-background p-6 shadow-xl">
                        <h2 className="text-xl font-semibold">Confirm status change</h2>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Are you sure you want to change this claim to{" "}
                            <span className="font-medium capitalize text-foreground">
                                {pendingStatusChange.newStatus}
                            </span>
                            ?
                        </p>

                        <div className="mt-5 rounded-2xl border bg-muted/30 p-4 text-sm">
                            <p className="font-medium">This will also update the flash design:</p>

                            <ul className="mt-3 list-disc space-y-2 pl-5 text-muted-foreground">
                                {pendingStatusChange.newStatus === "booked" && (
                                    <>
                                        <li>The customer claim will be marked as Booked.</li>
                                        <li>The flash design will be marked as Sold.</li>
                                        <li>Customers will no longer be able to claim this design.</li>
                                    </>
                                )}

                                {pendingStatusChange.newStatus === "declined" && (
                                    <>
                                        <li>The customer claim will be marked as Declined.</li>
                                        <li>The flash design will become Available again.</li>
                                        <li>Other customers will be able to claim this design.</li>
                                    </>
                                )}

                                {pendingStatusChange.newStatus === "contacted" && (
                                    <>
                                        <li>The customer claim will be marked as Contacted.</li>
                                        <li>The flash design will remain Claimed.</li>
                                        <li>Other customers will not be able to claim this design.</li>
                                    </>
                                )}

                                {pendingStatusChange.newStatus === "new" && (
                                    <>
                                        <li>The customer claim will be marked as New.</li>
                                        <li>The flash design will remain Claimed.</li>
                                        <li>Other customers will not be able to claim this design.</li>
                                    </>
                                )}
                            </ul>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setPendingStatusChange(null)}
                                className="rounded-full border px-5 py-2 text-sm hover:bg-accent"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={confirmClaimStatusChange}
                                className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background"
                            >
                                Confirm change
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}