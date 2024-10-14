import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import config from './config/configurl';

const Upload = () => {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const navigate = useNavigate();

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(`${config.URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload successful!');
      setUploadSuccessful(true);
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  const handleViewGallery = () => {
    navigate('/gallery');
  };

  return (
    <div className="container">
      <h2>UPLOAD A PHOTO</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
      {uploadSuccessful && (
        <button onClick={handleViewGallery}>View Gallery</button>
      )}
    </div>
  );
};

export default Upload;
