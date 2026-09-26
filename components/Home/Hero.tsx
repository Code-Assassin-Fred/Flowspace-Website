"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Anton } from "next/font/google";

const anton = Anton({ subsets: ["latin"], weight: "400" });

/**
 * Background slideshow — instead of one continuous horizontal pan,
 * each property image gets its own "camera move" (a slow zoom, a
 * drift, or a subtle rotate-while-zooming), the way a marketing
 * video would linger and move on different shots. Slides crossfade
 * into one another; only the active slide's transform animation runs.
 */
type CameraMove =
    | "zoom-in"
    | "zoom-out"
    | "pan-left"
    | "pan-right"
    | "rotate-zoom"
    | "rotate-pan";

const SLIDES: { src: string; alt: string; move: CameraMove }[] = [
    { src: "/Hero%20Assets/Key2.jpg", alt: "Hand holding a set of house keys", move: "zoom-in" },
    { src: "/Hero%20Assets/Key3.png", alt: "Close-up of keys being handed over", move: "rotate-zoom" },
    { src: "/Hero%20Assets/Property.jpg", alt: "Modern property exterior", move: "rotate-pan" },
    { src: "/Hero%20Assets/Rotate.jpg", alt: "Featured property showcase", move: "rotate-zoom" },
    { src: "/Hero%20Assets/Apartment%201.jpg", alt: "Bright apartment interior", move: "pan-left" },
    { src: "/Hero%20Assets/Apartment.jpg", alt: "Apartment living space", move: "zoom-out" },
    { src: "/Hero%20Assets/key.jpg", alt: "Key turning in a front door lock", move: "pan-right" },
];

const SECONDS_PER_SLIDE = 6;
const CROSSFADE_MS = 1200;

/** Rotating headlines covering the core services */
const HEADLINES = [
    "FIND YOUR\nNEXT HOME",
    "KEYS IN\nYOUR HAND",
    "PROPERTY\nMANAGEMENT",
    "VERIFIED\nLISTINGS",
    "MOVE-IN\nMADE EASY",
    "SPACES THAT\nFIT YOUR LIFE",
];

const ROTATE_INTERVAL = 4000; // ms per headline

