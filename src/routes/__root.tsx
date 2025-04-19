import { useRef, useState, useEffect } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/ui/Header'
import MobileMenu from '../components/ui/MobileMenu'
import Footer from '../components/ui/Footer'

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  // Mobile menu state and refs
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Toggle functions
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileButtonRef.current &&
        !mobileButtonRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <Header
        toggleMobileMenu={toggleMobileMenu}
        mobileButtonRef={mobileButtonRef} />

      <MobileMenu
        isOpen={mobileMenuOpen}
        mobileMenuRef={mobileMenuRef} />

      <div className="relative flex w-full h-full overflow-hidden">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
