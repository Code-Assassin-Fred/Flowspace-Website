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
const BORDER = "#E4E3EE";
const SURFACE = "#F4F4F2";

type FeatureBlock = {
    title: string;
    description: string;
    bullets: string[];
};

const FEATURE_BLOCKS: FeatureBlock[] = [
    {
        title: "Dashboard",
        description: "Know your numbers before your accountant does.",
        bullets: [
            "KPI cards: properties, rent collected, occupancy, open issues",
            "Rent Collected vs Outstanding vs KRA Tax at a glance",
        ],
    },
    {
        title: "Properties & Units",
        description: "Add a property once. Manage it forever.",
        bullets: [
            "Searchable property list with live occupancy",
            "Time-limited caretaker invite codes",
        ],
    },
    {
        title: "Tenants & Caretakers",
        description: "Onboard a tenant in under two minutes.",
        bullets: [
            "Manual onboarding or self-serve invite codes",
            "Enable/disable accounts instantly",
        ],
    },
    {
        title: "Payments & Finance",
        description: "M-Pesa in, KRA tax out — automatically.",
        bullets: [
            "Real-time payment ledger across every property",
            "Configurable KRA rate & caretaker pay (flat or % of revenue)",
            "Per-property net income breakdown",
        ],
    },
    {
        title: "Complaints & Maintenance",
        description: "Nothing falls through the cracks.",
        bullets: [
            "Status pipeline: Open → In Progress → Resolved",
            "Full history per unit, per tenant",
        ],
    },
    {
        title: "Messages",
        description: "Talk to one tenant or all of them.",
        bullets: [
            "Broadcast announcements or DM a single tenant",
            "Read receipts on every message",
        ],
    },
    {
        title: "Utilities",
        description: "Water, electricity, garbage — billed correctly, every time.",
        bullets: [
            "Per-unit rate configuration",
            "Auto-calculated totals, no manual math",
        ],
    },
    {
        title: "Reports & Analytics",
        description: "Board-ready reports, on demand.",
        bullets: [
            "Revenue, Occupancy, Maintenance, Utilities reports by period",
            "One-tap PDF download",
            "Marketplace analytics: listing views, inquiries, inquiry-to-tenant conversion",
        ],
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
                            className="flex flex-col rounded-2xl border p-6"
                            style={{ borderColor: BORDER }}
                        >
                            <h3 className="text-lg font-semibold" style={{ color: NAVY }}>
                                {block.title}
                            </h3>
                            <p className="mt-1 text-sm" style={{ color: MUTED }}>
                                {block.description}
                            </p>
                            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
                                {block.bullets.map((bullet) => (
                                    <li
                                        key={bullet}
                                        className="border-l-2 pl-3"
                                        style={{ borderColor: `${BLUE}66`, color: MUTED }}
                                    >
                                        {bullet}
                                    </li>
                                ))}
                            </ul>
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