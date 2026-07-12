/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import AuthModal from "../components/AuthModal.tsx";
import Hero from "../components/home/Hero.tsx";
import CuisineBrowse from "../components/home/CuisineBrowse.tsx";
import StatsSection from "../components/home/StatsSection.tsx";
import TrendingRow from "../components/home/TrendingRow.tsx";
import MembershipSection from "../components/home/MembershipSection.tsx";
import Testimonials from "../components/home/Testimonials.tsx";
import FAQ from "../components/home/FAQ.tsx";
import NewsletterCTA from "../components/home/NewsletterCTA.tsx";
import { getRestaurants } from "../lib/restaurants.js";

export default function Home() {
    const [trending, setTrending] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const restaurants = await getRestaurants();
                setTrending((restaurants.data || []).slice(0, 4));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div className="min-h-screen bg-surface flex flex-col pt-0">
            <Navbar />
            <AuthModal />
            <main className="flex-1">
                <Hero />
                <CuisineBrowse />
                <StatsSection />
                <TrendingRow trending={trending} loading={loading} />
                <MembershipSection />
                <Testimonials />
                <FAQ />
                <NewsletterCTA />
            </main>
            <Footer />
        </div>
    );
}
