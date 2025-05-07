export interface PantryFeature {
    type: 'Feature';
    properties: {
      name: string;
      address: string;  
      phone: string;
      email: string;
      website: string;
      [key: string]: any;
    };
    geometry: {
      type: 'Point';
      coordinates: [number, number]; // [longitude, latitude]
    };
  }
  
  export interface PantryCollection {
    type: 'FeatureCollection';
    features: PantryFeature[];
  }
  