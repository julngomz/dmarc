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

type LayerContext = 'cities' | 'zips' | 'nhoods' | 'pantries'
type BoundingBoxes = Map<LayerContext, LngLatBoundsLike>



class MetroMap extends MLMap {
  contexts: LayerContext[] = ['cities', 'zips', 'nhoods', 'pantries']
  activeContext: LayerContext = 'cities'
  boundingBoxes: BoundingBoxes = new Map()

  constructor(options: MapOptions) {
    super(options)

    this.on('load', this._onMapLoad.bind(this))
  }

  _onMapLoad() {
    console.log('Setting up map')
    // Se the active context - the layer to be shown
    this.setContext(this.activeContext)

    // setup the event listeners for each map and tile 
    this._setupEventListeners()

    // Set the 
    setTimeout(() => {
      this._showContext(this.activeContext)
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
    const contexts: LayerContext[] = ['cities', 'zips', 'nhoods', 'pantries']

    contexts.forEach((context) => {
      const bbox = this._calculateBoundingBox(context)
      this.boundingBoxes.set(context, bbox)
    })

    console.log(`Bounding Boxes: `, this.boundingBoxes)
  }

  _calculateBoundingBox(context: LayerContext): LngLatBoundsLike {
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

    return boundingBox
  }

  _calculateTilesCenter(activeContext: LayerContext): void {
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
        padding: 10,
        maxZoom: 16,
        duration: 700
      })

    }
  }

  _setupEventListeners() {
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

  _showContext(
    context: string,
    visible: boolean = true
  ): void {
    const layerTypes: string[] = ['fill', 'outline', 'label']
    const visibility = visible ? 'visible' : 'none'

    const layers = this.getStyle().layers || []

    console.log(layers)

    layerTypes.forEach(type => {
      layers.forEach(layer => {
        switch (layer.id) {
          case (`${context}-${type}`):
            this.setLayoutProperty(layer.id, 'visibility', visibility)
            break
          default:
            break
        }
      })
    })
  }

  public setBoundingBox(context: LayerContext): void {
    // After getting all the other bounding boxes,
    // we are going to to the current boudning box for the 
    // current context

    const contextBBox = this.boundingBoxes.get(context)

    console.log(contextBBox)
  }

  public getBoundingBox(context: LayerContext): LngLatBoundsLike | undefined {
    if (context in this.boundingBoxes.keys()) {
      return this.boundingBoxes.get(context)
    } else {
      return undefined
    }
  }


  /**
  *
  * Show specific zipcodes depending on which city they clicked on.
  *
  */
  public showZipCodes(zipCodes: string[]): void {
    const layerId = MAP_DEFAULT.CONFIG.LAYER.zips.layerId
    const property = MAP_DEFAULT.CONFIG.LAYER.zips.property

    this.setFilter(layerId,
      ['in', ['get', property], ['literal', zipCodes]]);
  }

  public setContext(context: LayerContext): void {
    this.activeContext = context
    this._showContext(context)
  }

  public getContext(): LayerContext | null {
    return this.activeContext
  }
}

export default MetroMap
