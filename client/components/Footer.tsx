import { Button } from "./ui/button";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        {/* Main footer content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side - Logo and Contact */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">ChEA</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-foreground font-semibold text-xl">ChEA - Chemical</div>
                  <div className="text-foreground font-semibold text-xl">Engineering</div>
                  <div className="text-foreground font-semibold text-xl">Association</div>
                </div>
              </div>
              
              <div className="space-y-2 text-muted-foreground">
                <p className="font-medium">Contact us for more information:</p>
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
                <h3 className="text-foreground font-semibold text-lg mb-4">Quick Links</h3>
                <Button 
                  variant="outline" 
                  className="bg-primary text-primary-foreground border-primary hover:bg-primary/90"
                >
                  Explore
                </Button>
              </div>

              {/* Stay Updated */}
              <div>
                <h3 className="text-foreground font-semibold text-lg mb-4">Stay Updated</h3>
                <p className="text-muted-foreground text-sm">
                  Subscribe to our newsletter for the latest updates and announcements.
                </p>
              </div>

              {/* Connect With Us */}
              <div>
                <h3 className="text-foreground font-semibold text-lg mb-4">Connect With Us</h3>
                <div className="flex space-x-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                    <span className="text-xs">f</span>
                  </div>
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                    <span className="text-xs">t</span>
                  </div>
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center hover:bg-primary transition-colors cursor-pointer">
                    <span className="text-xs">in</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border py-6">
          <p className="text-muted-foreground text-sm text-center">
            © 2023 ChEA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
