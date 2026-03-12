import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import type { LocationProfileProps, LocationData, CulturalCategory } from '../types/location';
import { getLocationData } from '../data/sampleLocationData';
import { measureContentLoad } from '../utils/performanceMonitor';
import CulturalSection from './CulturalSection';
import StatisticsSection from './StatisticsSection';
import ImageGallery from './ImageGallery';
import RelatedLocations from './RelatedLocations';
import Breadcrumb from './Breadcrumb';
import SocialShare from './SocialShare';
import './LocationProfile.css';

const LocationProfile: React.FC<LocationProfileProps> = ({
  locationId,
  isOpen,
  onClose,
  onRelatedLocationSelect
}) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<CulturalCategory>>(new Set());
  
  // Get active filters from Redux store
  const { activeFilters } = useSelector((state: RootState) => state.filter);

  // Toggle cultural section expansion
  const toggleSection = (category: CulturalCategory) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  // Load location data when locationId changes
  useEffect(() => {
    if (!locationId || !isOpen) {
      setLocationData(null);
      return;
    }

    const loadLocationData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Measure content loading performance
        await measureContentLoad('location_profile', async () => {
          // Load data from sample data
          const data = getLocationData(locationId);
          
          if (data) {
            setLocationData(data);
          } else {
            // Create fallback data for unknown locations
            const fallbackData: LocationData = {
              id: locationId,
              name: getCountryName(locationId),
              region: 'Unknown',
              coordinates: [0, 0],
              overview: {
                summary: `Explore the African cultural heritage in ${getCountryName(locationId)}.`,
                historicalContext: 'Cultural information is being compiled for this location.',
                populationStats: {
                  population: 'Data being compiled',
                  percentage: 'Data being compiled',
                  historicalPeriod: 'Various periods',
                  keyFacts: ['Cultural data is being researched and compiled for this location.']
                }
              },
              culturalElements: {
                music: [],
                food: [],
                religion: [],
                language: [],
                festivals: []
              },
              media: {
                featuredImage: {
                  id: 'placeholder',
                  url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                  alt: `Cultural landscape of ${getCountryName(locationId)}`,
                  caption: 'Cultural information for this location is being compiled',
                  type: 'image'
                },
                gallery: []
              },
              connections: {
                africanOrigins: [],
                relatedLocations: []
              }
            };
            setLocationData(fallbackData);
          }
        });
      } catch (err) {
        setError('Failed to load location data');
        console.error('Error loading location data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadLocationData();
  }, [locationId, isOpen]);

  // Helper function to get country name from ID
  const getCountryName = (id: string): string => {
    // TODO: Replace with actual country name lookup
    const countryNames: Record<string, string> = {
      'brazil': 'Brazil',
      'haiti': 'Haiti',
      'jamaica': 'Jamaica',
      'colombia': 'Colombia',
      'cuba': 'Cuba'
    };
    return countryNames[id] || id.charAt(0).toUpperCase() + id.slice(1);
  };

  // Handle escape key to close profile
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scroll when modal is open on mobile
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle backdrop click to close on mobile
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className={`location-profile-overlay ${isOpen ? 'profile-open' : ''}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="location-profile-title"
      aria-describedby="location-profile-description"
    >
      <div className="location-profile-container">
        {/* Header with navigation controls */}
        <header className="profile-header">
          <div className="header-content">
            <button
              className="back-button"
              onClick={onClose}
              aria-label="Back to map"
              type="button"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="back-text">Back to Map</span>
            </button>
            
            <h1 id="location-profile-title" className="location-title">
              {locationData?.name || 'Loading...'}
            </h1>
            
            <button
              className="close-button"
              onClick={onClose}
              aria-label="Close location profile"
              type="button"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          
          {/* Breadcrumb Navigation */}
          {locationData && (
            <Breadcrumb 
              currentLocation={locationData.name}
              onBackToMap={onClose}
            />
          )}
        </header>

        {/* Main content area */}
        <main className="profile-content" role="main">
          <div id="location-profile-description" className="sr-only">
            {locationData ? `Cultural information and heritage details for ${locationData.name}` : 'Loading location information'}
          </div>
          
          {isLoading && (
            <div 
              className="profile-loading"
              role="status"
              aria-live="polite"
              aria-label="Loading location content"
            >
              <div className="loading-spinner" aria-hidden="true"></div>
              <p>Loading cultural information...</p>
            </div>
          )}

          {error && (
            <div 
              className="profile-error"
              role="alert"
              aria-live="assertive"
            >
              <h3>Unable to load content</h3>
              <p>{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="retry-button"
                aria-label="Retry loading location content"
              >
                Try Again
              </button>
            </div>
          )}

          {locationData && !isLoading && !error && (
            <div className="profile-sections">
              {/* Featured Image */}
              <ImageGallery 
                featuredImage={locationData.media.featuredImage}
                gallery={locationData.media.gallery}
              />

              {/* Overview Section */}
              <section className="overview-section" aria-labelledby="overview-heading">
                <div className="section-content">
                  <h2 id="overview-heading">Cultural Overview</h2>
                  <p className="overview-summary">{locationData.overview.summary}</p>
                  
                  {locationData.overview.historicalContext && (
                    <div className="historical-context">
                      <h3 id="historical-context-heading">Historical Context</h3>
                      <p>{locationData.overview.historicalContext}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Statistics Section */}
              <StatisticsSection statistics={locationData.overview.populationStats} />

              {/* Social Share Section */}
              <SocialShare
                locationId={locationData.id}
                locationName={locationData.name}
                culturalHighlights={Object.entries(locationData.culturalElements)
                  .filter(([_, elements]) => elements.length > 0)
                  .map(([category]) => category)
                  .slice(0, 3)}
              />

              {/* Cultural Elements Sections */}
              <section className="cultural-elements" aria-labelledby="cultural-elements-heading">
                <h2 id="cultural-elements-heading" className="elements-title">Cultural Elements</h2>
                
                {Object.entries(locationData.culturalElements).map(([category, elements]) => {
                  const isFiltered = activeFilters.length > 0 && !activeFilters.includes(category as CulturalCategory);
                  const isHighlighted = activeFilters.length > 0 && activeFilters.includes(category as CulturalCategory);
                  
                  return (
                    <CulturalSection
                      key={category}
                      category={category as CulturalCategory}
                      elements={elements}
                      isExpanded={expandedSections.has(category as CulturalCategory)}
                      onToggle={() => toggleSection(category as CulturalCategory)}
                      isFiltered={isFiltered}
                      isHighlighted={isHighlighted}
                    />
                  );
                })}
                
                {Object.values(locationData.culturalElements).every(elements => elements.length === 0) && (
                  <div className="no-cultural-data" role="status">
                    <p>Cultural information for this location is being compiled. Check back soon for detailed content about music, food, religion, language, and festivals.</p>
                  </div>
                )}
              </section>

              {/* Placeholder for related locations - will be implemented in subtask 3.3 */}
              {locationData.connections.relatedLocations.length > 0 && (
                <RelatedLocations
                  relatedLocationIds={locationData.connections.relatedLocations}
                  africanOrigins={locationData.connections.africanOrigins}
                  onLocationSelect={onRelatedLocationSelect}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default LocationProfile;