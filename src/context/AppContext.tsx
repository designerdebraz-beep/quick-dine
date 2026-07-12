/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api.js";

interface UserType {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    role: "user" | "admin" | "owner";
}

interface AppContextType {
    user: UserType | null;
    token: string | null;
    loading: boolean;
    isAuthenticated: boolean;
    isAuthModalOpen: boolean;
    setAuthModalOpen: (open: boolean) => void;
    authError: string | null;
    clearAuthError: () => void;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string, phone?: string, role?: string) => Promise<boolean>;
    logout: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const AppContextProvider = ({ children }: Props) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [loading, setLoading] = useState<boolean>(true);
    const [isAuthModalOpen, setAuthModalOpen] = useState<boolean>(false);
    const [authError, setAuthError] = useState<string | null>(null);

    const applyAuth = (token: string, user: UserType) => {
        localStorage.setItem("token", token);
        setToken(token);
        setUser(user);
        setAuthError(null);
    };

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            const { data } = await api.post("/api/auth/login", { email, password });
            applyAuth(data.token, data.user);
            return true;
        } catch (err: any) {
            setAuthError(err?.response?.data?.message || "Login failed");
            return false;
        }
    };

    const register = async (
        name: string,
        email: string,
        password: string,
        phone?: string,
        role?: string
    ): Promise<boolean> => {
        try {
            const { data } = await api.post("/api/auth/register", {
                name,
                email,
                password,
                phone,
                role,
            });
            applyAuth(data.token, data.user);
            return true;
        } catch (err: any) {
            setAuthError(err?.response?.data?.message || "Registration failed");
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        window.location.href = "/";
    };

    useEffect(() => {
        const loadUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const { data } = await api.get("/api/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(data.user);
            } catch {
                localStorage.removeItem("token");
                setToken(null);
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, [token]);

    const value: AppContextType = {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        isAuthModalOpen,
        setAuthModalOpen,
        authError,
        clearAuthError: () => setAuthError(null),
        login,
        register,
        logout,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppContextProvider");
    }
    return context;
};
