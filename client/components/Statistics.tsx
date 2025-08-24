export default function Statistics() {
  const stats = [
    { number: "2022", label: "Established" },
    { number: "10+", label: "annually" },
    { number: "3+", label: "Conferences per year" },
    { number: "5+", label: "No. of workshops" },
    { number: "50+", label: "Members" },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background wave pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-full fill-primary/20"
        >
          <path d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground">
            ChEA in Numbers
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
