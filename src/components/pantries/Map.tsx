import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PantryFeature } from './types';

interface MapProps {
  onPantrySelect: (pantry: PantryFeature) => void;
  userLocation?: [number, number];
  selectedPantry?: PantryFeature | null; // Make it optional to avoid errors if not provided
}

const Map: React.FC<MapProps> = ({
  onPantrySelect,
  userLocation,
  selectedPantry = null // Provide default value
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [pantries, setPantries] = useState<PantryFeature[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const markersRef = useRef<{ [id: string]: maplibregl.Marker }>({});
  const selectedMarkerRef = useRef<maplibregl.Marker | null>(null);
  const userMarkerRef = useRef<maplibregl.Marker | null>(null);
  const [mapInitialized, setMapInitialized] = useState<boolean>(false);

  // Load pantries data
  useEffect(() => {
    const loadPantries = async () => {
      try {
        const response = await fetch('/data/metro/pantries.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch pantries: ${response.status}`);
        }
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

  // Initialize map with explicit dimensions and debug logging
  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    console.log('Initializing map...');

    // Ensure map container has dimensions
    if (mapContainer.current.offsetWidth === 0 || mapContainer.current.offsetHeight === 0) {
      console.error('Map container has zero dimensions. Width:', mapContainer.current.offsetWidth, 'Height:', mapContainer.current.offsetHeight);
    }

    // Default center on Des Moines
    const defaultCenter: [number, number] = [-93.6091, 41.6005];

    try {
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: 'https://mapprojectbucket.s3.us-west-2.amazonaws.com/blueberry.json',
        center: defaultCenter,
        zoom: 11,
        attributionControl: false // Disable attribution for cleaner look
      });

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setMapInitialized(true);
      });

      map.current.on('error', (e) => {
        console.error('Map error:', e);
      });

      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      console.log('Cleaning up map');
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add pantry markers once map is initialized and data is loaded
  useEffect(() => {
    if (!map.current || !mapInitialized || isLoading || pantries.length === 0) {
      return;
    }

    console.log('Adding pantry markers:', pantries.length);

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Create bounds object
    const bounds = new maplibregl.LngLatBounds();
    let markersAdded = 0;

    pantries.forEach(pantry => {
      try {
        const id = `${pantry.properties.name}-${pantry.properties.address}`;
        const coords = pantry.geometry.coordinates;

        // Validate coordinates
        if (!Array.isArray(coords) || coords.length !== 2 ||
          typeof coords[0] !== 'number' || typeof coords[1] !== 'number') {
          console.error('Invalid coordinates for pantry:', pantry);
          return;
        }

        // Create marker element
        const el = document.createElement('div');
        el.className = 'pantry-marker';
        el.style.width = '25px';
        el.style.height = '25px';
        el.style.backgroundImage = 'url(/images/marker.svg)';
        el.style.backgroundSize = 'contain';
        el.style.backgroundRepeat = 'no-repeat';
        el.style.cursor = 'pointer';

        // Create and add marker
        const marker = new maplibregl.Marker(el)
          .setLngLat(coords)
          .addTo(map.current!);

        // Add click handler
        marker.getElement().addEventListener('click', () => {
          onPantrySelect(pantry);
        });

        // Store reference
        markersRef.current[id] = marker;

        // Add coordinates to bounds
        bounds.extend(coords);
        markersAdded++;
      } catch (error) {
        console.error('Error adding marker for pantry:', pantry, error);
      }
    });

    console.log('Added markers:', markersAdded);

    // Only fit bounds if we added markers
    if (markersAdded > 0) {
      try {
        map.current.fitBounds(bounds, {
          padding: 50,
          maxZoom: 15
        });
      } catch (error) {
        console.error('Error fitting bounds:', error);
      }
    }
  }, [pantries, isLoading, onPantrySelect, mapInitialized]);

  // Update user location marker
  useEffect(() => {
    if (!map.current || !mapInitialized || !userLocation) return;

    console.log('Updating user location marker');

    try {
      // Remove existing user marker
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }

      // Create the outer pulse effect
      const pulseRing = document.createElement('div');
      pulseRing.className = 'user-location-pulse';
      pulseRing.style.width = '50px';
      pulseRing.style.height = '50px';
      pulseRing.style.borderRadius = '50%';
      pulseRing.style.backgroundColor = 'rgba(66, 133, 244, 0.2)';
      pulseRing.style.position = 'absolute';
      pulseRing.style.top = '-15px';
      pulseRing.style.left = '-15px';
      pulseRing.style.animation = 'pulse 2s infinite';

      // Create the inner dot
      const innerDot = document.createElement('div');
      innerDot.className = 'user-location-dot';
      innerDot.style.width = '20px';
      innerDot.style.height = '20px';
      innerDot.style.borderRadius = '50%';
      innerDot.style.backgroundColor = '#4285F4';
      innerDot.style.border = '3px solid white';
      innerDot.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
      innerDot.style.position = 'absolute';
      innerDot.style.top = '0';
      innerDot.style.left = '0';
      innerDot.style.right = '0';
      innerDot.style.bottom = '0';
      innerDot.style.margin = 'auto';
      innerDot.style.zIndex = '2';

      // Create a container for both elements
      const markerContainer = document.createElement('div');
      markerContainer.className = 'user-location-marker';
      markerContainer.style.width = '20px';
      markerContainer.style.height = '20px';
      markerContainer.style.position = 'relative';

      // Add label below the marker
      const label = document.createElement('div');
      label.className = 'user-location-label';
      label.textContent = 'Your Location';
      label.style.position = 'absolute';
      label.style.bottom = '-25px';
      label.style.left = '50%';
      label.style.transform = 'translateX(-50%)';
      label.style.whiteSpace = 'nowrap';
      label.style.padding = '2px 6px';
      label.style.borderRadius = '10px';
      label.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      label.style.fontSize = '12px';
      label.style.fontWeight = 'bold';
      label.style.color = '#4285F4';
      label.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.2)';

      // Assemble the marker
      markerContainer.appendChild(pulseRing);
      markerContainer.appendChild(innerDot);
      markerContainer.appendChild(label);

      // Create and add marker to map
      userMarkerRef.current = new maplibregl.Marker({
        element: markerContainer,
        anchor: 'center'
      })
        .setLngLat(userLocation)
        .addTo(map.current);

      // Add a pulsing animation style
      const style = document.createElement('style');
      style.textContent = `
        @keyframes pulse {
          0% {
            transform: scale(0.5);
            opacity: 1;
          }
          70% {
            transform: scale(2);
            opacity: 0;
          }
          100% {
            transform: scale(0.5);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      // Center map on user location with a nicely animated flyTo
      map.current.flyTo({
        center: userLocation,
        zoom: 14,
        speed: 0.8,
        curve: 1,
        essential: true
      });

      // Add a radius circle around the user's location
      const sourceId = 'user-location-radius';
      const layerId = 'user-location-radius-layer';

      // Remove existing source and layer if they exist
      if (map.current.getSource(sourceId)) {
        if (map.current.getLayer(layerId)) {
          map.current.removeLayer(layerId);
        }
        map.current.removeSource(sourceId);
      }

      // Add a new source and layer for the radius
      map.current.addSource(sourceId, {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: userLocation
          },
          properties: {}
        }
      });

      map.current.addLayer({
        id: layerId,
        type: 'circle',
        source: sourceId,
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'],
            10, 100,  // At zoom level 10, radius is 100px
            15, 300,  // At zoom level 15, radius is 300px
            20, 600   // At zoom level 20, radius is 600px
          ],
          'circle-color': '#4285F4',
          'circle-opacity': 0.1,
          'circle-stroke-width': 2,
          'circle-stroke-color': '#4285F4',
          'circle-stroke-opacity': 0.3
        }
      });

    } catch (error) {
      console.error('Error updating user location marker:', error);
    }
  }, [userLocation, mapInitialized]);

  // Highlight selected pantry marker
  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    try {
      // Reset any previously selected marker
      if (selectedMarkerRef.current) {
        const el = selectedMarkerRef.current.getElement();
        el.style.zIndex = '0';
        el.style.transform = 'scale(1)';
        el.style.filter = 'none';
        selectedMarkerRef.current = null;
      }

      // Highlight new selected marker
      if (selectedPantry) {
        const id = `${selectedPantry.properties.name}-${selectedPantry.properties.address}`;
        const marker = markersRef.current[id];

        if (marker) {
          const el = marker.getElement();
          el.style.zIndex = '1000'; // Higher z-index to ensure it's on top
          el.style.transform = 'scale(1.3)';
          el.style.filter = 'drop-shadow(0 0 6px rgba(0, 0, 0, 0.3))';
          selectedMarkerRef.current = marker;

          // Fly to the selected marker
          map.current.flyTo({
            center: selectedPantry.geometry.coordinates,
            zoom: 15,
            offset: [0, -100] // Offset to account for the info bar
          });
        }
      }
    } catch (error) {
      console.error('Error highlighting selected marker:', error);
    }
  }, [selectedPantry, mapInitialized]);

  // Function to center map on user location
  const centerOnUserLocation = () => {
    if (!map.current || !userLocation) return;

    map.current.flyTo({
      center: userLocation,
      zoom: 14,
      speed: 1.2,
      curve: 1.5
    });
  };

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapContainer}
        className="w-full h-full bg-gray-100"
        style={{ minHeight: '100%' }}
      />

      {userLocation && (
        <button
          onClick={centerOnUserLocation}
          className="absolute bottom-6 right-6 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10"
          aria-label="Center map on your location"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Map;
