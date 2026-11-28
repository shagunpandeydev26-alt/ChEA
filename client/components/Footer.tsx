import { Button } from "./ui/button";
import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { siteImages } from "@/lib/images";
import { socialLinks } from "@/lib/social";

const socials = [
  { name: "Email", href: "mailto:official.chea@hbtu.ac.in", icon: Mail },
  { name: "Instagram", href: socialLinks.instagram, icon: Instagram },
  { name: "LinkedIn", href: socialLinks.linkedin, icon: Linkedin },
];

const quickLinks = [
  { to: "/vision", label: "Vision" },
  { to: "/events", label: "Events" },
  { to: "/programs", label: "Programs" },
  { to: "/student-section", label: "Student Section" },
  { to: "/our-achievers", label: "Our Achievers" },
];

export default function Footer() {
  return (
    <footer className="bg-chea-dark relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <div className="flex items-start space-x-4 mb-8">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-blue-600 border-4 border-blue-500 overflow-hidden">
                    <img
                      src={siteImages.footerLogo}
                      alt="ChEA Logo"
                      className="w-full h-full object-cover object-center scale-150"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-white font-normal text-lg leading-tight">
                    ChEA - Chemical
                  </div>
                  <div className="text-white font-normal text-lg leading-tight">
                    Engineering
                  </div>
                  <div className="text-white font-normal text-lg leading-tight">
                    Association
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-gray-300 text-sm">
                <p className="font-medium text-white mb-2">
                  Contact us for more information:
                </p>
                <p>
                  <a
                    href="mailto:official.chea@hbtu.ac.in"
                    className="hover:text-white transition-colors"
                  >
                    official.chea@hbtu.ac.in
                  </a>
                </p>
                <p>University of H.B.T.U.</p>
                <p>Kanpur</p>
                <p>Uttar Pradesh, 208002</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-white font-normal text-base mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {quickLinks.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-white font-normal text-base mb-4">
                  Stay Updated
                </h3>
                <Button variant="outline" size="sm" asChild>
                  <Link
                    to="/events"
                    className="bg-chea-red hover:bg-chea-red-dark text-white border-0 px-4 py-2 rounded text-sm font-medium"
                  >
                    Explore
                  </Link>
                </Button>
              </div>

              <div>
                <h3 className="text-white font-normal text-base mb-4">
                  Connect With Us
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socials.map((social) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target={social.href.startsWith("http") ? "_blank" : undefined}
                        rel={
                          social.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        aria-label={social.name}
                        title={social.name}
                        className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-chea-red transition-colors"
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6">
          <p className="text-gray-400 text-xs">
            © {new Date().getFullYear()} ChEA. All rights reserved.
          </p>
        </div>
      </div>

      <a
        href="mailto:official.chea@hbtu.ac.in"
        aria-label="Chat with ChEA"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-chea-red rounded-full flex items-center justify-center hover:bg-chea-red-dark transition-colors shadow-lg"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>
    </footer>
  );
}
