import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { Link } from "react-router-dom";
import { UtensilsCrossed, ShieldCheck, Sparkles, Globe2 } from "lucide-react";

const VALUES = [
    { icon: UtensilsCrossed, title: "Curated Excellence", text: "Every venue is hand-selected for culinary craft, ambiance, and service before it joins the network." },
    { icon: ShieldCheck, title: "Trust & Safety", text: "Secure authentication, verified partners, and transparent booking status keep diners protected." },
    { icon: Sparkles, title: "Effortless Discovery", text: "Smart filters for cuisine, price, and location help you find the perfect table in seconds." },
    { icon: Globe2, title: "Global Reach", text: "From Manhattan rooftops to neighborhood gems, discover extraordinary dining wherever you are." },
];

export default function About() {
    return (
        <div className="min-h-screen bg-surface flex flex-col pt-20">
            <Navbar />
            <main className="grow">
                {/* Hero */}
                <section className="bg-primary-container text-on-primary py-20 xl:py-28 text-center px-6">
                    <div className="max-w-3xl mx-auto">
                        <span className="text-[10px] text-secondary tracking-[0.2em] uppercase">Our Story</span>
                        <h1 className="font-display text-3xl md:text-5xl font-medium text-white mt-3 leading-tight">
                            Connecting Diners with Extraordinary Tables
                        </h1>
                        <p className="text-sm text-on-primary-container mt-6 leading-relaxed">
                            QuickDine is a premium reservation platform built for discerning palates. We unite
                            world-class restaurants and the guests who love them through a fast, elegant, and
                            trustworthy booking experience.
                        </p>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-20 xl:py-28 bg-white px-6 md:px-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6">Our Mission</h2>
                        <p className="text-sm text-black/60 leading-relaxed">
                            Great meals deserve great access. We believe booking a table should feel as refined as
                            the evening itself — no clutter, no guesswork, just a seamless path from craving to
                            candlelit table.
                        </p>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 bg-surface-container-low/50 px-6 md:px-10">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary text-center mb-12">
                            What We Stand For
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {VALUES.map(({ icon: Icon, title, text }) => (
                                <div key={title} className="bg-white border border-outline-variant/20 rounded-md p-7 shadow-sm">
                                    <Icon size={22} className="text-secondary mb-4" />
                                    <h3 className="text-sm text-primary mb-2">{title}</h3>
                                    <p className="text-xs text-black/55 leading-relaxed">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 text-center px-6">
                    <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6">
                        Ready to discover your next favorite table?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            to="/search"
                            className="bg-primary hover:bg-secondary text-white text-xs font-medium tracking-widest uppercase px-8 py-3 rounded-md transition-colors"
                        >
                            Browse Restaurants
                        </Link>
                        <Link
                            to="/contact"
                            className="border border-outline-variant/50 hover:border-primary text-black/55 text-xs font-medium tracking-widest uppercase px-8 py-3 rounded-md transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
