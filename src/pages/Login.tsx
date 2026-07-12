import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import AuthForm from "../components/AuthForm.tsx";
import { useAppContext } from "../context/AppContext.tsx";

export default function Login() {
    const { isAuthenticated } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen bg-surface flex flex-col pt-20">
            <Navbar />
            <main className="grow flex items-center justify-center px-6 py-16">
                <AuthForm initialTab="login" onSuccess={() => navigate("/")} />
            </main>
            <Footer />
        </div>
    );
}
