import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ProfileViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError("");

     
        const res = await API.get(`/api/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 animate-pulse">Loading profile…</div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back Home
        </button>
      </div>
    );

  if (!user)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">No user found.</p>
      </div>
    );

  
  const avatarSrc = user?.avatar?.url || user?.avatar || "/placeholder-avatar.png";

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
         
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="text-lg font-semibold text-gray-800">Profile</div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="text-sm px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                Home
              </button>
              <button
                onClick={() => navigate(`/profile/edit/${id}`)}
                className="text-sm px-3 py-1 rounded-md bg-blue-600 hover:bg-blue-700 text-white"
              >
                Edit
              </button>
            </div>
          </div>

         
          <div className="p-6">
            <div className="flex items-center gap-5">
              <img
                src={avatarSrc}
                alt={user.name || "Avatar"}
                className="h-32 w-32 rounded-full object-cover border border-gray-100 shadow-sm"
              />
              <div>
                <h2 className="text-2xl font-medium text-gray-900">{user.name || "Unnamed"}</h2>
                <p className="text-sm text-gray-500 mt-1">{user.email || "No email provided"}</p>
                <div className="mt-3 text-sm text-gray-600">
                  {user.bio || user.about || ""}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                <div className="text-xs text-gray-400">Phone</div>
                <div className="mt-1 text-gray-800">{user.phone || "—"}</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-md border border-gray-100">
                <div className="text-xs text-gray-400">Address</div>
                <div className="mt-1 text-gray-800">{user.address || "—"}</div>
              </div>
            </div>

          </div>

         
        </div>
      </div>
    </div>
  );
}
