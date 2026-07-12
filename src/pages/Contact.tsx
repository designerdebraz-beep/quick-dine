import { useState } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { Mail, MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [loading, setLoading] = useState(false);

    const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Demo-only: no backend mail endpoint; acknowledge locally.
        setTimeout(() => {
            toast.success("Thanks! Our team will reach out shortly.");
            setForm({ name: "", email: "", message: "" });
            setLoading(false);
        }, 600);
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col pt-20">
            <Navbar />
            <main className="grow max-w-6xl w-full mx-auto px-6 md:px-10 py-16">
                <div className="text-center mb-14">
                    <span className="text-[10px] text-secondary tracking-[0.2em] uppercase">Get in Touch</span>
                    <h1 className="font-display text-2xl md:text-3xl font-medium text-primary mt-2">Contact QuickDine</h1>
                    <p className="text-sm text-black/55 mt-3 max-w-xl mx-auto">
                        Questions about a reservation, partnering with us, or your account? We're here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Info */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin size={20} className="text-secondary mt-0.5" />
                            <div>
                                <h4 className="text-sm text-primary">Office</h4>
                                <p className="text-xs text-black/55 leading-relaxed mt-1">
                                    Level 4, House 1162, Road 10, Avenue 12, Mirpur DOHS, Dhaka
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Mail size={20} className="text-secondary mt-0.5" />
                            <div>
                                <h4 className="text-sm text-primary">Email</h4>
                                <a href="mailto:support@quedine.com" className="text-xs text-black/55 hover:text-secondary">
                                    support@quedine.com
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <Phone size={20} className="text-secondary mt-0.5" />
                            <div>
                                <h4 className="text-sm text-primary">Helpline</h4>
                                <p className="text-xs text-black/55">Sat – Thu, 10:00 AM – 7:00 PM</p>
                                <p className="text-xs text-black/55">01322901105 · 01335106731</p>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-7 bg-white border border-outline-variant/20 rounded-md shadow-sm p-8 space-y-5">
                        <div className="space-y-1">
                            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Name</label>
                            <input
                                required
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                                className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Email</label>
                            <input
                                required
                                type="email"
                                value={form.email}
                                onChange={(e) => update("email", e.target.value)}
                                className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Message</label>
                            <textarea
                                required
                                rows={5}
                                value={form.message}
                                onChange={(e) => update("message", e.target.value)}
                                className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none resize-none"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary hover:bg-secondary text-white text-xs font-medium tracking-widest uppercase px-8 py-3 rounded-md transition-colors disabled:opacity-75 cursor-pointer"
                        >
                            {loading ? "SENDING..." : "SEND MESSAGE"}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </div>
    );
}
