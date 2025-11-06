import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function ProfileEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatarFile: null
  });
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        const u = res.data;
        setFormData({
          name: u.name,
          email: u.email,
          phone: u.phone,
          address: u.address,
          avatarFile: null
        });
        if (u.avatar?.url) setAvatarPreview(u.avatar.url);
      } catch(err) {
        console.error("Fetch for edit failed", err);
      }
    };
    getUser();
  }, [id]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === "avatarFile" && files.length > 0) {
      setFormData(prev => ({ ...prev, avatarFile: files[0] }));
      setAvatarPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    if (formData.avatarFile) data.append("avatar", formData.avatarFile);

    try {
      await API.put(`/users/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      navigate(`/profile/${id}`);
    } catch(err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded p-2"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium">Profile Picture</label>
          <input
            type="file"
            name="avatarFile"
            accept="image/*"
            onChange={handleChange}
            className="mt-1"
          />
          {avatarPreview && (
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="mt-2 h-24 w-24 object-cover rounded-full"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
