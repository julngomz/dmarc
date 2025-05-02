import { LngLatBoundsLike, LngLatLike } from "maplibre-gl";

const METRO_ZIPS: Record<string, Array<string>> = {
  "des-moines": ["50309", "50310", "50311", "50312", "50313", "50314", "50315", "50316", "50317", "50319", "50320", "50321"],
  "west-des-moines": [],
  "altoona": [],
  "ankeny": [],
  "pleasent-hill": [],
  "grimes": [],
  "urbandale": [],
}

const DEFAULT_GLYPHS_URL = "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf"
const LOCATION: [number, number] = [41.58736757438154, -93.63103503160843]
const MAP_CENTER: LngLatLike = [-93.63103503160843, 41.58736757438154]
const BOUNDS: LngLatBoundsLike = [
  [-94.110126, 41.403242], // South-West 
  [-93.231220, 41.813451], // North-East
]

export {
  MAP_CENTER,
  BOUNDS,
  METRO_ZIPS,
  DEFAULT_GLYPHS_URL,
  LOCATION,
}
