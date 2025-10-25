import { Button } from "@/components/ui/button";
import { Calendar, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-market.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>
      
      <div className="container relative z-10 px-4 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          Connecting Farmers, Women Entrepreneurs & Consumers Directly
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          Book your stall or shop fresh at our weekly markets across Pune and Mumbai
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-medium hover:scale-105 transition-transform"
            onClick={() => scrollToSection('contact')}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a Stall
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 shadow-soft hover:scale-105 transition-transform bg-card/80 backdrop-blur-sm"
            onClick={() => scrollToSection('markets')}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Visit Our Markets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
