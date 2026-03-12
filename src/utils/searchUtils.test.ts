import { describe, it, expect } from 'vitest';
import { searchLocations, generateSearchSuggestions } from './searchUtils';
import { sampleLocationData } from '../data/sampleLocationData';
import { CulturalCategory } from '../types/location';

describe('searchUtils', () => {
  describe('searchLocations', () => {
    it('should return empty array for empty query', () => {
      const results = searchLocations('', sampleLocationData);
      expect(results).toEqual([]);
    });

    it('should find location by name', () => {
      const results = searchLocations('Brazil', sampleLocationData);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].locationName).toBe('Brazil');
      expect(results[0].matchType).toBe('name');
    });

    it('should find cultural elements', () => {
      const results = searchLocations('Samba', sampleLocationData);
      expect(results.length).toBeGreaterThan(0);
      expect(results[0].matchType).toBe('cultural');
    });

    it('should filter by cultural category', () => {
      const results = searchLocations('music', sampleLocationData, [CulturalCategory.MUSIC]);
      expect(results.length).toBeGreaterThan(0);
    });

    it('should sort results by relevance score', () => {
      const results = searchLocations('Brazil', sampleLocationData);
      if (results.length > 1) {
        expect(results[0].relevanceScore).toBeGreaterThanOrEqual(results[1].relevanceScore);
      }
    });
  });

  describe('generateSearchSuggestions', () => {
    it('should return empty array for empty query', () => {
      const suggestions = generateSearchSuggestions('', sampleLocationData);
      expect(suggestions).toEqual([]);
    });

    it('should generate suggestions for partial matches', () => {
      const suggestions = generateSearchSuggestions('Bra', sampleLocationData);
      expect(suggestions).toContain('Brazil');
    });

    it('should limit suggestions to 5 items', () => {
      const suggestions = generateSearchSuggestions('a', sampleLocationData);
      expect(suggestions.length).toBeLessThanOrEqual(5);
    });
  });
});