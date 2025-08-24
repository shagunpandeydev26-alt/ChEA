import { Card, CardContent } from "./ui/card";

export default function AboutChEA() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background molecular patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-primary/30"></div>
        <div className="absolute bottom-1/3 left-1/5 w-24 h-24 rounded-full border border-primary/20"></div>
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-primary/40 rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* About ChEA Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              About ChEA
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              ChEA (Chemical Engineering Association) is dedicated to fostering 
              the growth and development of aspiring chemical engineers. We 
              provide a platform for students to enhance their knowledge, skills, and 
              understanding of the field through various events, workshops, and 
              networking opportunities.
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-8">
            {/* Student's Corner Card */}
            <Card className="bg-card border-border hover:bg-card/80 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Student's Corner
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      The student's corner is where our members can access resources, articles, 
                      and educational materials related to chemical engineering. It's a space 
                      designed to support and guide students in their academic and professional 
                      journey.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Events Card */}
            <Card className="bg-card border-border hover:bg-card/80 transition-colors">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <div className="w-6 h-6 bg-primary rounded-sm"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Events
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Stay updated with our past and upcoming events. We 
                      host workshops, seminars, and industry visits to give students 
                      practical exposure and insights into the world of 
                      chemical engineering.
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
