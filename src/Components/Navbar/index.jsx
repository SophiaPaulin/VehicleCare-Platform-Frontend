import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigation = useNavigate();

    const logout = () => {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            localStorage.removeItem(token);
            localStorage.clear();
            navigation("/login");
        }
        navigation("/login");
        return;
    };

    return (
        <nav className="navbar bg-primary topbar mb-4 static-top shadow justify-content-end">
            <button className="btn btn-default text-white" onClick={logout}>
                Logout
            </button>
        </nav>
    );
}
