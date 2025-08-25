import { Button } from "./ui/button";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-chea-dark relative">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side - Logo and Contact */}
            <div>
              <div className="flex items-start space-x-4 mb-8">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-blue-600 border-4 border-blue-500 overflow-hidden">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2F989f85e0810540beb17869a1dc94573c%2F97cc268de76d436394018f38ffb855c1?format=webp&width=800"
                      alt="ChEA Logo"
                      className="w-full h-full object-cover object-center scale-150"
                    />
                  </div>
                </div>
                <div>
                  <div className="text-white font-normal text-lg leading-tight">ChEA - Chemical</div>
                  <div className="text-white font-normal text-lg leading-tight">Engineering</div>
                  <div className="text-white font-normal text-lg leading-tight">Association</div>
                </div>
              </div>

              <div className="space-y-1 text-gray-300 text-sm">
                <p className="font-medium text-white mb-2">Contact us for more information:</p>
                <p>chea@hbtu.ac.in</p>
                <p>University of H.B.T.U.</p>
                <p>Kanpur</p>
                <p>Uttar Pradesh, 208</p>
              </div>
            </div>

            {/* Right side - Links and Social */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Quick Links */}
              <div>
                <h3 className="text-white font-normal text-base mb-4">Quick Links</h3>
                <Button
                  className="bg-chea-red hover:bg-chea-red-dark text-white border-0 px-6 py-2 rounded text-sm font-medium"
                >
                  Explore
                </Button>
              </div>

              {/* Stay Updated */}
              <div>
                <h3 className="text-white font-normal text-base mb-4">Stay Updated</h3>
              </div>

              {/* Connect With Us */}
              <div>
                <h3 className="text-white font-normal text-base mb-4">Connect With Us</h3>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
                    <span className="text-white text-xs font-bold">t</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-500 transition-colors cursor-pointer">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 py-6">
          <p className="text-gray-400 text-xs">
            © 2023 ChEA. All rights reserved.
          </p>
        </div>
      </div>

      {/* Chat bubble - positioned absolutely */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="w-12 h-12 bg-chea-red rounded-full flex items-center justify-center cursor-pointer hover:bg-chea-red-dark transition-colors shadow-lg">
          <MessageCircle className="w-6 h-6 text-white" />
        </div>
      </div>
    </footer>
  );
}
