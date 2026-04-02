import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const CampaignDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [campaign, setCampaign] = useState(null);
  const [donation, setDonation] = useState("");
  const [loading, setLoading] = useState(true);
  const [donating, setDonating] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/campaigns/${id}`
        );
        setCampaign(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load campaign");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handleDonate = async () => {
    if (!user) {
      return toast.error("Please login first");
    }

    if (!donation || Number(donation) <= 0) {
      return toast.error("Enter valid amount");
    }

    try {
      setDonating(true);
      const token = localStorage.getItem("access-token");

      // Step 1: Create order from backend
      const { data: order } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/campaigns/create-order`,
        {
          amount: Number(donation),
          campaignId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "FurEver Home",
        description: `Donation for ${campaign.title}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/campaigns/verify-payment`,
              {
                ...response,
                campaignId: id,
                donorName: user.displayName || "Anonymous",
                donorEmail: user.email,
                amount: Number(donation),
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (verifyRes.data.success) {
              setCampaign((prev) => ({
                ...prev,
                donatedAmount: verifyRes.data.donatedAmount,
              }));

              setDonation("");
              toast.success("Payment successful ❤️");
            }
          } catch (error) {
            console.log(error);
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: user.displayName || "",
          email: user.email || "",
        },
        theme: {
          color: "#f97316",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log(error);
      toast.error("Payment failed to start");
    } finally {
      setDonating(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl text-orange-500">
        Loading campaign...
      </div>
    );
  }

  if (!campaign) {
    return <div className="text-center py-20">Campaign not found</div>;
  }

  const donated = campaign.donatedAmount || 0;
  const target = campaign.maxDonation || 0;
  const percentage =
    target > 0 ? Math.min((donated / target) * 100, 100) : 0;

  return (
    <div className="bg-orange-50 min-h-screen p-6 md:p-10">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
        <img
          src={campaign.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt={campaign.title}
          className="w-full h-80 object-cover"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            {campaign.title}
          </h1>

          <p className="text-slate-600 mb-6">{campaign.description}</p>

          <div className="mb-6">
            <div className="w-full bg-orange-100 h-4 rounded-full">
              <div
                className="bg-orange-500 h-4 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>

            <div className="flex justify-between mt-2 text-sm">
              <p>Raised: ₹{donated}</p>
              <p>Goal: ₹{target}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <input
              type="number"
              placeholder="Enter amount"
              value={donation}
              onChange={(e) => setDonation(e.target.value)}
              className="input"
            />

            <button
              onClick={handleDonate}
              disabled={donating}
              className={`px-6 rounded-xl text-white ${
                donating
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              {donating ? "Processing..." : "Donate ❤️"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;