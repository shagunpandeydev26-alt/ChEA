import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/placeholder-chea-logo?format=webp&width=100"
                alt="ChEA Logo"
                className="w-28 h-28 object-contain"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-28 h-28 rounded-full bg-blue-600 items-center justify-center hidden">
                <div className="w-24 h-24 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="text-white text-lg font-light">ChEA</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white">
                <div className="font-light text-xl">ChEA</div>
                <div className="text-base text-white/80 font-light">Chemical Engineering Association</div>
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
