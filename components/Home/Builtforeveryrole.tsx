import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "500", "600", "700"],
});

/**
 * 1.4 Built for Every Role
 * Save as components/sections/BuiltForEveryRole.tsx and render <BuiltForEveryRole />
 * on the home page, between the hero and the "Ready to experience the Flowspace advantage?" block.
 */

const NAVY = "#001260";
const BLUE = "#0a3fe0";

type Role = {
    title: string;
    tagline: string;
    features: string[];
    cta: string;
    href: string;
};

const LANDLORDS: Role = {
    title: "Landlords",
    tagline: "See every shilling, every unit, every issue — before it becomes a problem.",
    features: [
        "Real-time rent & occupancy dashboard, KPIs at a glance",
        "Automated KRA tax & caretaker pay calculations",
        "One-tap tenant and caretaker invites, enable/disable accounts anytime",
        "Complaints, maintenance & service requests tracked start to resolved",
        "Broadcast announcements or message a single tenant directly",
        "Utilities auto-billed per unit — water, electricity, garbage",
        "Revenue, occupancy & maintenance reports and analysis, exported as PDF on demand",
    ],
    cta: "Open your dashboard",
    href: "/landlords",
};

const CARETAKERS: Role = {
    title: "Caretakers",
    tagline: "Everything the landlord asks for, already logged.",
    features: [
        "Work-order queue for every property you're assigned to",
        "Log a maintenance issue or complaint on a tenant's behalf",
        "Direct tenant messaging — no personal numbers shared",
        "Vacancy inspections, mark units clean and ready to show",
        "Track and fulfil service requests: cleaning, laundry, fumigation",
        "Tenant notices and directory, always up to date",
        "No more end-of-month guesswork on what's owed or open",
    ],
    cta: "Open your work orders",
    href: "/caretakers",
};

const TENANTS: Role = {
    title: "Tenants",
    tagline: "Pay rent, raise a ticket, get an answer — all from your phone.",
    features: [
        "M-Pesa rent payments with instant digital receipts",
        "Maintenance & complaint tracking, watch it move to Resolved",
        "Travel and move-out notices approved without a phone call",
        "Book shared common areas and sign your lease with an e-signature",
        "Order services — cleaning, laundry, fumigation — on demand",
        "One-tap WhatsApp straight to your caretaker or landlord",
        "Payment receipts & statements ready to view or download anytime",
        "Full house history and payment records, always on file",
    ],
    cta: "Go to the tenant portal",
    href: "/tenants",
};

/* ---------- small pieces ---------- */

function Arrow() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6 6 6-6 6" />
        </svg>
    );
}

