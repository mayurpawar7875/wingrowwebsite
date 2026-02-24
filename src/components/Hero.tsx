import { Button } from "@/components/ui/button";
import { Calendar, ShoppingBag } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import heroImage1 from "@/assets/hero-market.jpg";

// Lazy load remaining images only when needed
const lazyImages = [
  () => import("@/assets/hero-market-2.jpg"),
  () => import("@/assets/hero-market-3.jpg"),
  () => import("@/assets/hero-market-4.jpg"),
  () => import("@/assets/hero-market-5.jpg"),
  () => import("@/assets/hero-market-6.jpg"),
  () => import("@/assets/hero-market-7.jpg"),
  () => import("@/assets/hero-market-8.jpg"),
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<string[]>([heroImage1]);
  const { t } = useTranslation();

  // Preload next images after first paint
  useEffect(() => {
    const timer = setTimeout(() => {
      Promise.all(lazyImages.map(fn => fn())).then(modules => {
        setLoadedImages([heroImage1, ...modules.map(m => m.default)]);
      });
    }, 1000); // Delay 1s to prioritize first paint
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loadedImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % loadedImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [loadedImages.length]);

  const openChatbot = useCallback(() => {
    window.dispatchEvent(new CustomEvent('openChatbot'));
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {loadedImages.map((image, index) => (
        <div
          key={index}
          className="absolute inset-0 z-0 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: currentSlide === index ? 1 : 0,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
        </div>
      ))}

      <div className="container relative z-10 px-4 py-24 md:py-20 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 animate-bounce-in bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent" style={{ animationDelay: '0.2s' }}>
          {t('heroTitle')}
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {t('heroSubtitle')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 shadow-medium hover:scale-105 transition-transform"
            onClick={openChatbot}
          >
            <Calendar className="mr-2 h-5 w-5" />
            {t('bookStall')}
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 shadow-soft hover:scale-105 transition-transform bg-card/80 backdrop-blur-sm"
            asChild
          >
            <Link to="/markets">
              <ShoppingBag className="mr-2 h-5 w-5" />
              {t('visitMarkets')}
            </Link>
          </Button>
        </div>

        <div className="flex gap-2 justify-center mt-8">
          {loadedImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? 'w-8 bg-primary' : 'w-2 bg-primary/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
