import { MapOptions, StyleSpecification, LayerSpecification, SourceSpecification } from 'maplibre-gl';

const LAYER = {
  'zips': {
    layerId: 'zips-fill',
    property: 'ZCTA5CE20',
    zoom: 12
  },
  'cities': {
    layerId: 'cities-fill',
    property: 'CITY_NAME',
    zoom: 11
  },
  'nhoods': {
    layerId: 'nhoods-fill',
    property: 'nhname',
    zoom: 13
  }
}

export const defaultMapConfig: Partial<MapOptions> = {
  attributionControl: false,
  center: [0, 0],
  zoom: 2,
  maxZoom: 18,
  minZoom: 0,
}

export const baseStyle: Partial<StyleSpecification> = {
  version: 8,
  sources: {},
  layers: [],
}

export {
  LAYER
}
