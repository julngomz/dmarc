import center from "@turf/center"
import bbox from "@turf/bbox";
import { FeatureCollection } from "geojson";
import * as MAP_DEFAULT from "./defaults"

import {
  Map as MLMap,
  MapOptions,
  MapMouseEvent,
  LngLatBounds,
  LngLatBoundsLike,
  Popup,
  LngLatLike,
} from "maplibre-gl";

/**
 *
 * The layers type contains the available contexts and layers in the map.
 *
 **/

interface Layers {
  contexts: string[],
  types: string[],
}

type BoundingBoxes = Map<string, LngLatBoundsLike>

class MetroMap extends MLMap {
  activeTile: string = ''
  boundingBoxes: BoundingBoxes = new Map()

  constructor(options: MapOptions) {
    super(options)

    // Setup and load the map 
    this.on('load', this._onMapLoad.bind(this))
  }

  public setData(): void {
    // TODO: Pass in the data to the map to display.
  }


  _onMapLoad() {
    this._setupEventListeners()

    setTimeout(() => {
      // this._setBoundingBox(this.activeContext)
    }, 500)
  }

  /**
   * 
   * Calculates the bounding box for a given context, the context being a source and all it's tiles.
   * The result is used to center the relevant map source in the map.
   *
   */
  _calculateBoundingBox(context: string): LngLatBoundsLike {
    let boundingBox: LngLatBoundsLike = new LngLatBounds()
    const features = this.querySourceFeatures(context, { sourceLayer: context })

    // Verify that there actual features we can query and the information from.
    if (features.length > 0) {
      const featureCollection = {
        type: 'FeatureCollection',
        features: features.map(feature => ({
          type: 'Feature',
          properties: feature.properties,
          geometry: feature.geometry
        }))
      }

      const bounds = bbox(featureCollection as FeatureCollection)

      boundingBox = [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]]
      ]
    }

    return boundingBox!
  }

  _calculateTilesCenter(activeContext: string): void {
    const features = this.querySourceFeatures(activeContext, {
      sourceLayer: activeContext,
    })

    if (features.length > 0) {
      const featureCollection = {
        type: 'FeatureCollection',
        features: features.map(feature => ({
          type: 'Feature',
          properties: feature.properties,
          geometry: feature.geometry
        }))
      }

      const bounds = bbox(featureCollection as FeatureCollection)

      const mapBounds: LngLatBoundsLike = [
        [bounds[0], bounds[1]],
        [bounds[2], bounds[3]]
      ]

      this.fitBounds(mapBounds, {
        padding: 150,
        maxZoom: 16,
        duration: 700
      })

    }
  }

  _setupEventListeners() {
    console.log("setting up event listeners.")
    const layerIds = Object.values(MAP_DEFAULT.CONFIG.LAYER).map(layer => layer.layerId)

    layerIds.forEach((layerId) => {
      this.on('mouseenter', layerId, this._handleMouseEnter.bind(this))
      this.on('mouseleave', layerId, this._handleMouseLeave.bind(this))
      this.on('click', layerId, this._handleFeatureClick.bind(this))
    })

    // Add pantry-specific event handlers
    this.on('mouseenter', 'pantries', () => {
      this.getCanvas().style.cursor = 'pointer'
    })

    this.on('mouseleave', 'pantries', () => {
      this.getCanvas().style.cursor = ''
    })

    this.on('click', 'pantries', (e: MapMouseEvent) => {
      const features = this.queryRenderedFeatures(e.point, { layers: ['pantries'] })
      if (features.length > 0) {
        const feature = features[0]
        const name = feature.properties?.name
        const address = feature.properties?.address
        const coordinates = feature.geometry.type === 'Point' ? feature.geometry.coordinates : null

        if (coordinates) {
          new Popup()
            .setLngLat(coordinates as [number, number])
            .setHTML(`<strong>${name}</strong><br>${address}`)
            .addTo(this)
        }
      }
    })
  }

  _handleMouseEnter() {
    this.getCanvas().style.cursor = 'pointer'
  }
  _handleMouseLeave() {
    this.getCanvas().style.cursor = ''
  }

  _handleFeatureClick(e: MapMouseEvent) {
    const features = this.queryRenderedFeatures(e.point, { layers: [`zips-fill`] })

    if (features.length > 0) {
      const feature = features[0]
      const layerId: string = MAP_DEFAULT.CONFIG.LAYER['zips'].layerId
      const property = MAP_DEFAULT.CONFIG.LAYER['zips'].property
      const propertyValue = feature.properties?.[property]

      if (!propertyValue) return

      const tileCenter = center(feature).geometry.coordinates

      this.setPaintProperty(layerId, 'fill-color', [
        'match',
        ['get', property],
        propertyValue, "#1E90FF", // Highlight color
        "#808080"                 // Default color
      ])

      this.flyTo({
        zoom: 11,
        center: tileCenter as LngLatLike,
        duration: 500
      })

      this.setPaintProperty(layerId, 'fill-opacity', 0.7)
    }
  }

  _setBoundingBox(context: string): void {
    // Set the bounding box from the pre-calculate bounding boxes
    const contextBBox = this.boundingBoxes.get(context)

    this.fitBounds(contextBBox!, {
      padding: 10,
      maxZoom: 16,
      duration: 700
    })
  }

  _getBoundingBox(context: string): LngLatBoundsLike | undefined {
    if (context in this.boundingBoxes.keys()) {
      return this.boundingBoxes.get(context)
    } else {
      return undefined
    }
  }

  _selectZipCode(zipCode: string): boolean {
    if (!this.loaded()) return false;

    // Reset all zipcodes to default color first
    const layerId = MAP_DEFAULT.CONFIG.LAYER['zips'].layerId;
    this.setPaintProperty(layerId, 'fill-color', "#808080");
    this.setPaintProperty(layerId, 'fill-opacity', 0.7);

    if (zipCode === 'All') {
      // If 'All' is selected, just reset the view
      this.flyTo({
        zoom: 10,
        center: [-93.63103503160843, 41.58736757438154], // Default center
        duration: 500
      });
      return true;
    }

    const features = this.querySourceFeatures('zips', {
      sourceLayer: 'zips',
      filter: ['==', 'ZCTA5CE20', zipCode]
    });

    if (features.length > 0) {
      const feature = features[0];

      // Highlight the selected zipcode
      this.setPaintProperty(layerId, 'fill-color', [
        'match',
        ['get', 'ZCTA5CE20'],
        zipCode, "#1E90FF", // Highlight color
        "#808080"          // Default color
      ]);

      // Calculate the center of the zipcode
      const tileCenter = center(feature).geometry.coordinates;

      // Fly to the zipcode
      this.flyTo({
        zoom: 11,
        center: tileCenter as LngLatLike,
        duration: 500
      });

      // Make sure the zipcode layer is visible
      this.setLayoutProperty(layerId, 'visibility', 'visible');
      this.setPaintProperty(layerId, 'fill-opacity', 0.7);

      // Update the active tile
      this.activeTile = zipCode;
      return true;
    }

    return false;
  }
}

export default MetroMap
