export interface Location {
  id: number;
  name: string;
  address: string;
  type: string;
  network: 'in-network' | 'out-of-network';
}


/*
 *  The Record reperesents on record (row) in a data set.
 * */
export interface Record<T> {
  id: number
  data: T,
}

/*
 * The Collection type represents the entire data set.
 * */
export interface Collection {
  race: string,
  education: string,
  ageRange: string,
  snap: string,
}

export interface Pantry {
  name: string,
  benefitName: string
  data: Collection[]
}

export interface Crumbs {
  demographic: string
  demographicSubcategory: string
  selectedCity: string
  selectedZipCode: string
  year: string
  month: string
}

export interface PantryRecord {
  id: string | number
  benefitName: string
  name: string
  race: string
  pantryLocation: string
  snap: string
  education: string
  zipCode: string
  year: string
  month: string
  demographic: string
  ageRange: string,
  actualCompletionDate: string
}

export interface PantryFeature {
  type: 'Feature';
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    id?: string;
    name: string;
    address?: string;
    hours?: string;
    phone?: string;
    website?: string;
    services?: string[];
    requirements?: string;
    notes?: string;
  };
}

export interface PantryCollection {
  type: 'FeatureCollection';
  features: PantryFeature[];
}