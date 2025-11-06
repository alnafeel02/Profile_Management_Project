import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import CreateProfilePage from "../pages/CreateProfilePage";
import ProfileViewPage from "../pages/ProfileViewPage";
import ProfileEditPage from "../pages/ProfileEditPage";
import Navbar from "../components/Navbar";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
         <Route path="/create-profile" element={<CreateProfilePage />} />  
        <Route path="/profile/:id" element={<ProfileViewPage />} />
        <Route path="/profile/edit/:id" element={<ProfileEditPage />} />
      </Routes>
    </Router>
  );
}
