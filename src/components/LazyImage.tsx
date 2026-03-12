import React, { useState, useRef, useEffect } from 'react';
import { 
  getOptimizedImageUrl, 
  generatePlaceholder, 
  createLazyLoadObserver,
  type ImageOptimizationOptions 
} from '../utils/imageOptimization';
import { handleMediaError, createMediaFallback, logError } from '../utils/errorHandling';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  optimization?: ImageOptimizationOptions;
  placeholder?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Lazy loading image component with optimization and error handling
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  optimization = {},
  placeholder,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image URL
  const optimizedSrc = getOptimizedImageUrl(src, {
    width,
    height,
    ...optimization
  });

  // Generate placeholder
  const placeholderSrc = placeholder || generatePlaceholder(
    width || 400, 
    height || 300, 
    '#f0f0f0'
  );

  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = createLazyLoadObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  // Load image when in view
  useEffect(() => {
    if (!isInView || isLoaded) return;

    const img = new Image();
    
    img.onload = () => {
      setCurrentSrc(optimizedSrc);
      setIsLoaded(true);
      onLoad?.();
    };
    
    img.onerror = () => {
      const mediaError = handleMediaError(optimizedSrc, 'image');
      logError(mediaError, { alt, width, height });
      
      // Try fallback image
      const fallback = createMediaFallback({ id: 'fallback', alt, type: 'image' });
      setCurrentSrc(fallback.url);
      onError?.(new Error('Image load failed'));
    };
    
    img.src = optimizedSrc;
  }, [isInView, isLoaded, optimizedSrc, alt, width, height, onLoad, onError]);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? currentSrc : placeholderSrc}
      alt={alt}
      className={`lazy-image ${className} ${isLoaded ? 'loaded' : 'loading'}`}
      width={width}
      height={height}
      loading="lazy"
      style={{
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.7,
        backgroundColor: '#f0f0f0'
      }}
      onError={() => {
        if (isLoaded) {
          const mediaError = handleMediaError(currentSrc, 'image');
          logError(mediaError, { alt, width, height });
        }
      }}
    />
  );
};

/**
 * Image gallery component with lazy loading
 */
interface LazyImageGalleryProps {
  images: Array<{
    id: string;
    url: string;
    alt: string;
    caption?: string;
  }>;
  className?: string;
  imageClassName?: string;
  optimization?: ImageOptimizationOptions;
}

export const LazyImageGallery: React.FC<LazyImageGalleryProps> = ({
  images,
  className = '',
  imageClassName = '',
  optimization = { width: 400, height: 300, quality: 80 }
}) => {
  const [loadedCount, setLoadedCount] = useState(0);

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  return (
    <div className={`image-gallery ${className}`}>
      {images.map((image) => (
        <figure key={image.id} className="gallery-item">
          <LazyImage
            src={image.url}
            alt={image.alt}
            className={imageClassName}
            optimization={optimization}
            onLoad={handleImageLoad}
          />
          {image.caption && (
            <figcaption className="image-caption">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}
      
      {loadedCount < images.length && (
        <div className="loading-indicator">
          Loading images... ({loadedCount}/{images.length})
        </div>
      )}
    </div>
  );
};

export default LazyImage;