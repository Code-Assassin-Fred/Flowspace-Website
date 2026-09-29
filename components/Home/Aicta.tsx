import Link from "next/link";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
    subsets: ["latin"],
    style: ["normal", "italic"],
    weight: ["400", "500", "600", "700"],
});

/**
 * AI CTA
 * Save as components/sections/AICta.tsx and render <AICta /> on the home page.
 */

const NAVY = "#264e5d";
const BLUE = "#0a3fe0";

export default function AICta() {
    return (
        <section
            className={`${playfair.className} [font-variant-numeric:lining-nums] bg-white px-4 py-10 sm:px-8 lg:py-14`}
        >
            <div
                className="mx-auto flex max-w-[1500px] flex-col items-start gap-8 rounded-[3px] px-7 py-12 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-24 lg:py-[68px]"
                style={{ background: NAVY }}
            >
                <div className="max-w-[860px]">
                    <h2 className="text-[clamp(1.9rem,3.6vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-white">
                        Property management you can feel confident about
                    </h2>
                    <p className="mt-5 text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-white">
                        Track rent, log maintenance, message tenants, and run your properties — do it all in one
                        place, with your Flowspace AI agent.
                    </p>
                </div>

                <Link
                    href="/landlords"
                    className="flex w-full shrink-0 items-center justify-center rounded-[3px] border-2 bg-white px-8 py-5 text-[1.35rem] font-bold hover:bg-[#eaf1ff] sm:w-auto lg:w-[360px] lg:py-6"
                    style={{ color: BLUE, borderColor: BLUE }}
                >
                    Get started today
                </Link>
            </div>
        </section>
    );
}