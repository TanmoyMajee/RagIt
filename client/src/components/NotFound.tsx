// pages/NotFound.jsx (or any route-based component)

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg text-center min-w-[400px]">
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Page Not Found</p>
        <Link to={'/'}
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
