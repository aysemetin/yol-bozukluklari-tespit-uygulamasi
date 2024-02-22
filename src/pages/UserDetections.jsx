import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function UserDetections() {
  const [detections, setDetections] = useState([]);
  const [selectedDetection, setSelectedDetection] = useState(null);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    const fetchUserDetections = async () => {
      if (!user) return; 

      try {
        const detectionsRef = collection(db, "detections");
        const q = query(detectionsRef, where("userUID", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const detectionData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDetections(detectionData);
      } catch (error) {
        console.error("Error fetching user detections: ", error);
      }
    };

    fetchUserDetections();
  }, [user]);

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  const handleDetectionSelect = (id) => {
    const selected = detections.find((detection) => detection.id === id);
    setSelectedDetection(selected);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <h2 className="text-center">Kullanıcı Tespitleri</h2>
          <ul className="list-group text-center">
            {detections.map((detection) => (
              <li
                key={detection.id}
                className="list-group-item"
                onClick={() => handleDetectionSelect(detection.id)}
                style={{ cursor: "pointer" }}
              >
                Tespit No: {detection.id.slice(0, 6)} - {detection.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-8">
          {selectedDetection ? (
            <div className="card">
              <div
                className="card-header"
                style={{ backgroundColor: "lightblue" }}
              >
                <h3 className="card-title"> {selectedDetection.title} </h3>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <strong>Konum:</strong> {selectedDetection.location}
                </p>
                <p className="card-text">
                  <strong>Adres:</strong> {selectedDetection.address}
                </p>
                <div className="mb-3">
                  <strong>Fotoğraflar:</strong>
                  {Array.isArray(selectedDetection.images) &&
                    selectedDetection.images.map((imageUrl, index) => (
                      <div key={index} className="mt-2">
                        <img
                          src={imageUrl}
                          alt={`Image ${index + 1}`}
                          className="img-thumbnail"
                          style={{ width: "150px", height: "auto" }}
                        />
                        <hr />
                        <p className="text-muted mt-3 mb-0">
                          Tespit No : {selectedDetection.id.slice(0, 6)}
                        </p>
                        <p className="text-muted mb-0">
                          Durum :{" "}
                          {selectedDetection.status
                            ? selectedDetection.status
                            : "İncelemeye alındı."}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-info">Tespit seçilmedi</div>
          )}
        </div>
      </div>
      <div style={{ height: "200px" }}></div>
    </div>
  );
}

export default UserDetections;
