import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">ChEA</span>
                </div>
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="text-white">
                <div className="font-semibold text-lg">ChEA</div>
                <div className="text-sm text-muted-foreground">Chemical Engineering Association</div>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#vision" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Vision
            </a>
            <a href="#events" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Events
            </a>
            <a href="#programs" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Programs
            </a>
            <a href="#more" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              More
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-foreground hover:text-primary">
              Log In
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              Join Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
