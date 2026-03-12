import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearSearch, hideResults } from '../store/searchSlice';
import './SearchResults.css';

interface SearchResultsProps {
  onLocationSelect?: (locationId: string) => void;
  onClose?: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onLocationSelect, onClose }) => {
  const dispatch = useDispatch();
  const { results, query, showResults } = useSelector((state: RootState) => state.search);

  if (!showResults || !query.trim()) {
    return null;
  }

  const handleResultClick = (locationId: string) => {
    if (onLocationSelect) {
      onLocationSelect(locationId);
    }
    dispatch(hideResults());
  };

  const handleClose = () => {
    dispatch(hideResults());
    if (onClose) {
      onClose();
    }
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
    if (onClose) {
      onClose();
    }
  };

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
            <polyline points="10,9 9,9 8,9"></polyline>
          </svg>
        );
      case 'cultural':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4"></path>
            <path d="M21 12c.552 0 1-.448 1-1V5c0-.552-.448-1-1-1H3c-.552 0-1 .448-1 1v6c0 .552.448 1 1 1h18z"></path>
            <path d="M3 12v7c0 .552.448 1 1 1h16c.552 0 1-.448 1-1v-7"></path>
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
      case 'name': return 'Location';
      case 'overview': return 'Overview';
      case 'cultural': return 'Cultural Element';
      case 'content': return 'Content';
      default: return 'Match';
    }
  };

  return (
    <div className="search-results-overlay" onClick={handleClose}>
      <div className="search-results-container" onClick={(e) => e.stopPropagation()}>
        <div className="search-results-header">
          <div className="search-results-title">
            <h2>Search Results</h2>
            <p className="search-results-query">
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </p>
          </div>
          <div className="search-results-actions">
            <button
              className="search-results-clear"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              Clear
            </button>
            <button
              className="search-results-close"
              onClick={handleClose}
              aria-label="Close search results"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <div className="search-results-content">
          {results.length === 0 ? (
            <div className="search-no-results">
              <div className="no-results-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>No results found</h3>
              <p>Try searching for:</p>
              <ul className="search-suggestions-list">
                <li>Country names (Brazil, Haiti, Jamaica)</li>
                <li>Cultural elements (Samba, Capoeira, Vodou)</li>
                <li>Topics (music, food, religion, festivals)</li>
                <li>Historical terms (diaspora, slavery, independence)</li>
              </ul>
            </div>
          ) : (
            <div className="search-results-list">
              {results.map((result, index) => (
                <div
                  key={`${result.locationId}-${result.matchType}-${index}`}
                  className="search-result-item"
                  onClick={() => handleResultClick(result.locationId)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleResultClick(result.locationId);
                    }
                  }}
                >
                  <div className="search-result-icon">
                    {getMatchTypeIcon(result.matchType)}
                  </div>
                  <div className="search-result-content">
                    <div className="search-result-header">
                      <h3 className="search-result-location">{result.locationName}</h3>
                      <span className="search-result-type">
                        {getMatchTypeLabel(result.matchType)}
                      </span>
                    </div>
                    <p className="search-result-text">
                      {highlightText(result.matchText, query)}
                    </p>
                  </div>
                  <div className="search-result-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
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

export default SearchResults;