"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
 * One white section: the teal listing card on top, the "AI co-manager" block below it.
 * Swap IMAGE_SRC for the photo you want behind the task panel.
 */

const NAVY = "#264e5d";
const BLUE = "#0a3fe0";
const IMAGE_SRC = "/Hero%20Assets/Property.jpg";

/* ---------- live tasks ---------- */

type Task = {
    label: string;
    unit: string;
    total: number;
    start: number; // tick the task begins
    speed: number; // % per tick
    icon: React.ReactNode;
};

const svgProps = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#fff",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4",
};

const TASKS: Task[] = [
    {
        label: "Reconcile M-Pesa rent payments",
        unit: "payments",
        total: 47,
        start: 0,
        speed: 1.6,
        icon: (
            <span className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-[#0a8f3c] text-[13px] font-bold text-white">
                M
            </span>
        ),
    },
    {
        label: "Flag overdue rent",
        unit: "units",
        total: 5,
        start: 6,
        speed: 2.2,
        icon: (
            <span className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-[#d92d20]">
                <svg {...svgProps}>
                    <path d="M12 6v7m0 4.5v.01" />
                </svg>
            </span>
        ),
    },
    {
        label: "Draft tenant reminders",
        unit: "messages",
        total: 5,
        start: 14,
        speed: 1.3,
        icon: (
            <span className="flex h-6 w-6 items-center justify-center rounded-[3px]" style={{ background: BLUE }}>
                <svg {...svgProps}>
                    <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
                    <path d="m4 7 8 6 8-6" />
                </svg>
            </span>
        ),
    },
    {
        label: "Summarize maintenance trends",
        unit: "requests",
        total: 12,
        start: 22,
        speed: 1.8,
        icon: (
            <span className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-[#111827]">
                <svg {...svgProps}>
                    <path d="M6 19v-6m6 6V6m6 13v-9" />
                </svg>
            </span>
        ),
    },
];

const HOLD_TICKS = 32; // pause on "all done" before the loop restarts
const TICK_MS = 100;
const LAST_TICK = Math.max(...TASKS.map((t) => t.start + 100 / t.speed)) + HOLD_TICKS;

function progressAt(task: Task, tick: number) {
    return Math.min(100, Math.max(0, Math.round((tick - task.start) * task.speed)));
}

function Row({ task, tick }: { task: Task; tick: number }) {
    const pct = progressAt(task, tick);
    const done = pct >= 100;
    const running = pct > 0 && !done;
    const count = Math.round((task.total * pct) / 100);

    return (
        <li
            className="flex items-center gap-3 rounded-[4px] px-3 py-2.5 sm:px-4 sm:py-3"
            style={{ background: "linear-gradient(90deg,#f3f5f8 0%,#dfe4ea 55%,#7b828b 100%)" }}
        >
            {task.icon}
            <span className="min-w-0 flex-1 truncate text-[0.95rem] font-medium text-neutral-900 sm:text-[1.05rem]">
                {task.label}
                <span className="ml-2 hidden text-[0.85rem] font-normal text-neutral-600 md:inline">
                    {count}/{task.total} {task.unit}
                </span>
            </span>

            <span className="flex w-[78px] shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[0.9rem] font-semibold text-neutral-900 sm:w-[86px]">
                <span
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 shrink-0 rounded-full border-2 ${
                        running ? "animate-spin border-neutral-300 border-t-[#0a3fe0]" : "border-neutral-300"
                    }`}
                />
                <span className="ml-auto tabular-nums">{pct}%</span>
            </span>

            <span
                aria-label={done ? "Done" : "In progress"}
                className={`flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border-2 ${
                    done ? "border-[#1f9d55] bg-[#1f9d55]" : "border-neutral-400 bg-white"
                }`}
            >
                {done && (
                    <svg viewBox="0 0 20 20" className="h-3 w-3" aria-hidden="true">
                        <path
                            d="m4.5 10.5 3.4 3.3 7.6-7.6"
                            fill="none"
                            stroke="#fff"
                            strokeWidth={2.6}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </span>
        </li>
    );
}

function TaskPanel() {
    const [tick, setTick] = useState(0);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTick(LAST_TICK);
            return;
        }
        const id = setInterval(() => setTick((t) => (t >= LAST_TICK ? 0 : t + 1)), TICK_MS);
        return () => clearInterval(id);
    }, []);

    return (
        <div
            className="w-full rounded-[6px] border border-[#f3f5f8] p-4 shadow-[0_24px_60px_#1c2733] sm:p-5"
            style={{ background: "linear-gradient(90deg,#e6ebf1 0%,#cbd2db 50%,#2b3038 100%)" }}
        >
            <div className="flex items-center gap-3">
                <span
                    aria-hidden="true"
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0b1b4d]"
                >
                    <span className="h-3 w-3 rounded-full border-2 border-[#f7d36b]" />
                </span>
                <p className="text-[1.15rem] font-semibold text-neutral-900 sm:text-[1.3rem]">Task execution</p>
            </div>

            <ul className="ml-3.5 mt-3 space-y-2.5 border-l-2 border-neutral-400 pl-4 sm:ml-[13px] sm:pl-5">
                {TASKS.map((t) => (
                    <Row key={t.label} task={t} tick={tick} />
                ))}
            </ul>
        </div>
    );
}

/* ---------- section ---------- */

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
                        Not ready to move your whole operation over? List anyway.
                    </h2>
                    <p className="mt-5 text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-white">
                        You don&apos;t need a Flowspace subscription to put your vacant unit in front of renters. List it free on the Flowspace Marketplace — upgrade to full property management whenever you&apos;re ready.
                    </p>
                </div>

                <Link
                    href="/landlords/list"
                    className="flex w-full shrink-0 items-center justify-center rounded-[3px] border-2 bg-white px-8 py-5 text-[1.35rem] font-bold hover:bg-[#eaf1ff] sm:w-auto lg:w-[360px] lg:py-6"
                    style={{ color: BLUE, borderColor: BLUE }}
                >
                    List a Property
                    <span aria-hidden="true" className="ml-3">→</span>
                </Link>
            </div>

            <div className="mx-auto mt-14 max-w-[1500px] lg:mt-20">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-[clamp(1.9rem,3.6vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-black">
                        Meet your AI co-manager.
                    </h2>
                    <p className="mt-5 text-[clamp(1.05rem,1.5vw,1.3rem)] leading-relaxed text-neutral-800">
                        Flowspace&apos;s AI reviews payments, flags overdue rent, drafts tenant messages, and summarizes
                        maintenance trends — so you spend less time managing and more time owning. Available on Growth
                        and Pro plans, and switchable month to month as your portfolio changes.
                    </p>
                    <Link
                        href="/pricing"
                        className="mt-6 inline-flex items-center gap-3 text-[1.25rem] font-bold hover:underline"
                        style={{ color: BLUE }}
                    >
                        See what&apos;s included by plan
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h16m-6-6 6 6-6 6" />
                        </svg>
                    </Link>
                </div>

                {/* Image + live task panel */}
                <div className="relative mt-10 min-h-[480px] overflow-hidden rounded-[3px] bg-[#b9cbe3] sm:min-h-[560px] lg:mt-14 lg:aspect-[1600/824] lg:min-h-0">
                    <Image
                        src={IMAGE_SRC}
                        alt="A property owner outside a listed home"
                        fill
                        sizes="(min-width: 1500px) 1500px, 100vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-x-3 bottom-3 sm:inset-x-6 sm:bottom-6 lg:inset-x-auto lg:bottom-[9%] lg:right-[6%] lg:w-[50%]">
                        <TaskPanel />
                    </div>
                </div>
            </div>
        </section>
    );
}