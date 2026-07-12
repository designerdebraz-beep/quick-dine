/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { useAppContext } from "../context/AppContext.tsx";
import { createRestaurant } from "../lib/restaurants.js";
import toast from "react-hot-toast";

const PRICE_OPTIONS = ["$", "$$", "$$$", "$$$$"];
const CUISINES = ["Italian", "French", "Japanese", "Steakhouse", "Vegetarian", "Other"];

export default function ItemsAdd() {
    const { token, user } = useAppContext();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        shortDescription: "",
        description: "",
        cuisine: CUISINES[0],
        priceRange: "$$",
        location: "",
        address: "",
        image: "",
        featured: false,
    });
    const [loading, setLoading] = useState(false);

    const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!token) {
            toast.error("Please sign in first.");
            navigate("/login");
            return;
        }
        setLoading(true);
        try {
            await createRestaurant(
                {
                    ...form,
                    totalSeats: 20,
                    availableSlots: ["18:00", "19:00", "20:00"],
                },
                token
            );
            toast.success("Item submitted! It will appear after admin approval.");
            navigate("/items/manage");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to add item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-surface flex flex-col pt-20">
            <Navbar />
            <main className="grow max-w-3xl w-full mx-auto px-6 md:px-10 py-12">
                <div className="mb-8">
                    <span className="text-[10px] text-secondary tracking-[0.2em] uppercase">Add Item</span>
                    <h1 className="font-display text-2xl md:text-3xl font-medium text-primary mt-1">
                        List a New Venue
                    </h1>
                    <p className="text-sm text-black/55 mt-2">
                        Welcome, {user?.name}. Submissions are reviewed before going live.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white border border-outline-variant/20 rounded-md shadow-sm p-8 space-y-6">
                    <div className="space-y-1">
                        <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Title</label>
                        <input
                            required
                            value={form.name}
                            onChange={(e) => update("name", e.target.value)}
                            placeholder="e.g. L'Essence"
                            className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Short Description</label>
                        <input
                            value={form.shortDescription}
                            onChange={(e) => update("shortDescription", e.target.value)}
                            placeholder="A one-line summary of your venue"
                            className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Full Description</label>
                        <textarea
                            required
                            rows={5}
                            value={form.description}
                            onChange={(e) => update("description", e.target.value)}
                            placeholder="Describe the experience, ambiance, and signature dishes..."
                            className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Cuisine</label>
                            <select
                                value={form.cuisine}
                                onChange={(e) => update("cuisine", e.target.value)}
                                className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none bg-white"
                            >
                                {CUISINES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Price (priority field)</label>
                            <select
                                value={form.priceRange}
                                onChange={(e) => update("priceRange", e.target.value)}
                                className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none bg-white"
                            >
                                {PRICE_OPTIONS.map((p) => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Location</label>
                            <input
                                required
                                value={form.location}
                                onChange={(e) => update("location", e.target.value)}
                                placeholder="City, Country"
                                className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Address</label>
                            <input
                                required
                                value={form.address}
                                onChange={(e) => update("address", e.target.value)}
                                placeholder="Street address"
                                className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">Image URL (optional)</label>
                        <input
                            type="url"
                            value={form.image}
                            onChange={(e) => update("image", e.target.value)}
                            placeholder="https://..."
                            className="w-full border border-outline-variant/40 rounded-md px-3 py-2 text-sm focus:border-secondary focus:outline-none"
                        />
                    </div>

                    <label className="flex items-center gap-2.5 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={(e) => update("featured", e.target.checked)}
                            className="h-4 w-4 accent-secondary rounded border-outline-variant/60"
                        />
                        <span className="text-xs text-black/55">Mark as Featured (priority listing)</span>
                    </label>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-primary hover:bg-secondary text-white text-xs font-medium tracking-widest uppercase px-8 py-3 rounded-md transition-colors disabled:opacity-75 cursor-pointer"
                        >
                            {loading ? "SUBMITTING..." : "SUBMIT ITEM"}
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="border border-outline-variant/50 text-black/55 text-xs font-medium tracking-widest uppercase px-8 py-3 rounded-md hover:border-primary cursor-pointer"
                        >
                            CANCEL
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </div>
    );
}
