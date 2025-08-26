import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { LogOut, User, Settings, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  
  const { currentUser, logout } = useAuth();
  const { isAdmin } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out!");
      setIsUserDropdownOpen(false);
    } catch (error: any) {
      toast.error("Failed to log out");
    }
  };

  const handleAuthNavigation = (action: 'login' | 'register') => {
    navigate('/auth', { state: { defaultTab: action } });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight; // Full hero section height
      const trigger50Percent = heroSectionHeight * 0.5; // 50% of hero section
      const fadeStartPoint = heroSectionHeight * 0.3; // Start fading at 30%

      // Determine scroll direction
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      setScrollDirection(direction);

      // Calculate opacity based on scroll position for smooth fade
      let newOpacity = 1;
      if (currentScrollY > fadeStartPoint) {
        // Calculate fade progress from 30% to 50%
        const fadeProgress =
          (currentScrollY - fadeStartPoint) /
          (trigger50Percent - fadeStartPoint);
        newOpacity = Math.max(0, 1 - fadeProgress);
      }

      // Determine visibility based on 50% hero section and scroll direction
      let shouldBeVisible = true;

      if (currentScrollY > trigger50Percent) {
        // Past 50% of hero section
        if (direction === "down") {
          shouldBeVisible = false;
        } else {
          // Scrolling up - show with fade in effect
          shouldBeVisible = true;
          newOpacity = Math.min(1, (currentScrollY - trigger50Percent) / 100); // Fade in over 100px
        }
      } else {
        // Within first 50% of hero section
        shouldBeVisible = true;
      }

      // Special case: always show when very close to top
      if (currentScrollY < 50) {
        shouldBeVisible = true;
        newOpacity = 1;
      }

      setOpacity(newOpacity);
      setIsVisible(shouldBeVisible);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed left-0 right-0 z-50 transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        top: "20px",
        opacity: isVisible ? opacity : 0,
        transform: `translateY(${isVisible ? "0" : "-100%"}) scale(${isVisible ? 1 : 0.95})`,
        transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand - Positioned with margin */}
          <Link to="/" className="flex items-center space-x-4">
            <div className="relative mt-6">
              {/* Circular frame for logo */}
              <div
                className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg border-2 border-white/20 transition-all duration-500"
                style={{
                  transform: `scale(${0.9 + opacity * 0.1})`,
                  boxShadow: `0 10px 25px rgba(0,0,0,${0.1 * opacity})`,
                }}
              >
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F612e9a82b86748da836eaf9bc77dd81e%2F4e42fd0353e140c7b4e2963d14193c78?format=webp&width=800"
                  alt="ChEA Logo"
                  className="w-full h-full object-cover object-center scale-150 transition-transform duration-[2500ms]"
                  onError={(e) => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = "none";
                    const fallback = e.currentTarget.parentElement?.nextElementSibling as HTMLElement;
                    if (fallback) {
                      fallback.style.display = "flex";
                    }
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
            <div
              className="hidden sm:block mt-6 transition-all duration-[2500ms]"
              style={{
                opacity: opacity,
                transform: `translateX(${(1 - opacity) * -20}px)`,
              }}
            >
              <div className="text-white">
                <div className="font-bold text-2xl">ChEA</div>
                <div className="text-lg text-white/90 font-bold">
                  Chemical Engineering Association
                </div>
              </div>
            </div>
          </Link>

          {/* Navigation Menu and Auth Buttons - All on Right */}
          <div
            className="hidden md:flex items-center space-x-8 transition-all duration-[2500ms]"
            style={{
              opacity: opacity,
              transform: `translateX(${(1 - opacity) * 20}px)`,
            }}
          >
            <nav className="flex items-center space-x-8">
              <Link
                to="/vision"
                className="text-white hover:text-primary transition-colors text-sm font-light"
              >
                Vision
              </Link>
              <Link
                to="/events"
                className="text-white hover:text-primary transition-colors text-sm font-light"
              >
                Events
              </Link>
              <Link
                to="/programs"
                className="text-white hover:text-primary transition-colors text-sm font-light"
              >
                Programs
              </Link>

              {/* More Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
                onMouseLeave={() => setIsMoreDropdownOpen(false)}
              >
                <button className="text-white hover:text-primary transition-colors text-sm font-light flex items-center">
                  More
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl transition-all duration-300 ${
                    isMoreDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="py-2">
                    <Link
                      to="/student-section"
                      className="block px-4 py-2 text-sm text-white hover:text-primary hover:bg-white/10 transition-colors"
                    >
                      Student Section
                    </Link>
                    <Link
                      to="/our-achievers"
                      className="block px-4 py-2 text-sm text-white hover:text-primary hover:bg-white/10 transition-colors"
                    >
                      Our Achievers
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            {/* Auth Buttons or User Menu */}
            <div className="flex items-center space-x-3">
              {currentUser ? (
                /* User is logged in - show user menu */
                <div
                  className="relative"
                  onMouseEnter={() => setIsUserDropdownOpen(true)}
                  onMouseLeave={() => setIsUserDropdownOpen(false)}
                >
                  <button className="flex items-center space-x-2 text-white hover:text-primary transition-colors text-sm font-light px-3 py-2 rounded-md hover:bg-white/10">
                    <User className="w-4 h-4" />
                    <span>{currentUser.displayName || currentUser.email?.split('@')[0]}</span>
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  <div
                    className={`absolute top-full right-0 mt-2 w-48 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl transition-all duration-300 ${
                      isUserDropdownOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                  >
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-white/70 border-b border-white/10">
                        {currentUser.email}
                      </div>
                      <Link
                        to="/dashboard"
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:text-primary hover:bg-white/10 transition-colors"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center w-full px-4 py-2 text-sm text-white hover:text-primary hover:bg-white/10 transition-colors"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Panel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-white hover:text-primary hover:bg-white/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* User is not logged in - show auth buttons */
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAuthNavigation('login')}
                    className="text-white hover:text-primary font-light transition-all duration-300"
                  >
                    Log In
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAuthNavigation('register')}
                    className="bg-transparent border-white text-white hover:bg-white hover:text-black font-light transition-all duration-300"
                  >
                    Join Now
                  </Button>
                </>
              )}
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
