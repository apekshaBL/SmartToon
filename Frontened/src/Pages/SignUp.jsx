import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake, FaCamera } from "react-icons/fa";
import signupImage from "../assets/boyDore2.jpg";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
    studyYear: "",
    avatar: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const studyYears = ["KG1", "KG2", "1ST", "2ND", "3RD", "4TH", "5TH"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    console.log("Form Submitted", formDataToSend);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-yellow-300 to-orange-400 px-6">
      <div className="bg-white rounded-3xl shadow-2xl flex flex-col sm:flex-row w-full max-w-4xl overflow-hidden">
        <div className="w-full sm:w-1/2 h-72 sm:h-auto flex items-center justify-center bg-orange-200">
          <img src={signupImage} alt="SignUp" className="w-full h-full object-cover p-6" />
        </div>
        
        <div className="w-full sm:w-1/2 p-8 sm:p-10 bg-white flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold text-orange-600 text-center mb-2">Join the Fun! 🎉</h2>
          <p className="text-center text-gray-700 mb-6 font-medium">Sign up and start your adventure.</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col items-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile Preview" className="w-24 h-24 rounded-full shadow-md" />
              ) : (
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                  <FaUser size={40} />
                </div>
              )}
              <label className="mt-3 flex items-center gap-2 text-orange-500 cursor-pointer">
                <FaCamera />
                <span className="text-sm font-semibold">Upload Profile Image</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            <div className="flex items-center bg-gray-100 rounded-full p-3 shadow-md">
              <FaUser className="text-orange-500 mr-2" />
              <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Your Name" required className="w-full bg-transparent outline-none font-medium" />
            </div>

            <div className="flex items-center bg-gray-100 rounded-full p-3 shadow-md">
              <FaEnvelope className="text-orange-500 mr-2" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required className="w-full bg-transparent outline-none font-medium" />
            </div>

            <div className="flex items-center bg-gray-100 rounded-full p-3 shadow-md">
              <FaLock className="text-orange-500 mr-2" />
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a Password" required className="w-full bg-transparent outline-none font-medium" />
            </div>

            <div className="flex items-center bg-gray-100 rounded-full p-3 shadow-md">
              <FaBirthdayCake className="text-orange-500 mr-2" />
              <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age (0-11)" required className="w-full bg-transparent outline-none font-medium" />
            </div>

            <div className="bg-gray-100 rounded-full p-3 shadow-md">
              <select name="studyYear" value={formData.studyYear} onChange={handleChange} required className="w-full bg-transparent outline-none font-medium">
                <option value="" disabled>Select Study Year</option>
                {studyYears.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-full font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
              🚀 Sign Up Now!
            </button>
          </form>
          
          <p className="text-center text-gray-600 mt-5 font-semibold">
            Already have an account? {" "}
            <Link to="/login" className="text-orange-600 font-bold hover:underline">Log in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
