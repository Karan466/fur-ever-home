import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const MyDonations = () => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem("access-token");

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/campaigns/donations/my/${user?.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDonations(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load donations");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchDonations();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-orange-500">
        Loading your donations...
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          My Donations ❤️
        </h1>
        <p className="text-slate-600 mb-8">
          Track all your donation payments in one place.
        </p>

        {donations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">
              No donations yet
            </h2>
            <p className="text-slate-500">
              Once you donate to a campaign, it will appear here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow">
            <table className="min-w-full text-left">
              <thead className="bg-orange-100 text-slate-700">
                <tr>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Donor Email</th>
                  <th className="px-6 py-4">Payment ID</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((donation) => (
                  <tr
                    key={donation._id}
                    className="border-b border-orange-100 hover:bg-orange-50"
                  >
                    <td className="px-6 py-4 font-semibold text-orange-500">
                      ₹{donation.amount}
                    </td>
                    <td className="px-6 py-4">{donation.donorEmail}</td>
                    <td className="px-6 py-4">
                      {donation.razorpay_payment_id || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(donation.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyDonations;