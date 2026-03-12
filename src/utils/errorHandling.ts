/**
 * Error handling utilities for content management
 */

export type ErrorType = 'network' | 'content' | 'validation' | 'media' | 'parsing';

export interface AppError {
  type: ErrorType;
  message: string;
  code?: string;
  details?: any;
  timestamp: Date;
  retryable: boolean;
}

export interface ErrorHandlerOptions {
  maxRetries?: number;
  retryDelay?: number;
  fallbackContent?: any;
  onError?: (error: AppError) => void;
}

/**
 * Create standardized error objects
 */
export function createError(
  type: ErrorType,
  message: string,
  options: {
    code?: string;
    details?: any;
    retryable?: boolean;
  } = {}
): AppError {
  return {
    type,
    message,
    code: options.code,
    details: options.details,
    timestamp: new Date(),
    retryable: options.retryable ?? false
  };
}

/**
 * Handle content loading errors with retry logic
 */
export async function withRetry<T>(
  operation: () => Promise<T>,
  options: ErrorHandlerOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    onError
  } = options;

  let lastError: AppError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error 
        ? createError('network', error.message, { retryable: true })
        : createError('network', 'Unknown error', { retryable: true });

      onError?.(lastError);

      if (attempt === maxRetries) {
        throw lastError;
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay * Math.pow(2, attempt)));
    }
  }

  throw lastError!;
}

/**
 * Handle content validation errors
 */
export function handleValidationError(
  locationId: string,
  validationErrors: string[]
): AppError {
  const error = createError(
    'validation',
    `Content validation failed for location: ${locationId}`,
    {
      code: 'VALIDATION_FAILED',
      details: { locationId, errors: validationErrors },
      retryable: false
    }
  );

  console.error('Content validation error:', error);
  return error;
}

/**
 * Handle media loading errors
 */
export function handleMediaError(
  mediaUrl: string,
  mediaType: 'image' | 'audio' | 'video'
): AppError {
  const error = createError(
    'media',
    `Failed to load ${mediaType}: ${mediaUrl}`,
    {
      code: 'MEDIA_LOAD_FAILED',
      details: { mediaUrl, mediaType },
      retryable: true
    }
  );

  console.warn('Media loading error:', error);
  return error;
}

/**
 * Handle content parsing errors
 */
export function handleParsingError(
  content: any,
  parseError: Error
): AppError {
  const error = createError(
    'parsing',
    `Failed to parse content: ${parseError.message}`,
    {
      code: 'PARSE_ERROR',
      details: { originalError: parseError.message, content },
      retryable: false
    }
  );

  console.error('Content parsing error:', error);
  return error;
}

/**
 * Handle network errors
 */
export function handleNetworkError(
  url: string,
  networkError: Error
): AppError {
  const error = createError(
    'network',
    `Network request failed: ${networkError.message}`,
    {
      code: 'NETWORK_ERROR',
      details: { url, originalError: networkError.message },
      retryable: true
    }
  );

  console.error('Network error:', error);
  return error;
}

/**
 * Error boundary for React components
 */
export class ContentErrorBoundary {
  private errors: Map<string, AppError> = new Map();
  private fallbacks: Map<string, any> = new Map();

  /**
   * Register error for a specific content item
   */
  registerError(contentId: string, error: AppError): void {
    this.errors.set(contentId, error);
    console.error(`Content error for ${contentId}:`, error);
  }

  /**
   * Register fallback content for a specific item
   */
  registerFallback(contentId: string, fallbackContent: any): void {
    this.fallbacks.set(contentId, fallbackContent);
  }

  /**
   * Get error for specific content
   */
  getError(contentId: string): AppError | undefined {
    return this.errors.get(contentId);
  }

  /**
   * Get fallback content for specific item
   */
  getFallback(contentId: string): any {
    return this.fallbacks.get(contentId);
  }

  /**
   * Check if content has error
   */
  hasError(contentId: string): boolean {
    return this.errors.has(contentId);
  }

  /**
   * Clear error for specific content
   */
  clearError(contentId: string): void {
    this.errors.delete(contentId);
  }

  /**
   * Clear all errors
   */
  clearAllErrors(): void {
    this.errors.clear();
  }

  /**
   * Get all errors
   */
  getAllErrors(): Map<string, AppError> {
    return new Map(this.errors);
  }
}