export default function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animState, setAnimState] = useState<"in" | "out">("in");

    const [slideIndex, setSlideIndex] = useState(0);
    const runId = useRef(0); // bumps on every slide change so the active slide's animation restarts

    const cycleHeadline = useCallback(() => {
        setAnimState("out");
        setTimeout(() => {
            setActiveIndex((prev) => (prev + 1) % HEADLINES.length);
            setAnimState("in");
        }, 500); // matches the CSS transition duration
    }, []);

    useEffect(() => {
        const id = setInterval(cycleHeadline, ROTATE_INTERVAL);
        return () => clearInterval(id);
    }, [cycleHeadline]);

    useEffect(() => {
        const id = setInterval(() => {
            runId.current += 1;
            setSlideIndex((prev) => (prev + 1) % SLIDES.length);
        }, SECONDS_PER_SLIDE * 1000);
        return () => clearInterval(id);
    }, []);

    return (
        /* 
         * pb-[100px] sm:pb-[120px] creates space at the bottom so the
         * overlay card can hang over into the About section. The parent
         * section itself clips nothing (overflow-visible on the card's
         * wrapper), and the About section uses negative margin / top
         * padding to tuck under it.
         */
        <section id="home" className="relative h-[85vh] sm:h-screen min-h-[540px] sm:min-h-0 w-full overflow-visible bg-neutral-950 scroll-mt-24">
            {/* Slideshow — each slide gets its own camera move, crossfading into the next */}
            <div className="absolute inset-0 overflow-hidden">
                {SLIDES.map((slide, index) => {
                    const isActive = index === slideIndex;
                    return (
                        <div
                            key={slide.src}
                            className="absolute inset-0 transition-opacity ease-in-out"
                            style={{
                                opacity: isActive ? 1 : 0,
                                transitionDuration: `${CROSSFADE_MS}ms`,
                                zIndex: isActive ? 1 : 0,
                            }}
                        >
                            {/* Changing the key forces the transform animation to restart every time this slide becomes active */}
                            <div
                                key={isActive ? `active-${runId.current}` : "idle"}
                                className={`sahani-move-${slide.move} relative h-full w-full will-change-transform`}
                            >
                                <Image
                                    src={slide.src}
                                    alt={slide.alt}
                                    fill
                                    priority={index === 0}
                                    sizes="100vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Cinematic vignette */}
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

            {/* ── Overlay Card ── */}
            <div className="absolute bottom-0 left-0 right-0 z-20 translate-y-[5px] sm:translate-y-[10px] flex justify-center px-4 sm:px-8 hero-card-entrance">
                <div className="w-full max-w-[900px] bg-[#8b1a1a] px-5 sm:px-14 md:px-20 py-8 sm:py-16 md:py-20 shadow-2xl shadow-black/60 rounded-sm">
                    {/* Rotating headline */}
                    <div className="relative min-h-[80px] sm:min-h-[160px] md:min-h-[190px] overflow-hidden">
                        <h2
                            className={`${anton.className} text-white text-[34px] sm:text-[72px] md:text-[90px] lg:text-[80px] font-black leading-[0.95] tracking-tight uppercase whitespace-pre-line transition-all duration-500 ease-in-out ${animState === "in"
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 -translate-y-6"
                                }`}
                            style={{
                                textShadow: "2px 4px 0 rgba(0,0,0,0.25)",
                            }}
                        >
                            {HEADLINES[activeIndex]}
                        </h2>
                    </div>

                    {/* Two CTA buttons */}
                    <div className="flex flex-wrap items-center gap-4 sm:gap-5 mt-6 sm:mt-8">
                        <Link
                            href="#listings"
                            onClick={(e) => {
                                if (typeof window !== "undefined" && window.location.pathname === "/") {
                                    e.preventDefault();
                                    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
                                    window.history.pushState(null, "", "#listings");
                                }
                            }}
                            className={`${anton.className} hero-cta-1 btn-magnetic inline-block bg-[#1a1a1a] hover:bg-black text-white text-[12px] sm:text-[16px] tracking-[0.15em] uppercase px-5 sm:px-9 py-2.5 sm:py-3.5 border border-white/10 transition-all hover:scale-105 shadow-lg`}
                            style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}
                        >
                            View Listings
                        </Link>
                        <Link
                            href="#contact"
                            onClick={(e) => {
                                if (typeof window !== "undefined" && window.location.pathname === "/") {
                                    e.preventDefault();
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    window.history.pushState(null, "", "#contact");
                                }
                            }}
                            className={`${anton.className} hero-cta-2 btn-magnetic inline-block bg-transparent hover:bg-white/10 text-white text-[12px] sm:text-[16px] tracking-[0.15em] uppercase px-5 sm:px-9 py-2.5 sm:py-3.5 border-2 border-white/40 hover:border-white/70 transition-all hover:scale-105`}
                            style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}
                        >
                            List Your Property
                        </Link>
                    </div>
                </div>
            </div>

            {/* Camera-move keyframes — one per effect, each timed to roughly fill a slide's on-screen duration */}
            <style>{`
        @keyframes sahani-zoom-in {
          from { transform: scale(1); }
          to   { transform: scale(1.16); }
        }
        @keyframes sahani-zoom-out {
          from { transform: scale(1.18); }
          to   { transform: scale(1); }
        }
        @keyframes sahani-pan-left {
          from { transform: scale(1.12) translateX(3%); }
          to   { transform: scale(1.12) translateX(-3%); }
        }
        @keyframes sahani-pan-right {
          from { transform: scale(1.12) translateX(-3%); }
          to   { transform: scale(1.12) translateX(3%); }
        }
        @keyframes sahani-rotate-zoom {
          from { transform: scale(1.06) rotate(-1.2deg); }
          to   { transform: scale(1.22) rotate(1.2deg); }
        }
        @keyframes sahani-rotate-pan {
          0%   { transform: scale(1.1) rotate(-1deg) translateX(2%); }
          50%  { transform: scale(1.16) rotate(0deg)  translateX(0%); }
          100% { transform: scale(1.1) rotate(1deg)  translateX(-2%); }
        }

        .sahani-move-zoom-in    { animation: sahani-zoom-in ${SECONDS_PER_SLIDE + 1}s ease-out forwards; }
        .sahani-move-zoom-out   { animation: sahani-zoom-out ${SECONDS_PER_SLIDE + 1}s ease-out forwards; }
        .sahani-move-pan-left   { animation: sahani-pan-left ${SECONDS_PER_SLIDE + 1}s ease-in-out forwards; }
        .sahani-move-pan-right  { animation: sahani-pan-right ${SECONDS_PER_SLIDE + 1}s ease-in-out forwards; }
        .sahani-move-rotate-zoom{ animation: sahani-rotate-zoom ${SECONDS_PER_SLIDE + 1}s ease-in-out forwards; }
        .sahani-move-rotate-pan { animation: sahani-rotate-pan ${SECONDS_PER_SLIDE + 1}s ease-in-out forwards; }

        @media (prefers-reduced-motion: reduce) {
          [class*="sahani-move-"] {
            animation: none !important;
          }
        }
      `}</style>
        </section>
    );
}