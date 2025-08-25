import { Card, CardContent } from "./ui/card";

export default function FacilitiesSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background molecular patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full border border-primary/30"></div>
        <div className="absolute bottom-1/4 right-1/5 w-28 h-28 rounded-full border border-primary/20"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/6 w-2 h-2 bg-primary/40 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="max-w-4xl">
          <div className="space-y-8">
            {/* Facility Details Card */}
            <Card className="bg-card border-border hover:bg-card/80 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground mb-3">
                      Facility Details
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Our state-of-the-art facilities are equipped with the
                      latest tools and technologies to provide students with a
                      hands-on learning experience. From modern laboratories to
                      conference centers, we ensure that our members have access
                      to the best resources.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Event Registration Card */}
            <Card className="bg-card border-border hover:bg-card/80 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground mb-3">
                      Event Registration
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Register for our upcoming events and secure your spot.
                      Take advantage of this opportunity to network with
                      industry professionals and expand your knowledge to
                      further your career in chemical engineering.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
