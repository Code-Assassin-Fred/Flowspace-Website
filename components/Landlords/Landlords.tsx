import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    style: ["normal"],
    weight: ["500", "600", "700"],
});

/**
 * For Landlords page (/landlords).
 * Save as app/landlords/page.tsx.
 */

const NAVY = "#1B1B3A";
const BLUE = "#0066FF";
const RED = "#bb2036";
const MUTED = "#3A3A52";
const SURFACE = "#F4F4F2";
const CARD_BLUE = "#284d5b";

type FeatureBlock = {
    title: string;
    eyebrow: string;
    description: string;
};

const FEATURE_BLOCKS: FeatureBlock[] = [
    {
        title: "Dashboard",
        eyebrow: "Included in every plan",
        description:
            "Know your numbers before your accountant does — KPI cards for properties, rent collected, occupancy, and open issues, plus a Rent Collected vs Outstanding vs KRA Tax breakdown at a glance.",
    },
    {
        title: "Properties & Units",
        eyebrow: "Included in every plan",
        description:
            "Add a property once and manage it forever, with a searchable property list showing live occupancy and time-limited caretaker invite codes ready whenever you need them.",
    },
    {
        title: "Tenants & Caretakers",
        eyebrow: "Included in every plan",
        description:
            "Onboard a tenant in under two minutes — manually or with self-serve invite codes — and enable or disable accounts instantly.",
    },
    {
        title: "Payments & Finance",
        eyebrow: "Included in every plan",
        description:
            "M-Pesa in, KRA tax out, automatically: a real-time payment ledger across every property, configurable KRA rate and caretaker pay (flat or % of revenue), and a per-property net income breakdown.",
    },
    {
        title: "Complaints & Maintenance",
        eyebrow: "Included in every plan",
        description:
            "Nothing falls through the cracks — every ticket is tracked through a clear Open → In Progress → Resolved pipeline, with a full history kept per unit and per tenant.",
    },
    {
        title: "Messages",
        eyebrow: "Included in every plan",
        description:
            "Talk to one tenant or all of them — broadcast announcements or DM a single tenant, with read receipts on every message.",
    },
    {
        title: "Utilities",
        eyebrow: "Included in every plan",
        description:
            "Water, electricity, and garbage billed correctly every time, with per-unit rate configuration and totals calculated automatically — no manual math.",
    },
    {
        title: "Reports & Analytics",
        eyebrow: "Included in every plan",
        description:
            "Board-ready reports on demand: Revenue, Occupancy, Maintenance, and Utilities reports by period, one-tap PDF download, and Marketplace analytics covering listing views, inquiries, and inquiry-to-tenant conversion.",
    },
];

export default function Landlord() {
    return (
        <div className="w-full bg-white">
            {/* Hero */}
            <section className="px-6 pb-16 pt-20 text-center sm:pt-24">
                <h1
                    className={`${playfair.className} mx-auto max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl`}
                    style={{ color: NAVY }}
                >
                    Your portfolio, on autopilot.
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: MUTED }}>
                    Every property, every payment, every complaint — one login.
                </p>
                <Link
                    href="/landlords/add-property"
                    className="mt-8 inline-flex items-center justify-center rounded-lg px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B1B3A]"
                    style={{ background: BLUE }}
                >
                    Add Your First Property
                </Link>
            </section>

            {/* Feature grid */}
            <section className="px-6 pb-16">
                <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {FEATURE_BLOCKS.map((block) => (
                        <div
                            key={block.title}
                            className="flex flex-col p-8"
                            style={{ background: CARD_BLUE }}
                        >
                            <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#6ea8ff" }}>
                                {block.eyebrow}
                            </span>
                            <h3 className="mt-3 text-2xl font-bold text-white">{block.title}</h3>
                            <p className="mt-4 text-sm leading-relaxed text-white/80">
                                {block.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* AI assistant callout */}
            <section className="px-6 py-16" style={{ background: SURFACE }}>
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className={`${playfair.className} text-2xl font-semibold sm:text-3xl`} style={{ color: NAVY }}>
                        Let AI carry the busywork.
                    </h2>
                    <p className="mt-4 text-base leading-relaxed" style={{ color: MUTED }}>
                        On Growth and Pro plans, Flowspace&apos;s AI drafts tenant
                        notices, flags late payers before month-end, and turns your
                        maintenance logs into a plain-English summary. Not ready to pay
                        for it every month? Turn it off — your plan, your call, month to
                        month.
                    </p>
                    <Link
                        href="/pricing"
                        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold hover:underline"
                        style={{ color: RED }}
                    >
                        Compare Plans →
                    </Link>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="px-6 py-16 text-center">
                <h2 className={`${playfair.className} text-2xl font-semibold sm:text-3xl`} style={{ color: NAVY }}>
                    Ready to stop managing rentals by memory?
                </h2>
                <Link
                    href="/landlords/add-property"
                    className="mt-6 inline-flex items-center justify-center rounded-lg px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B1B3A]"
                    style={{ background: BLUE }}
                >
                    Get Started Free
                </Link>
            </section>
        </div>
    );
}