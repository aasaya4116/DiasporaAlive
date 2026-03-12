import { LocationData, CulturalCategory } from '../types/location';
import { SearchResult } from '../store/searchSlice';

export const searchLocations = (
  query: string,
  locations: Record<string, LocationData>,
  activeFilters: CulturalCategory[] = []
): SearchResult[] => {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  Object.values(locations).forEach((location) => {
    // Search in location name
    if (location.name.toLowerCase().includes(searchTerm)) {
      results.push({
        locationId: location.id,
        locationName: location.name,
        matchType: 'name',
        matchText: location.name,
        relevanceScore: calculateRelevanceScore(location.name, searchTerm, 'name'),
      });
    }

    // Search in overview
    const overviewText = `${location.overview.summary} ${location.overview.historicalContext}`;
    if (overviewText.toLowerCase().includes(searchTerm)) {
      const matchText = extractMatchingText(overviewText, searchTerm);
      results.push({
        locationId: location.id,
        locationName: location.name,
        matchType: 'overview',
        matchText,
        relevanceScore: calculateRelevanceScore(overviewText, searchTerm, 'overview'),
      });
    }

    // Search in cultural elements
    Object.entries(location.culturalElements).forEach(([category, elements]) => {
      // If filters are active, only search in filtered categories
      if (activeFilters.length > 0 && !activeFilters.includes(category as CulturalCategory)) {
        return;
      }

      elements.forEach((element) => {
        const elementText = `${element.name} ${element.description} ${element.africanRoots} ${element.significance}`;
        if (elementText.toLowerCase().includes(searchTerm)) {
          const matchText = extractMatchingText(elementText, searchTerm);
          results.push({
            locationId: location.id,
            locationName: location.name,
            matchType: 'cultural',
            matchText: `${element.name}: ${matchText}`,
            relevanceScore: calculateRelevanceScore(elementText, searchTerm, 'cultural'),
          });
        }
      });
    });

    // Search in population stats and key facts
    const statsText = `${location.overview.populationStats.keyFacts.join(' ')}`;
    if (statsText.toLowerCase().includes(searchTerm)) {
      const matchText = extractMatchingText(statsText, searchTerm);
      results.push({
        locationId: location.id,
        locationName: location.name,
        matchType: 'content',
        matchText,
        relevanceScore: calculateRelevanceScore(statsText, searchTerm, 'content'),
      });
    }
  });

  // Remove duplicates and sort by relevance
  const uniqueResults = removeDuplicateResults(results);
  return uniqueResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

const calculateRelevanceScore = (text: string, searchTerm: string, matchType: string): number => {
  const lowerText = text.toLowerCase();
  const lowerTerm = searchTerm.toLowerCase();
  
  let score = 0;
  
  // Base score for match type
  const typeScores = {
    name: 100,
    overview: 80,
    cultural: 60,
    content: 40,
  };
  score += typeScores[matchType as keyof typeof typeScores] || 0;
  
  // Exact match bonus
  if (lowerText === lowerTerm) {
    score += 50;
  }
  
  // Starts with bonus
  if (lowerText.startsWith(lowerTerm)) {
    score += 30;
  }
  
  // Word boundary bonus
  const wordBoundaryRegex = new RegExp(`\\b${lowerTerm}\\b`);
  if (wordBoundaryRegex.test(lowerText)) {
    score += 20;
  }
  
  // Multiple occurrences bonus
  const occurrences = (lowerText.match(new RegExp(lowerTerm, 'g')) || []).length;
  score += Math.min(occurrences * 5, 25);
  
  // Length penalty (shorter matches are more relevant)
  score -= Math.floor(text.length / 100);
  
  return Math.max(score, 1);
};

const extractMatchingText = (text: string, searchTerm: string, contextLength = 100): string => {
  const lowerText = text.toLowerCase();
  const lowerTerm = searchTerm.toLowerCase();
  const index = lowerText.indexOf(lowerTerm);
  
  if (index === -1) return text.substring(0, contextLength);
  
  const start = Math.max(0, index - contextLength / 2);
  const end = Math.min(text.length, index + searchTerm.length + contextLength / 2);
  
  let excerpt = text.substring(start, end);
  
  if (start > 0) excerpt = '...' + excerpt;
  if (end < text.length) excerpt = excerpt + '...';
  
  return excerpt;
};

const removeDuplicateResults = (results: SearchResult[]): SearchResult[] => {
  const seen = new Set<string>();
  return results.filter((result) => {
    const key = `${result.locationId}-${result.matchType}-${result.matchText}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

export const generateSearchSuggestions = (
  query: string,
  locations: Record<string, LocationData>
): string[] => {
  if (!query.trim()) return [];

  const suggestions = new Set<string>();
  const searchTerm = query.toLowerCase();

  // Add location names that start with the query
  Object.values(locations).forEach((location) => {
    if (location.name.toLowerCase().startsWith(searchTerm)) {
      suggestions.add(location.name);
    }
  });

  // Add cultural element names that start with the query
  Object.values(locations).forEach((location) => {
    Object.values(location.culturalElements).flat().forEach((element) => {
      if (element.name.toLowerCase().startsWith(searchTerm)) {
        suggestions.add(element.name);
      }
    });
  });

  return Array.from(suggestions).slice(0, 5);
};