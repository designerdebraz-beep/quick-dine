import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const FAQS = [
    {
        q: "How does QuickDine choose its restaurants?",
        a: "Every venue is vetted for culinary excellence, ambiance, and service standards before joining our curated network of fine-dining establishments.",
    },
    {
        q: "Is there a fee to make a reservation?",
        a: "Booking through QuickDine is completely free for diners. Members unlock priority access to high-demand tables and private tasting events.",
    },
    {
        q: "Can I cancel or modify my booking?",
        a: "Yes. Open your dashboard to view upcoming reservations and cancel or adjust details up to the restaurant's stated cutoff time.",
    },
    {
        q: "I own a restaurant — how do I join?",
        a: "Sign up and select “Restaurant Owner” to submit your venue. After a quick review, approved partners appear in search and receive a management console.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="py-24 bg-white px-6 md:px-10">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-[10px] text-secondary tracking-[0.2em] block mb-2 uppercase">QUESTIONS</span>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary">Frequently Asked Questions</h2>
                </div>

                <div className="divide-y divide-outline-variant/15 border-y border-outline-variant/15">
                    {FAQS.map((item, i) => {
                        const isOpen = open === i;
                        return (
                            <div key={item.q}>
                                <button
                                    onClick={() => setOpen(isOpen ? null : i)}
                                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                                >
                                    <span className="text-sm text-primary">{item.q}</span>
                                    {isOpen ? (
                                        <Minus size={18} className="text-secondary shrink-0" />
                                    ) : (
                                        <Plus size={18} className="text-secondary shrink-0" />
                                    )}
                                </button>
                                {isOpen && (
                                    <p className="text-sm text-black/55 leading-relaxed pb-6 -mt-2">{item.a}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
