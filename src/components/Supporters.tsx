import { useTranslation } from "@/hooks/useTranslation";
import { useState, useEffect, useRef } from "react";

// Import logos statically but render with lazy loading
import sahyadriLogo from "@/assets/sahyadri.png";
import digitalImpactLogo from "@/assets/DigitalImpactSQ_Logo.png";
import unLtdLogo from "@/assets/unlimitedindia.png";
import sineLogo from "@/assets/sineiitb-Photoroom.png";
import deshpandeLogo from "@/assets/deshpande-logo.png";
import jrabiLogo from "@/assets/J-RABI-LOGO-removebg-preview.png";
import bhauLogo from "@/assets/Bhau Institute_0.png";
import evGrantLogo from "@/assets/ev grant.png";
import naarmLogo from "@/assets/naarm.png";
import magicLogo from "@/assets/Magic-Photoroom.png";

const supporters = [
  { name: "MAGIC Aurangabad", logo: magicLogo },
  { name: "Digital Impact Square", logo: digitalImpactLogo },
  { name: "UnLtd India", logo: unLtdLogo },
  { name: "Sahyadri Farms", logo: sahyadriLogo },
  { name: "a-Idea NAARM, Hyderabad", logo: naarmLogo },
  { name: "Deshpande Startups", logo: deshpandeLogo },
  { name: "J-RABI", logo: jrabiLogo },
  { name: "Bhau Institute COEP", logo: bhauLogo },
  { name: "Ev Grant", logo: evGrantLogo },
  { name: "SINE IITB", logo: sineLogo },
];

const Supporters = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin: '200px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t("Supporters & Partners")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            {t("People Who Believe In Our Vision For An Inclusive Agri Ecosystem")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {supporters.map((supporter, index) => (
            <div key={index} className="group relative flex flex-col items-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-44 lg:h-44 mb-3">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 border-4 border-green-200/50 shadow-lg hover:shadow-xl hover:border-green-400/70 transition-all duration-500 transform group-hover:scale-105" />
                <div className="relative z-10 flex items-center justify-center w-full h-full p-5">
                  {isVisible && (
                    <img
                      src={supporter.logo}
                      alt={supporter.name}
                      loading="lazy"
                      decoding="async"
                      className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110 opacity-90"
                      style={{ mixBlendMode: 'multiply', filter: 'contrast(1.2)' }}
                    />
                  )}
                </div>
              </div>
              <div className="text-center w-full">
                <p className="text-xs md:text-sm lg:text-base font-medium text-green-800 group-hover:text-green-900 transition-colors duration-300 px-1 line-clamp-2">
                  {supporter.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Supporters;
