"use client";

import { useMemo, useState } from "react";

/**
 * Properties / Marketplace page.
 * Save as app/properties/page.tsx (or components/Properties/Rentals.tsx and
 * render it from that route).
 *
 * Amenities are "powered by Google Maps" two ways, neither requiring a paid
 * API key:
 *   1. Each listing's map preview uses the public Maps embed pattern
 *      (`google.com/maps?q=lat,lng&output=embed`). For production, swap this
 *      for the official Maps Embed API URL with your own key — same src
 *      shape, just add `&key=YOUR_KEY` and switch the host to
 *      `www.google.com/maps/embed/v1/place`.
 *   2. "Nearby" category links open a real Google Maps search
 *      (schools / hospitals / matatu stage / supermarkets) centered on the
 *      listing's coordinates, in a new tab.
 */

const NAVY = "#1B1B3A";
const BLUE = "#0066FF";
const RED = "#bb2036";
const MUTED = "#3A3A52";
const BORDER = "#E4E3EE";
const SURFACE = "#F4F4F2";

type Listing = {
    id: string;
    title: string;
    neighborhood: string;
    address: string;
    rentKes: number;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    availableFrom: string;
    description: string;
    features: string[];
    petPolicy: string;
    verified: boolean;
    landlordOnFlowspace: boolean;
    lat: number;
    lng: number;
    // Each entry is a room/area label standing in for a real photo of that
    // room — swap for actual image URLs when you wire this up to real data.
    images: string[];
};

const LISTINGS: Listing[] = [
    {
        id: "kil-1",
        title: "2 Bedroom Apartment",
        neighborhood: "Kilimani",
        address: "Woodlands Rd, Kilimani, Nairobi",
        rentKes: 65000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 950,
        availableFrom: "Now",
        description:
            "A 3-minute walk to Yaya Centre, with backup water and reliable fibre already wired in.",
        features: ["Parking", "Backup water", "Wi-Fi ready", "Gated compound"],
        petPolicy: "Cats allowed, small dogs allowed",
        verified: true,
        landlordOnFlowspace: true,
        lat: -1.2905,
        lng: 36.782,
        images: ["Living room", "Kitchen", "Master bedroom", "Bathroom", "Exterior"],
    },
    {
        id: "kle-1",
        title: "1 Bedroom Apartment",
        neighborhood: "Kileleshwa",
        address: "Othaya Rd, Kileleshwa, Nairobi",
        rentKes: 45000,
        bedrooms: 1,
        bathrooms: 1,
        sqft: 620,
        availableFrom: "1 Nov",
        description:
            "Quiet block set back from the road, with a dedicated caretaker on site around the clock.",
        features: ["Borehole water", "Secure parking", "CCTV"],
        petPolicy: "No pets",
        verified: true,
        landlordOnFlowspace: false,
        lat: -1.2794,
        lng: 36.7783,
        images: ["Living room", "Bedroom", "Kitchen"],
    },
    {
        id: "lav-1",
        title: "3 Bedroom Townhouse",
        neighborhood: "Lavington",
        address: "James Gichuru Rd, Lavington, Nairobi",
        rentKes: 120000,
        bedrooms: 3,
        bathrooms: 3,
        sqft: 1800,
        availableFrom: "15 Nov",
        description:
            "Own compound townhouse with a small garden, servant quarter, and two dedicated parking bays.",
        features: ["Garden", "DSQ", "Two parking bays", "Backup generator"],
        petPolicy: "Pets allowed",
        verified: true,
        landlordOnFlowspace: true,
        lat: -1.2761,
        lng: 36.7666,
        images: ["Living room", "Kitchen", "Master bedroom", "Garden", "Exterior"],
    },
    {
        id: "sb-1",
        title: "Studio Apartment",
        neighborhood: "South B",
        address: "Mbagathi Rd, South B, Nairobi",
        rentKes: 28000,
        bedrooms: 0,
        bathrooms: 1,
        sqft: 380,
        availableFrom: "Now",
        description:
            "Compact studio close to Bellevue, ideal for a single tenant working nearby.",
        features: ["Water included", "Balcony"],
        petPolicy: "No pets",
        verified: false,
        landlordOnFlowspace: false,
        lat: -1.3167,
        lng: 36.8333,
        images: ["Studio interior", "Kitchenette", "Bathroom"],
    },
    {
        id: "wl-1",
        title: "2 Bedroom Apartment",
        neighborhood: "Westlands",
        address: "Rhapta Rd, Westlands, Nairobi",
        rentKes: 85000,
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1050,
        availableFrom: "Now",
        description:
            "Walking distance to Sarit Centre, with a rooftop lounge and a lift in the building.",
        features: ["Lift", "Rooftop lounge", "Gym", "Parking"],
        petPolicy: "Cats allowed",
        verified: true,
        landlordOnFlowspace: true,
        lat: -1.2673,
        lng: 36.8065,
        images: ["Living room", "Kitchen", "Balcony view", "Bedroom"],
    },
    {
        id: "ru-1",
        title: "3 Bedroom Bungalow",
        neighborhood: "Ruaka",
        address: "Ruaka Rd, Ruaka, Kiambu",
        rentKes: 55000,
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1400,
        availableFrom: "1 Dec",
        description:
            "Standalone bungalow with its own gate, five minutes from Two Rivers Mall.",
        features: ["Own gate", "Garden", "Parking"],
        petPolicy: "Pets allowed",
        verified: false,
        landlordOnFlowspace: false,
        lat: -1.2039,
        lng: 36.7789,
        images: ["Living room", "Kitchen", "Bedroom", "Compound"],
    },
];

