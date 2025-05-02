import { useState, useRef, useEffect } from 'react'
import { MapOptions } from "maplibre-gl"
import MetroMap from '../map/MetroMap'
import * as MAP_DEFAULTS from '../map/defaults';

export function useCustomMap(
  containerRef: React.RefObject<HTMLDivElement>,
  options?: Partial<MapOptions>
) {
  const [isLoaded, setIsLoaded] = useState(false)
  const mapRef = useRef<MetroMap | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const map = new MetroMap({
      container: containerRef.current,
      ...defaultMapConfig,
      ...options
    })

    map.current = map

    map.on('load', () => {
      setIsLoaded(true)
    })

    return () => [
      map.remove()
    ]
  }, [containerRef, options])

  return {
    map: mapRef.current,
    isloaded
  }
}
