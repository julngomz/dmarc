import { SourceSpecification } from "maplibre-gl";

const BASEMAP: SourceSpecification = {
  type: 'raster',
  tiles: [
    'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
    'https://b.tile.openstreetmap.org/{z}/{x}/{y}.png',
    'https://c.tile.openstreetmap.org/{z}/{x}/{y}.png'
  ],
  tileSize: 256,
  attribution: '© OpenStreetMap'

}

const CITIES: SourceSpecification = {
  type: 'vector',
  url: 'pmtiles:///geo/pmtiles/cities.pmtiles',
}

const ZIP_CODES: SourceSpecification = {
  type: 'vector',
  url: 'pmtiles:///geo/pmtiles/zips.pmtiles',
}

const NHOODS: SourceSpecification = {
  type: 'vector',
  url: 'pmtiles:///geo/pmtiles/nhoods.pmtiles',
}

export {
  BASEMAP,
  CITIES,
  ZIP_CODES,
  NHOODS,
}

