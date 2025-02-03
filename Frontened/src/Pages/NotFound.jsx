function NotFound() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-400 py-16 px-4 sm:px-8 text-center">
        <section className="text-center mb-16">
          <h1 className="text-6xl sm:text-7xl font-bold text-yellow-300 mb-6">
            Oops! Page Not Found
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 mb-6 max-w-3xl mx-auto">
            The page you are looking for doesn't exist or has been moved. Please check the URL or return to the homepage.
          </p>
        </section>
  
        {/* Image or illustration */}
        <section className="mb-12">
          <img
            src="/path_to_404_image.svg" // Replace with a custom image path or vector
            alt="404 illustration"
            className="w-full max-w-[500px] mx-auto mb-8"
          />
        </section>
  
        {/* Button to redirect to Home */}
        <section>
          <Link
            to="/"
            className="bg-yellow-300 text-gray-700 py-3 px-8 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300"
          >
            Go Back to Homepage
          </Link>
        </section>
      </div>
    );
  }
  
  export default NotFound;
  