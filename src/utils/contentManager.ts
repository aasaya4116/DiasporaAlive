/**
 * Content management utilities that integrate validation, optimization, and error handling
 */

import type { LocationData } from '../types/location';
import { loadLocationData, preloadLocations, AVAILABLE_LOCATIONS } from './dataLoader';
import { validateLocationData, hasMinimumContent } from './contentValidation';
import { getOptimizedImageUrl, preloadImages, type ImageOptimizationOptions } from './imageOptimization';
import { 
  globalErrorBoundary, 
  createLocationFallback
} from './errorHandling';

export interface ContentManagerOptions {
  preloadCriticalContent?: boolean;
  optimizeImages?: boolean;
  imageOptimization?: ImageOptimizationOptions;
  enableErrorRecovery?: boolean;
}

/**
 * Main content manager class
 */
export class ContentManager {
  private options: ContentManagerOptions;
  private criticalLocations: string[] = ['brazil', 'haiti', 'jamaica'];

  constructor(options: ContentManagerOptions = {}) {
    this.options = {
      preloadCriticalContent: true,
      optimizeImages: true,
      imageOptimization: { quality: 80, format: 'auto' },
      enableErrorRecovery: true,
      ...options
    };
  }

  /**
   * Initialize content manager
   */
  async initialize(): Promise<void> {
    try {
      if (this.options.preloadCriticalContent) {
        await this.preloadCriticalContent();
      }

      // Set up error recovery if enabled
      if (this.options.enableErrorRecovery) {
        this.setupErrorRecovery();
      }

      console.log('Content manager initialized successfully');
    } catch (error) {
      console.error('Failed to initialize content manager:', error);
    }
  }

  /**
   * Load location with full content management
   */
  async loadLocation(locationId: string): Promise<LocationData | null> {
    try {
      const location = await loadLocationData(locationId);
      
      if (!location) {
        return null;
      }

      // Optimize media assets if enabled
      if (this.options.optimizeImages) {
        this.optimizeLocationMedia(location);
      }

      return location;
    } catch (error) {
      console.error(`Failed to load location ${locationId}:`, error);
      return createLocationFallback(locationId);
    }
  }

  /**
   * Preload critical content for better performance
   */
  private async preloadCriticalContent(): Promise<void> {
    try {
      // Preload critical locations
      await preloadLocations(this.criticalLocations);

      // Preload critical images
      const criticalImages = await this.getCriticalImages();
      if (criticalImages.length > 0) {
        await preloadImages(criticalImages, (loaded, total) => {
          console.log(`Preloaded ${loaded}/${total} critical images`);
        });
      }
    } catch (error) {
      console.warn('Failed to preload critical content:', error);
    }
  }

  /**
   * Get critical images for preloading
   */
  private async getCriticalImages(): Promise<string[]> {
    const images: string[] = [];

    for (const locationId of this.criticalLocations) {
      try {
        const location = await loadLocationData(locationId);
        if (location?.media.featuredImage) {
          const optimizedUrl = getOptimizedImageUrl(
            location.media.featuredImage.url,
            this.options.imageOptimization
          );
          images.push(optimizedUrl);
        }
      } catch (error) {
        console.warn(`Failed to get critical images for ${locationId}:`, error);
      }
    }

    return images;
  }

  /**
   * Optimize media assets in location data
   */
  private optimizeLocationMedia(location: LocationData): void {
    // Optimize featured image
    if (location.media.featuredImage) {
      location.media.featuredImage.url = getOptimizedImageUrl(
        location.media.featuredImage.url,
        this.options.imageOptimization
      );
    }

    // Optimize gallery images
    location.media.gallery = location.media.gallery.map(asset => ({
      ...asset,
      url: getOptimizedImageUrl(asset.url, this.options.imageOptimization)
    }));

    // Optimize audio clips if present
    if (location.media.audioClips) {
      location.media.audioClips = location.media.audioClips.map(asset => ({
        ...asset,
        // Audio optimization would go here if needed
        url: asset.url
      }));
    }
  }

