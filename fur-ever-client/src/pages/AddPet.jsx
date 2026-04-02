import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const AddPet = () => {
  const { user } = useAuth();
  const [success, setSuccess] = useState("");

  const handleAddPet = async (e) => {
    e.preventDefault();

    const form = e.target;

    const petData = {
      ownerEmail: user?.email,
      ownerName: user?.displayName,
      petName: form.petName.value,
      petImage: form.petImage.value,
      category: form.category.value,
      breed: form.breed.value,
      age: form.age.value,
      gender: form.gender.value,
      location: form.location.value,
      vaccinated: form.vaccinated.value === "yes",
      description: form.description.value,
      medicalHistory: form.medical.value,
    };

    try {
      const token = localStorage.getItem("access-token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/pets`,
        petData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.insertedId) {
        toast.success("Pet added successfully 🐾");
        form.reset();
      }
    } catch (err) {
      toast.error("Failed to add pet");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">
        Add a Pet 🐾
      </h2>

      <form onSubmit={handleAddPet} className="grid gap-4">
        <input name="petName" placeholder="Pet Name" className="input" required />
        <input name="petImage" placeholder="Image URL" className="input" required />
        <input name="category" placeholder="Category (Dog/Cat)" className="input" />
        <input name="breed" placeholder="Breed" className="input" />
        <input name="age" placeholder="Age" className="input" />
        <input name="gender" placeholder="Gender" className="input" />
        <input name="location" placeholder="Location" className="input" />

        <select name="vaccinated" className="input">
          <option value="yes">Vaccinated</option>
          <option value="no">Not Vaccinated</option>
        </select>

        <textarea name="description" placeholder="Description" className="input"></textarea>
        <textarea name="medical" placeholder="Medical History" className="input"></textarea>

        <button className="bg-orange-500 text-white py-3 rounded">
          Add Pet
        </button>
      </form>

      {success && <p className="text-green-600 mt-4">{success}</p>}
    </div>
  );
};

export default AddPet;