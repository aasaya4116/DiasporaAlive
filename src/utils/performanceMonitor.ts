/**
 * Performance monitoring utilities for Diaspora Alive
 * Tracks loading times, resource usage, and user experience metrics
 */

import { analytics } from './analytics';

export interface PerformanceEntry {
  name: string;
  startTime: number;
  duration: number;
  type: 'navigation' | 'resource' | 'measure' | 'custom';
}

export interface ResourceTiming {
  name: string;
  duration: number;
  transferSize: number;
  type: string;
}

class PerformanceMonitor {
  private observers: PerformanceObserver[] = [];
  private customTimers: Map<string, number> = new Map();

  constructor() {
    this.initializeObservers();
  }

  private initializeObservers(): void {
    // Observe navigation timing
    if ('PerformanceObserver' in window) {
      try {
        const navObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'navigation') {
              this.handleNavigationTiming(entry as PerformanceNavigationTiming);
            }
          });
        });
        navObserver.observe({ entryTypes: ['navigation'] });
        this.observers.push(navObserver);
      } catch (error) {
        console.warn('Navigation timing observer not supported:', error);
      }

      // Observe resource timing
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            if (entry.entryType === 'resource') {
              this.handleResourceTiming(entry as PerformanceResourceTiming);
            }
          });
        });
        resourceObserver.observe({ entryTypes: ['resource'] });
        this.observers.push(resourceObserver);
      } catch (error) {
        console.warn('Resource timing observer not supported:', error);
      }

      // Observe largest contentful paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          if (lastEntry) {
            analytics.trackPerformance('largest_contentful_paint', lastEntry.startTime, 'content_load');
          }
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        this.observers.push(lcpObserver);
      } catch (error) {
        console.warn('LCP observer not supported:', error);
      }

      // Observe first input delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry: any) => {
            analytics.trackPerformance('first_input_delay', entry.processingStart - entry.startTime, 'content_load');
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
        this.observers.push(fidObserver);
      } catch (error) {
        console.warn('FID observer not supported:', error);
      }
    }
  }

  private handleNavigationTiming(entry: PerformanceNavigationTiming): void {
    // Track key navigation metrics
    const metrics = {
      dns_lookup: entry.domainLookupEnd - entry.domainLookupStart,
      tcp_connection: entry.connectEnd - entry.connectStart,
      request_response: entry.responseEnd - entry.requestStart,
      dom_processing: entry.domContentLoadedEventEnd - entry.responseEnd,
      page_load: entry.loadEventEnd - entry.fetchStart
    };

    Object.entries(metrics).forEach(([name, value]) => {
      if (value > 0) {
        analytics.trackPerformance(name, value, 'content_load');
      }
    });
  }

  private handleResourceTiming(entry: PerformanceResourceTiming): void {
    // Track resource loading performance
    const resourceType = this.getResourceType(entry.name);
    const duration = entry.responseEnd - entry.startTime;

    if (duration > 0) {
      analytics.trackPerformance(`${resourceType}_load`, duration, 'content_load');
    }

    // Track large resources that might impact performance
    if (entry.transferSize > 100000) { // > 100KB
      analytics.trackPerformance('large_resource_load', entry.transferSize, 'content_load');
    }
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'javascript';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image';
    if (url.includes('mapbox') || url.includes('tiles')) return 'map_tile';
    return 'other';
  }

  /**
   * Start a custom timer
   */
  startTimer(name: string): void {
    this.customTimers.set(name, performance.now());
  }

  /**
   * End a custom timer and track the duration
   */
  endTimer(name: string, category: 'map_load' | 'content_load' | 'image_load' | 'search_response' = 'content_load'): number {
    const startTime = this.customTimers.get(name);
    if (!startTime) {
      console.warn(`Timer '${name}' was not started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.customTimers.delete(name);

    analytics.trackPerformance(name, duration, category);
    return duration;
  }

  /**
   * Measure and track map loading performance
   */
  measureMapLoad(callback: () => Promise<void>): Promise<number> {
    return new Promise(async (resolve) => {
      const startTime = performance.now();
      
      try {
        await callback();
        const duration = performance.now() - startTime;
        analytics.trackMapLoad(duration);
        resolve(duration);
      } catch (error) {
        const duration = performance.now() - startTime;
        analytics.trackPerformance('map_load_error', duration, 'map_load');
        resolve(duration);
      }
    });
  }

  /**
   * Measure and track content loading performance
   */
  measureContentLoad(contentType: string, callback: () => Promise<void>): Promise<number> {
    return new Promise(async (resolve) => {
      const startTime = performance.now();
      
      try {
        await callback();
        const duration = performance.now() - startTime;
        analytics.trackContentLoad(contentType, duration);
        resolve(duration);
      } catch (error) {
        const duration = performance.now() - startTime;
        analytics.trackPerformance(`${contentType}_load_error`, duration, 'content_load');
        resolve(duration);
      }
    });
  }

  /**
   * Measure and track image loading performance
   */
  measureImageLoad(imageUrl: string, imageType: string = 'general'): Promise<{ duration: number; success: boolean }> {
    return new Promise((resolve) => {
      const startTime = performance.now();
      const img = new Image();
      
      img.onload = () => {
        const duration = performance.now() - startTime;
        analytics.trackImageLoad(imageType, duration, true);
        resolve({ duration, success: true });
      };
      
      img.onerror = () => {
        const duration = performance.now() - startTime;
        analytics.trackImageLoad(imageType, duration, false);
        resolve({ duration, success: false });
      };
      
      img.src = imageUrl;
    });
  }

  /**
   * Get current performance metrics
   */
  getCurrentMetrics(): any {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    return {
      navigation: navigation ? {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstByte: navigation.responseStart - navigation.fetchStart
      } : null,
      resources: {
        total: resources.length,
        totalSize: resources.reduce((sum, r) => sum + (r.transferSize || 0), 0),
        slowest: resources.reduce((slowest, r) => {
          const duration = r.responseEnd - r.startTime;
          return duration > slowest.duration ? { name: r.name, duration } : slowest;
        }, { name: '', duration: 0 })
      },
      memory: (performance as any).memory ? {
        used: (performance as any).memory.usedJSHeapSize,
        total: (performance as any).memory.totalJSHeapSize,
        limit: (performance as any).memory.jsHeapSizeLimit
      } : null
    };
  }

  /**
   * Monitor frame rate (FPS)
   */
  monitorFrameRate(duration: number = 5000): Promise<number> {
    return new Promise((resolve) => {
      let frames = 0;
      const startTime = performance.now();
      
      const countFrame = () => {
        frames++;
        const elapsed = performance.now() - startTime;
        
        if (elapsed < duration) {
          requestAnimationFrame(countFrame);
        } else {
          const fps = Math.round((frames * 1000) / elapsed);
          analytics.trackPerformance('frame_rate', fps, 'content_load');
          resolve(fps);
        }
      };
      
      requestAnimationFrame(countFrame);
    });
  }

  /**
   * Clean up observers
   */
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.customTimers.clear();
  }
}

// Create singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Convenience functions
export const startTimer = (name: string) => performanceMonitor.startTimer(name);
export const endTimer = (name: string, category?: 'map_load' | 'content_load' | 'image_load' | 'search_response') => 
  performanceMonitor.endTimer(name, category);
export const measureMapLoad = (callback: () => Promise<void>) => performanceMonitor.measureMapLoad(callback);
export const measureContentLoad = (contentType: string, callback: () => Promise<void>) => 
  performanceMonitor.measureContentLoad(contentType, callback);
export const measureImageLoad = (imageUrl: string, imageType?: string) => 
  performanceMonitor.measureImageLoad(imageUrl, imageType);