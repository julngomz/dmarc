import {
  Map,
  LayerSpecification,
  LngLatBoundsLike,
  SourceSpecification
} from "maplibre-gl"

export type EventHandler = (e: any) => void

export interface SourceConfig {

}

export interface LayerConfig {

}

export interface MapState {
  id: string,
  map: Map,
  sources: Record<string, SourceConfig>,
  layers: Record<string, LayerConfig>,
  eventHandlers: Record<string, EventHandler[]>
}

export interface MapConfig {

}

export type BoundingBoxes = { [key: string]: LngLatBoundsLike }
export type Sources = { [key: string]: SourceSpecification }
export type Layers = LayerSpecification[]
