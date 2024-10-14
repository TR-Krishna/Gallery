import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './gal.css'; 
import config from './config/configurl';

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${config.URL}/gallery`);
        setImages(res.data);
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="gallery-container">
      <h2>Image Gallery</h2>
      <div className="gallery-grid">
        {images.length > 0 ? (
          images.map((url, index) => (
            <div key={index} className="gallery-item">
              <img src={url} alt={`Uploaded ${index}`} />
            </div>
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
