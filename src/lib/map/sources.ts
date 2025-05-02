import { Map, SourceSpecification } from 'maplibre-gl'
import { Sources } from "./types"

export function setSources(map: Map, sources: Sources) {
  const sourceIds: string[] = Object.keys(sources)

  sourceIds.forEach((id: string) => {
    setSource(map, id, sources[id])
  })
}

export function setSource(map: Map, id: string, source: SourceSpecification): Map {
  return map.addSource(id, source)
}
