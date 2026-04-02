import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser().catch((error) => console.log(error));
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-orange-500 font-semibold"
      : "text-slate-700 hover:text-orange-500 transition";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-orange-500">
          FurEver Home 🐾
        </Link>

        <div className="flex items-center gap-5 text-sm md:text-base">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/pets" className={navLinkClass}>
            Pets
          </NavLink>
          <NavLink to="/campaigns" className={navLinkClass}>
            Campaigns
          </NavLink>

          {user ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>

              <div className="flex items-center gap-3">
                <img
                  src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt="user"
                  className="w-9 h-9 rounded-full object-cover border"
                />
                <button
                  onClick={handleLogout}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;