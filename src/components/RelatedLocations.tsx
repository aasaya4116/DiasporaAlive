import React from 'react';
import { getLocationData } from '../data/sampleLocationData';
import './RelatedLocations.css';

interface RelatedLocationsProps {
  relatedLocationIds: string[];
  africanOrigins: string[];
  onLocationSelect: (locationId: string) => void;
}

const RelatedLocations: React.FC<RelatedLocationsProps> = ({
  relatedLocationIds,
  africanOrigins,
  onLocationSelect
}) => {
  const getCountryName = (id: string): string => {
    const locationData = getLocationData(id);
    if (locationData) {
      return locationData.name;
    }
    
    // Fallback country names
    const countryNames: Record<string, string> = {
      'brazil': 'Brazil',
      'haiti': 'Haiti',
      'jamaica': 'Jamaica',
      'colombia': 'Colombia',
      'cuba': 'Cuba',
      'angola': 'Angola',
      'nigeria': 'Nigeria',
      'ghana': 'Ghana',
      'benin': 'Benin',
      'congo': 'Congo',
      'senegal': 'Senegal'
    };
    return countryNames[id] || id.charAt(0).toUpperCase() + id.slice(1);
  };

  const getLocationTeaser = (id: string): string => {
    const locationData = getLocationData(id);
    if (locationData) {
      return locationData.overview.summary.substring(0, 120) + '...';
    }
    return `Explore the African cultural heritage in ${getCountryName(id)}.`;
  };

  const handleLocationClick = (locationId: string) => {
    onLocationSelect(locationId);
  };

  const handleKeyDown = (event: React.KeyboardEvent, locationId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLocationClick(locationId);
    }
  };

  if (relatedLocationIds.length === 0 && africanOrigins.length === 0) {
    return null;
  }

  return (
    <div className="related-locations">
      <h2 className="related-title">Explore Next</h2>
      <p className="related-subtitle">
        Discover more locations with African cultural connections
      </p>

      {/* Related Diaspora Locations */}
      {relatedLocationIds.length > 0 && (
        <div className="related-section">
          <h3 className="section-title">Similar Diaspora Communities</h3>
          <div className="locations-grid">
            {relatedLocationIds.map((locationId) => (
              <div
                key={locationId}
                className="location-card"
                onClick={() => handleLocationClick(locationId)}
                onKeyDown={(e) => handleKeyDown(e, locationId)}
                tabIndex={0}
                role="button"
                aria-label={`Explore ${getCountryName(locationId)}`}
              >
                <div className="card-header">
                  <h4 className="location-name">{getCountryName(locationId)}</h4>
                  <svg 
                    className="arrow-icon" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="location-teaser">{getLocationTeaser(locationId)}</p>
                <div className="card-footer">
                  <span className="explore-text">Click to explore</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* African Origins */}
      {africanOrigins.length > 0 && (
        <div className="origins-section">
          <h3 className="section-title">African Origins</h3>
          <p className="origins-description">
            Cultural influences from these African regions:
          </p>
          <div className="origins-list">
            {africanOrigins.map((origin) => (
              <div key={origin} className="origin-item">
                <span className="origin-flag">🌍</span>
                <span className="origin-name">{getCountryName(origin)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="explore-cta">
        <p>Continue your journey through the African diaspora by exploring these connected cultures and their shared heritage.</p>
      </div>
    </div>
  );
};

export default RelatedLocations;