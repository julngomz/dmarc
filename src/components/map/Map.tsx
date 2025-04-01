import maplibregl from "maplibre-gl"
import 'maplibre-gl/dist/maplibre-gl.css'
import * as MAP_DEFAULTS from "../../lib/metro_map/defaults/index"
import { useEffect, useRef } from "react"
import { Protocol } from "pmtiles"
import MetroMap from "../../lib/metro_map/metro_map"

const Map = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<MetroMap | null>(null)

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
            'pantries': {
              type: 'geojson',
              data: '/data/metro/pantries.json'
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

      map.current!.setContext('zips')

    } catch (error) {
      console.error("Error loading map:", error)
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

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default Map
