import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const puneMarkets = [
  { nameKey: "kharadiMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "hadapsarMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "magarpattaMarket", day: "Saturday", time: "7 AM - 1 PM" },
  { nameKey: "ivyEstateMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "banerMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "wakadMarket", day: "Sunday", time: "7 AM - 1 PM" },
  { nameKey: "aundhMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "pimpleSaudagarMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "kalyaniNagarMarket", day: "Saturday", time: "7 AM - 1 PM" },
  { nameKey: "vimanNagarMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "kothrudMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "shivajiNagarMarket", day: "Sunday", time: "7 AM - 1 PM" },
  { nameKey: "katrajMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "warjeMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "undriMarket", day: "Saturday", time: "7 AM - 1 PM" },
  { nameKey: "kondhwaMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "hinjewadiMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "pashanMarket", day: "Sunday", time: "7 AM - 1 PM" },
  { nameKey: "bavdhanMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "susMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "pimpriMarket", day: "Saturday", time: "7 AM - 1 PM" },
  { nameKey: "chinchwadMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "nigdiMarket", day: "Saturday", time: "7 AM - 12 PM" },
];

const mumbaiMarkets = [
  { nameKey: "dombivliMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "thaneMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "mulundMarket", day: "Sunday", time: "7 AM - 1 PM" },
  { nameKey: "ghatkoperMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "borivaliMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "chemburMarket", day: "Saturday", time: "7 AM - 1 PM" },
  { nameKey: "andheriMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "kandivaliMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "maladMarket", day: "Sunday", time: "7 AM - 1 PM" },
  { nameKey: "goregaonMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "dahisarMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "miraRoadMarket", day: "Saturday", time: "7 AM - 1 PM" },
  { nameKey: "bhandupMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "vikhroliMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "powaiMarket", day: "Sunday", time: "7 AM - 1 PM" },
  { nameKey: "kurlaMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "vashiMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "khargharMarket", day: "Saturday", time: "7 AM - 1 PM" },
  { nameKey: "panvelMarket", day: "Sunday", time: "7 AM - 12 PM" },
  { nameKey: "nerulMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "airoliMarket", day: "Sunday", time: "7 AM - 1 PM" },
  { nameKey: "sanpadaMarket", day: "Saturday", time: "7 AM - 12 PM" },
  { nameKey: "koparKhairaneMarket", day: "Sunday", time: "7 AM - 12 PM" },
];

const Markets = () => {
  const { t } = useTranslation();
  
  return (
    <section id="markets" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('marketsTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('marketsSubtitle', { count: puneMarkets.length + mumbaiMarkets.length })}
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">{t('puneMarkets')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {puneMarkets.map((market, index) => (
              <Card 
                key={index} 
                className="hover:shadow-medium transition-all duration-300 hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {t(market.nameKey)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    <div className="font-semibold text-foreground mt-2">{t(market.day.toLowerCase() as 'saturday' | 'sunday')}</div>
                    <div>{market.time}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">{t('viewDetails')}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">{t('mumbaiMarkets')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mumbaiMarkets.map((market, index) => (
              <Card 
                key={index} 
                className="hover:shadow-medium transition-all duration-300 hover-scale animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {t(market.nameKey)}
                  </CardTitle>
                  <CardDescription className="text-base">
                    <div className="font-semibold text-foreground mt-2">{t(market.day.toLowerCase() as 'saturday' | 'sunday')}</div>
                    <div>{market.time}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">{t('viewDetails')}</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8 text-center">{t('findUsOnMap')}</h3>
          <div className="rounded-lg overflow-hidden shadow-medium">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2613173278896!2d73.92636431490088!3d18.561924887382677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c14df5c70e0d%3A0x2d19689e09e2fced!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wingrow Markets Location Map"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Markets;
