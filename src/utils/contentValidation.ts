import type { LocationData } from '../types/location';

/**
 * Content validation utilities for location data
 */

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate complete location data structure
 */
export function validateLocationData(data: any): ValidationResult {
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: []
  };

  if (!data || typeof data !== 'object') {
    result.errors.push('Location data must be an object');
    result.isValid = false;
    return result;
  }

  // Validate required fields
  const requiredFields = ['id', 'name', 'region', 'coordinates', 'overview', 'culturalElements', 'media', 'connections'];
  
  for (const field of requiredFields) {
    if (!(field in data)) {
      result.errors.push(`Missing required field: ${field}`);
      result.isValid = false;
    }
  }

  if (!result.isValid) return result;

  // Validate specific field structures
  validateBasicFields(data, result);
  validateOverview(data.overview, result);
  validateCulturalElements(data.culturalElements, result);
  validateMedia(data.media, result);
  validateConnections(data.connections, result);

  return result;
}

/**
 * Validate basic location fields
 */
function validateBasicFields(data: any, result: ValidationResult): void {
  // Validate ID format
  if (typeof data.id !== 'string' || !/^[a-z0-9-]+$/.test(data.id)) {
    result.errors.push('ID must be a lowercase string with hyphens only');
    result.isValid = false;
  }

  // Validate name
  if (typeof data.name !== 'string' || data.name.trim().length === 0) {
    result.errors.push('Name must be a non-empty string');
    result.isValid = false;
  }

  // Validate region
  if (typeof data.region !== 'string' || data.region.trim().length === 0) {
    result.errors.push('Region must be a non-empty string');
    result.isValid = false;
  }

  // Validate coordinates
  if (!Array.isArray(data.coordinates) || 
      data.coordinates.length !== 2 || 
      !data.coordinates.every((coord: any) => typeof coord === 'number')) {
    result.errors.push('Coordinates must be an array of two numbers [lat, lng]');
    result.isValid = false;
  } else {
    const [lat, lng] = data.coordinates;
    if (lat < -90 || lat > 90) {
      result.errors.push('Latitude must be between -90 and 90');
      result.isValid = false;
    }
    if (lng < -180 || lng > 180) {
      result.errors.push('Longitude must be between -180 and 180');
      result.isValid = false;
    }
  }
}

/**
 * Validate overview section
 */
function validateOverview(overview: any, result: ValidationResult): void {
  if (!overview || typeof overview !== 'object') {
    result.errors.push('Overview must be an object');
    result.isValid = false;
    return;
  }

  const requiredOverviewFields = ['summary', 'historicalContext', 'populationStats'];
  for (const field of requiredOverviewFields) {
    if (!(field in overview)) {
      result.errors.push(`Overview missing required field: ${field}`);
      result.isValid = false;
    }
  }

  // Validate population stats
  if (overview.populationStats) {
    const requiredStatsFields = ['population', 'percentage', 'historicalPeriod', 'keyFacts'];
    for (const field of requiredStatsFields) {
      if (!(field in overview.populationStats)) {
        result.errors.push(`Population stats missing required field: ${field}`);
        result.isValid = false;
      }
    }

    if (!Array.isArray(overview.populationStats.keyFacts)) {
      result.errors.push('Key facts must be an array');
      result.isValid = false;
    }
  }
}

/**
 * Validate cultural elements structure
 */
function validateCulturalElements(culturalElements: any, result: ValidationResult): void {
  if (!culturalElements || typeof culturalElements !== 'object') {
    result.errors.push('Cultural elements must be an object');
    result.isValid = false;
    return;
  }

  const requiredCategories = ['music', 'food', 'religion', 'language', 'festivals'];
  
  for (const category of requiredCategories) {
    if (!(category in culturalElements)) {
      result.errors.push(`Cultural elements missing category: ${category}`);
      result.isValid = false;
      continue;
    }

    if (!Array.isArray(culturalElements[category])) {
      result.errors.push(`Cultural category ${category} must be an array`);
      result.isValid = false;
      continue;
    }

    // Validate each cultural element
    culturalElements[category].forEach((element: any, index: number) => {
      validateCulturalElement(element, `${category}[${index}]`, result);
    });
  }
}

/**
 * Validate individual cultural element
 */
function validateCulturalElement(element: any, path: string, result: ValidationResult): void {
  if (!element || typeof element !== 'object') {
    result.errors.push(`${path}: Cultural element must be an object`);
    result.isValid = false;
    return;
  }

  const requiredFields = ['name', 'description', 'africanRoots', 'examples', 'significance'];
  
  for (const field of requiredFields) {
    if (!(field in element)) {
      result.errors.push(`${path}: Missing required field ${field}`);
      result.isValid = false;
    }
  }

  if (!Array.isArray(element.examples)) {
    result.errors.push(`${path}: Examples must be an array`);
    result.isValid = false;
  }

  // Check for minimum content length
  if (typeof element.description === 'string' && element.description.length < 50) {
    result.warnings.push(`${path}: Description is quite short (${element.description.length} chars)`);
  }
}

