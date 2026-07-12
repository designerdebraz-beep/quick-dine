import axios from "axios";

export const API_BASE =
    (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:5000";

const api = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

// Resolve an image path to a full URL. Uploaded images live on the API server
// (/uploads/...), while seed images are served by the client (Vite public/).
export const imageUrl = (img?: string): string => {
    if (!img) return "";
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads/")) return API_BASE + img;
    return img;
};

export default api;
