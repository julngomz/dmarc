import maplibregl from "maplibre-gl"
import 'maplibre-gl/dist/maplibre-gl.css'
import * as MAP_DEFAULTS from "../../lib/metro_map/defaults/index"
import { useEffect, useRef, useState } from "react"
import { Protocol } from "pmtiles"
import MetroMap from "../../lib/metro_map/MetroMap"
import PopUp from "./Popup"

interface MapProps {
  context: string,
}

const Map: React.FC<MapProps> = ({ context }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<MetroMap | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  const protocol = new Protocol()
  maplibregl.addProtocol("pmtiles", protocol.tile)

  useEffect(() => {
    if (map.current) return
    if (!mapContainer.current) return

    try {
      map.current = new MetroMap({
        container: mapContainer.current,
        style: {
          version: 8,
          glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
          sources: {
            'osm': MAP_DEFAULTS.SOURCES.BASEMAP,
            'cities': MAP_DEFAULTS.SOURCES.CITIES,
            'zips': MAP_DEFAULTS.SOURCES.ZIP_CODES,
            'nhoods': MAP_DEFAULTS.SOURCES.NHOODS,
            // 'pantries': {
            //  type: 'geojson',
            //  data: '/data/metro/pantries.json'
            // }
          },
          layers: [
            MAP_DEFAULTS.LAYERS.BASEMAP,
            ...MAP_DEFAULTS.LAYERS.NHOODS,
            ...MAP_DEFAULTS.LAYERS.CITIES,
            ...MAP_DEFAULTS.LAYERS.ZIP_CODE,
            // {
            //  id: 'pantries',
            //  type: 'circle',
            //  source: 'pantries',
            //  paint: {
            //    'circle-color': '#FF0000',
            //    'circle-radius': 6,
            //    'circle-stroke-width': 2,
            //    'circle-stroke-color': '#FFFFFF'
            //  }
            //}
          ]
        },
        center: MAP_DEFAULTS.STATIC.MAP_CENTER,
        maxBounds: MAP_DEFAULTS.STATIC.BOUNDS,
        dragRotate: false,
        keyboard: false,
        touchZoomRotate: true,
        scrollZoom: true,
        doubleClickZoom: false,
        attributionControl: false,
        dragPan: false,
        cooperativeGestures: false,
        touchPitch: false
      },
        'zips',
        ['zips', 'cities', 'nhoods']
      )

      // Add error handling for tile loading
      map.current.on('error', (e) => {
        console.error('Map error:', e.error);
        setMapError('Failed to load map tiles. Please check your internet connection.');
      });

    } catch (error) {
      console.error("Error loading map:", error)
      setMapError('Failed to initialize map. Please refresh the page.');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    }
  }, []);

  // Update the map when the context changes when picking a list from dropdown options
  useEffect(() => {
    if (!map.current) return

    if (!map.current!.loaded()) {
      map.current.once('load', () => {
        map.current!.setContext(context)
      })
    } else {
      map.current.setContext(context)
    }
  }, [context])

  if (mapError) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="text-center p-4">
          <p className="text-red-500">{mapError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
  );
}

export default Map
