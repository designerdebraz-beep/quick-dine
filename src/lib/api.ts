import axios from "axios";
import defaultRestaurantImg from "../assets/default_restaurant_Img.jpeg";

export const API_BASE =
    (import.meta.env.VITE_API_URL as string | undefined) ?? "https://quick-dine-server-new.vercel.app"; 
    // 💡 নোট: আপনার Vercel ENV কাজ না করলে ব্যাকআপ হিসেবে সরাসরি আপনার লাইভ ব্যাকএন্ড লিংকটি দিয়ে দিলাম।

const api = axios.create({
    baseURL: API_BASE,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // 👈 ফিক্স ১: Cross-Origin কুকি/সেশন শেয়ারিং সচল করার জন্য এটি অবশ্যই লাগবে
});

// 👈 ফিক্স ২: প্রতিটা রিকোয়েস্টের সাথে অটোমেটিক টোকেন (Bearer Token) পাঠানোর জন্য ইন্টারসেপ্টর
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // আপনার অ্যাপে লগইনের পর টোকেন যেখানে সেভ করেন
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const FALLBACK_IMAGE = defaultRestaurantImg;

// Resolve an image path to a usable URL.
export const imageUrl = (img?: string): string => {
    if (!img) return FALLBACK_IMAGE;
    if (img.startsWith("http")) return img;
    if (img.startsWith("/uploads/")) return API_BASE + img;
    if (img.startsWith("/")) return img;
    return "/" + img;
};

export default api;