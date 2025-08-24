import { Button } from "./ui/button";

export default function StudentDevelopment() {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Dramatic background with flowing molecular patterns */}
      <div className="absolute inset-0">
        {/* Main flowing pattern */}
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96">
          <div className="relative w-full h-full">
            {/* Outer flowing ring */}
            <div className="absolute inset-0 border-2 border-primary/60 rounded-full animate-pulse"></div>
            <div className="absolute inset-4 border border-primary/40 rounded-full"></div>
            <div className="absolute inset-8 border border-primary/30 rounded-full"></div>
            
            {/* Inner core */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-primary/80 rounded-full"></div>
            
            {/* Floating molecular dots */}
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-primary/60 rounded-full"></div>
            <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-primary/70 rounded-full"></div>
            <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-primary/50 rounded-full"></div>
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary/60 rounded-full"></div>
          </div>
        </div>

        {/* Additional flowing elements */}
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 opacity-40">
          <div className="w-full h-full border border-primary/30 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary/50 rounded-full"></div>
        </div>

        <div className="absolute top-1/3 right-1/4 w-48 h-48 opacity-30">
          <div className="w-full h-full border border-primary/25 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary/40 rounded-full"></div>
        </div>

        {/* Scattered molecular dots */}
        <div className="absolute top-1/5 left-1/5 w-2 h-2 bg-primary/50 rounded-full"></div>
        <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/5 right-1/5 w-2 h-2 bg-primary/60 rounded-full"></div>
        <div className="absolute bottom-1/3 left-1/6 w-2 h-2 bg-primary/45 rounded-full"></div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80"></div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-8">
              Student Development
              <br />
              Initiatives
            </h2>
          </div>

          {/* Description and CTA */}
          <div>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We are committed to providing unprecedented 
              support and resources for the holistic 
              development of our members. Our programs 
              focus on enhancing technical skills, fostering 
              leadership qualities, and preparing students 
              for the challenges of the chemical engineering 
              industry.
            </p>
            
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium"
            >
              Join Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
