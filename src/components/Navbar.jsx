import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Navbar() {
  const [user] = useAuthState(auth);

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Çıkış Yapıldı");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/");
  };

  return (
    <>
      <div
        className="jumbotron text-center mb-0"
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          id="img1"
          alt="Resim Bulunamadi"
          src="https://fotograf.bursa.com.tr/galeri/2016/02/BESYOL-KAVSAGI-RENDER-1-1024x713.jpg"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: "0",
            left: "0",
            zIndex: "0",
          }}
        />
        <div
          className="şehiryazi"
          style={{
            position: "absolute",
            top: "170px",
            left: "400px",
            zIndex: "1",
          }}
        >
          <img
            width="500px"
            height="100px"
            src="https://www.bursa.bel.tr/assets/images/logo_beyaz_varsa_yoksa.png"
          />
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        data-bs-theme="dark"
        style={{ backgroundColor: "#0d4e92" }}
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            Yol Bozuklukları Tespit Uygulaması
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Ana Sayfa
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tespit_ekle">
                    Tespit Ekle
                  </NavLink>
                </li>
              )}
              {user ? (
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {user.displayName}
                  </a>
                  <ul className="dropdown-menu bg-primary">
                    <li>
                      <NavLink className="dropdown-item" to="/tespitlerim">
                        Tespitlerim
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/kullanici_bilgileri"
                      >
                        Kullanıcı Bilgileri
                      </NavLink>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item btn"
                        style={{ backgroundColor: "#456b96" }}
                        onClick={handleLogOut}
                        to="/giris_yap"
                      >
                        Çıkış Yap
                      </NavLink>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/giris_yap">
                      Giriş Yap
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/kayit_ol">
                      Kayıt Ol
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
