import { useState } from "react";

function About() {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div className="relative w-full h-screen">
      {/* Background Video */}
      <video
        className="fixed top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={() => setVideoEnded(true)}
      >
        <source src="" type="video/mp4" />
      </video>

      {/* Overlay & Content */}
      <div
        className={`fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center 
          transition-opacity duration-700 ${videoEnded ? "bg-black/70 opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-white text-5xl font-bold mb-4">About Us</h1>
        <p className="text-white text-lg text-center max-w-3xl px-4">
          Welcome to our platform! We are dedicated to providing top-notch learning experiences and engaging content.
        </p>
      </div>
    </div>
  );
}

export default About;
