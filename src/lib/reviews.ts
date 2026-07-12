import api from "./api.js";

export const getReviewsBySlug = async (slug: string): Promise<any[]> => {
    const { data } = await api.get(`/api/reviews/${slug}`);
    return data;
};

export const createReview = async (payload: any, token: string): Promise<any> => {
    const { data } = await api.post("/api/reviews", payload, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};
