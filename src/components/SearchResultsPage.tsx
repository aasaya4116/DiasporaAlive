import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearSearch, setQuery } from '../store/searchSlice';
import { searchLocations } from '../utils/searchUtils';
import { sampleLocationData } from '../data/sampleLocationData';
import SearchInput from './SearchInput';
import CulturalFilters from './CulturalFilters';
import './SearchResultsPage.css';

interface SearchResultsPageProps {
  onLocationSelect: (locationId: string) => void;
  onClose: () => void;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ onLocationSelect, onClose }) => {
  const dispatch = useDispatch();
  const { query, results } = useSelector((state: RootState) => state.search);
  const { activeFilters } = useSelector((state: RootState) => state.filter);
  const [sortBy, setSortBy] = useState<'relevance' | 'location' | 'type'>('relevance');

  // Re-run search when filters change
  useEffect(() => {
    if (query.trim()) {
      const newResults = searchLocations(query, sampleLocationData, activeFilters);
      dispatch({ type: 'search/setResults', payload: newResults });
    }
  }, [activeFilters, query, dispatch]);

  const handleLocationSelect = (locationId: string) => {
    onLocationSelect(locationId);
    onClose();
  };

  const handleBackToMap = () => {
    dispatch(clearSearch());
    onClose();
  };

  const handleNewSearch = (newQuery: string) => {
    dispatch(setQuery(newQuery));
  };

  const sortedResults = [...results].sort((a, b) => {
    switch (sortBy) {
      case 'location':
        return a.locationName.localeCompare(b.locationName);
      case 'type':
        return a.matchType.localeCompare(b.matchType);
      case 'relevance':
      default:
        return b.relevanceScore - a.relevanceScore;
    }
  });

  const groupedResults = sortedResults.reduce((groups, result) => {
    const key = result.locationName;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(result);
    return groups;
  }, {} as Record<string, typeof results>);

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="search-highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  const getMatchTypeIcon = (matchType: string) => {
    switch (matchType) {
      case 'name':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        );
      case 'overview':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14,2 14,8 20,8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
          </svg>
        );
      case 'cultural':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        );
      case 'content':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        );
    }
  };

  const getMatchTypeLabel = (matchType: string) => {
    switch (matchType) {
      case 'name': return 'Location Name';
      case 'overview': return 'Overview';
      case 'cultural': return 'Cultural Element';
      case 'content': return 'Content';
      default: return 'Match';
    }
  };

  return (
    <div className="search-results-page">
      <div className="search-page-header">
        <div className="search-header-top">
          <button
            className="back-to-map-button"
            onClick={handleBackToMap}
            aria-label="Back to map"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Back to Map
          </button>
          
          <button
            className="close-search-button"
            onClick={onClose}
            aria-label="Close search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="search-header-content">
          <h1>Search Results</h1>
          <div className="search-input-container">
            <SearchInput 
              onLocationSelect={handleLocationSelect}
              placeholder="Refine your search..."
            />
          </div>
        </div>
        
        <div className="search-results-meta">
          <div className="results-count">
            {results.length} result{results.length !== 1 ? 's' : ''} 
            {query && ` for "${query}"`}
            {activeFilters.length > 0 && ` with ${activeFilters.length} filter${activeFilters.length !== 1 ? 's' : ''}`}
          </div>
          
          <div className="sort-controls">
            <label htmlFor="sort-select">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="sort-select"
            >
              <option value="relevance">Relevance</option>
              <option value="location">Location</option>
              <option value="type">Match Type</option>
            </select>
          </div>
        </div>
      </div>

      <div className="search-page-content">
        <div className="search-sidebar">
          <CulturalFilters className="compact" />
        </div>

        <div className="search-results-main">
          {results.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h2>No results found</h2>
              <p>Try adjusting your search terms or filters</p>
              <div className="search-suggestions">
                <h3>Search suggestions:</h3>
                <ul>
                  <li>Try broader terms like "music" or "food"</li>
                  <li>Search for country names like "Brazil" or "Haiti"</li>
                  <li>Look for cultural elements like "Samba" or "Vodou"</li>
                  <li>Remove some filters to see more results</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="results-list">
              {Object.entries(groupedResults).map(([locationName, locationResults]) => (
                <div key={locationName} className="location-group">
                  <div className="location-group-header">
                    <h2 className="location-name">{locationName}</h2>
                    <span className="match-count">
                      {locationResults.length} match{locationResults.length !== 1 ? 'es' : ''}
                    </span>
                  </div>
                  
                  <div className="location-results">
                    {locationResults.map((result, index) => (
                      <div
                        key={`${result.locationId}-${result.matchType}-${index}`}
                        className="result-item"
                        onClick={() => handleLocationSelect(result.locationId)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleLocationSelect(result.locationId);
                          }
                        }}
                      >
                        <div className="result-icon">
                          {getMatchTypeIcon(result.matchType)}
                        </div>
                        <div className="result-content">
                          <div className="result-header">
                            <span className="result-type">
                              {getMatchTypeLabel(result.matchType)}
                            </span>
                            <span className="result-score">
                              {Math.round(result.relevanceScore)}% match
                            </span>
                          </div>
                          <p className="result-text">
                            {highlightText(result.matchText, query)}
                          </p>
                        </div>
                        <div className="result-arrow">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="9,18 15,12 9,6"></polyline>
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;