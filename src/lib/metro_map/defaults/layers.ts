import { LayerSpecification } from "maplibre-gl"

const BASEMAP: LayerSpecification = {
  id: "osm",
  type: "raster",
  source: "osm",
  minzoom: 10,
  maxzoom: 14,
}

const CITIES: LayerSpecification[] = [
  {
    id: 'cities-fill',
    type: 'fill',
    source: 'cities',
    "source-layer": 'cities',
    paint: {
      "fill-color": "#82CAFF",
      "fill-opacity": 0.7
    },
    layout: {
      visibility: 'none'
    }
  },
  {
    id: 'cities-outline',
    type: 'line',
    source: 'cities',
    "source-layer": "cities",
    paint: {
      "line-color": "#333",
      "line-width": 0.5,
      "line-opacity": 0.7
    },
    layout: {
      'visibility': 'none'
    }
  },
  {
    id: 'cities-label',
    type: 'symbol',
    source: 'cities',
    "source-layer": "cities",
    layout: {
      // Get the text from the field, in this case it's the ZIP Code 
      "text-field": ["get", "CITY_NAME"],

      // Style the text
      "text-size": 14,
      "text-justify": "center",
      "text-anchor": "center",
      "text-allow-overlap": false,
      "text-ignore-placement": false,
      "text-padding": 5,
      'visibility': 'none',
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5, // White outline for better readability
      "text-opacity": 1
    }
  }
]


const ZIP_CODE: LayerSpecification[] = [
  {
    id: 'zips-fill',
    type: 'fill',
    source: 'zips',
    "source-layer": 'zips',
    paint: {
      "fill-color": "#BBDEFB",
      "fill-opacity": 0.7,
    },
    layout: {
      visibility: 'none',
    }
  },
  {
    id: 'zips-outline',
    type: 'line',
    source: 'zips',
    "source-layer": "zips",
    paint: {
      "line-color": "#333",
      "line-width": 0.5,
      "line-opacity": 0.7
    },
    layout: {
      visibility: 'none'
    }
  },
  {
    id: 'zips-label',
    type: 'symbol',
    source: 'zips',
    "source-layer": "zips",
    layout: {
      // Get the text from the field, in this case it's the ZIP Code 
      "text-field": ["get", "ZCTA5CE20"],

      // Style the text
      "text-size": 14,
      "text-justify": "center",
      "text-anchor": "center",
      "text-allow-overlap": false,
      "text-ignore-placement": false,
      "text-padding": 5,
      'visibility': 'none'
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5, // White outline for better readability
      "text-opacity": 0.9
    }
  },
]

const NHOODS: LayerSpecification[] = [
  {
    id: 'nhoods-fill',
    type: 'fill',
    source: 'nhoods',
    "source-layer": 'nhoods',
    paint: {
      "fill-color": "#BBDEFB",
      "fill-opacity": 0.7
    },
    layout: {
      visibility: 'none'
    }
  },
  {
    id: 'nhoods-outline',
    type: 'line',
    source: 'nhoods',
    "source-layer": "nhoods",
    paint: {
      "line-color": "#333",
      "line-width": 0.5,
      "line-opacity": 0.8
    },
    layout: {
      visibility: 'none'
    }
  },
  {
    id: 'nhoods-label',
    type: 'symbol',
    source: 'nhoods',
    "source-layer": "nhoods",
    layout: {
      // Get the text from the field, in this case it's the ZIP Code 
      "text-field": ["get", "nhname"],

      // Style the text
      "text-size": 12,
      "text-justify": "center",
      "text-anchor": "center",
      "text-allow-overlap": false,
      "text-ignore-placement": false,
      "text-padding": 5,
      'visibility': 'none'
    },
    paint: {
      "text-color": "#000000",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1.5, // White outline for better readability
      "text-opacity": 0.9
    }
  },
]

export {
  BASEMAP,
  CITIES,
  ZIP_CODE,
  NHOODS
}
