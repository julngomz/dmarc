import React, { useEffect, useRef } from 'react';
import { PantryFeature } from './types';
import ListItem from './ListItem';

interface ListProps {
  isLoading: boolean;
  searchTerm: string;
  filteredPantries: PantryFeature[];
  getSortedPantries: () => PantryFeature[];
  userLocation?: [number, number];
  calculateDistance: (coords1: [number, number], coords2: [number, number]) => number;
  onPantrySelect: (pantry: PantryFeature) => void;
}

const List: React.FC<ListProps> = ({
  isLoading,
  searchTerm,
  filteredPantries,
  getSortedPantries,
  userLocation,
  calculateDistance,
  onPantrySelect
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const prevSearchTermRef = useRef<string>('');

  // Scroll to top when search term changes
  useEffect(() => {
    if (prevSearchTermRef.current !== searchTerm && listRef.current) {
      listRef.current.scrollTop = 0;
    }
    prevSearchTermRef.current = searchTerm;
  }, [searchTerm]);

  if (isLoading) {
    return <div className="text-center py-4 text-gray-500">Loading pantries...</div>;
  }

  // Display filtered pantries if search term exists, otherwise show sorted pantries
  const pantriesToDisplay = searchTerm.trim() ? filteredPantries : getSortedPantries();

  if (filteredPantries.length === 0 && searchTerm !== '') {
    return <div className="text-center py-4 text-gray-500">No pantries found</div>;
  }

  // Limit the number of items to show based on the screen size
  const pantryLimit = window.innerWidth < 768 ? 5 : 15;
  const displayPantries = pantriesToDisplay.slice(0, pantryLimit);
  const hasMore = pantriesToDisplay.length > pantryLimit;

  return (
    <div
      ref={listRef}
      className="space-y-3 pr-2 h-96"
    >
      {displayPantries.length === 0 ? (
        <div className="text-center py-4 text-gray-500">Loading results...</div>
      ) : (
        <>
          {displayPantries.map((pantry) => (
            <ListItem
              key={`${pantry.properties.name}-${pantry.properties.address}`}
              pantry={pantry}
              userLocation={userLocation}
              calculateDistance={calculateDistance}
              onPantrySelect={onPantrySelect}
            />
          ))}

          {hasMore && (
            <div className="text-center py-2 text-sm text-blue-600">
              {pantriesToDisplay.length - pantryLimit} more pantries available
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;
