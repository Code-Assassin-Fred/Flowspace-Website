import Link from "next/link";
import { Open_Sans, Playfair_Display } from "next/font/google";

const openSans = Open_Sans({
    subsets: ["latin"],
    weight: ["300", "400", "600"],
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "500", "600"],
});

/**
 * /about
 * Save this file as app/about/page.tsx
 */

const BLUE = "#0057b8";

type Cta = {
    lines: [string, string];
    label: string;
    href: string;
};

const CTAS: Cta[] = [
    { lines: ["PROPERTY", "MANAGEMENT"], label: "Onboard your property", href: "/landlords" },
    { lines: ["SEARCH", "OUR RENTALS"], label: "View vacant homes", href: "/properties" },
    { lines: ["LIST A", "VACANCY"], label: "List your vacancy", href: "/landlords/list" },
    { lines: ["CARETAKER", "PORTAL"], label: "Caretaker login", href: "/caretakers" },
    { lines: ["TENANT", "PORTAL"], label: "Tenant login", href: "/tenants" },
];

const AUDIENCE = [
    { title: "Landlords", text: "Want their whole portfolio on one screen." },
    { title: "Home seekers", text: "Want to find a verified home and apply in minutes." },
    { title: "Landlords with vacancies", text: "Want to reach tenants fast." },
    { title: "Caretakers", text: "Need a system, not a notebook." },
    { title: "Tenants", text: "Pay rent and access all services under the tenant portal." },
];

export default function AboutPage() {
    return (
        <main className={`${openSans.className} bg-white`}>
            <section className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 px-6 py-12 sm:px-10 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-20 lg:py-16">
                {/* Left: text */}
                <div>
                    <h1
                        className={`${playfair.className} text-[clamp(2.25rem,4vw,3.25rem)] font-normal leading-[1.15] text-black`}
                    >
                        Rent, made effortless.
                    </h1>
                    <h2
                        className={`${playfair.className} mt-3 text-[clamp(1.25rem,2vw,1.6rem)] font-normal italic leading-snug`}
                        style={{ color: BLUE }}
                    >
                        A Kenyan-built platform for Kenyan landlords, caretakers, and tenants.
                    </h2>

                    <p className="mt-8 max-w-[640px] text-[1.2rem] font-light leading-[1.75] text-black">
                        Flowspace exists to give every landlord — from a single rental unit to a
                        multi-property portfolio — the same visibility and control that used to
                        require a full back office.
                    </p>

                    <h3
                        className={`${playfair.className} mt-10 text-[1.6rem] font-normal text-black`}
                    >
                        Who we serve
                    </h3>
                    <ul className="mt-4 max-w-[640px] divide-y divide-neutral-300 border-y border-neutral-300">
                        {AUDIENCE.map((a) => (
                            <li key={a.title} className="py-3 text-[1.1rem] font-light text-black">
                                <span className="font-semibold" style={{ color: BLUE }}>
                                    {a.title}
                                </span>{" "}
                                {a.text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: CTAs */}
                <aside className="mx-auto w-full max-w-[260px] lg:mx-0">
                    <ul className="flex flex-col gap-7">
                        {CTAS.map((cta) => (
                            <li key={cta.label} className="flex flex-col items-center text-center">
                                <p
                                    className={`${playfair.className} text-[1.35rem] font-normal uppercase leading-[1.15] text-black`}
                                >
                                    {cta.lines[0]}
                                    <br />
                                    {cta.lines[1]}
                                </p>
                                <Link
                                    href={cta.href}
                                    className="mt-3 block w-full border-y border-black py-2 text-[1rem] font-semibold hover:underline"
                                    style={{ color: BLUE }}
                                >
                                    {cta.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
            </section>
        </main>
    );
}