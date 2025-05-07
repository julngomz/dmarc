import { useState, useEffect } from 'react';
import PantriesMap from './PantriesMap';
import PantrySearch from './PantrySearch';
import PantryPopup from './PantryPopup';
import { PantryFeature } from './types';

const PantriesPage = () => {
  const [selectedPantry, setSelectedPantry] = useState<PantryFeature | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | undefined>(undefined);

  const handlePantrySelect = (pantry: PantryFeature) => {
    setSelectedPantry(pantry);
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
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="w-80 bg-white shadow-xl z-10">
        <div className="p-6 h-full overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6">Find a Pantry</h1>
          <PantrySearch 
            onPantrySelect={handlePantrySelect}
            userLocation={userLocation}
          />
        </div>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        <PantriesMap 
          onPantrySelect={handlePantrySelect}
          userLocation={userLocation}
        />
      </div>

      {selectedPantry && (
        <PantryPopup
          pantry={selectedPantry}
          onClose={() => setSelectedPantry(null)}
        />
      )}
    </div>
  );
};

export default PantriesPage;
