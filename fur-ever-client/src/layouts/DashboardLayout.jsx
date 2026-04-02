import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-orange-50">
      <aside className="w-72 bg-white shadow-lg p-6 hidden md:block">
        <h2 className="text-3xl font-extrabold text-orange-500 mb-8">
          Dashboard
        </h2>

        <ul className="space-y-4 text-slate-700 font-medium">
          <li>
            <Link to="/dashboard" className="hover:text-orange-500 transition">
              Dashboard Home
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/add-pet"
              className="hover:text-orange-500 transition"
            >
              Add Pet
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/my-pets"
              className="hover:text-orange-500 transition"
            >
              My Pets
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/adoption-requests"
              className="hover:text-orange-500 transition"
            >
              Adoption Requests
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/add-campaign"
              className="hover:text-orange-500 transition"
            >
              Add Campaign
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/my-donations"
              className="hover:text-orange-500 transition"
            >
              My Donations
            </Link>
          </li>

          <li>
            <Link to="/" className="hover:text-orange-500 transition">
              Back to Home
            </Link>
          </li>
        </ul>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;