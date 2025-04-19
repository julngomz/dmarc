const MapPlaceholder = () => {
  return (
    <div className="flex-1 bg-gray-100">
      {/* Map View */}
      <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
        <div className="text-center">
          <div className="text-6xl mb-2">📈</div>
          <p className="text-gray-500">The Explorer is loading.</p>
          <p className="text-xs text-gray-400 mt-4">Explore Pantry Data</p>
        </div>
      </div>
    </div>
  )
}

export default MapPlaceholder
