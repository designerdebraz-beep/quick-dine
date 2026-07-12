import axios from "axios";
import defaultRestaurantImg from "../assets/default_restaurant_Img.jpeg";

export const API_BASE =
    (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:5000";

const api = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
});

export const FALLBACK_IMAGE = defaultRestaurantImg;

// Resolve an image path to a usable URL.
// - empty/missing  -> bundled default image
// - absolute http  -> used as-is
// - /uploads/...   -> served by the API server (prepend API base)
// - /foo.png       -> client public asset (served from the client origin)
// - foo.png        -> bare filename treated as a client public asset
export const imageUrl = (img?: string): string => {
    if (!img) return FALLBACK_IMAGE;
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads/")) return API_BASE + img;
    if (img.startsWith("/")) return img;
    return "/" + img;
};

export default api;
