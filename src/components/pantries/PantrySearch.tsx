// File: PantrySearch.tsx
import React, { useState, useEffect, useRef } from 'react';
import { PantryFeature } from './types';
import PantriesList from './List';
import PantriesSearchInput from './SearchInput';
import { ChevronDown, MapPin, Search as LRSearch } from 'lucide-react';

interface SearchProps {
  onPantrySelect: (pantry: PantryFeature) => void;
  userLocation?: [number, number];
  pantryData?: PantryFeature[];
  className?: string;
}

const Search: React.FC<SearchProps> = ({
  onPantrySelect,
  userLocation,
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pantries, setPantries] = useState<PantryFeature[]>([]);
  const [filteredPantries, setFilteredPantries] = useState<PantryFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loadPantries = async () => {
      try {
        const response = await fetch('/data/metro/pantries.json');
        const data = await response.json();
        setPantries(data.features);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading pantries:', error);
        setIsLoading(false);
      }
    };
    loadPantries();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredPantries([]);
      return;
    }

    const filtered = pantries.filter(pantry =>
      pantry.properties.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pantry.properties.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPantries(filtered);
  }, [searchTerm, pantries]);

  const calculateDistance = (coords1: [number, number], coords2: [number, number]): number => {
    const R = 3959; // Earth's radius in miles
    const lat1 = coords1[1] * Math.PI / 180;
    const lat2 = coords2[1] * Math.PI / 180;
    const deltaLat = (coords2[1] - coords1[1]) * Math.PI / 180;
    const deltaLon = (coords2[0] - coords1[0]) * Math.PI / 180;
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getSortedPantries = () => {
    if (!userLocation) return pantries;
    return [...pantries].sort((a, b) => {
      const distanceA = calculateDistance(userLocation, a.geometry.coordinates);
      const distanceB = calculateDistance(userLocation, b.geometry.coordinates);
      return distanceA - distanceB;
    });
  };

  // Get nearest pantry for display
  const getNearestPantry = () => {
    if (!userLocation || pantries.length === 0) return null;
    return getSortedPantries()[0];
  };

  const nearestPantry = getNearestPantry();

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    if (value.trim() !== '') {
      setIsExpanded(true);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    // Focus the input when expanded
    if (!isExpanded && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  return (
    <div className={`absolute top-0 left-0 right-0 z-10 select-none flex flex-col gap-2 md:left-4 md:right-auto md:top-4 ${className}`}>
      <div className="px-2 md:px-0 bg-white rounded-none left-0 right-0 top-0 overflow-hidden md:rounded-md md:w-80">
        {/* Search Header */}
        <div
          className="flex grow items-center align-center gap-1 cursor-pointer border-b border-gray-200 md:hover:bg-gray-50"
          onClick={toggleExpand}>
          <div className='p-2 bg-white'>
            <LRSearch className="w-5 h-5 m-1 text-gray-800" />
          </div>
          <div className='flex w-full justify-between p-2 items-center'>
            <span className="text-gray-800 font-medium">Find a Pantry</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`}
            />
          </div>
        </div>

        {/* Search Input and Results */}
        {isExpanded && (
          <div className="p-4 space-y-4 max-h-[70vh] md:max-h-[80vh] overflow-hidden flex flex-col">
            {/* Search Input */}
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder={userLocation ? "Search or use your location" : "Search by name or address"}
                className="w-full p-3 pl-10 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LRSearch className="h-5 w-5 text-gray-400" />
              </div>

              {/* Current Location & Nearest Pantry */}
              {userLocation && nearestPantry && (
                <div className="flex justify-between items-center mt-2 text-xs text-gray-600">
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

            {/* Pantries List - Added flex-1 and overflow-y-auto */}
            <div className="flex-1 overflow-y-auto">
              <PantriesList
                isLoading={isLoading}
                searchTerm={searchTerm}
                filteredPantries={filteredPantries}
                getSortedPantries={getSortedPantries}
                userLocation={userLocation}
                calculateDistance={calculateDistance}
                onPantrySelect={(pantry) => {
                  onPantrySelect(pantry);
                  setIsExpanded(false);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
