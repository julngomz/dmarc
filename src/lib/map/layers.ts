import { Map, LayerSpecification } from "maplibre-gl";
import { Layers } from "./types";

export function setLayers(map: Map, layers: Layers) {
  layers.forEach((layer) => {
    setLayer(map, layer)
  })
}

export function setLayer(map: Map, layer: LayerSpecification): Map {
  return map.addLayer(layer)
}

export function setCurrentLayer(map: Map, layerId: string) {
  map.setLayoutProperty(layerId, 'visibility', 'hidden')
}

export function setCurrentLayerContext(map: Map, layerId: string, context: string) {

}
