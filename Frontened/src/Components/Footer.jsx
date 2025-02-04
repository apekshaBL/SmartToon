import { BsLinkedin, BsFacebook, BsInstagram, BsYoutube } from "react-icons/bs";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-orange-400 text-gray-700 py-10 px-6 shadow-md rounded-t-lg">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
        {/* Logo & Tagline */}
        <div>
          <Link to="/">
            <h2 className="text-3xl font-extrabold text-blue-500">SmartToon</h2>
          </Link>
          <p className="text-sm mt-2 text-gray-600">
            Learning made fun, with cartoons!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-500">Quick Links</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link to="/books" className="hover:text-blue-700">📚 Books</Link>
            </li>
            <li>
              <Link to="/videos" className="hover:text-blue-700">🎥 Videos</Link>
            </li>
            <li>
              <Link to="/games" className="hover:text-blue-700">🎮 Games</Link>
            </li>
            <li>
              <Link to="/leaderboard" className="hover:text-blue-700">🏆 Leaderboard</Link>
            </li>
            <li>
              <Link to="/parent-dashboard" className="hover:text-blue-700">👨‍👩‍👧 Parent Dashboard</Link>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-blue-500">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4 mt-3">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
              <BsLinkedin size={28} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">
              <BsFacebook size={28} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-500">
              <BsInstagram size={28} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-500">
              <BsYoutube size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 border-t border-gray-300 pt-4 text-gray-600">
        <p>&copy; {new Date().getFullYear()} SmartToon. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
