import { PantryFeature } from './types';

interface PopupProps {
  pantry: PantryFeature;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ pantry, onClose }) => {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50 transition-all duration-200 ease-in-out"
      onClick={onClose}
    >
      <div
        className="bg-white/95 backdrop-blur-md p-6 rounded-lg shadow-xl max-w-md w-full mx-4 transition-all duration-200 ease-in-out"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">{pantry.properties.name}</h2>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700 p-2"
            aria-label="Close popup"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-700">Address</h3>
            <p className="text-gray-900">{pantry.properties.address}</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700">Contact</h3>
            <div className="space-y-2">
              {pantry.properties.phone && (
                <p className="text-gray-900">
                  <a href={`tel:${pantry.properties.phone}`} className="hover:text-blue-600 transition-colors">
                    {pantry.properties.phone}
                  </a>
                </p>
              )}
              {pantry.properties.email && (
                <p className="text-gray-900">
                  <a href={`mailto:${pantry.properties.email}`} className="hover:text-blue-600 transition-colors">
                    {pantry.properties.email}
                  </a>
                </p>
              )}
              {pantry.properties.website && (
                <p className="text-gray-900">
                  <a href={pantry.properties.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                    Visit Website
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup
