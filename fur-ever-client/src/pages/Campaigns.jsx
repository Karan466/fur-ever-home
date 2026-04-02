import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/campaigns`);
        setCampaigns(res.data);
      } catch (error) {
        console.log("Error fetching campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-2xl font-semibold text-orange-500">
          Loading campaigns...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">
          Donation Campaigns ❤️
        </h1>
        <p className="text-slate-600 text-lg">
          Support pets who need treatment, rescue, and care.
        </p>
      </div>

      {campaigns.length === 0 ? (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-2xl font-bold text-slate-700 mb-2">
            No campaigns available yet
          </h2>
          <p className="text-slate-500">
            Once users create donation campaigns, they’ll appear here.
          </p>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.map((campaign) => {
            const donated = campaign.donatedAmount || 0;
            const target = campaign.maxDonation || 0;
            const percentage = target > 0 ? Math.min((donated / target) * 100, 100) : 0;

            return (
              <div
                key={campaign._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={campaign.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
                  alt={campaign.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">
                    {campaign.title}
                  </h2>

                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {campaign.description}
                  </p>

                  <div className="mb-3">
                    <div className="w-full bg-orange-100 rounded-full h-3">
                      <div
                        className="bg-orange-500 h-3 rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-slate-700 mb-5">
                    <p>Raised: ₹{donated}</p>
                    <p>Goal: ₹{target}</p>
                  </div>

                  <Link to={`/campaigns/${campaign._id}`}>
  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
    View Details
  </button>
</Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Campaigns;