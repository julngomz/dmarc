import maplibregl from "maplibre-gl"
import 'maplibre-gl/dist/maplibre-gl.css'
import * as MAP_DEFAULTS from "../../lib/metro_map/defaults/index"
import React, { useEffect, useRef, useState, Suspense, Component, ReactNode } from "react"

import { Protocol } from "pmtiles"
import MetroMap from "../../lib/metro_map/metro_map"
import center from "@turf/center"
import './types.d.ts'
import { Feature, FeatureCollection } from "geojson"

class ErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const MapContent = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<MetroMap | null>(null)
  const [searchZipcode, setSearchZipcode] = useState('')
  const [searchError, setSearchError] = useState('')

  useEffect(() => {
    if (map.current) return
    if (!mapContainer.current) return

    try {
      console.log('Initializing map...')
      map.current = new MetroMap({
        container: mapContainer.current,
        style: {
          version: 8,
          glyphs: MAP_DEFAULTS.STATIC.DEFAULT_GLYPHS_URL,
          sources: {
            'osm': MAP_DEFAULTS.SOURCES.BASEMAP,
            'cities': MAP_DEFAULTS.SOURCES.CITIES,
            'zips': MAP_DEFAULTS.SOURCES.ZIP_CODES,
            'nhoods': MAP_DEFAULTS.SOURCES.NHOODS,
            'pantries': {
              type: 'geojson',
              data: '/data/metro/pantries.json',
              generateId: true
            }
          },
          layers: [
            MAP_DEFAULTS.LAYERS.BASEMAP,
            ...MAP_DEFAULTS.LAYERS.NHOODS,
            ...MAP_DEFAULTS.LAYERS.CITIES,
            ...MAP_DEFAULTS.LAYERS.ZIP_CODE,
            {
              id: 'pantries',
              type: 'circle',
              source: 'pantries',
              paint: {
                'circle-color': '#FF0000',
                'circle-radius': 6,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#FFFFFF'
              }
            }
          ]
        },
        center: MAP_DEFAULTS.STATIC.MAP_CENTER,
        maxBounds: MAP_DEFAULTS.STATIC.BOUNDS,
        dragRotate: false,
        keyboard: false,
        touchZoomRotate: false,
        scrollZoom: false,
        doubleClickZoom: false,
      })

      // Wait for map to load before setting context
      map.current.on('load', () => {
        console.log('Map loaded, setting context...')
        map.current!.setContext('zips')
      })

    } catch (error) {
      console.error("Error loading map:", error)
      if (error instanceof Error) {
        console.error("Error details:", error.message)
        console.error("Stack trace:", error.stack)
      }
    }

    const protocol = new Protocol();
    maplibregl.addProtocol("pmtiles", protocol.tile);

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    }
  }, []);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!searchZipcode) {
      setSearchError('Please enter a zipcode')
      return
    }
    if (!map.current) return
    
    // If the map style hasn't loaded yet, wait for it
    if (!map.current.isStyleLoaded()) {
      console.log('Map style not loaded yet, waiting...')
      map.current.once('style.load', () => performSearch(searchZipcode, event))
      return
    }

    performSearch(searchZipcode, event)
  }

  const handleZipcodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchZipcode(event.target.value)
    setSearchError('')
  }

  const performSearch = (zipcode: string, event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchError('')
    // Get all features for the searched zipcode
    console.log('Querying features for zipcode:', zipcode)
    if (!map.current) return

      
      // First, set the context to zips if it's not already
      if (map.current.getContext() !== 'zips') {
        map.current.setContext('zips')
      }

      const features = map.current.querySourceFeatures('zips', {
        sourceLayer: 'zips',
        filter: ['==', ['get', MAP_DEFAULTS.CONFIG.LAYER.zips.property], zipcode]
      })
      console.log('Found features:', features)

      if (features.length === 0) {
        setSearchError('Zipcode not found')
      } else {
        // Create a simulated click event at the center of the found feature
        const feature = features[0]
        // Create a feature collection for the turf center function
        const featureCollection: FeatureCollection = {
          type: 'FeatureCollection',
          features: [feature as Feature]
        }
        const coords = center(featureCollection).geometry.coordinates as [number, number]
        const point = map.current.project(coords)
        const lngLat = new maplibregl.LngLat(coords[0], coords[1])
        if (!map.current) return
        map.current._handleFeatureClick({
          point: point,
          target: map.current,
          originalEvent: event as unknown as MouseEvent,
          type: 'click',
          preventDefault: () => {},
          defaultPrevented: false,
          lngLat: lngLat,
          _defaultPrevented: false
        })
      }
    }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }} ref={mapContainer}>
      <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded shadow-lg">
        <form onSubmit={handleSearch} className="flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchZipcode}
              onChange={handleZipcodeChange}
              placeholder="Enter zipcode"
              className="px-2 py-1 border rounded"
            />
            <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Search
            </button>
          </div>
          {searchError && (
            <div className="text-red-500 text-sm">{searchError}</div>
          )}
        </form>
      </div>
    </div>
  );
}

const Map = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading map...</div>}>
        <MapContent />
      </Suspense>
    </ErrorBoundary>
  )
}

export default Map;
