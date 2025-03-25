import { createFileRoute } from '@tanstack/react-router'
import Map from '../components/map/Map.tsx'

export const Route = createFileRoute('/')({
  component: MapComponent,
})

function MapComponent() {
  return <Map />
}
