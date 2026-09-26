import { Phone, Mail, MapPin } from "lucide-react";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.55c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.1 4.3c-2.15 0-3.63 1.31-3.63 3.72v2.42H7.9v2.96h2.57V21h3.03Z" />
        </svg>
    );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" {...props}>
            <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
        </svg>
    );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M6.94 8.5H4.06V20h2.88V8.5ZM5.5 4a1.67 1.67 0 1 0 0 3.34A1.67 1.67 0 0 0 5.5 4ZM20 13.53c0-3.03-1.62-4.44-3.78-4.44a3.26 3.26 0 0 0-2.96 1.63h-.04V8.5H10.5c.04.83 0 11.5 0 11.5h2.88v-6.42c0-.34.02-.68.12-.93.27-.68.9-1.4 1.94-1.4 1.37 0 1.92 1.04 1.92 2.57V20H20v-6.47Z" />
        </svg>
    );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M18.9 3h2.85l-6.23 7.12L22.9 21h-5.74l-4.5-5.88L7.5 21H4.64l6.66-7.61L4 3h5.88l4.07 5.38L18.9 3Zm-1 16.17h1.58L7.17 4.74H5.47l12.43 14.43Z" />
        </svg>
    );
}

const QUICK_LINKS = [
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

const SOCIALS = [
    { icon: FacebookIcon, label: "Facebook", href: "#" },
    { icon: InstagramIcon, label: "Instagram", href: "#" },
    { icon: LinkedinIcon, label: "LinkedIn", href: "#" },
    { icon: TwitterIcon, label: "Twitter", href: "#" },
];

function Logo() {
    return (
        <a href="#" className="flex items-center gap-3 shrink-0">
            <svg width="40" height="40" viewBox="0 0 42 42" fill="none" aria-hidden="true">
                <circle cx="21" cy="21" r="19" stroke="#9C92F5" strokeWidth="1.5" opacity="0.35" />
                <ellipse
                    cx="21"
                    cy="21"
                    rx="19"
                    ry="7"
                    stroke="#9C92F5"
                    strokeWidth="1.5"
                    transform="rotate(-25 21 21)"
                />
                <circle cx="21" cy="21" r="6.5" fill="#FAFAFC" fillOpacity="0.08" />
                <circle cx="21" cy="21" r="6.5" stroke="#9C92F5" strokeWidth="1.2" />
                <circle cx="30.5" cy="12.5" r="2" fill="#9C92F5" />
            </svg>
            <span className="flex flex-col leading-none">
                <span className="text-lg font-semibold tracking-tight text-white">
                    Flowspace
                </span>
                <span className="text-xs font-medium tracking-[0.25em] text-[#9C92F5]">
                    GALAXIES
                </span>
            </span>
        </a>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-[#1B1B3A] font-sans text-white/70">
            <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10">
                {/* Brand + blurb */}
                <div className="flex flex-col gap-4">
                    <Logo />
                    <p className="text-sm leading-relaxed text-white/60 max-w-xs">
                        Full-service property management across Utah, connecting
                        landlords, tenants, and caretakers under one roof.
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                        {SOCIALS.map(({ icon: Icon, label, href }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/70 hover:text-white hover:border-[#9C92F5] transition-colors"
                            >
                                <Icon width={16} height={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick links */}
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-white tracking-wide">
                        Quick Links
                    </span>
                    <nav className="flex flex-col gap-2.5">
                        {QUICK_LINKS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm text-white/60 hover:text-[#9C92F5] transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Portal logins */}
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-white tracking-wide">
                        Portal Access
                    </span>
                    <nav className="flex flex-col gap-2.5">
                        {LOGIN_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-sm text-white/60 hover:text-[#9C92F5] transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </nav>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-3">
                    <span className="text-sm font-semibold text-white tracking-wide">
                        Get In Touch
                    </span>
                    <div className="flex flex-col gap-3 text-sm text-white/60">
                        <a href="tel:8013756800" className="flex items-start gap-2.5 hover:text-[#9C92F5] transition-colors">
                            <Phone size={15} className="mt-0.5 text-[#9C92F5] shrink-0" />
                            801.375.6800
                        </a>
                        <a href="mailto:hello@flowspacegalaxies.com" className="flex items-start gap-2.5 hover:text-[#9C92F5] transition-colors">
                            <Mail size={15} className="mt-0.5 text-[#9C92F5] shrink-0" />
                            hello@flowspacegalaxies.com
                        </a>
                        <span className="flex items-start gap-2.5">
                            <MapPin size={15} className="mt-0.5 text-[#9C92F5] shrink-0" />
                            120 Orbit Plaza, Salt Lake City, UT
                        </span>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
                    <span>© {year} Flowspace Galaxies. All rights reserved.</span>
                    <div className="flex items-center gap-5">
                        <a href="#" className="hover:text-white/70 transition-colors">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:text-white/70 transition-colors">
                            Terms of Service
                        </a>
                        <a href="#" className="hover:text-white/70 transition-colors">
                            Fair Housing
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}