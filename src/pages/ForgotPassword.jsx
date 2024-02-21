import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = useCallback(
        (e) => {
            e.preventDefault();
            if (!email) {
                return;
            }
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Password reset email has been sent to your email.");
                })
                .catch((error) => {
                    alert("Error sending password reset email: " + error.message);
                });
        },
        [email]
    );

    return (
        <div className="container col-md-5 mt-5">
            <h2 className="text-center">Parolanızı mı unuttunuz?</h2>
            <form onSubmit={handleSubmit} className="row g-3 mt-4">
                <div className="col-12">
                    <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-danger">Parola sıfırlama maili gönder</button>
                </div>
                <div className="col-12">
                    <Link to="/giris_yap">Giriş Yap</Link>
                </div>
            </form>
            <div style={{height: "200px"}}></div>
        </div>
    );
};

export default ForgotPassword;
