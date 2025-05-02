import { Map, LayerSpecification, LngLatBoundsLike } from 'maplibre-gl'
import { BoundingBoxes } from './types'

export function setContainer(map: Map, containerRef: any): Map {
  return map
}

export function getContainer(map: Map): HTMLElement {
  return map.getContainer()
}

export function getBoundingBoxes(map: Map, layer: LayerSpecification): BoundingBoxes | null {
  return null
}

export function getBoundingBox(map: Map, layer: LayerSpecification): LngLatBoundsLike | null {
  return null
}
