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
  layers: Layers = { contexts: [], types: [] }
  activeContext: string = 'cities'
  activeTile: string = ''
  boundingBoxes: BoundingBoxes = new Map()

  constructor(options: MapOptions, context: string, contexts: string[]) {
    super(options)
    this.activeContext = context
    this.layers.contexts = contexts

    // Setup and load the map 
    this.on('load', this._onMapLoad.bind(this))
  }

  _onMapLoad() {
    this._setupEventListeners()
    this._getBoundingBoxes()

    setTimeout(() => {
      this._showContext(this.activeContext)
      // this._setBoundingBox(this.activeContext)
      this._calculateTilesCenter(this.activeContext)
    }, 500)
  }

  /**
  *
  * The `getBoundingBoxes` gets the bounding box for the source tiles. For all the 
  * features in the source file, calcualte the center of all tiles. 
  *
  * We are going use the bounding box so we can center and zoom the tiles in the center of the map.
  *
  */
  _getBoundingBoxes(): void {
    const contexts = this.layers.contexts

    contexts.forEach((context) => {
      const bbox = this._calculateBoundingBox(context)
      this.boundingBoxes.set(context, bbox)
    })

    console.log(`Bounding Boxes: `, this.boundingBoxes)
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
        padding: 50,
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
  }

  _handleMouseEnter() {
    this.getCanvas().style.cursor = 'pointer'
  }
  _handleMouseLeave() {
    this.getCanvas().style.cursor = ''
  }

  _handleFeatureClick(e: MapMouseEvent) {
    if (!this._isValidContext(this.activeContext)) {
      console.log('Handle Clicks')
      console.error(`Invalid context: ${this.activeContext}`);
      return;
    }

    const features = this.queryRenderedFeatures(e.point, { layers: [`${this.activeContext}-fill`] })

    if (features.length > 0) {
      const feature = features[0]
      const layerId: string = MAP_DEFAULT.CONFIG.LAYER[this.activeContext!].layerId
      const property = MAP_DEFAULT.CONFIG.LAYER[this.activeContext!].property
      const propertyValue = feature.properties?.[property]

      if (!propertyValue) return

      const tileCenter = center(feature).geometry.coordinates

      this.setPaintProperty(layerId, 'fill-color', [
        'match',
        ['get', property],
        propertyValue, "#1E90FF", // Highlight color
        "#808080"                 // Default color
      ])

      this.setPaintProperty(layerId, 'fill-opacity', 0.7)

      this.flyTo({
        center: tileCenter as [number, number],
        zoom: MAP_DEFAULT.CONFIG.LAYER[this.activeContext].zoom,
        duration: 400,
      })
    }
  }

  _addKeyboardEvents(e: KeyboardEvent): void {

  }

  _showContext(context: string): void {
    const types: string[] = ['fill', 'line', 'symbol']

    this.getStyle().layers.forEach((layer) => {
      if (layer.id.startsWith(context) && types.includes(layer.type)) {
        this.setLayoutProperty(layer.id, 'visibility', 'visible')
      }
    })
  }

  _hideContext(context: string): undefined {
    const types: string[] = ['fill', 'line', 'symbol']

    this.getStyle().layers.forEach((layer) => {
      if (layer.id.startsWith(context) && types.includes(layer.type)) {
        this.setLayoutProperty(layer.id, 'visibility', 'none')
      }
    })

  }

  _resetContext(context: string): void {
    this.setPaintProperty(`${context}-fill`, 'fill-opacity', 0.7)
    this.setPaintProperty(`${context}-fill`, 'fill-color', "#82CAFF")
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

  // Utility Methods 
  _isValidContext(context: string): context is keyof typeof MAP_DEFAULT.CONFIG.LAYER {
    return (this.layers!.contexts.includes(context) && context in MAP_DEFAULT.CONFIG.LAYER)
  }

  /** 
   *
   * Sets the `layers.context` property with the available contexts (layers) in the map.
   * 
   * The first item [0] in the list with be selected as the active context.
   *
   * For example:
   *
   *  const contexts: string[] = ['A', 'B', 'C']
   *
   *  contexts\[0\] // 'A' is the active context in the map.
   *
   **/
  public setContexts(contexts: string[]): void | undefined {
    this.layers.contexts = contexts
  }

  public getContexts(): string[] | undefined {
    return this.layers.contexts
  }


  /**
  *
  * Sets the layer context in the map, the context must be in the `layers.contexts` property.
  *
  */
  public setContext(context: string): void {
    if (!this.layers.contexts.includes(context)) {
      console.log(`${context} is not a member of the allowed contexts ${this.layers.contexts}`)
    }

    const prevContext = this.activeContext
    this.activeContext = context


    this._hideContext(prevContext)
    this._resetContext(prevContext)

    this._showContext(context)
    // this._setBoundingBox(context)

    setTimeout(() => {
      this._calculateTilesCenter(context)
    }, 500)
  }

  public getContext(): string | null {
    return this.activeContext
  }

  public insertPopup() {

  }

  public setData(): void {
    // TODO: Pass in the data to the map to display.
  }
}

export default MetroMap
