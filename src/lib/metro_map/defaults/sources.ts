import { SourceSpecification } from "maplibre-gl";

const BASEMAP: SourceSpecification = {
  type: 'raster',
  tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
  tileSize: 256,
  attribution: '© OpenStreetMap contributors',
}

const CITIES: SourceSpecification = {
  type: 'vector',
  url: 'pmtiles:///geo/pmtiles/cities.pmtiles',
  attribution: '@ Iowa Department of Transportation (DOT)',
}

const ZIP_CODES: SourceSpecification = {
  type: 'vector',
  url: 'pmtiles:///geo/pmtiles/zips.pmtiles',
  attribution: '@USPS'
}

const NHOODS: SourceSpecification = {
  type: 'vector',
  url: 'pmtiles:///geo/pmtiles/nhoods.pmtiles',
  attribution: '@ Des Moines City'
}

export {
  BASEMAP,
  CITIES,
  ZIP_CODES,
  NHOODS,
}

