import { createFileRoute } from '@tanstack/react-router'
import Map from '../components/Map.tsx'

export const Route = createFileRoute('/map')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <div className="w-screen h-screen">
        <Map />
      </div>
    </div>
  );
}