function Check() {
    return (
        <svg viewBox="0 0 20 20" className="mt-[0.35rem] h-5 w-5 shrink-0" aria-hidden="true">
            <circle cx="10" cy="10" r="10" fill={BLUE} />
            <path d="m5.8 10.4 2.7 2.6 5.7-5.8" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function RoleText({ role }: { role: Role }) {
    return (
        <>
            <h3 className="text-[2rem] font-bold leading-tight tracking-tight text-black">{role.title}</h3>
            <p className="mt-3 text-[1.15rem] leading-relaxed text-neutral-900">{role.tagline}</p>
            <ul className="mt-5 space-y-2.5">
                {role.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[1.05rem] leading-snug text-neutral-800">
                        <Check />
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
            <Link
                href={role.href}
                className="mt-8 inline-flex items-center gap-3 text-[1.35rem] font-bold hover:underline"
                style={{ color: BLUE }}
            >
                {role.cta}
                <Arrow />
            </Link>
        </>
    );
}

/* ---------- product mockups (pure CSS, no images) ---------- */

function LandlordMock() {
    return (
        <div className="relative flex h-[320px] items-center justify-center overflow-hidden rounded-[3px] p-6 sm:h-[400px] lg:h-[440px]" style={{ background: BLUE }}>
            <div className="relative w-full max-w-[520px] rounded-[3px] bg-white p-6 shadow-[0_24px_60px_#00097a]">
                <div className="absolute -top-9 left-[52%] flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#fbbf24] text-lg font-bold text-white ring-4 ring-[#f7d36b]">
                    KSh
                </div>
                <div className="flex items-baseline justify-between">
                    <p className="text-[1.6rem] font-bold text-black">Dashboard</p>
                    <span className="text-lg font-bold" style={{ color: BLUE }}>Details</span>
                </div>
                <div className="mt-4 rounded-[2px] bg-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-900">
                    Live: rent &amp; occupancy updated
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-[3px] border-2 border-neutral-200 p-4">
                        <span className="rounded-[2px] bg-neutral-200 px-2.5 py-1 text-xs font-bold tracking-wide text-neutral-900">COLLECTED</span>
                        <p className="mt-3 text-lg font-bold text-black">March rent</p>
                        <p className="mt-2 text-lg text-neutral-800">KSh 1,240,000</p>
                    </div>
                    <div className="rounded-[3px] border-2 border-neutral-200 p-4">
                        <span className="rounded-[2px] bg-[#b7f0a3] px-2.5 py-1 text-xs font-bold tracking-wide text-[#1b5e0a]">OCCUPIED</span>
                        <p className="mt-3 text-lg font-bold text-black">Units filled</p>
                        <p className="mt-2 text-lg text-neutral-800">47 of 50 · 94%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

const ORDERS = [
    { unit: "4B", issue: "Leaking kitchen tap", status: "Open", tone: "bg-[#ffd6d6] text-[#a11]" },
    { unit: "2A", issue: "Broken door lock", status: "In progress", tone: "bg-[#ffe9a8] text-[#7a5300]" },
    { unit: "7C", issue: "Vacancy inspection", status: "Ready", tone: "bg-[#b7f0a3] text-[#1b5e0a]" },
    { unit: "1D", issue: "Laundry request", status: "Open", tone: "bg-[#ffd6d6] text-[#a11]" },
    { unit: "3A", issue: "Fumigation", status: "Scheduled", tone: "bg-[#cfe0ff] text-[#0b3aa8]" },
    { unit: "5B", issue: "Tenant message", status: "New", tone: "bg-[#cfe0ff] text-[#0b3aa8]" },
];

function CaretakerMock() {
    return (
        <div className="h-[320px] overflow-hidden rounded-[3px] bg-[#76e5fb] pl-14 pt-10 sm:h-[400px] lg:h-[440px]">
            <div className="h-full rounded-tl-[2px] bg-white shadow-xl">
                <div className="flex">
                    <div className="hidden w-12 shrink-0 flex-col items-center gap-5 border-r border-neutral-200 pt-6 sm:flex">
                        {[0, 1, 2, 3].map((i) => (
                            <span key={i} className={`h-4 w-4 rounded-[2px] ${i === 1 ? "bg-[#0a3fe0]" : "bg-neutral-300"}`} />
                        ))}
                    </div>
                    <div className="min-w-0 flex-1 p-5">
                        <p className="text-2xl font-bold text-black">Work orders</p>
                        <p className="mt-1 text-xs font-bold text-neutral-800">All orders (6)</p>
                        <div className="mt-3 flex gap-2 text-[10px] font-semibold text-neutral-700">
                            {["Property", "Status", "Type", "More filters"].map((f) => (
                                <span key={f} className="rounded-[2px] whitespace-nowrap border border-neutral-300 px-2.5 py-1">{f} ▾</span>
                            ))}
                        </div>
                        <div className="mt-4 divide-y divide-neutral-200 border-t border-neutral-200">
                            {ORDERS.map((o) => (
                                <div key={o.unit + o.issue} className="flex items-center gap-4 py-2.5 text-[13px]">
                                    <span className="w-9 rounded-[2px] bg-neutral-100 py-1 text-center font-bold text-neutral-900">{o.unit}</span>
                                    <span className="min-w-0 flex-1 truncate font-semibold text-neutral-900">{o.issue}</span>
                                    <span className={`rounded-[2px] px-2.5 py-0.5 text-[11px] font-bold ${o.tone}`}>{o.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TenantMock() {
    return (
        <div className="relative h-[320px] overflow-hidden rounded-[3px] sm:h-[400px] lg:h-[456px]" style={{ background: "#00105c" }}>
            {/* receipt sheet */}
            <div className="absolute bottom-0 right-5 top-8 w-[62%] rounded-t-[2px] bg-white p-4 shadow-xl sm:right-10 sm:top-10 sm:p-5">
                <div className="flex items-start justify-between">
                    <p className="text-sm font-bold text-black">Receipt · March 2026</p>
                    <span className="rounded-[2px] bg-[#0a8f3c] px-2 py-0.5 text-[10px] font-bold text-white">M-PESA</span>
                </div>
                <p className="mt-1 text-[9px] text-neutral-500">Confirmation: QJK4X9T2LM · Unit 4B</p>
                <div className="mt-4 rounded-[2px] bg-[#eaf1ff] p-3">
                    <p className="text-[10px] font-bold text-neutral-700">Amount paid</p>
                    <p className="text-2xl font-bold text-black sm:text-3xl">KSh 25,000</p>
                </div>
                <div className="mt-4 divide-y divide-neutral-200 text-[10px] text-neutral-800">
                    {[
                        ["Mar 01 2026", "Rent", "KSh 22,000"],
                        ["Mar 01 2026", "Water", "KSh 1,800"],
                        ["Mar 01 2026", "Garbage", "KSh 1,200"],
                        ["Feb 01 2026", "Rent", "KSh 22,000"],
                    ].map((r, i) => (
                        <div key={i} className="grid grid-cols-3 gap-2 py-1.5">
                            <span>{r[0]}</span>
                            <span>{r[1]}</span>
                            <span className="text-right font-semibold">{r[2]}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* floating action card */}
            <div className="absolute left-4 top-1/2 flex w-[52%] -translate-y-1/2 items-center justify-between gap-3 rounded-[3px] bg-white p-4 shadow-[0_18px_40px_#000a3d] sm:left-8 sm:p-5">
                <div>
                    <p className="text-base font-bold text-black sm:text-lg">Rent payment</p>
                    <span className="mt-2 inline-block rounded-[2px] bg-[#b7f0a3] px-2.5 py-0.5 text-[11px] font-bold text-[#1b5e0a]">
                        Receipt ready
                    </span>
                </div>
                <span
                    className="rounded-[3px] border-2 px-4 py-2 text-sm font-bold"
                    style={{ borderColor: BLUE, color: BLUE, background: "#eaf1ff" }}
                >
                    View
                </span>
            </div>
        </div>
    );
}

/* ---------- section ---------- */

export default function BuiltForEveryRole() {
    return (
        <section className={`${playfair.className} [font-variant-numeric:lining-nums] px-4 py-10 sm:px-8 lg:py-14`} style={{ background: NAVY }}>
            <h2 className="mx-auto max-w-5xl text-center text-[clamp(1.6rem,3vw,2.4rem)] font-normal leading-tight tracking-tight text-white">
                Built for every role
            </h2>

            <div className="mx-auto mt-7 flex max-w-[1500px] flex-col gap-8 lg:mt-9 lg:gap-12">
                {/* Row 1: Landlords + Caretakers */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.45fr_1fr] lg:gap-12">
                    <article className="flex flex-col rounded-[3px] bg-white p-5 sm:p-9">
                        <LandlordMock />
                        <div className="mt-9 flex flex-1 flex-col [&>a]:mt-auto [&>a]:pt-8">
                            <RoleText role={LANDLORDS} />
                        </div>
                    </article>

                    <article className="flex flex-col rounded-[3px] bg-white p-5 sm:p-9">
                        <CaretakerMock />
                        <div className="mt-9 flex flex-1 flex-col [&>a]:mt-auto [&>a]:pt-8">
                            <RoleText role={CARETAKERS} />
                        </div>
                    </article>
                </div>

                {/* Row 2: Tenants (wide, text left / visual right) */}
                <article className="grid grid-cols-1 items-center gap-9 rounded-[3px] bg-white p-5 sm:p-9 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
                    <div className="lg:py-4 lg:pl-1">
                        <RoleText role={TENANTS} />
                    </div>
                    <TenantMock />
                </article>
            </div>
        </section>
    );
}