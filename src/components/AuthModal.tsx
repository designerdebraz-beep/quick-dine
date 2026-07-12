import { useAppContext } from "../context/AppContext.tsx";
import AuthForm from "./AuthForm.tsx";

export default function AuthModal() {
    const { isAuthModalOpen, setAuthModalOpen } = useAppContext();

    if (!isAuthModalOpen) return null;

    const handleClose = () => setAuthModalOpen(false);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="absolute inset-0" onClick={handleClose}></div>
            <AuthForm onClose={handleClose} />
        </div>
    );
}
