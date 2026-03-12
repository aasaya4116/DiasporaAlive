import React from 'react';
import type { CulturalElement, CulturalCategory } from '../types/location';
import './CulturalSection.css';

interface CulturalSectionProps {
  category: CulturalCategory;
  elements: CulturalElement[];
  isExpanded?: boolean;
  onToggle?: () => void;
  isFiltered?: boolean;
  isHighlighted?: boolean;
}

const CulturalSection: React.FC<CulturalSectionProps> = ({
  category,
  elements,
  isExpanded = false,
  onToggle,
  isFiltered = false,
  isHighlighted = false
}) => {
  const getCategoryIcon = (category: CulturalCategory): string => {
    const icons = {
      [CulturalCategory.MUSIC]: '🎵',
      [CulturalCategory.FOOD]: '🍽️',
      [CulturalCategory.RELIGION]: '🙏',
      [CulturalCategory.LANGUAGE]: '🗣️',
      [CulturalCategory.FESTIVALS]: '🎉'
    };
    return icons[category];
  };

  const getCategoryTitle = (category: CulturalCategory): string => {
    const titles = {
      [CulturalCategory.MUSIC]: 'Music & Dance',
      [CulturalCategory.FOOD]: 'Food & Cuisine',
      [CulturalCategory.RELIGION]: 'Religion & Spirituality',
      [CulturalCategory.LANGUAGE]: 'Language & Literature',
      [CulturalCategory.FESTIVALS]: 'Festivals & Celebrations'
    };
    return titles[category];
  };

  if (elements.length === 0) {
    return null;
  }

  return (
    <div className={`cultural-section ${isFiltered ? 'filtered' : ''} ${isHighlighted ? 'highlighted' : ''}`}>
      <button
        className={`section-header ${isExpanded ? 'expanded' : ''}`}
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={`cultural-${category}-content`}
      >
        <div className="header-content">
          <span className="category-icon">{getCategoryIcon(category)}</span>
          <h3 className="category-title">{getCategoryTitle(category)}</h3>
          <span className="element-count">({elements.length})</span>
          {isHighlighted && (
            <span className="highlight-indicator" aria-label="Filtered category">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 3L2 21"></path>
                <path d="M6 18H2l4-4V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8l4 4h-4"></path>
              </svg>
            </span>
          )}
        </div>
        <svg 
          className="expand-icon" 
          width="20" 
          height="20" 
          viewBox="0 0 20 20" 
          fill="none" 
          stroke="currentColor"
        >
          <path d="M6 8l4 4 4-4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isExpanded && (
        <div 
          id={`cultural-${category}-content`}
          className="section-content"
        >
          {elements.map((element, index) => (
            <div key={index} className="cultural-element">
              <h4 className="element-name">{element.name}</h4>
              <p className="element-description">{element.description}</p>
              
              {element.africanRoots && (
                <div className="african-roots">
                  <strong>African Roots:</strong> {element.africanRoots}
                </div>
              )}
              
              {element.examples && element.examples.length > 0 && (
                <div className="examples">
                  <strong>Examples:</strong>
                  <ul>
                    {element.examples.map((example, exampleIndex) => (
                      <li key={exampleIndex}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {element.significance && (
                <div className="significance">
                  <strong>Cultural Significance:</strong> {element.significance}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CulturalSection;