import { Link } from "react-router-dom";
import { useState, useRef } from "react";

function AboutUs() {
  const [videoEnded, setVideoEnded] = useState(false); // To track if the video has ended
  const videoRef = useRef(null); // To reference the video element

  const handleVideoEnd = () => {
    setVideoEnded(true); // Set videoEnded to true when the video finishes
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-400 py-16 px-4 sm:px-8">
      {/* Section 1: Title */}
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-yellow-300 mb-6">
          Welcome to SmartToon
        </h1>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
          At SmartToon, we combine learning and entertainment through educational cartoons. Our goal is to make learning enjoyable and engaging for children.
        </p>
      </section>

      {/* Section 2: Video */}
      <section className="text-center mb-16">
        <div className="flex justify-center mb-12">
          {!videoEnded ? (
            <video
              ref={videoRef}
              className="max-w-full sm:max-w-[95%] lg:max-w-[80%] max-h-[600px] aspect-video object-cover rounded-lg shadow-lg"
              controls
              onEnded={handleVideoEnd} // Trigger handleVideoEnd when the video finishes
            >
              <source src="/vedio1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="max-w-full sm:max-w-[95%] lg:max-w-[80%] max-h-[600px] aspect-video">
              {/* Display some other content after the video ends */}
              <div className="text-xl font-semibold text-gray-700">
                <p className="mb-4">Thanks for watching the video!</p>
                <p className="text-lg text-blue-500">
                  Explore more educational cartoons and start learning today!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 3: Information about SmartToon */}
      <section className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-blue-500 mb-4">Why Choose SmartToon?</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-3xl mx-auto">
          SmartToon is an innovative platform designed to blend creativity with learning. Our engaging cartoons encourage curiosity, critical thinking, and creativity, all while making education fun!
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-xl rounded-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-blue-50">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Educational Cartoons</h3>
            <p className="text-base sm:text-lg text-gray-700">
              Our cartoons cover various subjects to make learning engaging for kids of all ages.
            </p>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-blue-50">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Creative Learning</h3>
            <p className="text-base sm:text-lg text-gray-700">
              Nurturing creativity by introducing kids to imaginative characters and scenarios.
            </p>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-lg transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-blue-50">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4">Interactive Features</h3>
            <p className="text-base sm:text-lg text-gray-700">
              Quizzes, games, and activities accompany our cartoons to further engage young minds.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Call to Action */}
      <section className="text-center mb-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-yellow-300 mb-4">Ready to Explore SmartToon?</h2>
        <p className="text-base sm:text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Join SmartToon today and dive into a world of fun-filled educational cartoons. Start your journey now and discover how learning can be fun!
        </p>
        <Link
          to="/signup"
          className="bg-yellow-300 text-gray-700 py-3 px-8 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300"
        >
          Create Your Account
        </Link>
      </section>
    </div>
  );
}

export default AboutUs;
