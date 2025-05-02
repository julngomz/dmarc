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

export type Crumbs = {
  year: string
  month: string
  selectedCity: string
  selectedZipCode: string
  demographic: string
  demographicSubcategory: string
}
