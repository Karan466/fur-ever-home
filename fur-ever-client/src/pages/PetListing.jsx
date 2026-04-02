import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const PetListing = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/pets`);
        setPets(res.data);
      } catch (error) {
        console.log("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      const matchesSearch =
        pet.petName?.toLowerCase().includes(searchText.toLowerCase()) ||
        pet.breed?.toLowerCase().includes(searchText.toLowerCase()) ||
        pet.location?.toLowerCase().includes(searchText.toLowerCase());

      const matchesCategory =
        category === "All" ||
        pet.category?.toLowerCase() === category.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [pets, searchText, category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-2xl font-semibold text-orange-500">Loading pets...</p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen px-6 py-10">
      {/* Heading */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">
          Meet Pets Looking for a Home 🐾
        </h1>
        <p className="text-slate-600 text-lg">
          Browse loving pets and find your perfect companion.
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-10 grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Search by pet name, breed, or location..."
          className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300 bg-white"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <select
          className="w-full border border-orange-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-300 bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Bird">Bird</option>
          <option value="Rabbit">Rabbit</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="max-w-7xl mx-auto mb-6">
        <p className="text-slate-700 font-medium">
          Showing <span className="text-orange-500">{filteredPets.length}</span> pets
        </p>
      </div>

      {/* Pet Cards */}
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
            >
              <div className="relative">
                <img
                  src={pet.petImage}
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
                  <p>
                    <span className="font-semibold text-slate-800">Vaccinated:</span>{" "}
                    {pet.vaccinated ? "Yes" : "No"}
                  </p>
                </div>

                <Link to={`/pets/${pet._id}`}>
                  <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">
              No pets found 😿
            </h2>
            <p className="text-slate-500">
              Try changing your search or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetListing;