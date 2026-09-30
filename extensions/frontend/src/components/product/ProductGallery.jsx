import React, { useState } from 'react';

export const ProductGallery = ({ product }) => {
  const images = product?.thumbnails || [product?.image];
  const [activeImage, setActiveImage] = useState(images[0] || product?.image);
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: 'center center', transform: 'scale(1)' });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: 'scale(1.4)'
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: 'center center',
      transform: 'scale(1)'
    });
  };

  return (
    <div className="gallery-container">
      <div
        className="gallery-main"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={activeImage}
          alt={product?.name}
          style={zoomStyle}
        />
      </div>

      <div className="gallery-thumbs">
        {images.map((imgUrl, idx) => (
          <div
            key={idx}
            className={`gallery-thumb ${activeImage === imgUrl ? 'active' : ''}`}
            onClick={() => setActiveImage(imgUrl)}
          >
            <img src={imgUrl} alt={`${product?.name} thumbnail ${idx + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};