  /**
   * Set up error recovery mechanisms
   */
  private setupErrorRecovery(): void {
    // Listen for online/offline events
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        console.log('Connection restored, attempting error recovery');
        this.attemptErrorRecovery();
      });

      window.addEventListener('offline', () => {
        console.log('Connection lost, switching to offline mode');
      });
    }
  }

  /**
   * Attempt to recover from errors
   */
  private async attemptErrorRecovery(): Promise<void> {
    const errors = globalErrorBoundary.getAllErrors();
    
    for (const [contentId, error] of errors) {
      if (error.retryable) {
        try {
          // Attempt to reload the content
          await this.loadLocation(contentId);
          globalErrorBoundary.clearError(contentId);
          console.log(`Successfully recovered content for ${contentId}`);
        } catch (recoveryError) {
          console.warn(`Failed to recover content for ${contentId}:`, recoveryError);
        }
      }
    }
  }

  /**
   * Validate all available location content
   */
  async validateAllContent(): Promise<{
    valid: string[];
    invalid: string[];
    warnings: Map<string, string[]>;
  }> {
    const results = {
      valid: [] as string[],
      invalid: [] as string[],
      warnings: new Map<string, string[]>()
    };

    for (const locationId of AVAILABLE_LOCATIONS) {
      try {
        const location = await loadLocationData(locationId);
        
        if (location) {
          const validation = validateLocationData(location);
          
          if (validation.isValid) {
            results.valid.push(locationId);
            
            if (validation.warnings.length > 0) {
              results.warnings.set(locationId, validation.warnings);
            }
          } else {
            results.invalid.push(locationId);
            console.error(`Validation failed for ${locationId}:`, validation.errors);
          }
        } else {
          results.invalid.push(locationId);
        }
      } catch (error) {
        results.invalid.push(locationId);
        console.error(`Failed to validate ${locationId}:`, error);
      }
    }

    return results;
  }

  /**
   * Get content statistics
   */
  async getContentStatistics(): Promise<{
    totalLocations: number;
    loadedLocations: number;
    errorCount: number;
    contentQuality: Map<string, 'high' | 'medium' | 'low'>;
  }> {
    const stats = {
      totalLocations: AVAILABLE_LOCATIONS.length,
      loadedLocations: 0,
      errorCount: globalErrorBoundary.getAllErrors().size,
      contentQuality: new Map<string, 'high' | 'medium' | 'low'>()
    };

    for (const locationId of AVAILABLE_LOCATIONS) {
      try {
        const location = await loadLocationData(locationId);
        
        if (location) {
          stats.loadedLocations++;
          
          // Assess content quality
          const quality = this.assessContentQuality(location);
          stats.contentQuality.set(locationId, quality);
        }
      } catch (error) {
        // Location failed to load
      }
    }

    return stats;
  }

  /**
   * Assess content quality
   */
  private assessContentQuality(location: LocationData): 'high' | 'medium' | 'low' {
    let score = 0;

    // Check minimum content requirements
    if (hasMinimumContent(location)) {
      score += 3;
    }

    // Check cultural elements completeness
    const categories = ['music', 'food', 'religion', 'language', 'festivals'];
    const filledCategories = categories.filter(
      category => location.culturalElements[category as keyof typeof location.culturalElements]?.length > 0
    );
    
    if (filledCategories.length >= 4) score += 2;
    else if (filledCategories.length >= 2) score += 1;

    // Check media richness
    if (location.media.gallery.length >= 3) score += 2;
    else if (location.media.gallery.length >= 1) score += 1;

    // Check connections
    if (location.connections.africanOrigins.length > 0 && 
        location.connections.relatedLocations.length > 0) {
      score += 1;
    }

    // Determine quality level
    if (score >= 7) return 'high';
    if (score >= 4) return 'medium';
    return 'low';
  }

  /**
   * Clear all caches and reset
   */
  reset(): void {
    globalErrorBoundary.clearAllErrors();
    // Additional cleanup would go here
    console.log('Content manager reset');
  }
}

/**
 * Global content manager instance
 */
export const contentManager = new ContentManager();

/**
 * Initialize content management system
 */
export async function initializeContentManagement(
  options?: ContentManagerOptions
): Promise<ContentManager> {
  const manager = new ContentManager(options);
  await manager.initialize();
  return manager;
}

/**
 * Quick content validation utility
 */
export async function quickValidateContent(locationId: string): Promise<boolean> {
  try {
    const location = await loadLocationData(locationId);
    if (!location) return false;
    
    const validation = validateLocationData(location);
    return validation.isValid;
  } catch {
    return false;
  }
}