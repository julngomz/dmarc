import { createFileRoute } from '@tanstack/react-router'
import { Location } from '../lib/types.ts';

export const Route = createFileRoute('/pantries')({
  component: RouteComponent,
})

export const mockLocations: Location[] = [
  {
    id: 1,
    name: "Public Pantry - Leicester Square",
    address: "Leicester Square, London",
    type: "Public",
    network: "in-network"
  },
  {
    id: 2,
    name: "Public Pantry - Trafalgar Square",
    address: "Trafalgar Square, London",
    type: "Public",
    network: "out-of-network"
  },
  {
    id: 3,
    name: "Pantry - Charing Cross",
    address: "Charing Cross Station, London",
    type: "Station",
    network: "in-network"
  },
  {
    id: 4,
    name: "Public Pantry - Embankment",
    address: "Embankment, London",
    type: "Public",
    network: "in-network"
  }
]

function RouteComponent() {
  return <div>Hello "/pantries"!</div>
}
