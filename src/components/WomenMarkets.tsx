import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, MapPin, Sparkles, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import puneMarketBg from "@/assets/pune-market-bg.jpg";
import mumbaiMarketBg from "@/assets/mumbai-market-bg.jpg";

interface MarketDate {
  id: string;
  date: string;
  day: string;
  venue: string;
  city: string;
  slots_total: number;
  slots_remaining: number;
  is_active: boolean;
}

const WomenMarkets = () => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState<"pune" | "mumbai" | null>(null);
  const [schedules, setSchedules] = useState<MarketDate[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      const { data } = await supabase
        .from("women_market_schedule")
        .select("*")
        .eq("is_active", true)
        .order("date");
      if (data) setSchedules(data as any);
    };
    fetchSchedules();
  }, []);

  const puneDates = schedules.filter((s) => s.city === "Pune");
  const mumbaiDates = schedules.filter((s) => s.city === "Mumbai");
  const currentDates = selectedCity === "pune" ? puneDates : selectedCity === "mumbai" ? mumbaiDates : [];

  const translateDay = (day: string) => {
    const dayMap: { [key: string]: string } = {
      Monday: "monday", Tuesday: "tuesday", Wednesday: "wednesday",
      Thursday: "thursday", Friday: "friday", Saturday: "saturday", Sunday: "sunday",
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
              <Button onClick={() => handleApply()} className="bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base w-full sm:w-auto">
                <Calendar className="h-4 w-4 mr-2" />
                {t('applyForStall')}
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('women-markets')?.scrollIntoView({ behavior: 'smooth' })} className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950 text-sm sm:text-base w-full sm:w-auto">
                {t('viewSchedule')}
              </Button>
            </div>
          </div>
        </div>

        {/* City Selection */}
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
              {[
                { key: "pune" as const, label: "Pune", dates: puneDates, bg: puneMarketBg },
                { key: "mumbai" as const, label: "Mumbai", dates: mumbaiDates, bg: mumbaiMarketBg },
              ].map(({ key, label, dates, bg }) => (
                <Card key={key} className="group cursor-pointer hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-border hover:border-orange-600 overflow-hidden relative h-[200px] sm:h-[240px]" onClick={() => setSelectedCity(key)}>
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${bg})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-500" />
                  <CardHeader className="text-center relative z-10 py-6 flex flex-col items-center justify-center h-full">
                    <div className="mx-auto mb-3 p-3 sm:p-4 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 w-fit">
                      <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300 drop-shadow-lg">{label}</CardTitle>
                    <CardDescription className="text-sm sm:text-base mt-2 text-white/90 font-semibold drop-shadow-md">
                      {dates.length} {t('womenMarketDates')}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Vendor Eligibility */}
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

        {/* Market Schedule */}
        {selectedCity && (
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button variant="outline" onClick={() => setSelectedCity(null)} className="hover:scale-105 transition-transform w-full sm:w-auto">
                ← {t("backToCities") || "Back to Cities"}
              </Button>
              <h3 className="text-xl sm:text-2xl font-bold">
                {selectedCity === "pune" ? "Pune" : "Mumbai"} {t("womenMarketDates")}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {currentDates.map((dateInfo) => (
                <Card key={dateInfo.id} className="hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600 flex-shrink-0" />
                      {translateDay(dateInfo.day)}
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      {new Date(dateInfo.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
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
                        {t("slotsRemaining", { remaining: dateInfo.slots_remaining.toString(), total: dateInfo.slots_total.toString() })}
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
