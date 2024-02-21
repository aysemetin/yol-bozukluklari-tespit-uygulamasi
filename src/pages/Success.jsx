import React, { useState } from "react";
import { Alert } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Success() {
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    const handleCloseAlert = () => {
        setShowAlert(false);
        navigate("/"); // Ana sayfaya yönlendirme
    };

    return (
        <>
            <Alert
                variant="success"
                className="mt-3"
                show={showAlert}
                onClose={handleCloseAlert}
                dismissible
            >
                Tespitiniz incelemeye alınmıştır, ilgili birimlerle irtibata geçildikten
                sonra en kısa sürede tarafınıza bilgilendirme yapılacaktır.
            </Alert>
            <div style={{ height: "200px" }}></div>
        </>
    )
}

export default Success;
