
import React from 'react';
import { PantryFeature } from './types';

interface ListItemProps {
  pantry: PantryFeature;
  userLocation?: [number, number];
  calculateDistance: (coords1: [number, number], coords2: [number, number]) => number;
  onPantrySelect: (pantry: PantryFeature) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  pantry,
  userLocation,
  calculateDistance,
  onPantrySelect
}) => {
  return (
    <div
      onClick={() => onPantrySelect(pantry)}
      className="p-4 bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
    >
      <h3 className="font-semibold text-gray-900">{pantry.properties.name}</h3>
      <p className="text-sm text-gray-600 mt-1">{pantry.properties.address}</p>
      {userLocation && (
        <p className="text-sm text-blue-600 mt-2 font-medium flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {calculateDistance(userLocation, pantry.geometry.coordinates).toFixed(1)} miles away
        </p>
      )}
    </div>
  );
};

export default ListItem;

