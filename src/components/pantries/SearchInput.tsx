import React, { useRef, useEffect } from 'react';
import { PantryFeature } from './types';
import { MapPin, Search } from 'lucide-react';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  userLocation?: [number, number];
  nearestPantry: PantryFeature | null;
  calculateDistance: (coords1: [number, number], coords2: [number, number]) => number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  userLocation,
  nearestPantry,
  calculateDistance
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the input when the component mounts
  useEffect(() => {
    // Don't auto-focus on mobile devices to avoid keyboard popping up immediately
    if (inputRef.current && window.innerWidth >= 768) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder={userLocation ? "Search or use your location" : "Search by name or address"}
          className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Current Location & Nearest Pantry */}
      {userLocation && nearestPantry && (
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1 text-blue-500" />
            <span>Current Location</span>
          </div>
          <div>
            <span>Nearest: {calculateDistance(userLocation, nearestPantry.geometry.coordinates).toFixed(1)} mi</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
