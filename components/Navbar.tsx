"use client"

import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
    { label: "Home", href: "#" },
    { label: "Properties", href: "#" },
    { label: "Tenants", href: "#" },
    { label: "Landlords", href: "#" },
    { label: "About Us", href: "#" },
    { label: "Contact Us", href: "#" },
];

const LOGIN_LINKS = [
    { label: "Landlord Login", href: "#" },
    { label: "Tenant Login", href: "#" },
    { label: "Caretaker Login", href: "#" },
];

function Logo() {
    return (
        <a href="#" className="flex items-center gap-3 shrink-0">
            <svg width="50" height="50" viewBox="0 0 42 42" fill="none" aria-hidden="true">
    {/* Dominant outer ring — orange */}
    <circle cx="21" cy="21" r="19" stroke="#FF6600" strokeWidth="2.5" opacity="0.9" />
    {/* Tilted ring — blue */}
    <ellipse
        cx="21"
        cy="21"
        rx="19"
        ry="7"
        stroke="#0066FF"
        strokeWidth="2.5"
        transform="rotate(-25 21 21)"
    />
    <circle cx="21" cy="21" r="6.5" fill="#1B1B3A" />
    <circle cx="21" cy="21" r="6.5" fill="#0066FF" fillOpacity="0.2" />
</svg>
            <span className="flex flex-col leading-none">
                <span className="text-2xl font-bold tracking-tight text-[#bb2036]">
                    Flowspace
                </span>
                <span className="text-sm font-bold tracking-[0.3em] text-[#0066FF]">
                    GALAXIES
                </span>
            </span>
        </a>
    );
}

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full font-sans border-b border-[#E4E3EE] bg-white">
            {/* Brand + contact row */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-6">
                <Logo />

                {/* Mobile toggle */}
                <button
                    type="button"
                    onClick={() => setMobileOpen((v) => !v)}
                    className="md:hidden self-end text-[#1B1B3A]"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? <X size={26} /> : <Menu size={26} />}
                </button>

                <div className="hidden md:flex flex-col items-end gap-1.5">
                    <p className="font-serif text-[#3A3A52]">
                        <span className="text-xl align-middle">call today: </span>
                        <span className="text-3xl align-middle text-[#1B1B3A]">
                            801.375.6800
                        </span>
                    </p>
                    <div className="flex items-center gap-3 text-sm">
                        {LOGIN_LINKS.map((link, i) => (
                            <span key={link.label} className="flex items-center gap-3">
                                {i > 0 && <span className="text-[#C7C4E0]">|</span>}
                                <a
                                    href={link.href}
                                    className="uppercase tracking-wide text-[#0066FF] hover:text-[#1B1B3A] transition-colors"
                                >
                                    {link.label}
                                </a>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="h-px w-full bg-[#E4E3EE]" />

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center justify-center gap-12 px-6 py-6">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.label}
                        href={item.href}
                        className="text-sm font-medium uppercase tracking-wide text-[#1B1B3A] hover:text-[#0066FF] transition-colors"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            <div className="hidden md:block h-px w-full bg-[#E4E3EE]" />

            {/* Mobile panel */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-[#E4E3EE]">
                    <nav className="flex flex-col px-6 py-4">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="py-2.5 text-sm font-medium uppercase tracking-wide text-[#1B1B3A] border-b border-[#F0EFF6] last:border-b-0"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    <div className="flex flex-col gap-2 px-6 pb-5 pt-2 border-t border-[#E4E3EE]">
                        <p className="font-serif text-[#3A3A52]">
                            <span className="text-base">call today: </span>
                            <span className="text-xl text-[#1B1B3A]">801.375.6800</span>
                        </p>
                        {LOGIN_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm uppercase tracking-wide text-[#0066FF]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}