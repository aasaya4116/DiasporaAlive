/**
 * Image optimization and lazy loading utilities
 */

export interface ImageOptimizationOptions {
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'auto';
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * Generate optimized image URL using URL parameters
 * This works with services like Cloudinary, ImageKit, or custom optimization services
 */
export function getOptimizedImageUrl(
  originalUrl: string, 
  options: ImageOptimizationOptions = {}
): string {
  try {
    const url = new URL(originalUrl);
    
    // Default optimization settings
    const {
      quality = 80,
      format = 'auto',
      width,
      height,
      fit = 'cover'
    } = options;

    // For Unsplash images, use their built-in optimization
    if (url.hostname.includes('unsplash.com')) {
      const params = new URLSearchParams();
      
      if (width) params.set('w', width.toString());
      if (height) params.set('h', height.toString());
      if (quality !== 80) params.set('q', quality.toString());
      if (fit !== 'cover') params.set('fit', fit);
      if (format !== 'auto') params.set('fm', format);
      
      // Add auto optimization
      params.set('auto', 'format,compress');
      
      const existingParams = url.search;
      const separator = existingParams ? '&' : '?';
      
      return `${originalUrl}${separator}${params.toString()}`;
    }

    // For other services, return original URL
    // In a real implementation, you'd add support for other CDNs
    return originalUrl;
    
  } catch (error) {
    console.warn('Failed to optimize image URL:', error);
    return originalUrl;
  }
}

/**
 * Generate responsive image srcset for different screen densities
 */
export function generateResponsiveSrcSet(
  originalUrl: string,
  baseWidth: number
): string {
  const densities = [1, 1.5, 2, 3];
  
  return densities
    .map(density => {
      const width = Math.round(baseWidth * density);
      const optimizedUrl = getOptimizedImageUrl(originalUrl, { width });
      return `${optimizedUrl} ${density}x`;
    })
    .join(', ');
}

/**
 * Generate sizes attribute for responsive images
 */
export function generateSizesAttribute(breakpoints: { [key: string]: string }): string {
  const entries = Object.entries(breakpoints);
  
  return entries
    .map(([mediaQuery, size], index) => {
      // Last entry should not have media query (default size)
      if (index === entries.length - 1) {
        return size;
      }
      return `${mediaQuery} ${size}`;
    })
    .join(', ');
}

/**
 * Preload critical images for better performance
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    
    img.src = src;
  });
}

/**
 * Preload multiple images with progress tracking
 */
export async function preloadImages(
  urls: string[], 
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  let loaded = 0;
  const total = urls.length;

  const promises = urls.map(async (url) => {
    try {
      await preloadImage(url);
      loaded++;
      onProgress?.(loaded, total);
    } catch (error) {
      console.warn(`Failed to preload image: ${url}`, error);
      loaded++;
      onProgress?.(loaded, total);
    }
  });

  await Promise.all(promises);
}

/**
 * Create intersection observer for lazy loading
 */
export function createLazyLoadObserver(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
): IntersectionObserver {
  const defaultOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(callback);
  }, defaultOptions);
}

/**
 * Generate placeholder image data URL
 */
export function generatePlaceholder(
  width: number = 400, 
  height: number = 300, 
  color: string = '#f0f0f0'
): string {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    // Fallback SVG placeholder
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="${color}"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">Loading...</text>
      </svg>
    `)}`;
  }

  canvas.width = width;
  canvas.height = height;
  
  // Fill with background color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  // Add loading text
  ctx.fillStyle = '#999';
  ctx.font = '16px Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Loading...', width / 2, height / 2);
  
  return canvas.toDataURL();
}

/**
 * Check if WebP format is supported
 */
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalFormat(): Promise<'webp' | 'jpeg'> {
  const webpSupported = await supportsWebP();
  return webpSupported ? 'webp' : 'jpeg';
}

/**
 * Calculate image dimensions maintaining aspect ratio
 */
export function calculateAspectRatioDimensions(
  originalWidth: number,
  originalHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  const aspectRatio = originalWidth / originalHeight;
  
  let width = maxWidth;
  let height = maxWidth / aspectRatio;
  
  if (height > maxHeight) {
    height = maxHeight;
    width = maxHeight * aspectRatio;
  }
  
  return {
    width: Math.round(width),
    height: Math.round(height)
  };
}

/**
 * Lazy loading hook for React components
 */
export function useLazyImage(src: string, options: { threshold?: number; rootMargin?: string } = {}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = createLazyLoadObserver(
      (entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [options.threshold, options.rootMargin]);

  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image();
      
      img.onload = () => {
        setIsLoaded(true);
        setError(null);
      };
      
      img.onerror = () => {
        setError('Failed to load image');
      };
      
      img.src = src;
    }
  }, [isInView, isLoaded, src]);

  return { imgRef, isLoaded, isInView, error };
}

// Note: React hooks need to be imported in actual implementation
// This is a placeholder for the hook structure
function useState<T>(initial: T): [T, (value: T) => void] {
  // Placeholder - would use actual React.useState
  return [initial, () => {}];
}

function useRef<T>(initial: T | null): { current: T | null } {
  // Placeholder - would use actual React.useRef
  return { current: initial };
}

function useEffect(effect: () => void | (() => void), deps?: any[]): void {
  // Placeholder - would use actual React.useEffect
}