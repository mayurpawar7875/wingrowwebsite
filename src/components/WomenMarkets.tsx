import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Calendar, CheckCircle2, MapPin, Sparkles, Users } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import puneMarketBg from "@/assets/pune-market-bg.jpg";
import mumbaiMarketBg from "@/assets/mumbai-market-bg.jpg";

interface StallOption {
  type: string;
  size: string;
  price: string;
  features: string[];
}

interface MarketDate {
  date: string;
  day: string;
  venue: string;
  slotsTotal: number;
  slotsRemaining: number;
}

const stallOptions: StallOption[] = [
  {
    type: "standardStall",
    size: "6×6 ft",
    price: "₹1,500",
    features: ["basicLighting", "websiteMap", "socialPromo"],
  },
  {
    type: "cornerStall",
    size: "6×8 ft",
    price: "₹2,000",
    features: ["basicLighting", "websiteMap", "socialPromo"],
  },
  {
    type: "premiumStall",
    size: "8×8 ft",
    price: "₹2,500",
    features: ["basicLighting", "websiteMap", "socialPromo"],
  },
];

const puneDates: MarketDate[] = [
  { date: "2025-10-15", day: "Tuesday", venue: "Kharadi IT Park", slotsTotal: 40, slotsRemaining: 28 },
  { date: "2025-10-16", day: "Wednesday", venue: "Magarpatta City", slotsTotal: 50, slotsRemaining: 35 },
  { date: "2025-10-17", day: "Thursday", venue: "Baner", slotsTotal: 45, slotsRemaining: 30 },
  { date: "2025-10-18", day: "Friday", venue: "Kothrud", slotsTotal: 40, slotsRemaining: 25 },
  { date: "2025-10-19", day: "Saturday", venue: "Wakad", slotsTotal: 50, slotsRemaining: 38 },
  { date: "2025-10-20", day: "Sunday", venue: "Aundh", slotsTotal: 60, slotsRemaining: 45 },
];

const mumbaiDates: MarketDate[] = [
  { date: "2025-10-16", day: "Wednesday", venue: "Andheri", slotsTotal: 50, slotsRemaining: 32 },
  { date: "2025-10-17", day: "Thursday", venue: "Thane", slotsTotal: 45, slotsRemaining: 28 },
  { date: "2025-10-18", day: "Friday", venue: "Vashi", slotsTotal: 40, slotsRemaining: 22 },
  { date: "2025-10-19", day: "Saturday", venue: "Borivali", slotsTotal: 50, slotsRemaining: 35 },
  { date: "2025-10-20", day: "Sunday", venue: "Powai", slotsTotal: 55, slotsRemaining: 40 },
];

