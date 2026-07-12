import api from "./api.js";

export const getRestaurants = async (
    params: Record<string, string | string[]> = {}
): Promise<any> => {
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) value.forEach((v) => qs.append(key, v));
        else if (value) qs.append(key, value);
    });
    const query = qs.toString();
    const { data } = await api.get(`/api/restaurants${query ? `?${query}` : ""}`);
    return data;
};

export const getRestaurantBySlug = async (slug: string): Promise<any> => {
    const { data } = await api.get(`/api/restaurants/${slug}`);
    return data;
};

export const getMyRestaurants = async (token: string): Promise<any[]> => {
    const { data } = await api.get("/api/restaurants/mine", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const createRestaurant = async (payload: any, token: string): Promise<any> => {
    const { data } = await api.post("/api/restaurants", payload, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const createRestaurantForm = async (formData: FormData, token: string): Promise<any> => {
    const { data } = await api.post("/api/restaurants", formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });
    return data;
};

export const updateRestaurantForm = async (
    id: string,
    formData: FormData,
    token: string
): Promise<any> => {
    const { data } = await api.put(`/api/restaurants/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
    });
    return data;
};

export const deleteRestaurant = async (id: string, token: string): Promise<any> => {
    const { data } = await api.delete(`/api/restaurants/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};
