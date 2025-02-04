import { Link, useNavigate } from "react-router-dom";
import cartoon from "../assets/lala.png";



function NotFound() {
    const navigate=useNavigate();
  return (
    <div className="h-screen w-screen bg-gradient-to-b from-blue-100 to-blue-400 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Heading Section */}
      <section className="animate-float">
        <h1 className="text-5xl sm:text-6xl font-bold text-yellow-300 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
          The page you are looking for doesn't exist or has been moved.
        </p>
      </section>

      {/* Floating Image with Hover Effect */}
      <section className="relative mt-6">
        <div className="relative w-72 sm:w-80 mx-auto group">
          <img
            src={cartoon}
            alt="404 illustration"
            className="w-full max-h-[300px] object-contain rounded-lg shadow-lg transition-all duration-300 transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg"></div>
        </div>
      </section>
      <button className="bg-yellow-300 text-gray-700 py-2 px-6 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300  mt-6 animate-float"
         onClick={()=>navigate(-1)}>
          Go back
       </button>
      {/* Floating Animation */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 3s infinite ease-in-out;
          }
        `}
      </style>

    </div>
  );
}

export default NotFound;
