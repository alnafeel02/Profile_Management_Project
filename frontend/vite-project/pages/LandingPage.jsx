// src/pages/LandingPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function LandingPage() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userId");
    if (stored) {
      setUserId(stored);
    }
  }, []);

  const handleCreate = () => {
    navigate("/create-profile");
  };

  const handleView = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      alert("No profile found. Please create your profile first.");
      navigate("/create-profile");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MyProfileApp</h1>
      <p className="text-lg mb-8">
        Create your profile and upload a picture — then view it anytime.
      </p>
      { userId ? (
        <button
          onClick={handleView}
          className="bg-blue-500 text-white px-6 py-3 rounded-2xl hover:bg-blue-600"
        >
          View My Profile
        </button>
      ) : (
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-6 py-3 rounded-2xl hover:bg-green-600"
        >
          Create My Profile
        </button>
      )}
    </div>
  );
}
