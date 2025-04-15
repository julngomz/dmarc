export interface Location {
  id: number;
  name: string;
  address: string;
  type: string;
  network: 'in-network' | 'out-of-network';
}

export interface TailwindConfig {
  theme: {
    fontFamily: {
      sans: string[];
    };
    extend: {
      colors: {
        primary: string;
        'primary-dark': string;
        secondary: string;
        success: string;
      };
    };
  };
}

// Mock data for locations
export const mockLocations: Location[] = [
  {
    id: 1,
    name: "Public Pantry - Leicester Square",
    address: "Leicester Square, London",
    type: "Public",
    network: "in-network"
  },
  {
    id: 2,
    name: "Public Pantry - Trafalgar Square",
    address: "Trafalgar Square, London",
    type: "Public",
    network: "out-of-network"
  },
  {
    id: 3,
    name: "Pantry - Charing Cross",
    address: "Charing Cross Station, London",
    type: "Station",
    network: "in-network"
  },
  {
    id: 4,
    name: "Public Pantry - Embankment",
    address: "Embankment, London",
    type: "Public",
    network: "in-network"
  }
];
