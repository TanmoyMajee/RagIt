
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext"; // Uncomment if using AuthContext

const Header = () => {
  // const { user, logout } = useContext(AuthContext); // Use this if you have AuthContext
  const user = 'sdf'; // Replace with real user logic

  return (
    <div className="flex items-center justify-between bg-blue-700 px-6 py-3 shadow-md">
      {/* Logo + Text */}
      <Link to="/" className="text-2xl font-bold text-white tracking-wide">
        RagIT
      </Link>

      <div className="flex items-center space-x-6">
        <div className="text-white text-lg font-medium hover:text-teal-200 transition-colors cursor-pointer">
          Pricing
        </div>

        {user ? (
          <div className="flex space-x-3">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition-colors ${isActive
                  ? "bg-teal-600 text-white"
                  : "bg-teal-200 text-teal-900 hover:bg-teal-300"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-semibold transition-colors ${isActive
                  ? "bg-blue-600 text-white"
                  : "bg-blue-200 text-blue-900 hover:bg-blue-300"
                }`
              }
            >
              Signup
            </NavLink>
          </div>
        ) : (
          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
          // onClick={logout} // Uncomment if using AuthContext
          >
            LogOut
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;