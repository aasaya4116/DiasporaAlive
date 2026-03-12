import type { LocationData } from '../types/location';
import { parseLocationData, validateLocationData, hasMinimumContent } from './contentValidation';
import { safeLoadContent, createLocationFallback, handleNetworkError, handleValidationError } from './errorHandling';

// Cache for loaded location data
const locationCache = new Map<string, LocationData>();
const loadingPromises = new Map<string, Promise<LocationData>>();

/**
 * Available location IDs that have JSON data files
 */
export const AVAILABLE_LOCATIONS = [
  'brazil',
  'haiti', 
  'jamaica',
  'colombia',
  'cuba'
] as const;

export type AvailableLocationId = typeof AVAILABLE_LOCATIONS[number];

/**
 * Check if a location ID has available data
 */
export function isLocationAvailable(locationId: string): locationId is AvailableLocationId {
  return AVAILABLE_LOCATIONS.includes(locationId as AvailableLocationId);
}

/**
 * Load location data from JSON file with caching and error handling
 */
export async function loadLocationData(locationId: string): Promise<LocationData | null> {
  // Check if location is available
  if (!isLocationAvailable(locationId)) {
    console.warn(`Location data not available for: ${locationId}`);
    return null;
  }

  // Return cached data if available
  if (locationCache.has(locationId)) {
    return locationCache.get(locationId)!;
  }

  // Return existing loading promise if in progress
  if (loadingPromises.has(locationId)) {
    return loadingPromises.get(locationId)!;
  }

  // Create new loading promise with error handling
  const loadingPromise = safeLoadContent(
    locationId,
    () => loadLocationFromFile(locationId),
    createLocationFallback(locationId)
  );

  loadingPromises.set(locationId, loadingPromise as Promise<LocationData>);

  try {
    const data = await loadingPromise;
    if (data) {
      locationCache.set(locationId, data);
    }
    loadingPromises.delete(locationId);
    return data;
  } catch (error) {
    loadingPromises.delete(locationId);
    const appError = handleNetworkError(`/src/data/locations/${locationId}.json`, error as Error);
    console.error('Network error loading location:', appError);
    return createLocationFallback(locationId);
  }
}

/**
 * Load location data from JSON file with validation
 */
async function loadLocationFromFile(locationId: AvailableLocationId): Promise<LocationData> {
  try {
    const response = await fetch(`/src/data/locations/${locationId}.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const rawData = await response.json();
    
    // Parse and validate the data
    const parsedData = parseLocationData(rawData);
    
    if (!parsedData) {
      const validation = validateLocationData(rawData);
      const error = handleValidationError(locationId, validation.errors);
      console.error('Validation error:', error);
      throw new Error(`Invalid location data structure for ${locationId}`);
    }

    // Check for minimum content requirements
    if (!hasMinimumContent(parsedData)) {
      console.warn(`Location ${locationId} has minimal content`);
    }

    return parsedData;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`Failed to load ${locationId}: Unknown error`);
  }
}



/**
 * Preload multiple locations for better performance
 */
export async function preloadLocations(locationIds: string[]): Promise<void> {
  const validIds = locationIds.filter(isLocationAvailable);
  
  if (validIds.length === 0) return;

  try {
    await Promise.all(validIds.map(id => loadLocationData(id)));
    console.log(`Preloaded ${validIds.length} locations:`, validIds);
  } catch (error) {
    console.error('Error preloading locations:', error);
  }
}

/**
 * Get all cached location data
 */
export function getCachedLocations(): Map<string, LocationData> {
  return new Map(locationCache);
}

/**
 * Clear location cache (useful for testing or memory management)
 */
export function clearLocationCache(): void {
  locationCache.clear();
  loadingPromises.clear();
}

/**
 * Get location data synchronously from cache (returns null if not cached)
 */
export function getLocationFromCache(locationId: string): LocationData | null {
  return locationCache.get(locationId) || null;
}

/**
 * Check if location is currently being loaded
 */
export function isLocationLoading(locationId: string): boolean {
  return loadingPromises.has(locationId);
}

/**
 * Get loading statistics for debugging
 */
export function getLoadingStats() {
  return {
    cached: locationCache.size,
    loading: loadingPromises.size,
    available: AVAILABLE_LOCATIONS.length
  };
}