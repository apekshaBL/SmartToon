import { Link, useNavigate } from "react-router-dom";
import cartoonBg from "../assets/allinone.png"; // Add a fun cartoon background image
import HomeLayout from "../Layouts/HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import AboutUs from "./AboutUs";


function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.role);

    return (
        <HomeLayout>
            <div
                className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center transition-all duration-300"
                style={{ backgroundImage: `url(${cartoonBg})` }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 transition-all duration-300 hover:bg-opacity-60"></div>

                {/* Content */}
                <div className="relative text-center text-white p-8">
                    <h1 className="text-5xl font-extrabold drop-shadow-md animate-bounce">
                        "Learn with Cartoons, Explore the Fun!"
                    </h1>
                    <p className="mt-4 text-lg text-yellow-300 font-medium">
                        Interactive lessons, fun stories, and engaging games for young minds.
                    </p>

                    {/* Show "Get Started" link for non-logged-in users */}
                    {!isLoggedIn && (
                        <Link
                            to="/signup"
                            className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
                        >
                            Get Started
                        </Link>
                    )}

                    {/* If logged in and user is admin, show link to Admin Dashboard */}
                    {isLoggedIn && role === 'admin' && (
                        <Link
                            to="/admin/dashboard"
                            className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
                        >
                            Admin Dashboard
                        </Link>
                    )}

                    {/* If logged in and user is not admin, show profile link */}
                    {isLoggedIn && role !== 'admin' && (
                        <Link
                            to="/profile"
                            className="mt-6 inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-xl font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
                        >
                            Go to Profile
                        </Link>
                    )}
                </div>
            </div>
            <AboutUs/>
        </HomeLayout>
    );
}

export default HomePage;
