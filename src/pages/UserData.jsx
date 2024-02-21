import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const UserData = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, loading, authError] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setEmail(user.email);
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      alert("Profil güncellendi!");
    } catch (error) {
      console.error("Profil güncelleme hatası: ", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      alert("Şifre başarıyla güncellendi!");
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (authError) {
    return <h1>Bir hata oluştu: {authError.message}</h1>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center">Kullanıcı Bilgileri</h1>
      <div className="row justify-content-center mt-4">
        <div className="col-md-6">
          <form onSubmit={handleUpdateProfile} className="mb-5">
            <div className="mb-3">
              <label htmlFor="displayName" className="form-label">
                İsim Soyisim
              </label>
              <input
                type="text"
                className="form-control"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-posta
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                readOnly
              />
            </div>
            <button type="submit" className="btn btn-primary mb-3">
              Bilgileri Güncelle
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <form onSubmit={handleChangePassword}>
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Mevcut Şifre
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                Yeni Şifre
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary mb-3">
              Şifre Değiştir
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserData;
