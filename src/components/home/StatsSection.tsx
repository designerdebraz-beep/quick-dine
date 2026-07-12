const STATS = [
    { value: "120+", label: "Curated Venues" },
    { value: "18", label: "Cities Worldwide" },
    { value: "45K", label: "Reservations Made" },
    { value: "4.8", label: "Average Rating" },
];

export default function StatsSection() {
    return (
        <section className="py-20 xl:py-28 bg-primary text-white">
            <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                {STATS.map((s) => (
                    <div key={s.label} className="space-y-2">
                        <h3 className="font-display text-3xl md:text-4xl font-medium">{s.value}</h3>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-white/60">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
