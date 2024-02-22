import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Card } from "react-bootstrap";

function UserDetections() {
  const [detections, setDetections] = useState([]);
  const [selectedDetection, setSelectedDetection] = useState(null);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!user || !user.uid) return;
  
    const fetchUserDetections = async () => {
      try {
        const detectionsRef = collection(db, "detections");
        const q = query(
          detectionsRef,
          where("userUID", "==", user.uid),
          orderBy("timestamp", "desc") 
        );
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
          <h2>Kullanıcı Tespitleri</h2>
          <ol className="list-group list-group-numbered">
            {detections.map((detection) => (
              <li
                key={detection.id}
                className="list-group-item d-flex justify-content-between align-items-start"
                onClick={() => handleDetectionSelect(detection.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    Tespit No: {detection.id.slice(0, 6)}
                  </div>
                  {detection.title}
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="col-md-8">
          {selectedDetection ? (
            <Card>
              <Card.Header style={{ backgroundColor: "lightblue" }}>
                <h3 className="card-title">{selectedDetection.title}</h3>
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  <strong>Konum:</strong> {selectedDetection.location}
                </Card.Text>
                <Card.Text>
                  <strong>Adres:</strong> {selectedDetection.address}
                </Card.Text>
                <div className="mb-3">
                  <strong>Fotoğraflar:</strong>
                  <div className="mb-3 d-flex flex-wrap">
                    {Array.isArray(selectedDetection.images) &&
                      selectedDetection.images.map((imageUrl, index) => (
                        <div key={index} className="mt-2">
                          <img
                            src={imageUrl}
                            alt={`Image ${index + 1}`}
                            className="img-thumbnail"
                            style={{ width: "150px", height: "auto" }}
                          />
                        </div>
                      ))}
                  </div>
                </div>
                <div>
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
                  <p className="text-muted mb-0">
                    Eklenme Tarihi : {new Date(selectedDetection.timestamp).toLocaleString()}
                  </p>
                </div>
              </Card.Body>
            </Card>
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
