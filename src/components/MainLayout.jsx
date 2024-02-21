// MainLayout.js

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function MainLayout ({children}) {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
      return <h1>Loading...</h1>;
  }

  // Kullanıcı oturumu yoksa giriş yapma sayfasına yönlendir
  if (!user) {
      return <Navigate to="/giris_yap" replace />;
  }

  return <Outlet/>
  
}

export default MainLayout;
