import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const AddCampaign = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddCampaign = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const campaignData = {
      createdBy: user?.email,
      title: form.title.value,
      image: form.image.value,
      description: form.description.value,
      maxDonation: parseInt(form.maxDonation.value),
      donatedAmount: 0,
      createdAt: new Date(),
    };

    try {
      const token = localStorage.getItem("access-token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/campaigns`,
        campaignData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.insertedId) {
        toast.success("Campaign created successfully ❤️");
        form.reset();
      }
    } catch (error) {
      console.log("Campaign creation error:", error);
      toast.error("Failed to create campaign");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-orange-50 min-h-screen p-6 md:p-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Create Donation Campaign 💰
        </h1>
        <p className="text-slate-600 mb-8">
          Start a donation campaign for pet rescue, treatment, or care.
        </p>

        <form onSubmit={handleAddCampaign} className="grid gap-4">
          <input
            name="title"
            placeholder="Campaign Title"
            className="input"
            required
          />

          <input
            name="image"
            placeholder="Campaign Image URL"
            className="input"
            required
          />

          <textarea
            name="description"
            placeholder="Describe why this campaign is needed..."
            className="input min-h-[140px]"
            required
          ></textarea>

          <input
            name="maxDonation"
            type="number"
            placeholder="Target Donation Amount"
            className="input"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`py-3 rounded-xl font-semibold transition ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {loading ? "Creating..." : "Create Campaign"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCampaign;