import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const PetDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pets/${id}`);
        setPet(res.data);
      } catch (error) {
        console.log("Error fetching pet details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleAdopt = async () => {
    if (!user) {
      alert("Please login first to adopt a pet.");
      return;
    }

    const token = localStorage.getItem("access-token");

    const adoptionData = {
      petId: pet._id,
      petOwnerEmail: pet.ownerEmail,
      applicantName: user.displayName || "Anonymous User",
      applicantEmail: user.email,
      phone: "9876543210",
      address: "Patna, Bihar",
      message: "I would love to adopt this pet and provide a caring home.",
      status: "pending",
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/adoptions`,
        adoptionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Adoption request sent successfully 🐾");
    } catch (error) {
      console.log("Adoption request error:", error);
     toast.error("Failed to send adoption request");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-2xl font-semibold text-orange-500">Loading pet details...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="text-center py-20">
        <h2 className="text-3xl font-bold text-red-500">Pet not found</h2>
        <Link
          to="/pets"
          className="inline-block mt-6 bg-orange-500 text-white px-6 py-3 rounded-xl"
        >
          Back to Pets
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 bg-white shadow-xl rounded-3xl overflow-hidden">
        {/* Left Image */}
        <div className="relative">
          <img
            src={pet.petImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt={pet.petName}
            className="w-full h-full min-h-125 object-cover"
          />

          <span
            className={`absolute top-5 left-5 px-4 py-2 text-sm font-semibold rounded-full ${
              pet.adopted
                ? "bg-red-100 text-red-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {pet.adopted ? "Already Adopted" : "Available for Adoption"}
          </span>
        </div>

        {/* Right Info */}
        <div className="p-8 lg:p-10 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            {pet.petName}
          </h1>

          <p className="text-lg text-slate-600 mb-6">
            {pet.breed || "Unknown Breed"}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8 text-sm md:text-base">
            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="font-semibold text-slate-700">Category</p>
              <p>{pet.category || "N/A"}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="font-semibold text-slate-700">Age</p>
              <p>{pet.age || "N/A"}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="font-semibold text-slate-700">Gender</p>
              <p>{pet.gender || "N/A"}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="font-semibold text-slate-700">Location</p>
              <p>{pet.location || "N/A"}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="font-semibold text-slate-700">Vaccinated</p>
              <p>{pet.vaccinated ? "Yes" : "No"}</p>
            </div>

            <div className="bg-orange-50 p-4 rounded-xl">
              <p className="font-semibold text-slate-700">Owner</p>
              <p>{pet.ownerName || "N/A"}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              About {pet.petName}
            </h3>
            <p className="text-slate-600 leading-7">
              {pet.description || "No description available."}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-slate-800 mb-2">
              Medical History
            </h3>
            <p className="text-slate-600 leading-7">
              {pet.medicalHistory || "No medical history provided."}
            </p>
          </div>

          <button
            onClick={handleAdopt}
            disabled={pet.adopted}
            className={`w-full py-4 rounded-2xl text-lg font-semibold transition ${
              pet.adopted
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }`}
          >
            {pet.adopted ? "Already Adopted" : "Adopt / Got this Pet 🐾"}
          </button>

          {message && (
            <p className="mt-4 text-center text-sm font-medium text-green-600">
              {message}
            </p>
          )}

          <Link
            to="/pets"
            className="mt-6 text-center text-orange-500 font-semibold hover:underline"
          >
            ← Back to All Pets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;