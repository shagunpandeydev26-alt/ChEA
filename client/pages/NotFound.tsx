import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold mb-4 text-chea-red">404</h1>
          <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
          <p className="text-sm text-gray-500 mb-8">{location.pathname}</p>
          <Link
            to="/"
            className="inline-block bg-chea-red hover:bg-chea-red-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
