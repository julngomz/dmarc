import React from 'react'
import { MapPin } from 'lucide-react'
import clsx from 'clsx'

interface PantryButtonProps {
  isVisible: boolean
  onClick: () => void
}

const PantryButton: React.FC<PantryButtonProps> = ({ isVisible, onClick }) => {
  return (
    <div className={
      clsx(
        `z-10 absolute transition-opacity duration-200 bottom-12 
          left-0 right-0 flex justify-center mx-auto md:justify-start 
          md:left-6 md:right-auto md:bottom-6`,
        {
          'opacity-100': isVisible == true,
          'opacity-0 pointer-events-none': isVisible == false
        }
      )}>
      <button
        className="bg-white px-6 py-3 rounded-full hover:cursor-pointer hover:bg-gray-100 text-primary font-medium flex items-center gap-2 border border-primary"
        onClick={onClick}
      >
        <MapPin size={20} className="text-primary" />
        Find a Pantry
      </button>
    </div>
  )
}

export default PantryButton
