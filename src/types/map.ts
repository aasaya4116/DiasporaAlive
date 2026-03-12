export interface CountryFeature {
  type: 'Feature';
  properties: {
    id: string;
    name: string;
    hasContent: boolean;
    teaser: string;
  };
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

export interface CountriesGeoJSON {
  type: 'FeatureCollection';
  features: CountryFeature[];
}

export interface MapComponentProps {
  selectedCountry?: string;
  onCountrySelect?: (countryId: string) => void;
  onCountryHover?: (countryId: string | null) => void;
}

export interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  content: string;
  countryName: string;
}