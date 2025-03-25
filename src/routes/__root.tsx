import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootRoute,
})

function RootRoute() {
  return (
    <div className="overflow-hidden">
      <header hidden className='flex p-4 justify-between items-center border-b-[0.5px] font-sans'>
        <div className=''>
          <p className='text-xl font-bold'>DMARC</p>
        </div>
        <div className="flex text-2xl gap-4">
          <Link to="/" className="[&.active]:underline">
            Map
          </Link>
          <Link to="/dashboard" className="[&.active]:underline decoration-2">
            Dashboard
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </div>
  )
}
