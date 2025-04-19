import React from 'react';
import { X } from 'lucide-react';
import { Location } from '../../lib/types';

interface LocationModalProps {
  isOpen: boolean;
  location: Location | null;
  closeModal: () => void;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, location, closeModal }) => {
  if (!isOpen || !location) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-30">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-bold text-primary">{location.name}</h2>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex items-center mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${location.network === 'in-network'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
              }`}>
              {location.network === 'in-network' ? 'In-Network' : 'Out-of-Network'}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-1">Address</h3>
            <p>{location.address}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-1">Type</h3>
            <p>{location.type}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-1">Facilities</h3>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-blue-100 text-primary-dark text-xs px-2 py-1 rounded">Wheelchair Access</span>
              <span className="bg-blue-100 text-primary-dark text-xs px-2 py-1 rounded">Baby Changing</span>
              <span className="bg-blue-100 text-primary-dark text-xs px-2 py-1 rounded">Gender Neutral</span>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold text-gray-700 mb-1">Opening Hours</h3>
            <p className="text-gray-600">Open 24 hours</p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
