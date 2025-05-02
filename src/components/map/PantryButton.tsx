import React from 'react'
import { MapPin } from 'lucide-react'
import clsx from 'clsx'

interface PantryButtonProps {
  onClick: () => void
}

const PantryButton: React.FC<PantryButtonProps> = ({ onClick }) => {
  return (
    <div className={
      clsx(
        `z-20 absolute transition-opacity duration-200 bottom-4 
          left-0 right-0 flex justify-center mx-auto md:justify-start 
          md:left-4 md:right-auto md:bottom-4`,
      )}>
      <button
        className="bg-white px-6 py-3 rounded-full hover:cursor-pointer hover:bg-gray-100 text-primary font-medium flex items-center gap-2 border border-primary"
        onClick={onClick}>
        <MapPin size={20} className="text-primary" />
        Find a Pantry
      </button>
    </div>
  )
}

export default PantryButton
