import { Users, TrendingUp, Heart, Store, Package, FileCheck, ShoppingBag, Briefcase } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

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
    <section className="py-12 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 pb-2 leading-tight bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-scale-in">
            {t('aboutTitle')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: '0.1s' }}>
            {t('aboutSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative text-center p-6 rounded-2xl bg-gradient-to-br from-primary/5 via-card to-primary/10 
                         border border-primary/10 shadow-lg hover:shadow-2xl hover:shadow-primary/20
                         transition-all duration-500 hover:-translate-y-2 hover:scale-105
                         overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 
                            group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-primary/10 
                            transition-all duration-500 rounded-2xl" />
              
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                            bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 
                            blur-xl transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 
                              transition-all duration-300 mb-4 group-hover:scale-110 group-hover:rotate-6">
                  <stat.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 
                              bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground 
                              transition-colors duration-300 font-medium">
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
