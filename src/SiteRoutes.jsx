// SiteRoutes.js

import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PagesNotFound from "./pages/PagesNotFound";
import AddDetection from "./pages/AddDetection";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import UserDetections from "./pages/UserDetections";
import UserData from "./pages/UserData";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import MainLayout from "./components/MainLayout";
import AuthLayout from "./components/AuthLayout";
import DetectionDetails from "./pages/DetectionDetails";
import Success from "./pages/Success";

function SiteRoutes({ user }) {
  return (
    <Routes>
      
      <Route path="/" element={<Home/>}/>

      
      
      <Route path="/" element={<AuthLayout/>}>
      <Route path="/giris_yap" element={<Login />} />
      <Route path="/kayıt_ol" element={<SignUp />} />
      <Route path="/parola_yenile" element={<ForgotPassword />} />
      </Route>
      
      <Route path="/" element={<MainLayout/>}>
      <Route path="/tespit_ekle" element={<AddDetection/>} />
      <Route path="/tespit_eklendi" element={<Success/>} />
      <Route path="/tespitlerim" element={<UserDetections />} />
      <Route path="/tespitlerim/:tespitId" element={<DetectionDetails />} />
      <Route path="/kullanici_bilgileri" element={<UserData  />} />
      
      </Route>
      
{/* 
      <Route path="/tespit_ekle" element={ <PrivateRoute user={user}> <AddDetection user={user} /> </PrivateRoute>}/>
      <Route path="/tespitlerim" element={ <PrivateRoute user={user}> <UserDetections user={user} /> </PrivateRoute>}/>
      <Route path="/kullanici_bilgileri" element={ <PrivateRoute user={user}> <UserData user={user} /> </PrivateRoute>}/> */}


      <Route path="*" element={<PagesNotFound />} />
    </Routes>
  );
}

export default SiteRoutes;
