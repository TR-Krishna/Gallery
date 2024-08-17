import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import './styles.css';
import config from './config/configurl';

const Upload = () => {
  const [file, setFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function previewFiles(file)
  {
    const reader=new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend=()=>{
      console.log(imageUrl);
      setImageUrl(reader.result);
    }

  }
  const handleFileChange = (e) => {
    const file=(e.target.files[0]);
    setFile(file);
    console.log(file);

    previewFiles(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(`${config.URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload successful!');
      setImageUrl(res.data.url);
    } catch (err) {
      console.error('Error uploading image:', err);
    }
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
    </div>
  );
};

export default Upload;
