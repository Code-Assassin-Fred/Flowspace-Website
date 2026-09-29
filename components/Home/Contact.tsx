"use client";

import { useState } from "react";

const INQUIRY_TYPES = [
    "Landlord",
    "Caretaker",
    "Tenant",
    "Prospective Tenant",
    "Other",
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // TODO: wire up to your form-handling endpoint
        setSubmitted(true);
    }

    return (
        <section className="w-full bg-white px-6 py-20 sm:py-28">
            <div className="mx-auto max-w-6xl">
                <div className="max-w-xl">
                    <h1 className="text-3xl font-bold text-[#1B1B3A] sm:text-4xl">
                        Talk to a human, not a bot.
                    </h1>
                    <p className="mt-3 text-[#3A3A52]">
                        Questions about pricing, onboarding, or the Marketplace —
                        we&apos;re here.
                    </p>
                </div>

                <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {/* Side details */}
                    <div className="flex flex-col gap-6 rounded-2xl bg-[#F4F4F2] p-8">
                        <div>
                            <p className="text-sm font-semibold text-[#1B1B3A]">
                                Phone
                            </p>
                            <a
                                href="tel:+2547XXXXXXXX"
                                className="mt-1 block text-sm text-[#3A3A52] hover:text-[#0066FF]"
                            >
                                +254 7XX XXX XXX
                            </a>
                        </div>

                        <div className="h-px w-full bg-[#E4E3EE]" />

                        <div>
                            <p className="text-sm font-semibold text-[#1B1B3A]">
                                Email
                            </p>
                            <a
                                href="mailto:hello@flowspacegalaxies.com"
                                className="mt-1 block text-sm text-[#3A3A52] hover:text-[#0066FF]"
                            >
                                hello@flowspacegalaxies.com
                            </a>
                        </div>

                        <div className="h-px w-full bg-[#E4E3EE]" />

                        <div>
                            <p className="text-sm font-semibold text-[#1B1B3A]">
                                Office
                            </p>
                            <p className="mt-1 text-sm text-[#3A3A52]">
                                Nairobi, Kenya
                            </p>
                        </div>

                        <div className="h-px w-full bg-[#E4E3EE]" />

                        <div>
                            <p className="text-sm font-semibold text-[#1B1B3A]">
                                Hours
                            </p>
                            <p className="mt-1 text-sm text-[#3A3A52]">
                                Monday – Saturday, 8:00 AM – 6:00 PM
                            </p>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-5 lg:col-span-2"
                    >
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="fullName"
                                    className="text-sm font-medium text-[#1B1B3A]"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    required
                                    placeholder="Jane Wanjiru"
                                    className="rounded-lg border border-[#E4E3EE] px-4 py-3 text-sm text-[#1B1B3A] outline-none placeholder:text-[#9C99B5] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="phone"
                                    className="text-sm font-medium text-[#1B1B3A]"
                                >
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    placeholder="07XX XXX XXX"
                                    className="rounded-lg border border-[#E4E3EE] px-4 py-3 text-sm text-[#1B1B3A] outline-none placeholder:text-[#9C99B5] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium text-[#1B1B3A]"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                placeholder="jane@email.com"
                                className="rounded-lg border border-[#E4E3EE] px-4 py-3 text-sm text-[#1B1B3A] outline-none placeholder:text-[#9C99B5] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="inquiryType"
                                className="text-sm font-medium text-[#1B1B3A]"
                            >
                                I am a
                            </label>
                            <select
                                id="inquiryType"
                                name="inquiryType"
                                required
                                defaultValue=""
                                className="rounded-lg border border-[#E4E3EE] px-4 py-3 text-sm text-[#1B1B3A] outline-none focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                            >
                                <option value="" disabled>
                                    Select one
                                </option>
                                {INQUIRY_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="message"
                                className="text-sm font-medium text-[#1B1B3A]"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={5}
                                placeholder="How can we help?"
                                className="resize-none rounded-lg border border-[#E4E3EE] px-4 py-3 text-sm text-[#1B1B3A] outline-none placeholder:text-[#9C99B5] focus:border-[#0066FF] focus:ring-1 focus:ring-[#0066FF]"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="w-fit rounded-lg bg-[#0066FF] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1B1B3A]"
                            >
                                Send Message
                            </button>
                        </div>

                        {submitted && (
                            <p className="text-sm text-[#0066FF]">
                                Thanks — we&apos;ve got your message and will be in
                                touch shortly.
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}