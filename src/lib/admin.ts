import api from "./api.js";

export const getAdminRestaurants = async (token: string): Promise<any[]> => {
    const { data } = await api.get("/api/admin/restaurants", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const getAdminStats = async (token: string): Promise<any> => {
    const { data } = await api.get("/api/admin/stats", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const updateRestaurantStatus = async (
    id: string,
    status: "approved" | "rejected",
    token: string
): Promise<any> => {
    const { data } = await api.patch(
        `/api/restaurants/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
};
