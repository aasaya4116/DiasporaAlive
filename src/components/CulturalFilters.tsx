import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleFilter, clearFilters } from '../store/filterSlice';
import { trackCulturalFilter } from '../utils/analytics';
import { CulturalCategory } from '../types/location';
import './CulturalFilters.css';

interface CulturalFiltersProps {
  className?: string;
}

const CulturalFilters: React.FC<CulturalFiltersProps> = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { activeFilters } = useSelector((state: RootState) => state.filter);

  const filterConfig = [
    {
      category: CulturalCategory.MUSIC,
      label: 'Music',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18V5l12-2v13"></path>
          <circle cx="6" cy="18" r="3"></circle>
          <circle cx="18" cy="16" r="3"></circle>
        </svg>
      ),
      description: 'Traditional rhythms, instruments, and musical forms'
    },
    {
      category: CulturalCategory.FOOD,
      label: 'Food',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
          <line x1="6" y1="1" x2="6" y2="4"></line>
          <line x1="10" y1="1" x2="10" y2="4"></line>
          <line x1="14" y1="1" x2="14" y2="4"></line>
        </svg>
      ),
      description: 'Culinary traditions, ingredients, and cooking methods'
    },
    {
      category: CulturalCategory.RELIGION,
      label: 'Religion',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
      description: 'Spiritual practices, beliefs, and religious traditions'
    },
    {
      category: CulturalCategory.LANGUAGE,
      label: 'Language',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 8l6 6"></path>
          <path d="M4 14l6-6 2-3"></path>
          <path d="M2 5h12"></path>
          <path d="M7 2h1"></path>
          <path d="M22 22l-5-10-5 10"></path>
          <path d="M14 18h6"></path>
        </svg>
      ),
      description: 'Linguistic influences, creole languages, and oral traditions'
    },
    {
      category: CulturalCategory.FESTIVALS,
      label: 'Festivals',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" y1="22" x2="4" y2="15"></line>
        </svg>
      ),
      description: 'Celebrations, ceremonies, and cultural events'
    }
  ];

  const handleFilterToggle = (category: CulturalCategory) => {
    const wasActive = activeFilters.includes(category);
    dispatch(toggleFilter(category));
    
    // Track filter analytics
    const newFilters = wasActive 
      ? activeFilters.filter(f => f !== category)
      : [...activeFilters, category];
    trackCulturalFilter(newFilters, wasActive ? 'remove' : 'add');
  };

  const handleClearAll = () => {
    dispatch(clearFilters());
    trackCulturalFilter([], 'clear');
  };

  const isActive = (category: CulturalCategory) => {
    return activeFilters.includes(category);
  };

  return (
    <div className={`cultural-filters ${className}`}>
      <div className="filters-header">
        <h3 className="filters-title">Cultural Categories</h3>
        {activeFilters.length > 0 && (
          <button
            className="filters-clear"
            onClick={handleClearAll}
            aria-label="Clear all filters"
          >
            Clear All
          </button>
        )}
      </div>
      
      <div className="filters-grid">
        {filterConfig.map(({ category, label, icon, description }) => (
          <button
            key={category}
            className={`filter-button ${isActive(category) ? 'active' : ''}`}
            onClick={() => handleFilterToggle(category)}
            aria-pressed={isActive(category)}
            title={description}
          >
            <div className="filter-icon">
              {icon}
            </div>
            <span className="filter-label">{label}</span>
            {isActive(category) && (
              <div className="filter-active-indicator">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
      
      {activeFilters.length > 0 && (
        <div className="active-filters-summary">
          <p className="filters-count">
            {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} active
          </p>
          <div className="active-filters-list">
            {activeFilters.map((filter) => {
              const config = filterConfig.find(f => f.category === filter);
              return (
                <span key={filter} className="active-filter-tag">
                  {config?.label}
                  <button
                    className="remove-filter"
                    onClick={() => handleFilterToggle(filter)}
                    aria-label={`Remove ${config?.label} filter`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CulturalFilters;