/**
 * Validate media assets
 */
function validateMedia(media: any, result: ValidationResult): void {
  if (!media || typeof media !== 'object') {
    result.errors.push('Media must be an object');
    result.isValid = false;
    return;
  }

  const requiredFields = ['featuredImage', 'gallery'];
  for (const field of requiredFields) {
    if (!(field in media)) {
      result.errors.push(`Media missing required field: ${field}`);
      result.isValid = false;
    }
  }

  // Validate featured image
  if (media.featuredImage) {
    validateMediaAsset(media.featuredImage, 'featuredImage', result);
  }

  // Validate gallery
  if (Array.isArray(media.gallery)) {
    media.gallery.forEach((asset: any, index: number) => {
      validateMediaAsset(asset, `gallery[${index}]`, result);
    });
  } else if (media.gallery !== undefined) {
    result.errors.push('Gallery must be an array');
    result.isValid = false;
  }

  // Validate optional audio clips
  if (media.audioClips && Array.isArray(media.audioClips)) {
    media.audioClips.forEach((asset: any, index: number) => {
      validateMediaAsset(asset, `audioClips[${index}]`, result);
    });
  }
}

/**
 * Validate individual media asset
 */
function validateMediaAsset(asset: any, path: string, result: ValidationResult): void {
  if (!asset || typeof asset !== 'object') {
    result.errors.push(`${path}: Media asset must be an object`);
    result.isValid = false;
    return;
  }

  const requiredFields = ['id', 'url', 'alt', 'type'];
  for (const field of requiredFields) {
    if (!(field in asset)) {
      result.errors.push(`${path}: Missing required field ${field}`);
      result.isValid = false;
    }
  }

  // Validate URL format
  if (typeof asset.url === 'string') {
    try {
      new URL(asset.url);
    } catch {
      result.errors.push(`${path}: Invalid URL format`);
      result.isValid = false;
    }
  }

  // Validate type
  const validTypes = ['image', 'audio', 'video'];
  if (!validTypes.includes(asset.type)) {
    result.errors.push(`${path}: Type must be one of: ${validTypes.join(', ')}`);
    result.isValid = false;
  }

  // Validate alt text
  if (typeof asset.alt === 'string' && asset.alt.length < 10) {
    result.warnings.push(`${path}: Alt text is quite short for accessibility`);
  }
}

/**
 * Validate connections
 */
function validateConnections(connections: any, result: ValidationResult): void {
  if (!connections || typeof connections !== 'object') {
    result.errors.push('Connections must be an object');
    result.isValid = false;
    return;
  }

  const requiredFields = ['africanOrigins', 'relatedLocations'];
  for (const field of requiredFields) {
    if (!(field in connections)) {
      result.errors.push(`Connections missing required field: ${field}`);
      result.isValid = false;
    }
  }

  // Validate arrays
  if (!Array.isArray(connections.africanOrigins)) {
    result.errors.push('African origins must be an array');
    result.isValid = false;
  }

  if (!Array.isArray(connections.relatedLocations)) {
    result.errors.push('Related locations must be an array');
    result.isValid = false;
  }
}

/**
 * Parse and clean location data
 */
export function parseLocationData(rawData: any): LocationData | null {
  try {
    // Basic cleaning
    const cleaned = cleanObjectStrings(rawData);
    
    // Validate structure
    const validation = validateLocationData(cleaned);
    
    if (!validation.isValid) {
      console.error('Location data validation failed:', validation.errors);
      return null;
    }

    // Log warnings if any
    if (validation.warnings.length > 0) {
      console.warn('Location data warnings:', validation.warnings);
    }

    return cleaned as LocationData;
  } catch (error) {
    console.error('Error parsing location data:', error);
    return null;
  }
}

/**
 * Clean string fields in an object recursively
 */
function cleanObjectStrings(obj: any): any {
  if (typeof obj === 'string') {
    return obj.trim();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(cleanObjectStrings);
  }
  
  if (obj && typeof obj === 'object') {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = cleanObjectStrings(value);
    }
    return cleaned;
  }
  
  return obj;
}

/**
 * Check if location data has minimum required content
 */
export function hasMinimumContent(data: LocationData): boolean {
  // Check for at least one cultural element in each category
  const categories = ['music', 'food', 'religion', 'language', 'festivals'];
  const hasContent = categories.some(category => 
    data.culturalElements[category as keyof typeof data.culturalElements]?.length > 0
  );

  // Check for media assets
  const hasMedia = data.media.featuredImage && data.media.gallery.length > 0;

  // Check for basic overview content
  const hasOverview = data.overview.summary.length > 100 && 
                     data.overview.historicalContext.length > 100;

  return hasContent && hasMedia && hasOverview;
}