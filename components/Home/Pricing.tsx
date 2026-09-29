"use client";

type FeatureGroup = {
    label: string;
    items: string[];
};

type Tier = {
    name: string;
    tagline: string;
    price: string;
    priceNote: string;
    featured?: boolean;
    groups: FeatureGroup[];
    cta: string;
};

const CORE_FEATURES = [
    "Dashboard — real-time KPIs, occupancy rate & a financial overview at a glance",
    "Properties — add, search & manage every property and unit",
    "Tenants & Caretakers — onboarding, invite codes & account management",
    "Payments — a real-time M-Pesa payment ledger across every property",
    "Finance Summary — automatic KRA tax and caretaker pay calculations",
    "Complaints — tracked from Open through In Progress to Resolved",
    "Maintenance — ticketing with priority levels and status updates",
    "Service Requests — cleaning, laundry, fumigation and more",
    "Messages — broadcast to everyone or message a single tenant",
    "Utilities — per-unit water, electricity & garbage billing",
    "Notices — approve or reject travel and move-out requests",
    "Function Requests — approve common-area booking requests",
    "Reports — Revenue, Occupancy, Maintenance & Utilities, exported as PDF",
    "Settings — payout account, automated invoicing, SMS & WhatsApp toggles",
];

const ORBIT_AI_FEATURES = [
    "Advanced analytics — forecasts and portfolio trend breakdowns",
    "Flags overdue rent and unusual activity before you notice it",
    "Answers questions in plain language, pulled from your real data",
    "Drafts tenant messages and notices — you approve before they send",
    "Summarizes maintenance trends across your whole portfolio",
];

const WARP_AI_FEATURES = [
    "Fully conversational — manage your portfolio by chatting with it",
    "Sends rent reminders and notices on its own, no approval needed",
    "Chases overdue rent automatically until it's resolved",
    "Approves or denies routine service requests directly",
    "Runs and files your monthly reports without being asked",
    "Escalates only the exceptions that genuinely need your sign-off",
];

const TIERS: Tier[] = [
    {
        name: "Launch",
        tagline: "Run it yourself, everything on one dashboard.",
        price: "KSh 2,500",
        priceNote: "per property / month",
        groups: [{ label: "Everything on the platform", items: CORE_FEATURES }],
        cta: "Get Started",
    },
    {
        name: "Orbit",
        tagline: "Your AI copilot, on call whenever you need it.",
        price: "KSh 5,000",
        priceNote: "per property / month",
        featured: true,
        groups: [
            { label: "Everything on the platform", items: CORE_FEATURES },
            { label: "Plus, your AI copilot", items: ORBIT_AI_FEATURES },
        ],
        cta: "Start with Orbit",
    },
    {
        name: "Warp",
        tagline: "Talk to your portfolio. It takes it from there.",
        price: "KSh 9,000",
        priceNote: "per property / month",
        groups: [
            { label: "Everything on the platform", items: CORE_FEATURES },
            { label: "Everything Orbit does", items: ORBIT_AI_FEATURES },
            { label: "Plus, fully autonomous", items: WARP_AI_FEATURES },
        ],
        cta: "Try Warp",
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="w-full bg-[#264e5d] px-6 py-16 sm:py-20">
            <h2 className="mx-auto whitespace-nowrap text-center text-[clamp(1rem,4.4vw,2.5rem)] font-bold text-white">
                Choose how hands-off you want to be.
            </h2>

            <div className="mx-auto mt-12 grid max-w-6xl grid-cols-1 items-stretch gap-6 md:grid-cols-3">
                {TIERS.map((tier) => {
                    const featured = tier.featured;

                    return (
                        <div
                            key={tier.name}
                            className={`relative flex flex-col rounded-2xl p-8 ${
                                featured ? "bg-[#bb2036] text-white" : "bg-[#F4F4F2] text-[#1B1B3A]"
                            }`}
                        >
                            {featured && (
                                <span className="absolute -top-4 left-8 rounded-full bg-white px-4 py-1 text-xs font-semibold text-[#bb2036]">
                                    Most landlords choose this
                                </span>
                            )}

                            <h3 className="text-xl font-semibold">{tier.name}</h3>
                            <p className={`mt-1 text-sm ${featured ? "text-[#f6dde1]" : "text-[#3A3A52]"}`}>
                                {tier.tagline}
                            </p>

                            <div className="mt-6 flex items-baseline gap-2">
                                <span className="text-3xl font-bold">{tier.price}</span>
                            </div>
                            <span className={`text-xs ${featured ? "text-[#f0cdd3]" : "text-[#6B6B85]"}`}>
                                {tier.priceNote}
                            </span>

                            <div className="mt-8 flex flex-1 flex-col justify-between gap-6">
                                {tier.groups.map((group) => (
                                    <div
                                        key={group.label}
                                        className="flex flex-col"
                                        style={{ flexGrow: group.items.length }}
                                    >
                                        <p
                                            className={`text-sm font-semibold ${
                                                featured ? "text-white" : "text-[#1B1B3A]"
                                            }`}
                                        >
                                            {group.label}
                                        </p>
                                        <ul className="mt-3 flex flex-1 flex-col justify-between gap-3 text-sm">
                                            {group.items.map((feature) => (
                                                <li key={feature}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            {/* CTA: pinned to the bottom of the card, fit-width, right-aligned */}
                            <div className="mt-auto flex justify-end pt-8">
                                <a
                                    href="#"
                                    className={`inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                                        featured
                                            ? "bg-white text-[#bb2036] hover:bg-[#f3f4f6]"
                                            : "bg-[#1B1B3A] text-white hover:bg-[#0066FF]"
                                    }`}
                                >
                                    {tier.cta}
                                </a>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}