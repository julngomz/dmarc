import maplibregl from "maplibre-gl"
import 'maplibre-gl/dist/maplibre-gl.css'
import * as MAP_DEFAULTS from "../../lib/map/defaults"
import { useEffect, useRef, useState } from "react"
import { Protocol } from "pmtiles"
import MetroMap from "../../lib/map/MetroMap"

import { Map as MLMap } from 'maplibre-gl'

const apiKey = import.meta.env.VITE_MAPTILER_API_KEY

console.log(apiKey)

interface MapProps {
  context: string,
}

const Map: React.FC<MapProps> = ({ context }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<MLMap | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)
  const contexts = ['cities', 'zips', 'nhoods']

  const protocol = new Protocol()
  maplibregl.addProtocol("pmtiles", protocol.tile)

  useEffect(() => {
    if (map.current) return
    if (!mapContainer.current) return

    try {
      map.current = new MLMap({
        container: mapContainer.current,
        style: 'https://mapprojectbucket.s3.us-west-2.amazonaws.com/blueberry.json',
        maxBounds: MAP_DEFAULTS.STATIC.BOUNDS,
        bounds: [[-93.952374, 41.419612,], [-93.367352, 41.778021]], // -93.952374,41.419612,-93.367352,41.778021
        dragRotate: false,
        keyboard: false,
        touchZoomRotate: false,
        scrollZoom: false,
        doubleClickZoom: false,
        attributionControl: false,
        dragPan: false,
        cooperativeGestures: false,
        touchPitch: false,
      })

      map.current!.once('load', () => {
        map.current?.addSource("cities", MAP_DEFAULTS.SOURCES.CITIES)
        MAP_DEFAULTS.LAYERS.CITIES.forEach(layer => {
          map.current?.addLayer(layer)
          map.current?.setLayoutProperty(layer.id, 'visibility', 'visible')
        })
        map.current?.addSource('zips', MAP_DEFAULTS.SOURCES.ZIP_CODES)
        MAP_DEFAULTS.LAYERS.ZIP_CODE.forEach(layer => {
          map.current?.addLayer(layer)
        })
      })


      // Add error handling for tile loading
      map.current.on('error', (e) => {
        console.error('Map error:', e.error);
        setMapError(`Failed to load map tiles: ${e.error}`);
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

  /*
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
  */

  if (mapError) {
    return (
      <div className="z-30 w-full h-full flex items-center justify-center bg-gray-100">
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
    )
  }

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
  );
}

export default Map
