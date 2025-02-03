import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import logo from "../assets/cartoon.png";
import { useDispatch, useSelector } from "react-redux";

function HomeLayout({ children }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Check if the user is logged in
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    // Logout function
    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-100 to-yellow-200">
            {/* Navbar */}
            <nav className="bg-orange-400 shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
                {/* Logo and Name */}
                <div className="flex items-center gap-3">
                    <Link to="/">
                        <img src={logo} alt="SmartToon Logo" className="w-12 h-12 rounded-full" />
                    </Link>
                    <Link to="/">
                        <h1 className="text-3xl font-extrabold text-blue-600">SmartToon</h1>
                    </Link>
                </div>

                {/* Authentication Buttons */}
                <div className="space-x-4">
                    {!isLoggedIn ? (
                        <>
                            <Link to="/login" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                                Sign In
                            </Link>
                            <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                                Sign Up
                            </Link>
                        </>
                    ) : (
                        <>
                            {role === 'ADMIN' && (
                                <Link to="/admin/dashboard" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                                    Admin Dashboard
                                </Link>
                            )}
                            <Link to="/profile" className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                                Profile
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 p-6">{children}</main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default HomeLayout;
