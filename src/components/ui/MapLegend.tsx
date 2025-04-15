import { MapPinIcon } from "lucide-react"

const MapLegend = () => {
  return (
    <div className="z-30 relative w-52 h-52">
      <div className="flex flex-col p-4">
        <div className="flex gap-2">
          <MapPinIcon />
          <p className="text-gray-800 text-lg">In-Network</p>
        </div>
        <div className="flex gap-2">
          <MapPinIcon />
          <p className="text-gray-800 text-lg">Out-of Network</p>
        </div>
      </div>
    </div>
  )
}
