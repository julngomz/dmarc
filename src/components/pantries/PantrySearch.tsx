import { useState, useEffect } from 'react';
import { PantryFeature } from './types';

interface PantrySearchProps {
  onPantrySelect: (pantry: PantryFeature) => void;
  userLocation?: [number, number];
}

const PantrySearch: React.FC<PantrySearchProps> = ({ onPantrySelect, userLocation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [pantries, setPantries] = useState<PantryFeature[]>([]);
  const [filteredPantries, setFilteredPantries] = useState<PantryFeature[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const a = Math.sin(deltaLat/2) * Math.sin(deltaLat/2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon/2) * Math.sin(deltaLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

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

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or address"
          className="w-full p-3 border rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        />
      </div>

      {isLoading ? (
        <div className="text-center py-4 text-gray-500">Loading pantries...</div>
      ) : (
        <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto pr-2">
          {filteredPantries.length === 0 && searchTerm !== '' && (
            <div className="text-center py-4 text-gray-500">No pantries found</div>
          )}
          {(searchTerm.trim() ? filteredPantries : getSortedPantries()).map((pantry) => (
            <div
              key={pantry.properties.name}
              onClick={() => onPantrySelect(pantry)}
              className="p-4 bg-white border rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-gray-900">{pantry.properties.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{pantry.properties.address}</p>
              {userLocation && (
                <p className="text-sm text-blue-600 mt-2 font-medium">
                  {calculateDistance(userLocation, pantry.geometry.coordinates).toFixed(1)} miles away
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PantrySearch;
