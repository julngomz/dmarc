import React from 'react';
import { Location } from '../../lib/types';

interface LocationCardProps {
  location: Location
  onClick: () => void
}

const LocationCard: React.FC<LocationCardProps> = ({
  location,
  onClick
}: LocationCardProps) => {
  return (
    <div
      className="p-4 border-b hover:bg-gray-50 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden flex items-center justify-center text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
        <div className="flex-grow">
          <h3 className="font-medium text-primary">{location.name}</h3>
          <p className="text-sm text-gray-600">{location.address}</p>
          <div className="flex items-center mt-1 justify-between">
            <p className="text-xs text-gray-500">{location.type}</p>
            <span className={`text-xs px-2 py-0.5 rounded-full ${location.network === 'in-network'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
              }`}>
              {location.network === 'in-network' ? 'In-Network' : 'Out-of-Network'}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 mt-1">
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white">
            {location.id}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
