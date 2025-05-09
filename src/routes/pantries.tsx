import { createFileRoute } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import Map from '../components/pantries/Map.tsx';
import PantrySearch from '../components/pantries/PantrySearch';
import Popup from '../components/pantries/Popup.tsx';
import InfoBar from '../components/pantries/InfoBar.tsx';
import { PantryFeature } from '../components/pantries/types';

function Pantries() {
  const [selectedPantry, setSelectedPantry] = useState<PantryFeature | null>(null);
  const [showFullDetails, setShowFullDetails] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<[number, number] | undefined>(undefined);

  const handlePantrySelect = (pantry: PantryFeature) => {
    setSelectedPantry(pantry);
    setShowFullDetails(false); // Just show the info bar first, not the full popup
  };

  const handleViewDetails = (pantry: PantryFeature) => {
    setShowFullDetails(true); // Show the full popup
  };

  const handleCloseDetails = () => {
    setShowFullDetails(false);
    setSelectedPantry(null);
  };

  const handleCloseInfoBar = () => {
    setSelectedPantry(null);
  };

  // Haversine formula to calculate distance between two coordinates
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

  useEffect(() => {
    const requestLocation = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        setUserLocation([position.coords.longitude, position.coords.latitude] as [number, number]);
      } catch (error) {
        console.error('Error getting location:', error);
      }
    };

    requestLocation();
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen overflow-hidden">
      {/* Map - Main Content */}
      <div className="flex-1 relative h-full">
        <Map
          onPantrySelect={handlePantrySelect}
          userLocation={userLocation}
          selectedPantry={selectedPantry} // Pass selected pantry to highlight pin
        />

        {/* PantrySearch component */}
        <PantrySearch
          onPantrySelect={handlePantrySelect}
          userLocation={userLocation}
        />

        {/* PantryInfoBar - Shows when a pantry is selected */}
        {selectedPantry && !showFullDetails && (
          <InfoBar
            pantry={selectedPantry}
            onClose={handleCloseInfoBar}
            onViewDetails={handleViewDetails}
            userLocation={userLocation}
            calculateDistance={calculateDistance}
          />
        )}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/pantries')({
  component: Pantries,
});
