/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users, ShieldCheck, Utensils, Calendar } from "lucide-react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";

interface AdminStatsProps {
    stats: any;
}

const PIE_COLORS = ["#1a1c1c", "#c9a24b", "#6b7280", "#9ca3af"];

export default function AdminStats({ stats }: AdminStatsProps) {
    if (!stats) return null;

    const kpiCards = [
        { title: "Active Diners", value: stats.users?.totalUsers, icon: Users },
        { title: "Partners", value: stats.users?.totalOwners, icon: ShieldCheck },
        { title: "Total Venues", value: stats.restaurants?.total, icon: Utensils },
        { title: "Bookings", value: stats.bookings?.total, icon: Calendar },
    ];

    const statusData = (stats.bookingsByStatus || []).map((s: any) => ({
        name: s._id || "unknown",
        value: s.count,
    }));

    const cuisineData = (stats.restaurantsByCuisine || []).map((c: any) => ({
        name: c._id || "Other",
        count: c.count,
    }));

    return (
        <div className="space-y-8 text-left">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {kpiCards.map(({ title, value, icon: Icon }) => (
                    <div key={title} className="bg-white border border-outline-variant/20 p-5 rounded-md shadow-sm space-y-2">
                        <span className="text-[10px] font-medium tracking-wider text-black/55 uppercase flex items-center gap-1.5">
                            <Icon size={12} className="text-secondary" />
                            {title}
                        </span>
                        <h4 className="font-display text-2xl font-medium text-primary">{value}</h4>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bookings by Status */}
                <div className="bg-white border border-outline-variant/20 p-5 rounded-md shadow-sm">
                    <h4 className="font-display text-sm font-medium text-primary mb-4">Bookings by Status</h4>
                    {statusData.length === 0 ? (
                        <p className="text-xs text-black/40 italic py-10 text-center">No bookings recorded yet.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={240}>
                            <PieChart>
                                <Pie
                                    data={statusData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {statusData.map((_entry: any, index: number) => (
                                        <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Venues by Cuisine */}
                <div className="bg-white border border-outline-variant/20 p-5 rounded-md shadow-sm">
                    <h4 className="font-display text-sm font-medium text-primary mb-4">Venues by Cuisine</h4>
                    {cuisineData.length === 0 ? (
                        <p className="text-xs text-black/40 italic py-10 text-center">No venues recorded yet.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={240}>
                            <BarChart data={cuisineData} margin={{ top: 8, right: 8, left: -16, bottom: 8 }}>
                                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#c9a24b" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Recent Bookings */}
            <div className="space-y-4">
                <h3 className="font-display text-lg font-medium text-primary">Recent Bookings Activity</h3>

                {stats.latestBookings?.length === 0 ? (
                    <p className="text-xs text-black/40 italic">No bookings recorded on the platform.</p>
                ) : (
                    <div className="bg-white border border-outline-variant/20 rounded-md overflow-hidden shadow-sm">
                        <table className="w-full text-left text-xs border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low border-b border-outline-variant/10 text-[10px] tracking-wider text-black/55 uppercase">
                                    {["Ref Code", "Diner", "Restaurant", "Details", "Status"].map((header) => (
                                        <th key={header} className={`p-4 ${header === "Status" ? "text-right" : ""}`}>
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-outline-variant/10">
                                {stats.latestBookings.map((b: any) => (
                                    <tr key={b._id} className="hover:bg-surface/50">
                                        <td className="p-4 text-primary">{b.bookingId}</td>

                                        <td className="p-4">
                                            <div className="text-primary">{b.user?.name}</div>
                                            <div className="text-[10px] text-black/50">{b.user?.email}</div>
                                        </td>

                                        <td className="p-4 text-primary">{b.restaurant?.name || "Deleted Restaurant"}</td>

                                        <td className="p-4 text-black/55">
                                            {new Date(b.date).toLocaleDateString()} at {b.time} PM • {b.guests} Guests
                                        </td>

                                        <td className="p-4 text-right">
                                            <span
                                                className={`inline-block py-0.5 px-2 text-[9px] tracking-wider uppercase rounded-sm ${
                                                    b.status === "confirmed"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : b.status === "completed"
                                                          ? "bg-green-100 text-green-800"
                                                          : "bg-error-container text-on-error-container"
                                                }`}
                                            >
                                                {b.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