const WomenMarkets = () => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState<"pune" | "mumbai" | null>(null);

  const currentDates = selectedCity === "pune" ? puneDates : selectedCity === "mumbai" ? mumbaiDates : [];

  const translateDay = (day: string) => {
    const dayMap: { [key: string]: string } = {
      'Monday': 'monday',
      'Tuesday': 'tuesday',
      'Wednesday': 'wednesday',
      'Thursday': 'thursday',
      'Friday': 'friday',
      'Saturday': 'saturday',
      'Sunday': 'sunday',
    };
    return t(dayMap[day] as any) || day;
  };

  const handleApply = (date?: MarketDate) => {
    window.dispatchEvent(
      new CustomEvent("openChatbot", {
        detail: {
          producerType: "Women Entrepreneur",
          stallType: "Women Market",
          city: selectedCity === "pune" ? "Pune" : "Mumbai",
          market: date?.venue,
          date: date?.date,
        },
      })
    );
  };

  return (
    <section id="women-markets" className="pt-8 pb-20 bg-gradient-to-b from-orange-50/50 to-white dark:from-orange-950/10 dark:to-background">
      <div className="container px-4">
        {/* Women Markets Banner */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 dark:from-orange-950/30 dark:via-amber-950/30 dark:to-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-2xl p-4 md:p-6 mb-8 md:mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left w-full md:w-auto">
              <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-orange-600 dark:text-orange-400 animate-pulse flex-shrink-0" />
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground bg-gradient-to-r from-orange-600 via-amber-600 to-orange-600 bg-clip-text text-transparent animate-scale-in">
                  {t('womenMarketBannerTitle')}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                  {t('womenMarketBannerSubtitle')}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
              <Button
                onClick={() => handleApply()}
                className="bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base w-full sm:w-auto"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {t('applyForStall')}
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('women-markets')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 text-sm sm:text-base w-full sm:w-auto"
              >
                {t('viewSchedule')}
              </Button>
            </div>
          </div>
        </div>

        {/* City Selection - Show when no city is selected */}
        {!selectedCity && (
          <div className="mb-12">
            <div className="text-center mb-8 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 via-foreground to-orange-600 bg-clip-text text-transparent animate-scale-in">
                {t('womenMarketBannerTitle')}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('womenMarketBannerSubtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto mb-12">
              {/* Pune City Card */}
              <Card 
                className="group cursor-pointer hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-border hover:border-orange-600 overflow-hidden relative h-[200px] sm:h-[240px]"
                onClick={() => setSelectedCity("pune")}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${puneMarketBg})` }}
                />
                
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 
                              group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20
                              transition-all duration-500" />
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                              bg-gradient-to-r from-orange-500/20 via-orange-500/30 to-orange-500/20 
                              blur-2xl transition-opacity duration-500 -z-10" />
                
                <CardHeader className="text-center relative z-10 py-6 flex flex-col items-center justify-center h-full">
                  <div className="mx-auto mb-3 p-3 sm:p-4 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 
                                group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 w-fit">
                    <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300 drop-shadow-lg">
                    Pune
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base mt-2 text-white/90 font-semibold drop-shadow-md">
                    {puneDates.length} {t('womenMarketDates')}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Mumbai City Card */}
              <Card 
                className="group cursor-pointer hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-border hover:border-orange-600 overflow-hidden relative h-[200px] sm:h-[240px]"
                onClick={() => setSelectedCity("mumbai")}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${mumbaiMarketBg})` }}
                />
                
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 
                              group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20
                              transition-all duration-500" />
                
                {/* Glowing border effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                              bg-gradient-to-r from-orange-500/20 via-orange-500/30 to-orange-500/20 
                              blur-2xl transition-opacity duration-500 -z-10" />
                
                <CardHeader className="text-center relative z-10 py-6 flex flex-col items-center justify-center h-full">
                  <div className="mx-auto mb-3 p-3 sm:p-4 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 
                                group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 w-fit">
                    <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300 drop-shadow-lg">
                    Mumbai
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base mt-2 text-white/90 font-semibold drop-shadow-md">
                    {mumbaiDates.length} {t('womenMarketDates')}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {/* Vendor Eligibility - Show when no city is selected */}
        {!selectedCity && (
          <div className="mb-12">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">{t("vendorEligibility")}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
              {[
                { icon: CheckCircle2, label: "womenLedBrand" },
                { icon: Users, label: "wshgMember" },
                { icon: CheckCircle2, label: "fssaiRequired" },
                { icon: CheckCircle2, label: "posOptional" },
              ].map(({ icon: Icon, label }) => (
                <Card key={label} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-4 sm:pt-6 pb-4 px-2 sm:px-4">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 mx-auto mb-2 text-orange-600" />
                    <p className="text-xs sm:text-sm font-medium">{t(label as any)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Market Schedule - Show when city is selected */}
        {selectedCity && (
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCity(null);
                }}
                className="hover:scale-105 transition-transform w-full sm:w-auto"
              >
                ← {t("backToCities") || "Back to Cities"}
              </Button>
              <h3 className="text-xl sm:text-2xl font-bold">
                {selectedCity === "pune" ? "Pune" : "Mumbai"} {t("womenMarketDates")}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {currentDates.map((dateInfo) => (
                <Card key={dateInfo.date} className="hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 flex-shrink-0" />
                      {translateDay(dateInfo.day)}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {new Date(dateInfo.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
                      <span>{dateInfo.venue}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">{t("limitedSlots")}</p>
                      <p className="text-xs sm:text-sm font-semibold text-orange-600">
                        {t("slotsRemaining", {
                          remaining: dateInfo.slotsRemaining.toString(),
                          total: dateInfo.slotsTotal.toString(),
                        })}
                      </p>
                    </div>
                    <Button onClick={() => handleApply(dateInfo)} className="w-full bg-orange-600 hover:bg-orange-700 text-sm sm:text-base">
                      {t("applyNow")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WomenMarkets;
