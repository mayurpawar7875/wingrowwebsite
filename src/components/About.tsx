import { Users, TrendingUp, Heart, Store, Package, FileCheck, ShoppingBag, Briefcase } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import marketBasket from "@/assets/market-basket.png";

const About = () => {
  const { t } = useTranslation();
  
  const stats = [
    { icon: Store, value: "47", label: t('weeklyMarkets') },
    { icon: Users, value: "1,250+", label: t('farmers') },
    { icon: Heart, value: "56", label: t('womenSHGs') },
    { icon: TrendingUp, value: "₹200+ Cr", label: t('revenueGenerated') },
    { icon: Package, value: "40K MT", label: t('fruitsVegetablesSold') },
    { icon: FileCheck, value: "6", label: t('airforceTenders') },
    { icon: ShoppingBag, value: "12,000+", label: t('customerBase') },
    { icon: Briefcase, value: "1,500+", label: t('employmentGeneration') },
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-green-50/30 via-background to-emerald-50/30 relative overflow-hidden">
      {/* Market Basket Background Image */}
      <div 
        className="absolute inset-0 opacity-[0.03] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${marketBasket})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 pb-2 leading-tight bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
            {t('aboutTitle')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('aboutSubtitle')}
          </p>
        </div>

        {/* ✅ Two tiles per row on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative flex flex-col items-center text-center p-4 sm:p-6 rounded-3xl 
                         bg-gradient-to-br from-green-50 via-white to-emerald-50 
                         border-2 border-green-100 shadow-md hover:shadow-xl 
                         transition-all duration-500 hover:-translate-y-2 hover:scale-105
                         animate-fade-in overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Market Basket Background on Tile */}
              <div 
                className="absolute inset-0 opacity-[0.08] pointer-events-none"
                style={{
                  backgroundImage: `url(${marketBasket})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-200/10 via-emerald-100/10 to-green-300/10 
                              group-hover:from-green-300/20 group-hover:via-emerald-200/20 group-hover:to-green-400/20 
                              transition-all duration-500" />
              
              <div className="relative z-10 w-full">
                {/* Icon in circular container */}
                <div className="inline-flex p-3 sm:p-4 rounded-full bg-gradient-to-br from-green-100 to-emerald-100 
                                border-2 border-green-200 mb-3 sm:mb-4 
                                group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg
                                transition-all duration-300">
                  <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-green-700 group-hover:text-emerald-700 transition-colors duration-300" />
                </div>
                
                {/* Value */}
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2 
                                text-green-800 group-hover:text-green-900 
                                group-hover:scale-110 transition-all duration-300">
                  {stat.value}
                </div>
                
                {/* Label */}
                <div className="text-xs sm:text-sm text-green-700 group-hover:text-green-800 
                                transition-colors duration-300 font-medium leading-snug">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
