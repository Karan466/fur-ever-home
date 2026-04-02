import useAuth from "../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();

  return (
    <div className="bg-orange-50 min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              alt="User"
              className="w-24 h-24 rounded-full object-cover border-4 border-orange-200"
            />

            <div>
              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Welcome, {user?.displayName || "User"} 👋
              </h1>
              <p className="text-slate-600">
                Manage your pets, adoption requests, and donation campaigns from here.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-3xl font-bold text-orange-500 mb-2">🐾</h2>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Manage Pets</h3>
            <p className="text-slate-600">
              Add new pets and manage the ones you’ve already listed.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-3xl font-bold text-orange-500 mb-2">📩</h2>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Adoption Requests</h3>
            <p className="text-slate-600">
              Review who wants to adopt your pets and accept or reject requests.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-3xl font-bold text-orange-500 mb-2">❤️</h2>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Donation Campaigns</h3>
            <p className="text-slate-600">
              Create and manage campaigns for rescue, treatment, and pet care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;