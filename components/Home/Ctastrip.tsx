import Link from "next/link";

/**
 * Full-width conversion strip that sits right below the Hero.
 * Two distinct CTAs for two distinct audiences:
 *  - Owners: get a free rental analysis
 *  - Renters: browse listings
 * Split 60/40 on desktop with a hairline divider; stacks on mobile.
 */
export default function CTAStrip() {
    return (
        <section className="w-full bg-[#bb2036]">
            <div className="mx-auto flex max-w-7xl flex-col divide-y divide-white/15 lg:flex-row lg:divide-x lg:divide-y-0">
                {/* Owners — simple CTA */}
                <div className="flex flex-1 flex-col justify-center gap-5 px-6 py-10 sm:px-10 sm:py-12 lg:basis-3/5">
                    <h2 className="text-[clamp(1.4rem,3vw,2.25rem)] font-black leading-tight tracking-tight text-white">
                        Owners: Full Property Management, Backed by Your AI Agent.
                    </h2>
                    <div>
                        <Link
                            href="/landlords"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1a1a1a] px-6 py-3.5 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-black"
                        >
                            Get Started
                            <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                </div>

                {/* Renters — simple nav CTA */}
                <div className="flex flex-1 flex-col justify-center gap-5 px-6 py-10 sm:px-10 sm:py-12 lg:basis-2/5">
                    <h2 className="text-[clamp(1.4rem,3vw,2.25rem)] font-black leading-tight tracking-tight text-white">
                        Renters: Find Your Next Home.
                    </h2>
                    <div>
                        <Link
                            href="/properties"
                            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white bg-transparent px-6 py-3.5 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-white hover:text-[#bb2036]"
                        >
                            Browse Listings
                            <span aria-hidden="true">↗</span>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}