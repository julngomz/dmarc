import { useEffect, useRef, useState } from 'react';
import maplibregl, { Map as MLMap, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PantryFeature } from './types';
import { mapStyle } from '../../lib/map/style';

interface PantriesMapProps {
  onPantrySelect: (pantry: PantryFeature) => void;
  userLocation?: [number, number];
}

const PantriesMap: React.FC<PantriesMapProps> = ({ onPantrySelect, userLocation }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<MLMap | null>(null);
  const markersRef = useRef<Marker[]>([]);
  const userMarkerRef = useRef<Marker | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    try {
      const newMap = new MLMap({
        container: mapContainer.current,
        style: mapStyle,
        center: [-93.63103503160843, 41.58736757438154],
        zoom: 11,
        bounds: [[-93.952374, 41.419612], [-93.367352, 41.778021]], // Des Moines metro bounds
        maxBounds: [[-94.5, 41.0], [-93.0, 42.0]], // Slightly larger than metro for context
        attributionControl: { compact: true }
      });

      newMap.on('load', async () => {
        console.log('Map loaded successfully');
        try {
          const response = await fetch('/data/metro/pantries.json');
          const data = await response.json();
          const pantries = data.features;

          pantries.forEach((pantry: PantryFeature) => {
            const marker = new Marker({ color: '#FF0000' })
              .setLngLat(pantry.geometry.coordinates)
              .addTo(newMap);

            marker.getElement().addEventListener('click', () => {
              onPantrySelect(pantry);
            });

            markersRef.current.push(marker);
          });

          if (userLocation) {
            userMarkerRef.current = new Marker({ color: '#0000FF' })
              .setLngLat(userLocation)
              .addTo(newMap);
          }
        } catch (error) {
          console.error('Error loading pantries:', error);
        }
      });

      newMap.on('error', (e) => {
        console.error('Map error:', e);
        setError('Failed to load map');
      });

      map.current = newMap;
    } catch (err) {
      console.error('Map initialization error:', err);
      setError('Failed to initialize map');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
        userMarkerRef.current = null;
      }
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
    };
  }, [onPantrySelect]);

  useEffect(() => {
    if (map.current && userLocation) {
      // Remove existing user marker if it exists
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }

      // Create new user marker
      userMarkerRef.current = new Marker({ color: '#0000FF' })
        .setLngLat(userLocation)
        .addTo(map.current);

      map.current.flyTo({
        center: userLocation,
        zoom: 12
      });
    }
  }, [userLocation]);

  if (error) {
    return (
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg bg-red-50 flex items-center justify-center">
        <p className="text-red-600">Error loading map: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }} />
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50">
          <p className="text-red-600">{error}</p>
        </div>
      )}

    </div>
  );
};

export default PantriesMap;
