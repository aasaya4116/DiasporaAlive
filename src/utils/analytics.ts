/**
 * Privacy-focused analytics for Diaspora Alive
 * Tracks key user interactions while respecting user privacy
 */

export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: number;
  sessionId: string;
}

export interface UserInteraction {
  type: 'country_click' | 'search' | 'share' | 'cultural_filter' | 'page_view' | 'time_spent';
  data: Record<string, any>;
  timestamp: number;
}

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  type: 'map_load' | 'content_load' | 'image_load' | 'search_response';
}

class AnalyticsManager {
  private sessionId: string;
  private startTime: number;
  private interactions: UserInteraction[] = [];
  private performanceMetrics: PerformanceMetric[] = [];
  private isEnabled: boolean = true;
  private batchSize: number = 10;
  private flushInterval: number = 30000; // 30 seconds
  private flushTimer: number | null = null;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.startTime = Date.now();
    this.initializeAnalytics();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private initializeAnalytics(): void {
    // Check if user has opted out of analytics
    const optOut = localStorage.getItem('diaspora_analytics_opt_out');
    if (optOut === 'true') {
      this.isEnabled = false;
      return;
    }

    // Track initial page view
    this.trackInteraction('page_view', {
      path: window.location.pathname,
      referrer: document.referrer,
      userAgent: navigator.userAgent.substring(0, 100) // Truncated for privacy
    });

    // Set up periodic flushing
    this.startFlushTimer();

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.flush();
    });

    // Track visibility changes for time spent calculation
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackTimeSpent();
      }
    });
  }

  private startFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    
    this.flushTimer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  /**
   * Track user interaction
   */
  trackInteraction(type: UserInteraction['type'], data: Record<string, any>): void {
    if (!this.isEnabled) return;

    const interaction: UserInteraction = {
      type,
      data: this.sanitizeData(data),
      timestamp: Date.now()
    };

    this.interactions.push(interaction);

    // Auto-flush if batch size reached
    if (this.interactions.length >= this.batchSize) {
      this.flush();
    }
  }

  /**
   * Track performance metric
   */
  trackPerformance(name: string, value: number, type: PerformanceMetric['type']): void {
    if (!this.isEnabled) return;

    const metric: PerformanceMetric = {
      name,
      value,
      timestamp: Date.now(),
      type
    };

    this.performanceMetrics.push(metric);
  }

  /**
   * Track country click interaction
   */
  trackCountryClick(countryId: string, countryName: string): void {
    this.trackInteraction('country_click', {
      countryId,
      countryName
    });
  }

  /**
   * Track search interaction
   */
  trackSearch(query: string, resultsCount: number, responseTime?: number): void {
    this.trackInteraction('search', {
      query: query.substring(0, 50), // Truncate for privacy
      resultsCount,
      responseTime
    });
  }

  /**
   * Track share interaction
   */
  trackShare(locationId: string, platform: string, success: boolean): void {
    this.trackInteraction('share', {
      locationId,
      platform,
      success
    });
  }

  /**
   * Track cultural filter usage
   */
  trackCulturalFilter(filters: string[], action: 'add' | 'remove' | 'clear'): void {
    this.trackInteraction('cultural_filter', {
      filters,
      action,
      filterCount: filters.length
    });
  }

  /**
   * Track time spent on page
   */
  trackTimeSpent(): void {
    const timeSpent = Date.now() - this.startTime;
    this.trackInteraction('time_spent', {
      duration: timeSpent,
      sessionId: this.sessionId
    });
  }

  /**
   * Track map loading performance
   */
  trackMapLoad(loadTime: number): void {
    this.trackPerformance('map_load_time', loadTime, 'map_load');
  }

  /**
   * Track content loading performance
   */
  trackContentLoad(contentType: string, loadTime: number): void {
    this.trackPerformance(`${contentType}_load_time`, loadTime, 'content_load');
  }

  /**
   * Track image loading performance
   */
  trackImageLoad(imageType: string, loadTime: number, success: boolean): void {
    this.trackPerformance(`${imageType}_load_time`, loadTime, 'image_load');
    this.trackInteraction('page_view', {
      imageType,
      loadTime,
      success
    });
  }

  /**
   * Sanitize data to remove sensitive information
   */
  private sanitizeData(data: Record<string, any>): Record<string, any> {
    const sanitized = { ...data };
    
    // Remove or truncate potentially sensitive fields
    if (sanitized.userAgent) {
      sanitized.userAgent = sanitized.userAgent.substring(0, 100);
    }
    
    if (sanitized.query && typeof sanitized.query === 'string') {
      sanitized.query = sanitized.query.substring(0, 50);
    }
    
    // Remove any fields that might contain PII
    delete sanitized.email;
    delete sanitized.phone;
    delete sanitized.address;
    
    return sanitized;
  }

  /**
   * Flush analytics data (send to analytics service)
   */
  private flush(): void {
    if (!this.isEnabled || (this.interactions.length === 0 && this.performanceMetrics.length === 0)) {
      return;
    }

    const payload = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      interactions: [...this.interactions],
      performanceMetrics: [...this.performanceMetrics],
      metadata: {
        userAgent: navigator.userAgent.substring(0, 100),
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        screenResolution: `${screen.width}x${screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`
      }
    };

    // In a real implementation, you would send this to your analytics service
    // For now, we'll store it locally and log it
    this.storeAnalyticsData(payload);

    // Clear the buffers
    this.interactions = [];
    this.performanceMetrics = [];
  }

  /**
   * Store analytics data locally (fallback/development)
   */
  private storeAnalyticsData(payload: any): void {
    try {
      const existingData = localStorage.getItem('diaspora_analytics_data');
      const analyticsData = existingData ? JSON.parse(existingData) : [];
      
      analyticsData.push(payload);
      
      // Keep only last 100 entries to prevent storage bloat
      if (analyticsData.length > 100) {
        analyticsData.splice(0, analyticsData.length - 100);
      }
      
      localStorage.setItem('diaspora_analytics_data', JSON.stringify(analyticsData));
      
      // Log for development
      if (import.meta.env.DEV) {
        console.log('Analytics data:', payload);
      }
    } catch (error) {
      console.warn('Failed to store analytics data:', error);
    }
  }

  /**
   * Get analytics summary for debugging
   */
  getAnalyticsSummary(): any {
    try {
      const data = localStorage.getItem('diaspora_analytics_data');
      if (!data) return null;
      
      const analyticsData = JSON.parse(data);
      const summary = {
        totalSessions: new Set(analyticsData.map((d: any) => d.sessionId)).size,
        totalInteractions: analyticsData.reduce((sum: number, d: any) => sum + d.interactions.length, 0),
        totalPerformanceMetrics: analyticsData.reduce((sum: number, d: any) => sum + d.performanceMetrics.length, 0),
        lastActivity: analyticsData[analyticsData.length - 1]?.timestamp
      };
      
      return summary;
    } catch (error) {
      console.warn('Failed to get analytics summary:', error);
      return null;
    }
  }

  /**
   * Allow users to opt out of analytics
   */
  optOut(): void {
    this.isEnabled = false;
    localStorage.setItem('diaspora_analytics_opt_out', 'true');
    
    // Clear existing data
    localStorage.removeItem('diaspora_analytics_data');
    
    // Stop flush timer
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
  }

  /**
   * Allow users to opt back in
   */
  optIn(): void {
    localStorage.removeItem('diaspora_analytics_opt_out');
    this.isEnabled = true;
    this.startFlushTimer();
  }

  /**
   * Check if analytics is enabled
   */
  isAnalyticsEnabled(): boolean {
    return this.isEnabled;
  }
}

// Create singleton instance
export const analytics = new AnalyticsManager();

// Convenience functions for common tracking scenarios
export const trackCountryClick = (countryId: string, countryName: string) => {
  analytics.trackCountryClick(countryId, countryName);
};

export const trackSearch = (query: string, resultsCount: number, responseTime?: number) => {
  analytics.trackSearch(query, resultsCount, responseTime);
};

export const trackShare = (locationId: string, platform: string, success: boolean) => {
  analytics.trackShare(locationId, platform, success);
};

export const trackCulturalFilter = (filters: string[], action: 'add' | 'remove' | 'clear') => {
  analytics.trackCulturalFilter(filters, action);
};

export const trackMapLoad = (loadTime: number) => {
  analytics.trackMapLoad(loadTime);
};

export const trackContentLoad = (contentType: string, loadTime: number) => {
  analytics.trackContentLoad(contentType, loadTime);
};

export const trackImageLoad = (imageType: string, loadTime: number, success: boolean) => {
  analytics.trackImageLoad(imageType, loadTime, success);
};