
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function MainLayout () {
  const [user, isLoading] = useAuthState(auth);

  if (isLoading) {
      return <h1>Loading...</h1>;
  }

  
  if (!user) {
      return <Navigate to="/giris_yap" replace />;
  }

  return <Outlet/>
  
}

export default MainLayout;
