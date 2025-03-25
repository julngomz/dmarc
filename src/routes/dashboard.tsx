import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='flex flex-col h-screen content-center items-center'>
      <p>Dashboard</p>
    </div >

  )
}
