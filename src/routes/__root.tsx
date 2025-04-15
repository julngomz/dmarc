import { useRef, useState, useEffect } from 'react'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import Header from '../components/ui/Header'
import MobileMenu from '../components/ui/MobileMenu'
import Footer from '../components/ui/Footer'
import FooterInfo from '../components/ui/FooterInfo.tsx'
import clsx from 'clsx'

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  // Mobile menu state and refs
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)

  // Footer visibility state
  const [isFooterInfoVisible, setIsFooterInfoVisible] = useState(false)

  // Toggle functions
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const toggleFooterInfo = () => setIsFooterInfoVisible(!isFooterInfoVisible)
  const closeFooterInfo = () => setIsFooterInfoVisible(false)

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

  // Handle clicks outside the footer to close it
  useEffect(() => {
    const handleFooterInfoOutsideClick = (event: MouseEvent) => {
      const footerInfoElement = document.getElementById('footer-content')
      const footerTabElement = document.getElementById('footer-tab')

      if (
        isFooterInfoVisible &&
        footerInfoElement &&
        !footerInfoElement.contains(event.target as Node) &&
        footerTabElement &&
        !footerTabElement.contains(event.target as Node)
      ) {
        // We found a click outside the footer, close it
        setIsFooterInfoVisible(false);
      }
    };

    if (isFooterInfoVisible) {
      document.addEventListener('mousedown', handleFooterInfoOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleFooterInfoOutsideClick);
    };
  }, [isFooterInfoVisible]);

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      <Header toggleMobileMenu={toggleMobileMenu} mobileButtonRef={mobileButtonRef} />

      <MobileMenu isOpen={mobileMenuOpen} mobileMenuRef={mobileMenuRef} />

      {/* Outlet is where child routes will be rendered */}
      <div className="flex flex-1 relative overflow-hidden">
        <Outlet />
      </div>

      {/* Footer overlay */}
      <div
        className={
          clsx(
            "fixed bottom-0 left-0 right-0 transition-transform duration-300 ease-in-out z-40 max-h-[90vh] overflow-auto",
            {
              'transition-y-0': isFooterInfoVisible == true,
              'translate-y-full': isFooterInfoVisible == false
            }
          )
        }>
        <FooterInfo onClose={closeFooterInfo} />
      </div>


      <Footer
        isFooterInfoVisible={isFooterInfoVisible}
        toggleFooterInfo={toggleFooterInfo}
      />

      {/* Semi-transparent background overlay when footer is visible */}
      {isFooterInfoVisible}
    </div>
  );
}
