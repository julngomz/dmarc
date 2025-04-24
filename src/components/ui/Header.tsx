import { MapPin, Menu } from 'lucide-react'
import logo from '../../assets/dmarc-logo.svg'
import { Link } from '@tanstack/react-router'

interface HeaderProps {
  toggleMobileMenu: () => void;
  mobileButtonRef: React.RefObject<HTMLButtonElement | null>
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu, mobileButtonRef }) => {
  return (
    <header className="bg-white text-black px-4 py-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-bold text-primary">
            {/*<img src={logo} alt="DMARC Logo with different shades of blues" className='w-32' />*/}
            <p className='text-3xl font-bold'>LOGO</p>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <div className='flex gap-4'>
            <Link
              to="/"
              className="text-primary font-medium hover:underline"
              activeProps={{ className: "text-primary font-medium underline" }}
            >
              Map
            </Link>
            <Link
              to="/explorer"
              className="text-primary font-medium hover:underline"
              activeProps={{ className: "text-primary font-medium underline" }}
            >
              Explorer
            </Link>
            <Link
              to="/about"
              className="text-primary font-medium hover:underline"
              activeProps={{ className: "text-primary font-medium underline" }}
            >
              About
            </Link>
            <Link
              to="/help"
              className="text-primary font-medium hover:underline"
              activeProps={{ className: "text-primary font-medium underline" }}
            >
              Help
            </Link>
          </div>
          <div className='border-l-2 h-full py-3 border-gray-300' />
          <Link
            to="/pantries"
            className="flex gap-2 items-center text-primary font-medium hover:underline"
            activeProps={{ className: "text-primary font-medium underline" }}
          >
            <MapPin className='w-5 h-5' /> Find a Pantry
          </Link>
          <div className='border-l-2 h-full py-3 border-gray-300' />
          <a
            href="#"
            style={{ backgroundColor: '#e63946', color: 'white' }}
            className="px-6 py-2 rounded-full font-medium hover:opacity-90 transition-opacity inline-block"
          >
            Donate
          </a>
        </nav>

        <button
          ref={mobileButtonRef}
          className="md:hidden border border-primary text-primary p-2 rounded-full"
          onClick={toggleMobileMenu}
        >
          <Menu size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header
