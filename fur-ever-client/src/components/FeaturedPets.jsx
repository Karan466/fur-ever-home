import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FeaturedPets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pets`);

        const latestPets = res.data
          .filter((pet) => !pet.adopted)
          .slice(0, 6);

        setPets(latestPets);
      } catch (error) {
        console.log("Error fetching featured pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <p className="text-orange-500 text-xl">Loading featured pets...</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-slate-800 mb-3">
          Featured Pets 🐾
        </h2>
        <p className="text-slate-600">
          Meet some of our newest friends waiting for a loving home.
        </p>
      </div>

      {pets.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h3 className="text-2xl font-bold text-slate-700 mb-2">
            No featured pets yet
          </h3>
          <p className="text-slate-500">
            Add some pets and they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={pet.petImage || "https://i.ibb.co/4pDNDk1/avatar.png"}
                alt={pet.petName}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold text-slate-800 mb-1">
                  {pet.petName}
                </h3>
                <p className="text-slate-600 mb-3">
                  {pet.breed || "Unknown Breed"}
                </p>

                <Link to={`/pets/${pet._id}`}>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link
          to="/pets"
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          View All Pets →
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPets;