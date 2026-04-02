import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const MyPets = () => {
  const { user } = useAuth();
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyPets = async () => {
    try {
      const token = localStorage.getItem("access-token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/pets/my/${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMyPets(res.data);
    } catch (error) {
      console.log("Error fetching my pets:", error);
      toast.error("Failed to load your pets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyPets();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pet?");

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access-token");

      await axios.delete(`${import.meta.env.VITE_API_URL}/api/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMyPets(myPets.filter((pet) => pet._id !== id));
      toast.success("Pet deleted successfully 🗑️");
    } catch (error) {
      console.log("Delete error:", error);
      toast.error("Failed to delete pet");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-2xl font-semibold text-orange-500">
          Loading your pets...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          My Added Pets 🐾
        </h1>
        <p className="text-slate-600 mb-8">
          Manage all the pets you’ve listed for adoption.
        </p>

        {myPets.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">
              No pets added yet
            </h2>
            <p className="text-slate-500">
              Start by adding your first pet for adoption.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {myPets.map((pet) => (
              <div
                key={pet._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="relative">
                  <img
                    src={pet.petImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
                    alt={pet.petName}
                    className="w-full h-56 object-cover"
                  />

                  <span
                    className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full ${
                      pet.adopted
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {pet.adopted ? "Adopted" : "Available"}
                  </span>
                </div>

                <div className="p-5">
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">
                    {pet.petName}
                  </h2>
                  <p className="text-slate-600 mb-3">
                    {pet.breed || "Unknown Breed"}
                  </p>

                  <div className="space-y-2 text-sm text-slate-600 mb-5">
                    <p>
                      <span className="font-semibold text-slate-800">Category:</span>{" "}
                      {pet.category || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Age:</span>{" "}
                      {pet.age || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Gender:</span>{" "}
                      {pet.gender || "N/A"}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-800">Location:</span>{" "}
                      {pet.location || "N/A"}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleDelete(pet._id)}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-semibold transition"
                    >
                      Delete
                    </button>

                    <button
                      disabled
                      className="w-full bg-gray-200 text-gray-600 py-3 rounded-xl font-semibold cursor-not-allowed"
                    >
                      Edit (Next)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPets;