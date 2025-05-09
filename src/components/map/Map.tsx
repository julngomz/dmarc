import maplibregl from "maplibre-gl"
import 'maplibre-gl/dist/maplibre-gl.css'
import * as MAP_DEFAULTS from "../../lib/map/defaults"
import { useEffect, useRef, useState } from "react"
import { Protocol } from "pmtiles"
import MetroMap from "../../lib/map/MetroMap"

import { Map as MLMap } from 'maplibre-gl'
import React from 'react'
import { PantryRecord } from '../../lib/types'

interface MapProps {
  data: PantryRecord[]
  selectedZipCode: string
  onZipCodeSelect: (zipCode: string) => void
}

const Map: React.FC<MapProps> = ({ data, selectedZipCode, onZipCodeSelect }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<MLMap | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  const protocol = new Protocol()
  maplibregl.addProtocol("pmtiles", protocol.tile)

  useEffect(() => {
    if (map.current) return
    if (!mapContainer.current) return

    try {
      map.current = new MetroMap({
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
        map.current?.addSource('zips', MAP_DEFAULTS.SOURCES.ZIP_CODES)
        MAP_DEFAULTS.LAYERS.ZIP_CODE.forEach(layer => {
          map.current?.addLayer(layer)
          map.current?.setLayoutProperty(layer.id, 'visibility', 'visible')
        })
      })

        // Add click handler for zip codes
        map.current?.on('click', 'zips-fill', (e) => {
          const features = map.current?.queryRenderedFeatures(e.point, { layers: ['zips-fill'] })
          if (features && features.length > 0) {
            const zipCode = features[0].properties?.ZCTA5CE20
            if (zipCode) {
              onZipCodeSelect(zipCode)
            }
          }
        })

        // Add hover effect
        map.current?.on('mouseenter', 'zips-fill', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = 'pointer'
          }
        })

        map.current?.on('mouseleave', 'zips-fill', () => {
          if (map.current) {
            map.current.getCanvas().style.cursor = ''
          }
        })

        setIsLoaded(true)
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


  // Update the map when selectedZipCode changes
  useEffect(() => {
    if (!map.current || !isLoaded) return;
    
    (map.current as MetroMap)._selectZipCode(selectedZipCode);
  }, [selectedZipCode, isLoaded]);

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
