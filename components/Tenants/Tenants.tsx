import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    style: ["normal"],
    weight: ["500", "600", "700"],
});

/**
 * For Tenants page (/tenants).
 * Save as app/tenants/page.tsx.
 *
 * Two audiences land here: tenants who already have an apartment code from
 * their landlord/caretaker, and prospective tenants who are just browsing
 * for a place — the hero gives each their own CTA rather than forcing
 * browsers through the sign-up flow.
 */

const NAVY = "#1B1B3A";
const BLUE = "#0066FF";
const MUTED = "#3A3A52";
const BORDER = "#E4E3EE";
const SURFACE = "#F4F4F2";
const CARD_BLUE = "#284d5b";

type Feature = {
    title: string;
    description: string;
};

const FEATURES: Feature[] = [
    {
        title: "M-Pesa Payments",
        description: "STK Push rent payment, instant digital receipt.",
    },
    {
        title: "Maintenance & Complaints",
        description: "Report an issue and watch it move to Resolved.",
    },
    {
        title: "Notices",
        description:
            "Request travel or move-out notice approval without a single phone call.",
    },
    {
        title: "Reports & Statements",
        description:
            "View and download your payment receipts and statements anytime.",
    },
    {
        title: "House History",
        description:
            "Every payment, request, and notice, on record — in case you ever need proof.",
    },
];

export default function Tenant() {
    return (
        <div className="w-full bg-white">
            {/* Hero */}
            <section className="px-6 pb-16 pt-20 text-center sm:pt-24">
                <h1
                    className={`${playfair.className} mx-auto max-w-2xl text-4xl font-semibold leading-tight sm:text-5xl`}
                    style={{ color: NAVY }}
                >
                    Rent, on your terms.
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-base" style={{ color: MUTED }}>
                    Pay with M-Pesa, raise a ticket, track your lease — all in one
                    app.
                </p>

                <div className="mx-auto mt-8 flex max-w-md flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/tenants/sign-up"
                        className="inline-flex items-center justify-center rounded-lg px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B1B3A]"
                        style={{ background: BLUE }}
                    >
                        Have an Apartment Code? Sign Up
                    </Link>
                    <Link
                        href="/properties"
                        className="inline-flex items-center justify-center rounded-lg border px-7 py-3 text-sm font-semibold transition-colors hover:border-[#0066FF] hover:text-[#0066FF]"
                        style={{ borderColor: BORDER, color: NAVY }}
                    >
                        Just Browsing for a Rental?
                    </Link>
                </div>
            </section>

            {/* Feature highlights */}
            <section className="px-6 pb-16">
                <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="flex flex-col p-8" style={{ background: CARD_BLUE }}>
                            <h3 className="mt-3 text-2xl font-bold text-white">{feature.title}</h3>
                            <p className="mt-4 text-sm leading-relaxed text-white/80">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA band */}
            <section className="px-6 py-16 text-center" style={{ background: SURFACE }}>
                <h2 className={`${playfair.className} text-2xl font-semibold sm:text-3xl`} style={{ color: NAVY }}>
                    Ask your landlord or caretaker for your apartment code.
                </h2>
                <Link
                    href="/tenants/sign-up"
                    className="mt-6 inline-flex items-center justify-center rounded-lg px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B1B3A]"
                    style={{ background: BLUE }}
                >
                    Get the App
                </Link>
            </section>
        </div>
    );
}