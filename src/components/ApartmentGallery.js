import React, { useState } from 'react';
import '../components/ApartmentGallery.css';

function ApartmentGallery({ images }) {
  const [current, setCurrent] = useState(0);

  const nextImage = () => setCurrent((current + 1) % images.length);
  const prevImage = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="gallery-container">
      <button className="nav prev" onClick={prevImage}>‹</button>
      <img src={images[current]} alt={`Foto ${current + 1}`} className="gallery-image" />
      <button className="nav next" onClick={nextImage}>›</button>
      <div className="thumbnails">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumb ${index + 1}`}
            className={`thumbnail ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ApartmentGallery;
