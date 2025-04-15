import { Menu } from 'lucide-react'
import logo from '../../assets/dmarc-logo.svg'
import { Link } from '@tanstack/react-router'

interface HeaderProps {
  toggleMobileMenu: () => void;
  mobileButtonRef: React.RefObject<HTMLButtonElement | null>
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu, mobileButtonRef }) => {
  return (
    <header className="bg-white text-black p-4 z-30">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-lg font-bold text-primary">
            <img src={logo} alt="DMARC Logo with different shades of blues" className='w-32' />
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
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
