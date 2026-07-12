import api from "./api.js";

export const createBooking = async (payload: any, token: string): Promise<any> => {
    const { data } = await api.post("/api/bookings", payload, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const getMyBookings = async (token: string): Promise<any[]> => {
    const { data } = await api.get("/api/bookings/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const getRestaurantBookings = async (
    restaurantId: string,
    token: string
): Promise<any[]> => {
    const { data } = await api.get(`/api/bookings/restaurant/${restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const updateBookingStatus = async (
    id: string,
    status: string,
    token: string
): Promise<any> => {
    const { data } = await api.patch(
        `/api/bookings/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
};
