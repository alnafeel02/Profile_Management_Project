import React, { useState } from "react";
import api from "../services/api"; 
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    if (avatar) data.append("avatar", avatar);

    try {
      const res = await api.post("/api/users", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const createdUser = res.data;
      console.log("Created Profile:", createdUser);
      setMessage("Profile created successfully!");
      localStorage.setItem("userId", createdUser._id);
      
      
        navigate(`/profile/${createdUser._id}`);
    } catch (err) {
      console.error(err);
      setMessage("Error creating profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Create Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            value={formData.name}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            value={formData.phone}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            value={formData.address}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
          />

          <div className="flex flex-col items-center">
            <label className="font-semibold text-gray-700">Upload Avatar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-2"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-24 h-24 object-cover rounded-full border"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Profile
          </button>
        </form>
        {message && <p className="text-center mt-4 text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default CreateProfile;