/**
 * Global error boundary instance
 */
export const globalErrorBoundary = new ContentErrorBoundary();

/**
 * Safe content loader with error handling
 */
export async function safeLoadContent<T>(
  contentId: string,
  loader: () => Promise<T>,
  fallbackContent?: T
): Promise<T | null> {
  try {
    // Check if we already have an error for this content
    if (globalErrorBoundary.hasError(contentId)) {
      const fallback = globalErrorBoundary.getFallback(contentId);
      return fallback || fallbackContent || null;
    }

    const content = await withRetry(loader, {
      maxRetries: 2,
      retryDelay: 1000,
      onError: (error) => globalErrorBoundary.registerError(contentId, error)
    });

    return content;
  } catch (error) {
    const appError = error instanceof Error 
      ? createError('content', error.message)
      : createError('content', 'Unknown content loading error');

    globalErrorBoundary.registerError(contentId, appError);

    // Register and return fallback content
    if (fallbackContent) {
      globalErrorBoundary.registerFallback(contentId, fallbackContent);
      return fallbackContent;
    }

    return null;
  }
}

/**
 * Create fallback content for missing location data
 */
export function createLocationFallback(locationId: string): any {
  return {
    id: locationId,
    name: locationId.charAt(0).toUpperCase() + locationId.slice(1),
    region: 'Unknown',
    coordinates: [0, 0],
    overview: {
      summary: 'Content temporarily unavailable. Please try again later.',
      historicalContext: 'Historical information is being updated.',
      populationStats: {
        population: 'N/A',
        percentage: 'N/A',
        historicalPeriod: 'N/A',
        keyFacts: ['Content is being updated']
      }
    },
    culturalElements: {
      music: [],
      food: [],
      religion: [],
      language: [],
      festivals: []
    },
    media: {
      featuredImage: {
        id: 'fallback',
        url: '/images/placeholder.jpg',
        alt: 'Content temporarily unavailable',
        type: 'image'
      },
      gallery: []
    },
    connections: {
      africanOrigins: [],
      relatedLocations: []
    }
  };
}

/**
 * Create fallback media asset
 */
export function createMediaFallback(originalAsset: any): any {
  return {
    id: originalAsset?.id || 'fallback',
    url: '/images/placeholder.jpg',
    alt: originalAsset?.alt || 'Image temporarily unavailable',
    caption: 'Content temporarily unavailable',
    type: originalAsset?.type || 'image'
  };
}

/**
 * Log error for analytics/monitoring
 */
export function logError(error: AppError, context?: any): void {
  const logData = {
    ...error,
    context,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'unknown'
  };

  // In production, this would send to error tracking service
  console.error('Application Error:', logData);

  // For development, also log to console with more detail
  const isDevelopment = typeof window !== 'undefined' && 
    (window as any).__DEV__ === true;
  
  if (isDevelopment) {
    console.group(`🚨 ${error.type.toUpperCase()} Error`);
    console.error('Message:', error.message);
    console.error('Code:', error.code);
    console.error('Details:', error.details);
    console.error('Retryable:', error.retryable);
    console.error('Timestamp:', error.timestamp);
    if (context) console.error('Context:', context);
    console.groupEnd();
  }
}

/**
 * Error recovery strategies
 */
export const ErrorRecovery = {
  /**
   * Attempt to recover from network errors
   */
  async recoverFromNetworkError(error: AppError): Promise<boolean> {
    if (error.type !== 'network' || !error.retryable) {
      return false;
    }

    // Check if we're back online
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return false;
    }

    // Simple connectivity test
    try {
      await fetch('/favicon.ico', { method: 'HEAD', cache: 'no-cache' });
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Recover from media loading errors
   */
  async recoverFromMediaError(error: AppError): Promise<string | null> {
    if (error.type !== 'media') {
      return null;
    }

    const { mediaUrl, mediaType } = error.details || {};
    
    // Try alternative CDN or format
    if (mediaUrl && mediaType === 'image') {
      // Convert to different format or size
      const fallbackUrl = mediaUrl.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      try {
        const response = await fetch(fallbackUrl, { method: 'HEAD' });
        if (response.ok) {
          return fallbackUrl;
        }
      } catch {
        // Fallback failed
      }
    }

    return null;
  }
};