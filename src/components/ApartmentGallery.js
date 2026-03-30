import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Maximize, X } from 'lucide-react';
import './ApartmentGallery.css';

function ApartmentGallery({ images }) {
  const [current, setCurrent] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const nextImage = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [nextImage, prevImage]);

  // Lock body scroll in fullscreen
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [fullscreen]);

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    setTouchStart(null);
  };

  return (
    <>
      <div className="gallery-container">
        <button className="gallery-nav gallery-prev" onClick={prevImage} aria-label="Previous image">
          <ChevronLeft size={28} />
        </button>

        <div
          className="gallery-main-image"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={images[current]}
            alt={`Foto ${current + 1}`}
            className="gallery-image"
            loading="lazy"
          />
          <button
            className="gallery-fullscreen-btn"
            onClick={() => setFullscreen(true)}
            aria-label="Fullscreen"
          >
            <Maximize size={20} />
          </button>
        </div>

        <button className="gallery-nav gallery-next" onClick={nextImage} aria-label="Next image">
          <ChevronRight size={28} />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="thumbnails">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Thumb ${index + 1}`}
            className={`thumbnail ${index === current ? 'active' : ''}`}
            onClick={() => setCurrent(index)}
            loading="lazy"
          />
        ))}
      </div>

      {/* Counter */}
      <div className="gallery-counter">
        {current + 1} / {images.length}
      </div>

      {/* Fullscreen Lightbox */}
      {fullscreen && (
        <div className="lightbox-overlay" onClick={() => setFullscreen(false)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setFullscreen(false)} aria-label="Close">
              <X size={28} />
            </button>
            <button className="lightbox-nav lightbox-prev" onClick={prevImage} aria-label="Previous">
              <ChevronLeft size={36} />
            </button>
            <img
              src={images[current]}
              alt={`Foto ${current + 1}`}
              className="lightbox-image"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            />
            <button className="lightbox-nav lightbox-next" onClick={nextImage} aria-label="Next">
              <ChevronRight size={36} />
            </button>
            <div className="lightbox-counter">
              {current + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ApartmentGallery;
