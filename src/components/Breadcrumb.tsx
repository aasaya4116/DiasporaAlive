import React from 'react';
import './Breadcrumb.css';

interface BreadcrumbProps {
  currentLocation: string;
  onBackToMap: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentLocation, onBackToMap }) => {
  return (
    <nav className="breadcrumb" aria-label="Navigation breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <button
            className="breadcrumb-link"
            onClick={onBackToMap}
            aria-label="Return to world map"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 12h18M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            World Map
          </button>
        </li>
        <li className="breadcrumb-separator" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </li>
        <li className="breadcrumb-item current" aria-current="page">
          <span className="breadcrumb-current">{currentLocation}</span>
        </li>
      </ol>
    </nav>
  );
};

export default Breadcrumb;