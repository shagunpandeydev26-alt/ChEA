import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-start bg-background overflow-hidden pt-32">
      {/* Background overlay with chemical pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70"></div>
      
      {/* Background chemical imagery placeholder */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-primary/30"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full border border-primary/20"></div>
        <div className="absolute bottom-1/3 right-1/5 w-48 h-48 rounded-full border border-primary/25"></div>
        {/* Molecular dots */}
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute top-1/2 right-1/2 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/2 right-1/3 w-2 h-2 bg-primary/40 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-primary/40 rounded-full"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground leading-tight mb-6">
            Welcome to ChEA -
            <br />
            <span className="text-foreground">Chemical</span>
            <br />
            <span className="text-foreground">Engineering</span>
            <br />
            <span className="text-foreground">Association</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl font-light">
            Empowering Students of
            <br />
            Chemical Engineering
          </p>

          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-light"
          >
            Discover More
          </Button>
        </div>
      </div>
    </section>
  );
}
