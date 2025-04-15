import { createFileRoute } from '@tanstack/react-router'
import ExplorerPlaceholder from '../components/ui/ExplorerPlaceholder'

export const Route = createFileRoute('/explorer')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <ExplorerPlaceholder />
    </div>
  )
}