const NEIGHBORHOODS = ["All areas", ...Array.from(new Set(LISTINGS.map((l) => l.neighborhood)))];
const BEDROOM_OPTIONS = ["Any", "0", "1", "2", "3+"];
const MAX_RENT_OPTIONS = [
    { label: "No max", value: Infinity },
    { label: "KSh 30,000", value: 30000 },
    { label: "KSh 50,000", value: 50000 },
    { label: "KSh 80,000", value: 80000 },
    { label: "KSh 120,000", value: 120000 },
];
const SORT_OPTIONS = ["Most Recent", "Price: Low to High", "Price: High to Low"];
const AMENITY_CATEGORIES = ["Schools", "Hospitals", "Matatu stage", "Supermarkets"];

function formatKes(amount: number) {
    return `KSh ${amount.toLocaleString("en-KE")}`;
}

function mapEmbedSrc(lat: number, lng: number) {
    return `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}

function nearbySearchUrl(category: string, lat: number, lng: number) {
    return `https://www.google.com/maps/search/${encodeURIComponent(category)}/@${lat},${lng},15z`;
}

/* ---------- Amenities modal ---------- */

function AmenitiesModal({
    listing,
    onClose,
}: {
    listing: Listing;
    onClose: () => void;
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-lg font-semibold" style={{ color: NAVY }}>
                            {listing.title} — {listing.neighborhood}
                        </p>
                        <p className="mt-1 text-sm" style={{ color: MUTED }}>
                            {listing.address}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg border px-3 py-1.5 text-sm font-medium"
                        style={{ borderColor: BORDER, color: NAVY }}
                    >
                        Close
                    </button>
                </div>

                <div className="mt-5 overflow-hidden rounded-xl border" style={{ borderColor: BORDER }}>
                    <iframe
                        title={`Map for ${listing.title}`}
                        src={mapEmbedSrc(listing.lat, listing.lng)}
                        className="h-64 w-full sm:h-80"
                        loading="lazy"
                    />
                </div>

                <p className="mt-6 text-sm font-semibold" style={{ color: NAVY }}>
                    What&apos;s nearby
                </p>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>
                    Opens Google Maps in a new tab, centered on this property.
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {AMENITY_CATEGORIES.map((category) => (
                        <a
                            key={category}
                            href={nearbySearchUrl(category, listing.lat, listing.lng)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors hover:border-[#0066FF] hover:text-[#0066FF]"
                            style={{ borderColor: BORDER, color: NAVY }}
                        >
                            {category}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

/* ---------- Photo gallery (per listing, multiple images) ---------- */

function ListingGallery({ images }: { images: string[] }) {
    const [index, setIndex] = useState(0);
    const hasMultiple = images.length > 1;

    function prev() {
        setIndex((i) => (i - 1 + images.length) % images.length);
    }
    function next() {
        setIndex((i) => (i + 1) % images.length);
    }

    return (
        <div className="w-full shrink-0 sm:w-48">
            <div
                className="flex h-40 w-full items-center justify-center rounded-xl sm:h-36"
                style={{ background: `linear-gradient(135deg, ${SURFACE}, ${BORDER})` }}
            >
                <span className="text-xs font-medium" style={{ color: MUTED }}>
                    {images[index]}
                </span>
            </div>

            {hasMultiple && (
                <div className="mt-2 flex items-center justify-between text-xs font-medium" style={{ color: MUTED }}>
                    <button onClick={prev} className="hover:text-[#0066FF]">
                        ‹ Prev
                    </button>
                    <span>
                        {index + 1} / {images.length}
                    </span>
                    <button onClick={next} className="hover:text-[#0066FF]">
                        Next ›
                    </button>
                </div>
            )}

            {hasMultiple && (
                <div className="mt-2 flex justify-center gap-1.5">
                    {images.map((img, i) => (
                        <button
                            key={img}
                            onClick={() => setIndex(i)}
                            aria-label={`Show ${img}`}
                            className="h-1.5 w-4 rounded-full transition-colors"
                            style={{ background: i === index ? BLUE : BORDER }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

/* ---------- Listing card ---------- */

function ListingCard({
    listing,
    onViewAmenities,
    onSelect,
    selected,
}: {
    listing: Listing;
    onViewAmenities: (listing: Listing) => void;
    onSelect?: (listing: Listing) => void;
    selected?: boolean;
}) {
    return (
        <div
            className={`flex flex-col gap-5 rounded-2xl border bg-white p-5 sm:flex-row sm:p-6 ${
                selected ? "ring-2 ring-[#0066FF]" : ""
            }`}
            style={{ borderColor: selected ? BLUE : BORDER }}
        >
            <ListingGallery images={listing.images} />

            <div className="flex flex-1 flex-col">
                <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: BLUE }}>
                                Rent
                            </p>
                            <p className="text-lg font-bold" style={{ color: NAVY }}>
                                {formatKes(listing.rentKes)}/mo
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: BLUE }}>
                                Size
                            </p>
                            <p className="text-lg font-bold" style={{ color: NAVY }}>
                                {listing.sqft} sqft
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: BLUE }}>
                                Bed / Bath
                            </p>
                            <p className="text-lg font-bold" style={{ color: NAVY }}>
                                {listing.bedrooms} bd / {listing.bathrooms} ba
                            </p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: BLUE }}>
                                Available
                            </p>
                            <p className="text-lg font-bold" style={{ color: NAVY }}>
                                {listing.availableFrom}
                            </p>
                        </div>
                    </div>

                    {listing.verified && (
                        <span
                            className="h-fit rounded-full px-3 py-1 text-xs font-semibold text-white"
                            style={{ background: RED }}
                        >
                            Verified unit
                        </span>
                    )}
                </div>

                <p className="mt-4 text-base font-semibold" style={{ color: NAVY }}>
                    {listing.title} · {listing.neighborhood}
                </p>
                <p className="text-sm" style={{ color: MUTED }}>
                    {listing.address}
                </p>

                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                    {listing.description}
                </p>

                <p className="mt-3 text-sm" style={{ color: MUTED }}>
                    {listing.features.join(" · ")}
                </p>
                <p className="mt-1 text-sm" style={{ color: MUTED }}>
                    Pet policy: {listing.petPolicy}
                </p>

                {!listing.landlordOnFlowspace && (
                    <p className="mt-3 text-xs" style={{ color: MUTED }}>
                        Listed directly by the landlord — not managed on Flowspace.
                    </p>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                    <button
                        className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1B1B3A]"
                        style={{ background: BLUE }}
                    >
                        Express Interest
                    </button>
                    <button
                        className="rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[#0066FF] hover:text-[#0066FF]"
                        style={{ borderColor: BORDER, color: NAVY }}
                    >
                        Schedule Viewing
                    </button>
                    <button
                        onClick={() => onViewAmenities(listing)}
                        className="rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[#0066FF] hover:text-[#0066FF]"
                        style={{ borderColor: BORDER, color: NAVY }}
                    >
                        View Amenities
                    </button>
                    {onSelect && (
                        <button
                            onClick={() => onSelect(listing)}
                            className="rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-[#0066FF] hover:text-[#0066FF]"
                            style={{ borderColor: BORDER, color: NAVY }}
                        >
                            Show on Map
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ---------- Page ---------- */

export default function Rentals() {
    const [search, setSearch] = useState("");
    const [neighborhood, setNeighborhood] = useState(NEIGHBORHOODS[0]);
    const [bedrooms, setBedrooms] = useState(BEDROOM_OPTIONS[0]);
    const [maxRent, setMaxRent] = useState(MAX_RENT_OPTIONS[0].value);
    const [sort, setSort] = useState(SORT_OPTIONS[0]);
    const [showMap, setShowMap] = useState(false);
    const [amenitiesListing, setAmenitiesListing] = useState<Listing | null>(null);
    const [selectedListing, setSelectedListing] = useState<Listing>(LISTINGS[0]);

    const filtered = useMemo(() => {
        const query = search.trim().toLowerCase();

        let result = LISTINGS.filter((l) => {
            if (neighborhood !== "All areas" && l.neighborhood !== neighborhood) return false;
            if (bedrooms !== "Any") {
                if (bedrooms === "3+" ? l.bedrooms < 3 : l.bedrooms !== Number(bedrooms)) return false;
            }
            if (l.rentKes > maxRent) return false;
            if (query) {
                const haystack = `${l.title} ${l.neighborhood} ${l.address}`.toLowerCase();
                if (!haystack.includes(query)) return false;
            }
            return true;
        });

        if (sort === "Price: Low to High") result = [...result].sort((a, b) => a.rentKes - b.rentKes);
        if (sort === "Price: High to Low") result = [...result].sort((a, b) => b.rentKes - a.rentKes);

        return result;
    }, [search, neighborhood, bedrooms, maxRent, sort]);

    function clearFilters() {
        setSearch("");
        setNeighborhood(NEIGHBORHOODS[0]);
        setBedrooms(BEDROOM_OPTIONS[0]);
        setMaxRent(MAX_RENT_OPTIONS[0].value);
        setSort(SORT_OPTIONS[0]);
    }

    return (
        <div className="w-full bg-white">
            {/* Search + listings summary, one row */}
            <section className="px-6 pb-8 pt-14">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Enter a location, e.g. "Kilimani" or "2BR near Yaya Centre"'
                            className="flex-1 rounded-lg border px-4 py-3 text-sm outline-none focus:ring-1"
                            style={{ borderColor: BORDER, color: NAVY }}
                        />
                        <button
                            className="rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B1B3A]"
                            style={{ background: BLUE }}
                        >
                            Search
                        </button>
                    </div>

                    <div className="sm:text-right">
                        <h1 className="text-2xl font-bold" style={{ color: NAVY }}>
                            Current Listings
                        </h1>
                        <p className="mt-1 text-sm" style={{ color: MUTED }}>
                            Showing {filtered.length} of {LISTINGS.length} available listings
                        </p>
                    </div>
                </div>
            </section>

            {/* Filter bar */}
            <section className="px-6">
                <div
                    className="mx-auto grid max-w-6xl grid-cols-2 gap-4 rounded-2xl border p-5 sm:grid-cols-3 lg:grid-cols-6"
                    style={{ borderColor: BORDER, background: SURFACE }}
                >
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold" style={{ color: MUTED }}>
                            Area
                        </label>
                        <select
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                            className="rounded-lg border px-3 py-2 text-sm"
                            style={{ borderColor: BORDER, color: NAVY, background: "white" }}
                        >
                            {NEIGHBORHOODS.map((n) => (
                                <option key={n}>{n}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold" style={{ color: MUTED }}>
                            Bedrooms
                        </label>
                        <select
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                            className="rounded-lg border px-3 py-2 text-sm"
                            style={{ borderColor: BORDER, color: NAVY, background: "white" }}
                        >
                            {BEDROOM_OPTIONS.map((b) => (
                                <option key={b}>{b}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold" style={{ color: MUTED }}>
                            Max Rent
                        </label>
                        <select
                            value={maxRent}
                            onChange={(e) => setMaxRent(Number(e.target.value))}
                            className="rounded-lg border px-3 py-2 text-sm"
                            style={{ borderColor: BORDER, color: NAVY, background: "white" }}
                        >
                            {MAX_RENT_OPTIONS.map((m) => (
                                <option key={m.label} value={m.value}>
                                    {m.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold" style={{ color: MUTED }}>
                            Sort By
                        </label>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            className="rounded-lg border px-3 py-2 text-sm"
                            style={{ borderColor: BORDER, color: NAVY, background: "white" }}
                        >
                            {SORT_OPTIONS.map((s) => (
                                <option key={s}>{s}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={() => setShowMap((v) => !v)}
                            className="w-full rounded-lg border px-3 py-2 text-sm font-semibold transition-colors hover:border-[#0066FF] hover:text-[#0066FF]"
                            style={{ borderColor: BORDER, color: NAVY, background: "white" }}
                        >
                            {showMap ? "Hide Map" : "Show Map"}
                        </button>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={clearFilters}
                            className="w-full rounded-lg px-3 py-2 text-sm font-semibold"
                            style={{ color: BLUE }}
                        >
                            Clear filters
                        </button>
                    </div>
                </div>
            </section>

            {/* Listings */}
            <section className="px-6 py-14">
                <div className="mx-auto max-w-6xl">
                    <div className={showMap ? "grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]" : ""}>
                        <div className="flex flex-col gap-6">
                            {filtered.map((listing) => (
                                <ListingCard
                                    key={listing.id}
                                    listing={listing}
                                    onViewAmenities={setAmenitiesListing}
                                    onSelect={showMap ? setSelectedListing : undefined}
                                    selected={showMap && selectedListing.id === listing.id}
                                />
                            ))}
                            {filtered.length === 0 && (
                                <p className="rounded-xl border p-8 text-center text-sm" style={{ borderColor: BORDER, color: MUTED }}>
                                    No listings match those filters yet. Try widening your search.
                                </p>
                            )}
                        </div>

                        {showMap && (
                            <div className="h-fit rounded-2xl border p-4 lg:sticky lg:top-6" style={{ borderColor: BORDER }}>
                                <p className="mb-3 text-sm font-semibold" style={{ color: NAVY }}>
                                    {selectedListing.title} · {selectedListing.neighborhood}
                                </p>
                                <div className="overflow-hidden rounded-xl">
                                    <iframe
                                        title="Selected listing map"
                                        src={mapEmbedSrc(selectedListing.lat, selectedListing.lng)}
                                        className="h-80 w-full lg:h-[520px]"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* List without switching */}
            <section className="px-6 py-16" style={{ background: SURFACE }}>
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-2">
                    <div>
                        <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: NAVY }}>
                            List free. Manage later — or never.
                        </h2>
                        <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
                            You don&apos;t need to run your whole rental business on
                            Flowspace to reach renters here. Add your vacant unit, get
                            inquiries, and manage the lease your own way. If you decide you
                            want the dashboard, the tax calculator, and the AI assistant
                            later, upgrading takes five minutes — no re-listing required.
                        </p>
                        <button
                            className="mt-6 w-fit rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B1B3A]"
                            style={{ background: BLUE }}
                        >
                            List Your Property — It&apos;s Free
                        </button>
                    </div>

                    <div className="rounded-2xl bg-white p-8">
                        <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
                            Already managing on Flowspace?
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                            Publishing a vacant unit here takes one tap from your
                            dashboard — and approved inquiries convert straight into a
                            tenant with an auto-generated invite code.
                        </p>
                        <button
                            className="mt-6 w-fit rounded-lg border px-6 py-3 text-sm font-semibold transition-colors hover:border-[#0066FF] hover:text-[#0066FF]"
                            style={{ borderColor: BORDER, color: NAVY }}
                        >
                            Publish From My Dashboard
                        </button>
                    </div>
                </div>
            </section>

            {/* Prospective tenant flow */}
            <section className="px-6 py-16">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl font-bold sm:text-3xl" style={{ color: NAVY }}>
                        From browsing to move-in
                    </h2>
                </div>
                <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        { step: "1", text: "Browse or search a listing" },
                        { step: "2", text: "Express interest or schedule a viewing" },
                        { step: "3", text: "Landlord approves — you get an invite code" },
                        { step: "4", text: "Download the app, enter your code, you're home" },
                    ].map((item) => (
                        <div key={item.step} className="rounded-xl border p-6" style={{ borderColor: BORDER }}>
                            <p className="text-2xl font-bold" style={{ color: RED }}>
                                {item.step}
                            </p>
                            <p className="mt-2 text-sm" style={{ color: MUTED }}>
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {amenitiesListing && (
                <AmenitiesModal listing={amenitiesListing} onClose={() => setAmenitiesListing(null)} />
            )}
        </div>
    );
}