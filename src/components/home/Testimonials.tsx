import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
    {
        name: "Eleanor Whitfield",
        role: "Food Critic, The Tasting Press",
        quote:
            "QuickDine transformed how I discover tables. The curation is impeccable and every booking has been flawless from confirmation to dessert.",
    },
    {
        name: "Daniel Okafor",
        role: "Executive Chef, Terraza Cielo",
        quote:
            "As a partner, the onboarding and reservation management is effortless. We fill our peak slots without a single double-booking.",
    },
    {
        name: "Mei Lin",
        role: "Frequent Diner",
        quote:
            "The last-minute member access saved our anniversary dinner. The interface is elegant and the reminders are perfectly timed.",
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-surface-container-low/50">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
                <div className="text-center mb-14">
                    <span className="text-[10px] text-secondary tracking-[0.2em] block mb-2 uppercase">GUEST VOICES</span>
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary">Loved by Diners & Partners</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {TESTIMONIALS.map((t) => (
                        <div key={t.name} className="bg-white border border-outline-variant/20 rounded-md p-8 shadow-sm flex flex-col">
                            <Quote size={28} className="text-secondary/70 mb-5" />
                            <p className="text-sm text-black/70 leading-relaxed flex-1">{t.quote}</p>
                            <div className="mt-6 flex items-center gap-1 text-secondary">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" />
                                ))}
                            </div>
                            <div className="mt-4">
                                <h4 className="text-sm text-primary">{t.name}</h4>
                                <p className="text-[11px] text-black/50">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
