import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PagesNotFound from "./pages/PagesNotFound";
import AddDetection from "./pages/AddDetection";
import Home from "./pages/Home";
import UserDetections from "./pages/UserDetections";
import UserData from "./pages/UserData";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import MainLayout from "./components/MainLayout";


import Success from "./pages/Success";
import DetailedInfo from "./pages/DetailedInfo";

function SiteRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detayli_bilgi" element={<DetailedInfo />} />
      <Route path="*" element={<PagesNotFound />} />

      
        <Route path="/giris_yap" element={<Login />} />
        <Route path="/kayit_ol" element={<SignUp />} />
        <Route path="/parola_yenile" element={<ForgotPassword />} />
      

      <Route path="/" element={<MainLayout />}>
        <Route path="/tespit_ekle" element={<AddDetection />} />
        <Route path="/tespit_eklendi" element={<Success />} />
        <Route path="/tespitlerim" element={<UserDetections />} />

        <Route path="/kullanici_bilgileri" element={<UserData />} />
      </Route>
    </Routes>
  );
}

export default SiteRoutes;
