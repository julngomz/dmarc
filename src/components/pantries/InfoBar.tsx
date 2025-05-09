import React from 'react';
import { PantryFeature } from './types';
import { MapPin, ChevronRight, PhoneCall, Globe, Mail, X } from 'lucide-react';

interface InfoBarProps {
  pantry: PantryFeature;
  onClose: () => void;
  onViewDetails: (pantry: PantryFeature) => void;
  userLocation?: [number, number];
  calculateDistance?: (coords1: [number, number], coords2: [number, number]) => number;
}

const InfoBar: React.FC<InfoBarProps> = ({
  pantry,
  onClose,
  onViewDetails,
  userLocation,
  calculateDistance
}) => {
  // Calculate distance if both user location and calculate function are provided
  const distance = userLocation && calculateDistance
    ? calculateDistance(userLocation, pantry.geometry.coordinates).toFixed(1)
    : null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-11/12 max-w-md">
      <div className="bg-white rounded-md shadow-lg overflow-hidden">
        {/* Header bar with dismiss button */}
        <div className="flex justify-between items-center p-3 border-b border-gray-200">
          <div className="font-medium text-gray-800 truncate">
            {pantry.properties.name}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 space-y-2">
          {/* Address */}
          <div className="flex items-start text-sm">
            <MapPin className="w-4 h-4 mr-2 mt-0.5 text-blue-600 flex-shrink-0" />
            <div className="text-gray-700 flex-1 truncate">
              {pantry.properties.address}
              {distance && (
                <span className="ml-2 text-blue-600 font-medium">({distance} mi)</span>
              )}
            </div>
          </div>

          {/* Contact options: icon grid */}
          <div className="flex justify-start gap-3 pt-1">
            {pantry.properties.phone && (
              <a
                href={`tel:${pantry.properties.phone}`}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                aria-label="Call pantry"
              >
                <PhoneCall className="w-5 h-5" />
              </a>
            )}

            {pantry.properties.email && (
              <a
                href={`mailto:${pantry.properties.email}`}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                aria-label="Email pantry"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}

            {pantry.properties.website && (
              <a
                href={pantry.properties.website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                aria-label="Visit pantry website"
              >
                <Globe className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        {/* View details button */}
        <button
          onClick={() => onViewDetails(pantry)}
          className="w-full p-3 bg-blue-50 text-blue-600 font-medium text-sm hover:bg-blue-100 transition-colors flex justify-between items-center"
        >
          <span>View Full Details</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InfoBar
