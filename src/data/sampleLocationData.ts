import type { LocationData } from '../types/location';
import { loadLocationData, getLocationFromCache, AVAILABLE_LOCATIONS } from '../utils/dataLoader';

/**
 * Get location data with async loading and caching
 * @param locationId - The ID of the location to load
 * @returns Promise that resolves to LocationData or null if not found
 */
export const getLocationData = async (locationId: string): Promise<LocationData | null> => {
  return await loadLocationData(locationId);
};

/**
 * Get location data synchronously from cache (returns null if not cached)
 * @param locationId - The ID of the location to get from cache
 * @returns LocationData from cache or null if not cached
 */
export const getLocationDataSync = (locationId: string): LocationData | null => {
  return getLocationFromCache(locationId);
};

/**
 * Get list of all available location IDs
 * @returns Array of available location IDs
 */
export const getAvailableLocationIds = (): readonly string[] => {
  return AVAILABLE_LOCATIONS;
};

/**
 * Legacy sample data for backward compatibility - now loads from JSON files
 * @deprecated Use getLocationData() instead for async loading with caching
 */
export const sampleLocationData: Record<string, LocationData> = {};

// Initialize sample data by loading from JSON files
(async () => {
  try {
    for (const locationId of AVAILABLE_LOCATIONS) {
      const data = await loadLocationData(locationId);
      if (data) {
        sampleLocationData[locationId] = data;
      }
    }
  } catch (error) {
    console.error('Error initializing sample location data:', error);
  }
})();