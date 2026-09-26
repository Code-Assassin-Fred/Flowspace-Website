"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

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

export default function Hero() {
    const [slideIndex, setSlideIndex] = useState(0);
    const runId = useRef(0); // bumps on every slide change so the active slide's animation restarts

    useEffect(() => {
        const id = setInterval(() => {
            runId.current += 1;
            setSlideIndex((prev) => (prev + 1) % SLIDES.length);
        }, SECONDS_PER_SLIDE * 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <section id="home" className="relative h-[85vh] sm:h-screen min-h-[540px] sm:min-h-0 w-full overflow-hidden bg-neutral-950 scroll-mt-24">
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