import React, { useState, useCallback } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!email || !password) {
        setError("E-posta ve şifre gereklidir.");
        return;
      }
      signInWithEmailAndPassword(auth, email, password).catch((e) => {
        setError("Kullanıcı adı veya şifre hatalı.");
        console.error(e);
      });
    },
    [email, password]
  );

  return (
    <>
      <div className="container col-md-5 mt-5">
        <h1 className="text-center">Giriş Yap</h1>

        <form onSubmit={handleSubmit} className="row g-3 mt-4">
          <div className="col-12">
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="E-posta"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="col-12">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          {error && (
            <div className="col-12">
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            </div>
          )}
          <div className="col-12">
            <Link to="/parola_yenile" className="text-end d-block">
              Parolanızı mı unuttunuz?
            </Link>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Giriş Yap
            </button>
          </div>
          <div className="col-12">
            <Link to="/kayit_ol">Kayıt olmak için tıklayınız</Link>
          </div>
        </form>
      </div>
      <div style={{ height: "200px" }}></div>
    </>
  );
};

export default Login;
