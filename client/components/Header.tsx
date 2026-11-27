import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteImages } from "@/lib/images";

const mainLinks = [
  { to: "/vision", label: "Vision" },
  { to: "/events", label: "Events" },
  { to: "/programs", label: "Programs" },
];

const moreLinks = [{ to: "/student-section", label: "Student Section" }];

const allLinks = [...mainLinks, ...moreLinks];

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMoreDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroSectionHeight = window.innerHeight;
      const trigger50Percent = heroSectionHeight * 0.5;
      const fadeStartPoint = heroSectionHeight * 0.3;

      const direction = currentScrollY > lastScrollY.current ? "down" : "up";

      let newOpacity = 1;
      if (currentScrollY > fadeStartPoint) {
        const fadeProgress =
          (currentScrollY - fadeStartPoint) /
          (trigger50Percent - fadeStartPoint);
        newOpacity = Math.max(0, 1 - fadeProgress);
      }

      let shouldBeVisible = true;
      if (currentScrollY > trigger50Percent && direction === "down") {
        shouldBeVisible = false;
      } else if (currentScrollY > trigger50Percent) {
        newOpacity = Math.min(1, (currentScrollY - trigger50Percent) / 100);
      }

      if (currentScrollY < 50) {
        shouldBeVisible = true;
        newOpacity = 1;
      }

      setOpacity(newOpacity);
      setIsVisible(shouldBeVisible);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed left-0 right-0 z-50"
      style={{
        top: "20px",
        opacity: isVisible ? opacity : 0,
        transform: `translateY(${isVisible ? "0" : "-100%"}) scale(${isVisible ? 1 : 0.95})`,
        transition: "all 1s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-4">
            <div className="relative mt-6">
              <div
                className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg border-2 border-white/20 transition-transform duration-2500"
                style={{
                  transform: `scale(${0.9 + opacity * 0.1})`,
                  boxShadow: `0 10px 25px rgba(0,0,0,${0.1 * opacity})`,
                }}
              >
                <img
                  src={siteImages.logo}
                  alt="ChEA Logo"
                  className="w-full h-full object-cover object-center scale-150 transition-transform duration-2500"
                  onError={(event) => {
                    const image = event.currentTarget;
                    image.style.display = "none";
                    const fallback = image.parentElement
                      ?.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              </div>
              <div className="w-24 h-24 rounded-full bg-blue-600 items-center justify-center hidden shadow-lg">
                <div className="w-20 h-20 rounded-full bg-blue-700 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">ChEA</span>
                </div>
              </div>
            </div>
            <div
              className="hidden sm:block mt-6 transition-all duration-2500"
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

          <div
            className="hidden md:flex items-center space-x-8 transition-all duration-2500"
            style={{
              opacity: opacity,
              transform: `translateX(${(1 - opacity) * 20}px)`,
            }}
          >
            <nav className="flex items-center space-x-8">
              {mainLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-white hover:text-primary transition-colors text-sm font-light"
                >
                  {link.label}
                </Link>
              ))}

              <div
                className="relative"
                onMouseEnter={() => setIsMoreDropdownOpen(true)}
                onMouseLeave={() => setIsMoreDropdownOpen(false)}
              >
                <button
                  type="button"
                  aria-expanded={isMoreDropdownOpen}
                  aria-haspopup="true"
                  className="text-white hover:text-primary transition-colors text-sm font-light flex items-center"
                >
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

                <div
                  className={`absolute top-full left-0 mt-2 w-48 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl transition-all duration-300 ${
                    isMoreDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="py-2">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="block px-4 py-2 text-sm text-white hover:text-primary hover:bg-white/10 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  to="/become-a-member"
                  className="text-white hover:text-primary font-light transition-all duration-300"
                >
                  Become a Member
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a
                  href="mailto:official.chea@hbtu.ac.in?subject=ChEA%20Membership"
                  className="bg-transparent border-white text-white hover:bg-white hover:text-black font-light transition-all duration-300"
                >
                  Join Now
                </a>
              </Button>
            </div>
          </div>

          <div className="md:hidden">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-white"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMobileMenuOpen((open) => !open)}
            >
              <span className="text-2xl leading-none">
                {isMobileMenuOpen ? "×" : "☰"}
              </span>
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav className="md:hidden mt-2 rounded-lg border border-white/20 bg-black/95 backdrop-blur-sm p-4 shadow-xl">
            <div className="flex flex-col space-y-1">
              {allLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-white hover:text-primary hover:bg-white/10 rounded transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-3 border-t border-white/10">
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    to="/become-a-member"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-white"
                  >
                    Become a Member
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="mailto:official.chea@hbtu.ac.in?subject=ChEA%20Membership"
                    className="border-white text-white hover:bg-white hover:text-black"
                  >
                    Join Now
                  </a>
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
