const QUICK_LINKS = [
    { label: "Home", href: "#" },
    { label: "Properties", href: "/properties" },
    { label: "For Landlords", href: "/landlords" },
    { label: "For Caretakers", href: "#" },
    { label: "For Tenants", href: "/tenants" },
    { label: "Pricing", href: "#" },
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
            <span className="flex flex-col leading-none">
                <span className="text-lg font-semibold tracking-tight text-white">
                    Flowspace
                </span>
                <span className="text-sm font-medium tracking-[0.25em] text-white/90">
                    GALAXIES
                </span>
            </span>
        </a>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-gradient-to-r from-[#405887] to-[#4f6ba0] font-sans text-white/80">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
                {/* Brand + blurb */}
                <div className="flex flex-col gap-4">
                    <Logo />
                    <p className="max-w-xs text-base leading-relaxed text-white/90">
                        Full-service rental management for landlords, caretakers,
                        and tenants across Kenya — one platform, real-time, no
                        spreadsheets.
                    </p>
                </div>

                {/* Quick links */}
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-white">
                        Quick Links
                    </span>
                    <nav className="flex flex-col gap-2.5">
                        {QUICK_LINKS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-base text-white/90 transition-colors hover:text-white"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Portal logins */}
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-white">
                        Portal Access
                    </span>
                    <nav className="flex flex-col gap-2.5">
                        {LOGIN_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-base text-white/90 transition-colors hover:text-white"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-white">
                        Get In Touch
                    </span>
                    <div className="flex flex-col gap-3 text-base text-white/90">
                        <a href="tel:+2547XXXXXXXX" className="text-white/90 hover:text-white">
                            +254 7XX XXX XXX
                        </a>
                        <a
                            href="mailto:hello@flowspacegalaxies.com"
                            className="text-white/90 hover:text-white"
                        >
                            hello@flowspacegalaxies.com
                        </a>
                        <span className="text-white/90">Nairobi, Kenya</span>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/15">
                <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-5 text-sm text-white/80 md:flex-row">
                    <span>© {year} Flowspace Galaxies. All rights reserved.</span>
                    <div className="flex items-center gap-5">
                        <a href="#" className="text-white/80 transition-colors hover:text-white">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-white/80 transition-colors hover:text-white">
                            Terms of Service
                        </a>
                        <a href="#" className="text-white/80 transition-colors hover:text-white">
                            Fair Housing
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}