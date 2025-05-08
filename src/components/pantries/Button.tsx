import React from 'react'
import { MapPin } from 'lucide-react'
import clsx from 'clsx'

interface ButtonProps {
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <div className={
      clsx(
        `absolute z-20 transition-opacity duration-200 bottom-4 justify-end 
          right-4 left-auto flex md:justify-start md:right-4 md:left-auto md:bottom-4`,
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

export default Button
