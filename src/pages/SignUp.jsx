import React, { useState, useCallback } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!email || !password) {
                return;
            }
            createUserWithEmailAndPassword(auth, email, password)
                .then((authUser) => {
                    updateProfile(authUser.user, { displayName: name });
                })
                .catch((error) => {
                    if (error.code === "auth/email-already-in-use") {
                        setError("Bu mail adresi ile kayıtlı bir kullanıcı mevcuttur.");
                    } else {
                        setError("Error creating new user: " + error.message);
                    }
                    console.error("Error creating new user: ", error);
                });
        },
        [name, email, password]
    );

    return (
        <div className="container col-md-5 mt-5">
            <h1 className="text-center">Yeni Hesap Oluştur</h1>
            <form onSubmit={handleSubmit} className="row g-3 mt-4">
                <div className="col-12">
                    <input
                        type="text"
                        className="form-control"
                        id="inputName"
                        placeholder="İsim Soyisim"
                        value={name}
                        onChange={(e) => setName(e.currentTarget.value)}
                    />
                </div>
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
                        placeholder="Parola"
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
                    <button type="submit" className="btn btn-success">Kayıt Ol</button>
                </div>
                <div className="col-12">
                    <Link to="/giris_yap">Zaten bir hesabınız var mı? Giriş Yap</Link>
                </div>
            </form>
            <div style={{height: "200px"}}></div>
        </div>
    );
};

export default SignUp;
