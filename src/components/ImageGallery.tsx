import React, { useState } from 'react';
import type { MediaAsset } from '../types/location';
import { measureImageLoad } from '../utils/performanceMonitor';
import './ImageGallery.css';

interface ImageGalleryProps {
  featuredImage: MediaAsset;
  gallery: MediaAsset[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ featuredImage, gallery }) => {
  const [selectedImage, setSelectedImage] = useState<MediaAsset | null>(null);
  const [imageError, setImageError] = useState<Set<string>>(new Set());

  const handleImageError = (imageId: string) => {
    setImageError(prev => new Set(prev).add(imageId));
  };

  const handleImageClick = (image: MediaAsset) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent, image: MediaAsset) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleImageClick(image);
    }
  };

  const handleModalKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  const renderImage = (image: MediaAsset, className: string = '') => {
    const hasError = imageError.has(image.id);
    
    if (hasError) {
      return (
        <div className={`image-placeholder ${className}`}>
          <div className="placeholder-content">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21,15 16,10 5,21"/>
            </svg>
            <p>Image unavailable</p>
          </div>
        </div>
      );
    }

    return (
      <img
        src={image.url}
        alt={image.alt}
        className={className}
        onError={() => handleImageError(image.id)}
        onLoad={() => {
          // Track image loading performance
          const imageType = className.includes('featured') ? 'featured' : 'gallery';
          measureImageLoad(image.url, imageType);
        }}
        loading="lazy"
      />
    );
  };

  return (
    <div className="image-gallery">
      {/* Featured Image */}
      <div className="featured-image-container">
        <div 
          className="featured-image-wrapper"
          onClick={() => handleImageClick(featuredImage)}
          onKeyDown={(e) => handleKeyDown(e, featuredImage)}
          tabIndex={0}
          role="button"
          aria-label={`View larger image: ${featuredImage.alt}`}
        >
          {renderImage(featuredImage, 'featured-image')}
          <div className="image-overlay">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {featuredImage.caption && (
          <p className="image-caption">{featuredImage.caption}</p>
        )}
      </div>

      {/* Gallery Grid */}
      {gallery.length > 0 && (
        <div className="gallery-section">
          <h4 className="gallery-title">Gallery</h4>
          <div className="gallery-grid">
            {gallery.map((image) => (
              <div 
                key={image.id}
                className="gallery-item"
                onClick={() => handleImageClick(image)}
                onKeyDown={(e) => handleKeyDown(e, image)}
                tabIndex={0}
                role="button"
                aria-label={`View larger image: ${image.alt}`}
              >
                {renderImage(image, 'gallery-image')}
                <div className="gallery-overlay">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="image-modal"
          onClick={handleCloseModal}
          onKeyDown={handleModalKeyDown}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-image-title"
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={handleCloseModal}
              aria-label="Close image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="modal-image-container">
              {renderImage(selectedImage, 'modal-image')}
            </div>
            
            {selectedImage.caption && (
              <div className="modal-caption">
                <h3 id="modal-image-title" className="sr-only">{selectedImage.alt}</h3>
                <p>{selectedImage.caption}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;