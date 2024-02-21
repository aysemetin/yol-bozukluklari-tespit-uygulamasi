import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // useNavigate ile güncellendi
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db , storage} from "../firebase";
import { useAuthState } from 'react-firebase-hooks/auth'
import {auth} from '../firebase'
import { Form, Button, Alert } from 'react-bootstrap';


function AddDetection() {
  const { id } = useParams();
  const navigate = useNavigate(); // useNavigate kullanımı eklendi
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [otherLocation, setOtherLocation] = useState("");
  const [address, setAddress] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  
  const [photoError, setPhotoError] = useState(false); // Yeni durum değişkeni

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
    if (event.target.value === "Diğer") {
      setSubmitButtonDisabled(true);
    } else {
      setSubmitButtonDisabled(false);
    }
  };

  const handleOtherLocationChange = (event) => {
    setOtherLocation(event.target.value);
    if (event.target.value.trim() !== "") {
      setSubmitButtonDisabled(false);
    } else {
      setSubmitButtonDisabled(true);
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setImages(imagesArray);
    setSelectedImages(files);
    setPhotoError(false); // Fotoğraf hatasını sıfırla
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (selectedImages.length < 1) {
        setPhotoError(true); // Eğer fotoğraf yoksa hatayı ayarla
        return;
      }

      // Upload images to Firebase Storage
      const imageUrls = [];
      for (const image of selectedImages) {
        const storageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(storageRef, image);
        const downloadUrl = await getDownloadURL(storageRef);
        imageUrls.push(downloadUrl);
      }

      // Add detection data to Firestore
      await addDoc(collection(db, "detections"), {
        title,
        location: location === "Diğer" ? otherLocation : location,
        address,
        images: imageUrls,
        userUID: userUID // Kullanıcı kimliğini belgeye ekleyin
      });
      console.log("Döküman başarıyla eklendi");

      // Reset form fields after successful submission
      setTitle("");
      setLocation("");
      setOtherLocation("");
      setAddress("");
      setImages([]);
      setSelectedImages([]);
      
      navigate('/tespit_eklendi'); 
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const [user, isLoading] = useAuthState(auth);
  console.log(user.uid);
  const userUID = user.uid;
  if(isLoading) {
    return( 
      <h1>Loading...</h1>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Tespit Ekle</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Başlık</Form.Label>
          <Form.Control
            type="text"
            placeholder="Tespit için uygun başlık belirtiniz"
            value={title}
            onChange={handleTitleChange}
          />
          <Form.Text className="text-muted">
            Örneğin: Asfalt Çatlaması
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Konum</Form.Label>
          <Form.Select value={location} onChange={handleLocationChange}>
            <option value="">Uygun Olanı Seçiniz</option>
            <option value="Anayol">Anayol</option>
            <option value="Cadde">Cadde</option>
            <option value="Sokak">Sokak</option>
            <option value="Kaldırım">Kaldırım</option>
            <option value="Park">Park</option>
            <option value="Diğer">Diğer</option>
          </Form.Select>
          {location === "Diğer" && (
            <Form.Label className="mt-2">Lütfen konumu belirtiniz</Form.Label>
          )}
          {location === "Diğer" && (
            <Form.Control
              type="text"
              placeholder="Konumu belirtiniz"
              value={otherLocation}
              onChange={handleOtherLocationChange}
            />
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Adres</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Detaylı adres bilgilerini giriniz"
            value={address}
            onChange={handleAddressChange}
            maxLength={200}
            style={{ height: "100px", resize: "none", textAlign: "left" }}
          />
          
        </Form.Group>

        <Form.Group className="mb-3" controlId="images">
          <Form.Label>
            Fotoğraflar (En az 1 adet fotoğraf eklemeniz gerekmektedir)
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          {photoError && ( // Fotoğraf hatası kontrolü
            <Alert variant="danger" className="mt-2">
              En az 1 adet fotoğraf eklemeniz gerekmektedir.
            </Alert>
          )}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index + 1}`}
              className="img-thumbnail mt-2"
              style={{ width: "150px", height: "auto" }}
            />
          ))}
        </Form.Group>

        <Button variant="primary" type="submit" disabled={submitButtonDisabled}>
          Gönder
        </Button>
      </Form>
      
      
      <div style={{height: "200px"}}></div>
    </div>
  );
}

export default AddDetection;
