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
    <section className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('aboutTitle')}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {t('aboutSubtitle')}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
