import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MapContainer from '../MapContainer';

describe('MapContainer', () => {
  it('renders map container with countries', () => {
    render(<MapContainer />);
    // Check that the map container is rendered
    const mapContainer = document.querySelector('.map-container');
    expect(mapContainer).toBeInTheDocument();
    
    // Check that countries are rendered (Brazil should be visible)
    expect(screen.getByText('Brazil')).toBeInTheDocument();
    expect(screen.getByText('Haiti')).toBeInTheDocument();
    expect(screen.getByText('Jamaica')).toBeInTheDocument();
  });

  it('accepts country selection callback prop', () => {
    const mockOnCountrySelect = vi.fn();
    render(<MapContainer onCountrySelect={mockOnCountrySelect} />);
    // Component should render without errors when callback is provided
    expect(screen.getByText('Brazil')).toBeInTheDocument();
  });

  it('accepts country hover callback prop', () => {
    const mockOnCountryHover = vi.fn();
    render(<MapContainer onCountryHover={mockOnCountryHover} />);
    // Component should render without errors when callback is provided
    expect(screen.getByText('Brazil')).toBeInTheDocument();
  });
});