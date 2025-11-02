import { useTranslation } from "@/hooks/useTranslation";
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

const Supporters = () => {
  const { t } = useTranslation();

  const supporters = [
    {
      name: "MAGIC Aurangabad",
      logo: magicLogo,
    },
    {
      name: "Digital Impact Square",
      logo: digitalImpactLogo,
    },
    {
      name: "UnLtd India",
      logo: unLtdLogo,
    },
    {
      name: "Sahyadri Farms",
      logo: sahyadriLogo,
    },
    {
      name: "a-Idea NAARM, Hyderabad",
      logo: naarmLogo,
    },
    {
      name: "Deshpande Startups",
      logo: deshpandeLogo,
    },
    {
      name: "J-RABI",
      logo: jrabiLogo,
    },
    {
      name: "Bhau Institute COEP",
      logo: bhauLogo,
    },
    {
      name: "Ev Grant",
      logo: evGrantLogo,
    },
    {
      name: "SINE IITB",
      logo: sineLogo,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-in-left">
            {t("Supporters & Partners")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            {t("People Who Believe In Our Vision For An Inclusive Agri Ecosystem")}
          </p>
        </div>

        {/* Supporters Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {supporters.map((supporter, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Circular Tile */}
              <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-44 lg:h-44 mb-3">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-100 via-green-50 to-emerald-100 border-4 border-green-200/50 shadow-lg hover:shadow-xl hover:border-green-400/70 transition-all duration-500 transform group-hover:scale-105" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-200/20 via-emerald-100/20 to-green-300/20 group-hover:from-green-300/30 group-hover:via-emerald-200/30 group-hover:to-green-400/30 transition-all duration-500" />
                
                {/* Logo Container */}
                <div className="relative z-10 flex items-center justify-center w-full h-full p-5">
                  <img
                    src={supporter.logo}
                    alt={supporter.name}
                    className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110 opacity-90"
                    style={{ mixBlendMode: 'multiply', filter: 'contrast(1.2)' }}
                  />
                </div>
              </div>
              
              {/* Text Content Below Circular Tile */}
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
