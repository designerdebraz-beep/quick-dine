/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import Loader from "../components/Loader.tsx";
import { useAppContext } from "../context/AppContext.tsx";
import { getMyRestaurants, deleteRestaurant } from "../lib/restaurants.js";
import { Eye, Trash2, Plus, CheckCircle, Clock, XCircle } from "lucide-react";
import toast from "react-hot-toast";

const STATUS_STYLES: Record<string, string> = {
    approved: "bg-green-100 text-green-800",
    pending: "bg-amber-100 text-amber-800",
    rejected: "bg-error-container text-on-error-container",
};

export default function ItemsManage() {
    const { token, user } = useAppContext();
    const navigate = useNavigate();
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        if (!token) return;
        try {
            const data = await getMyRestaurants(token);
            setItems(data);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to load items");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Delete this item? This cannot be undone.")) return;
        try {
            await deleteRestaurant(id, token as string);
            toast.success("Item deleted");
            setItems((prev) => prev.filter((i) => i._id !== id));
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Failed to delete");
        }
    };

    if (loading) return <Loader text="Loading your items..." />;

    return (
        <div className="min-h-screen bg-surface flex flex-col pt-20">
            <Navbar />
            <main className="grow max-w-7xl w-full mx-auto px-6 md:px-10 py-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <span className="text-[10px] text-secondary tracking-[0.2em] uppercase">Manage Items</span>
                        <h1 className="font-display text-2xl md:text-3xl font-medium text-primary mt-1">
                            Your Listed Venues
                        </h1>
                        <p className="text-sm text-black/55 mt-2">Welcome, {user?.name}.</p>
                    </div>
                    <button
                        onClick={() => navigate("/items/add")}
                        className="flex items-center gap-2 bg-primary hover:bg-secondary text-white text-xs font-medium tracking-widest uppercase px-6 py-3 rounded-md transition-colors cursor-pointer"
                    >
                        <Plus size={14} /> Add Item
                    </button>
                </div>

                {items.length === 0 ? (
                    <div className="bg-white border border-outline-variant/20 rounded-md p-12 text-center">
                        <p className="text-sm text-black/55 mb-6">You haven't listed any venues yet.</p>
                        <Link
                            to="/items/add"
                            className="inline-block bg-primary hover:bg-secondary text-white text-xs font-medium tracking-widest uppercase px-6 py-3 rounded-md transition-colors"
                        >
                            ADD YOUR FIRST ITEM
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white border border-outline-variant/20 rounded-md overflow-hidden shadow-sm">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low border-b border-outline-variant/10 text-[10px] tracking-wider text-black/55 uppercase">
                                    <th className="p-4">Venue</th>
                                    <th className="p-4">Cuisine</th>
                                    <th className="p-4">Location</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-outline-variant/10">
                                {items.map((item) => (
                                    <tr key={item._id} className="hover:bg-surface/50">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.image || "/logo.svg"}
                                                    alt={item.name}
                                                    className="w-12 h-12 rounded-md object-cover"
                                                />
                                                <span className="text-primary font-medium">{item.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-black/55">{item.cuisine}</td>
                                        <td className="p-4 text-black/55">{item.location}</td>
                                        <td className="p-4">
                                            <span
                                                className={`inline-flex items-center gap-1 py-0.5 px-2 text-[9px] tracking-wider uppercase rounded-sm ${
                                                    STATUS_STYLES[item.status] || "bg-surface-container-low text-black/55"
                                                }`}
                                            >
                                                {item.status === "approved" && <CheckCircle size={11} />}
                                                {item.status === "pending" && <Clock size={11} />}
                                                {item.status === "rejected" && <XCircle size={11} />}
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    to={`/restaurant/${item.slug}`}
                                                    className="flex items-center gap-1 text-[10px] font-medium tracking-wider uppercase text-secondary hover:text-primary border border-outline-variant/40 px-3 py-2 rounded-md cursor-pointer transition-colors"
                                                >
                                                    <Eye size={12} /> View
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="flex items-center gap-1 text-[10px] font-medium tracking-wider uppercase text-error hover:bg-error-container/20 border border-outline-variant/40 px-3 py-2 rounded-md cursor-pointer transition-colors"
                                                >
                                                    <Trash2 size={12} /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
