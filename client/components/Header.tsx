import { Button } from "./ui/button";
import { useState, useEffect } from "react";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight * 0.9; // Approximate hero section height

      // Show header when at top or scrolling up, hide when scrolling down past hero
      if (currentScrollY < heroSectionHeight || currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > heroSectionHeight) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isVisible ? 'top-0 opacity-100 translate-y-0' : '-top-24 opacity-0 -translate-y-full'
      }`}
      style={{ top: isVisible ? '20px' : '-100px' }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand - Positioned with margin */}
          <div className="flex items-center space-x-4">
            <div className="relative mt-6">
              {/* Circular frame for logo */}
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg border-2 border-white/20">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F4e42fd0353e140c7b4e2963d14193c78?format=webp&width=800"
                  alt="ChEA Logo"
                  className="w-full h-full object-cover object-center scale-110"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.nextElementSibling.style.display = 'flex';
                  }}
                />
              </div>
              {/* Fallback circular logo */}
              <div className="w-24 h-24 rounded-full bg-blue-600 items-center justify-center hidden shadow-lg">
                <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">ChEA</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block mt-6">
              <div className="text-white">
                <div className="font-bold text-2xl">ChEA</div>
                <div className="text-lg text-white/90 font-bold">Chemical Engineering Association</div>
              </div>
            </div>
          </div>

          {/* Navigation Menu and Auth Buttons - All on Right */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <a href="#vision" className="text-white hover:text-primary transition-colors text-sm font-light">
                Vision
              </a>
              <a href="#events" className="text-white hover:text-primary transition-colors text-sm font-light">
                Events
              </a>
              <a href="#programs" className="text-white hover:text-primary transition-colors text-sm font-light">
                Programs
              </a>
              <a href="#more" className="text-white hover:text-primary transition-colors text-sm font-light">
                More
              </a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-white hover:text-primary font-light">
                Log In
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black font-light"
              >
                Join Now
              </Button>
            </div>
          </div>

          {/* Mobile menu button placeholder */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" className="text-white">
              ☰
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
