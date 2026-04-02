import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const AdoptionRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("access-token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/adoptions/owner/${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(res.data);
    } catch (error) {
      console.log("Error fetching adoption requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchRequests();
    }
  }, [user]);

  const handleStatusUpdate = async (id, petId, status) => {
    try {
      const token = localStorage.getItem("access-token");

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/adoptions/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (status === "accepted") {
        await axios.patch(
          `${import.meta.env.VITE_API_URL}/api/pets/adopt/${petId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, status } : req
        )
      );
    } catch (error) {
      console.log("Status update error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-2xl font-semibold text-orange-500">
          Loading adoption requests...
        </p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-3">
          Adoption Requests 📩
        </h1>
        <p className="text-slate-600 mb-8">
          Review people who want to adopt your pets.
        </p>

        {requests.length === 0 ? (
          <div className="bg-white p-10 rounded-2xl shadow text-center">
            <h2 className="text-2xl font-bold text-slate-700 mb-2">
              No adoption requests yet
            </h2>
            <p className="text-slate-500">
              When someone requests to adopt your pet, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {requests.map((req) => (
              <div
                key={req._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {req.applicantName}
                    </h2>
                    <p className="text-slate-600">{req.applicantEmail}</p>
                  </div>

                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      req.status === "accepted"
                        ? "bg-green-100 text-green-600"
                        : req.status === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {req.status || "pending"}
                  </span>
                </div>

                <div className="space-y-2 text-slate-600 mb-5">
                  <p>
                    <span className="font-semibold text-slate-800">Phone:</span>{" "}
                    {req.phone || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Address:</span>{" "}
                    {req.address || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Message:</span>{" "}
                    {req.message || "No message provided"}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleStatusUpdate(req._id, req.petId, "accepted")
                    }
                    disabled={req.status === "accepted"}
                    className={`w-full py-3 rounded-xl font-semibold transition ${
                      req.status === "accepted"
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      handleStatusUpdate(req._id, req.petId, "rejected")
                    }
                    disabled={req.status === "rejected"}
                    className={`w-full py-3 rounded-xl font-semibold transition ${
                      req.status === "rejected"
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600 text-white"
                    }`}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionRequests;