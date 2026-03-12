import React, { useEffect, useRef, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import type { MapComponentProps, TooltipState } from '../types/map';
import { trackCountryClick } from '../utils/analytics';
import { performanceMonitor } from '../utils/performanceMonitor';
import countriesData from '../data/countries.json';
import './MapContainer.css';

// Import Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox access token from environment variables
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

// Helper function to get cultural images for countries
const getCountryImage = (countryName: string): string => {
  const countryImages: Record<string, string> = {
    'Brazil': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Colombia': 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Cuba': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Haiti': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    'Jamaica': 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  };
  
  return countryImages[countryName] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
};

const MapContainer: React.FC<MapComponentProps> = ({ 
  selectedCountry, 
  onCountrySelect, 
  onCountryHover 
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    content: '',
    countryName: ''
  });

  // Enhanced tooltip positioning for responsive design
  const calculateTooltipPosition = useCallback((clientX: number, clientY: number, containerRect: DOMRect) => {
    const tooltipWidth = 250; // Max width from CSS
    const tooltipHeight = 80; // Estimated height
    const padding = 10;
    
    let x = clientX - containerRect.left;
    let y = clientY - containerRect.top;
    
    // Adjust horizontal position to keep tooltip in viewport
    if (x + tooltipWidth / 2 > containerRect.width - padding) {
      x = containerRect.width - tooltipWidth / 2 - padding;
    } else if (x - tooltipWidth / 2 < padding) {
      x = tooltipWidth / 2 + padding;
    }
    
    // Adjust vertical position to keep tooltip above cursor
    y = Math.max(tooltipHeight + padding, y - padding);
    
    return { x, y };
  }, []);

  // Enhanced hover handler with smooth transitions
  const handleCountryHover = useCallback((
    countryId: string, 
    countryName: string, 
    teaser: string, 
    event: MouseEvent,
    isEntering: boolean
  ) => {
    if (isEntering) {
      const containerRect = mapContainer.current?.getBoundingClientRect();
      if (!containerRect) return;
      
      const { x, y } = calculateTooltipPosition(event.clientX, event.clientY, containerRect);
      
      setTooltip({
        visible: true,
        x,
        y,
        content: teaser,
        countryName
      });
      
      onCountryHover?.(countryId);
    } else {
      setTooltip(prev => ({ ...prev, visible: false }));
      onCountryHover?.(null);
    }
  }, [calculateTooltipPosition, onCountryHover]);

  // Enhanced mouse move handler for smooth tooltip following
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (tooltip.visible) {
      const containerRect = mapContainer.current?.getBoundingClientRect();
      if (!containerRect) return;
      
      const { x, y } = calculateTooltipPosition(event.clientX, event.clientY, containerRect);
      
      setTooltip(prev => ({ ...prev, x, y }));
    }
  }, [tooltip.visible, calculateTooltipPosition]);

  // Initialize Mapbox map
  const initializeMap = useCallback(() => {
    if (!mapContainer.current || !MAPBOX_TOKEN) return;

    // Start performance tracking
    performanceMonitor.startTimer('map_initialization');

    // Set Mapbox access token
    mapboxgl.accessToken = MAPBOX_TOKEN;

    // Create map instance with warm sepia theme
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Warmer, more natural theme
      center: [-20, 20], // Center on Atlantic Ocean to show diaspora regions
      zoom: 2,
      projection: 'naturalEarth' // Better for world view
    });

    // Add navigation controls with custom styling
    const nav = new mapboxgl.NavigationControl({
      visualizePitch: true
    });
    mapInstance.addControl(nav, 'top-right');

    // Wait for map to load
    mapInstance.on('load', () => {
      // Track map loading performance
      performanceMonitor.endTimer('map_initialization', 'map_load');
      
      // Add countries data as a source
      mapInstance.addSource('countries', {
        type: 'geojson',
        data: countriesData as any
      });

      // Add country fill layer with warm, cultural colors
      mapInstance.addLayer({
        id: 'countries-fill',
        type: 'fill',
        source: 'countries',
        paint: {
          'fill-color': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            '#d4a574', // Selected country - warm gold
            '#a0522d'  // Default country - terracotta/sienna
          ],
          'fill-opacity': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            0.8, // Selected opacity
            0.6  // Default opacity
          ]
        }
      });

      // Add country glow layer for selected countries
      mapInstance.addLayer({
        id: 'countries-glow',
        type: 'fill',
        source: 'countries',
        paint: {
          'fill-color': '#d4a574',
          'fill-opacity': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            0.3, // Subtle glow for selected
            0    // No glow for others
          ]
        },
        filter: ['==', ['get', 'id'], selectedCountry || '']
      });

      // Add country border layer with warm styling
      mapInstance.addLayer({
        id: 'countries-border',
        type: 'line',
        source: 'countries',
        paint: {
          'line-color': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            '#c17817', // Selected border - rich amber
            '#8b6f47'  // Default border - bronze
          ],
          'line-width': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            2, // Selected country border width
            1  // Default border width
          ],
          'line-blur': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            0.5, // Subtle glow effect for selected
            0  // No blur for default
          ]
        }
      });

      // Add country center points with warm gold styling
      mapInstance.addLayer({
        id: 'country-points',
        type: 'circle',
        source: 'countries',
        paint: {
          'circle-radius': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            12, // Selected point size
            8   // Default point size
          ],
          'circle-color': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            '#D4AF37', // Selected point - warm gold
            '#CD853F'  // Default point - burnt orange/sandy brown
          ],
          'circle-opacity': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            1.0, // Selected opacity
            0.9  // Default opacity
          ],
          'circle-stroke-width': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            3, // Selected stroke
            2  // Default stroke
          ],
          'circle-stroke-color': '#f7f3e9',
          'circle-stroke-opacity': 0.9
        }
      });

      // Add pulsing animation for selected points with warm gold
      mapInstance.addLayer({
        id: 'country-points-pulse',
        type: 'circle',
        source: 'countries',
        paint: {
          'circle-radius': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            20, // Pulse size
            0   // No pulse for unselected
          ],
          'circle-color': '#D4AF37', // Warm gold
          'circle-opacity': [
            'case',
            ['==', ['get', 'id'], selectedCountry || ''],
            0.4, // Pulse opacity
            0    // No pulse for unselected
          ]
        },
        filter: ['==', ['get', 'id'], selectedCountry || '']
      });

      // Add hover effects with warm cultural styling
      mapInstance.on('mouseenter', 'country-points', (e) => {
        if (e.features && e.features[0]) {
          const feature = e.features[0];
          const properties = feature.properties;
          
          // Change cursor to pointer
          mapInstance.getCanvas().style.cursor = 'pointer';
          
          // Update point styling for hover
          mapInstance.setPaintProperty('country-points', 'circle-radius', [
            'case',
            ['==', ['get', 'id'], properties?.id],
            14, // Hover size
            ['==', ['get', 'id'], selectedCountry || ''],
            12, // Selected size
            8   // Default size
          ]);

          mapInstance.setPaintProperty('country-points', 'circle-color', [
            'case',
            ['==', ['get', 'id'], properties?.id],
            '#D4AF37', // Hover color - warm gold
            ['==', ['get', 'id'], selectedCountry || ''],
            '#D4AF37', // Selected color - warm gold
            '#CD853F'  // Default color - burnt orange
          ]);

          // Update country fill for hover
          mapInstance.setPaintProperty('countries-fill', 'fill-opacity', [
            'case',
            ['==', ['get', 'id'], properties?.id],
            0.9, // Hover opacity
            ['==', ['get', 'id'], selectedCountry || ''],
            0.8, // Selected opacity
            0.6  // Default opacity
          ]);

          // Show tooltip
          if (properties) {
            handleCountryHover(
              properties.id,
              properties.name,
              properties.teaser,
              e.originalEvent,
              true
            );
          }
        }
      });

      mapInstance.on('mouseleave', 'country-points', () => {
        // Reset cursor
        mapInstance.getCanvas().style.cursor = '';
        
        // Reset point styling
        mapInstance.setPaintProperty('country-points', 'circle-radius', [
          'case',
          ['==', ['get', 'id'], selectedCountry || ''],
          12, // Selected size
          8   // Default size
        ]);

        mapInstance.setPaintProperty('country-points', 'circle-color', [
          'case',
          ['==', ['get', 'id'], selectedCountry || ''],
          '#D4AF37', // Selected color - warm gold
          '#CD853F'  // Default color - burnt orange
        ]);

        // Reset country fill
        mapInstance.setPaintProperty('countries-fill', 'fill-opacity', [
          'case',
          ['==', ['get', 'id'], selectedCountry || ''],
          0.8, // Selected opacity
          0.6  // Default opacity
        ]);

        // Hide tooltip
        handleCountryHover('', '', '', new MouseEvent('mouseleave'), false);
      });

      mapInstance.on('mousemove', 'country-points', (e) => {
        handleMouseMove(e.originalEvent);
      });

      // Add click handler for points
      mapInstance.on('click', 'country-points', (e) => {
        if (e.features && e.features[0]) {
          const feature = e.features[0];
          const properties = feature.properties;
          if (properties) {
            // Track country click analytics
            trackCountryClick(properties.id, properties.name);
            onCountrySelect?.(properties.id);
          }
        }
      });

      setIsLoading(false);
      setIsLoaded(true);
    });

    // Handle map errors
    mapInstance.on('error', (e) => {
      console.error('Mapbox error:', e);
      setIsLoading(false);
      // Could implement fallback to SVG here if needed
    });

    map.current = mapInstance;

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [selectedCountry, handleCountryHover, handleMouseMove, onCountrySelect]);

  // Update selected country styling when selectedCountry prop changes
  const updateSelectedCountry = useCallback(() => {
    if (!map.current || !isLoaded) return;

    // Update fill opacity
    map.current.setPaintProperty('countries-fill', 'fill-opacity', [
      'case',
      ['==', ['get', 'id'], selectedCountry || ''],
      0.7, // Selected opacity
      0.4  // Default opacity
    ]);

    // Update border styling
    map.current.setPaintProperty('countries-border', 'line-width', [
      'case',
      ['==', ['get', 'id'], selectedCountry || ''],
      2, // Selected border width
      0.8  // Default border width
    ]);

    // Update point styling
    map.current.setPaintProperty('country-points', 'circle-radius', [
      'case',
      ['==', ['get', 'id'], selectedCountry || ''],
      12, // Selected point size
      8   // Default point size
    ]);

    map.current.setPaintProperty('country-points', 'circle-color', [
      'case',
      ['==', ['get', 'id'], selectedCountry || ''],
      '#D4AF37', // Selected point color - warm gold
      '#CD853F'  // Default point color - burnt orange
    ]);

    // Update pulse layer
    map.current.setPaintProperty('country-points-pulse', 'circle-radius', [
      'case',
      ['==', ['get', 'id'], selectedCountry || ''],
      20, // Pulse size
      0   // No pulse for unselected
    ]);

    map.current.setPaintProperty('country-points-pulse', 'circle-opacity', [
      'case',
      ['==', ['get', 'id'], selectedCountry || ''],
      0.4, // Pulse opacity
      0    // No pulse for unselected
    ]);

    // Update glow layer
    map.current.setPaintProperty('countries-glow', 'fill-opacity', [
      'case',
      ['==', ['get', 'id'], selectedCountry || ''],
      0.2, // Glow for selected
      0    // No glow for others
    ]);
  }, [selectedCountry, isLoaded]);

  // Initialize map
  useEffect(() => {
    const cleanup = initializeMap();
    return cleanup;
  }, [initializeMap]);

  // Update selected country styling when selectedCountry prop changes
  useEffect(() => {
    updateSelectedCountry();
  }, [updateSelectedCountry]);

  // Add pulsing animation for selected country markers
  useEffect(() => {
    if (!map.current || !isLoaded || !selectedCountry) return;

    let pulseRadius = 15;
    let pulseOpacity = 0.6;
    let growing = true;

    const pulseInterval = setInterval(() => {
      if (!map.current) return;

      if (growing) {
        pulseRadius += 0.8;
        pulseOpacity -= 0.02;
        if (pulseRadius >= 25) {
          growing = false;
        }
      } else {
        pulseRadius -= 0.8;
        pulseOpacity += 0.02;
        if (pulseRadius <= 15) {
          growing = true;
        }
      }

      // Update the pulse layer
      map.current.setPaintProperty('country-points-pulse', 'circle-radius', [
        'case',
        ['==', ['get', 'id'], selectedCountry || ''],
        pulseRadius,
        0
      ]);

      map.current.setPaintProperty('country-points-pulse', 'circle-opacity', [
        'case',
        ['==', ['get', 'id'], selectedCountry || ''],
        Math.max(0.1, Math.min(0.6, pulseOpacity)),
        0
      ]);
    }, 50); // 50ms interval for smooth animation

    return () => {
      clearInterval(pulseInterval);
    };
  }, [selectedCountry, isLoaded]);

  return (
    <div className="map-container">
      <div 
        ref={mapContainer} 
        style={{ width: '100%', height: '100%' }}
        role="application"
        aria-label="Interactive world map showing African diaspora locations. Use arrow keys to navigate and Enter to select countries."
        tabIndex={0}
        onKeyDown={(e) => {
          // Basic keyboard navigation for accessibility
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            // If there's a hovered country, select it
            if (tooltip.countryName) {
              // Find the country ID from the tooltip
              const countryData = (countriesData as any).features?.find(
                (feature: any) => feature.properties?.name === tooltip.countryName
              );
              if (countryData?.properties?.id) {
                onCountrySelect?.(countryData.properties.id);
              }
            }
          } else if (e.key === 'Escape') {
            // Clear any selection or tooltip
            setTooltip(prev => ({ ...prev, visible: false }));
            onCountryHover?.(null);
          }
        }}
      />
      
      {isLoading && (
        <div 
          className="map-loading"
          role="status"
          aria-live="polite"
          aria-label="Loading map content"
        >
          <div className="loading-spinner" aria-hidden="true"></div>
          <h3>🌍 Loading Interactive Map</h3>
          <p>Preparing African diaspora locations...</p>
          <div className="loading-progress" role="progressbar" aria-label="Map loading progress">
            <div className="progress-bar"></div>
          </div>
        </div>
      )}

      {tooltip.visible && (
        <div 
          className={`map-tooltip ${tooltip.visible ? 'tooltip-visible' : ''}`}
          style={{
            left: tooltip.x,
            top: tooltip.y
          }}
          role="tooltip"
          aria-live="polite"
          id="map-tooltip"
        >
          <div className="tooltip-media">
            <img 
              className="tooltip-media-image"
              src={getCountryImage(tooltip.countryName)}
              alt={`Cultural landscape of ${tooltip.countryName}`}
              onError={(e) => {
                // Fallback to gradient background if image fails
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div className="tooltip-content">
            <div className="country-name">{tooltip.countryName}</div>
            <div className="country-teaser">{tooltip.content}</div>
            <div className="tooltip-cultural-preview">
              <span className="cultural-tag">Music</span>
              <span className="cultural-tag">Food</span>
              <span className="cultural-tag">Heritage</span>
            </div>
            <div className="tooltip-explore-hint">
              Click to explore cultural connections
            </div>
          </div>
          <div className="tooltip-arrow" aria-hidden="true"></div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;