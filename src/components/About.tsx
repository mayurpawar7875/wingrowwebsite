import { Users, TrendingUp, Heart, Store } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Store, value: "47", label: "Weekly Markets" },
    { icon: Users, value: "1,250+", label: "Farmers Connected" },
    { icon: Heart, value: "56", label: "Women SHGs" },
    { icon: TrendingUp, value: "₹200+ Cr", label: "Generated" },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About Wingrow Market</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Founded by Vrunda Borkar and Mayur Pawar, Wingrow Market was born from a simple yet powerful vision: 
            to create direct connections between farmers, women entrepreneurs, and consumers. We believe in empowering 
            local communities by eliminating middlemen and ensuring fair prices for both producers and consumers.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            What started as a single market has grown into a movement spanning across Pune and Mumbai, creating 
            sustainable livelihoods and bringing fresh, quality produce directly to your neighborhoods.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-lg bg-gradient-to-br from-card to-muted/20 shadow-soft hover:shadow-medium transition-all hover-scale"
            >
              <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
