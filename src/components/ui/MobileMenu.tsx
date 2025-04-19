import React from 'react'
import { Link } from '@tanstack/react-router'

interface MobileMenuProps {
  isOpen: boolean;
  mobileMenuRef: React.RefObject<HTMLDivElement | null>
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, mobileMenuRef }: MobileMenuProps) => {
  if (!isOpen) return null

  return (
    <div
      ref={mobileMenuRef}
      className={`
        transform transition-transform duration-500 ease-in-out
        md:hidden bg-white border-b shadow-md py-3 px-4 fixed top-12 left-0 right-0 z-20 w-full
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
      <nav className="flex flex-col space-y-3 w-full">
        <Link
          to="/"
          className="text-primary font-medium py-2 hover:bg-gray-50 px-2 rounded block w-full"
          activeProps={{ className: "text-primary font-medium py-2 bg-gray-100 px-2 rounded block w-full" }}
        >
          Map
        </Link>
        <Link
          to="/explorer"
          className="text-primary font-medium py-2 hover:bg-gray-50 px-2 rounded block w-full"
          activeProps={{ className: "text-primary font-medium py-2 bg-gray-100 px-2 rounded block w-full" }}
        >
          Explorer
        </Link>
        <Link
          to="/about"
          className="text-primary font-medium py-2 hover:bg-gray-50 px-2 rounded block w-full"
          activeProps={{ className: "text-primary font-medium py-2 bg-gray-100 px-2 rounded block w-full" }}
        >
          About
        </Link>
        <Link
          to="/help"
          className="text-primary font-medium py-2 hover:bg-gray-50 px-2 rounded block w-full"
          activeProps={{ className: "text-primary font-medium py-2 bg-gray-100 px-2 rounded block w-full" }}
        >
          Help
        </Link>
        <a
          href="#"
          style={{ backgroundColor: '#e63946', color: 'white' }}
          className="block py-3 rounded-full font-medium text-center w-full hover:opacity-90 transition-opacity"
        >
          Donate
        </a>
      </nav>
    </div>
  )
}

export default MobileMenu
