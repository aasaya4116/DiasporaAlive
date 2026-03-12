import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/index';
import { setQuery, setResults, setSearching, setSuggestions, clearSearch } from '../store/searchSlice';
import { searchLocations, generateSearchSuggestions } from '../utils/searchUtils';
import { trackSearch } from '../utils/analytics';
import { performanceMonitor } from '../utils/performanceMonitor';
import { sampleLocationData } from '../data/sampleLocationData';
import './SearchInput.css';

interface SearchInputProps {
  onLocationSelect?: (locationId: string) => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  onLocationSelect,
  placeholder = "Search locations, cultures, traditions..." 
}) => {
  const dispatch = useDispatch();
  const { query, suggestions, isSearching } = useSelector((state: RootState) => state.search);
  const { activeFilters } = useSelector((state: RootState) => state.filter);
  
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        dispatch(setSearching(true));
        const searchStartTime = performance.now();
        
        // Generate suggestions
        const newSuggestions = generateSearchSuggestions(query, sampleLocationData);
        dispatch(setSuggestions(newSuggestions));
        
        // Perform search
        const results = searchLocations(query, sampleLocationData, activeFilters);
        dispatch(setResults(results));
        
        // Track search performance
        const searchTime = performance.now() - searchStartTime;
        trackSearch(query, results.length, searchTime);
      } else {
        dispatch(setSuggestions([]));
      }
    }, 300); // Debounce search

    return () => clearTimeout(timeoutId);
  }, [query, activeFilters, dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setQuery(value));
    setShowSuggestions(value.trim().length > 0);
    setSelectedSuggestionIndex(-1);
  };

  const handleInputFocus = () => {
    if (query.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }, 200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    dispatch(setQuery(suggestion));
    setShowSuggestions(false);
    inputRef.current?.blur();
    
    // Trigger search with the selected suggestion
    const results = searchLocations(suggestion, sampleLocationData, activeFilters);
    dispatch(setResults(results));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else if (query.trim()) {
          const results = searchLocations(query, sampleLocationData, activeFilters);
          dispatch(setResults(results));
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  return (
    <div className="search-input-container">
      <div className="search-input-wrapper">
        <div className="search-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          aria-label="Search locations and cultural content"
          aria-expanded={showSuggestions}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-describedby={showSuggestions ? "search-suggestions" : undefined}
          role="combobox"
          autoComplete="off"
        />
        
        {query && (
          <button
            className="search-clear-button"
            onClick={handleClearSearch}
            aria-label="Clear search input"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
        
        {isSearching && (
          <div className="search-loading" aria-label="Searching" role="status">
            <div className="search-spinner" aria-hidden="true"></div>
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          id="search-suggestions"
          className="search-suggestions"
          role="listbox"
          aria-label="Search suggestions"
        >
          {suggestions.map((suggestion: string, index: number) => (
            <div
              key={suggestion}
              className={`search-suggestion ${index === selectedSuggestionIndex ? 'selected' : ''}`}
              onClick={() => handleSuggestionClick(suggestion)}
              role="option"
              aria-selected={index === selectedSuggestionIndex}
              id={`suggestion-${index}`}
            >
              <div className="suggestion-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <span className="suggestion-text">{suggestion}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;