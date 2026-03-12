export interface LocationData {
  id: string;
  name: string;
  region: string;
  coordinates: [number, number];
  overview: {
    summary: string;
    historicalContext: string;
    populationStats: DiasporaStatistic;
  };
  culturalElements: {
    music: CulturalElement[];
    food: CulturalElement[];
    religion: CulturalElement[];
    language: CulturalElement[];
    festivals: CulturalElement[];
  };
  media: {
    featuredImage: MediaAsset;
    gallery: MediaAsset[];
    audioClips?: MediaAsset[];
  };
  connections: {
    africanOrigins: string[];
    relatedLocations: string[];
  };
}

export interface CulturalElement {
  name: string;
  description: string;
  africanRoots: string;
  examples: string[];
  significance: string;
}

export interface DiasporaStatistic {
  population: string;
  percentage: string;
  historicalPeriod: string;
  keyFacts: string[];
}

export interface MediaAsset {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  type: 'image' | 'audio' | 'video';
  thumbnail?: string;
}

export enum CulturalCategory {
  MUSIC = 'music',
  FOOD = 'food',
  RELIGION = 'religion',
  LANGUAGE = 'language',
  FESTIVALS = 'festivals'
}

export interface LocationProfileProps {
  locationId: string;
  isOpen: boolean;
  onClose: () => void;
  onRelatedLocationSelect: (locationId: string) => void;
}