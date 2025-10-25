import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, CheckCircle2, MapPin, Sparkles, Users } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface StallOption {
  type: string;
  size: string;
  price: string;
  features: string[];
}

interface DiwaliDate {
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

const puneDates: DiwaliDate[] = [
  { date: "2025-10-15", day: "Tuesday", venue: "Kharadi IT Park", slotsTotal: 40, slotsRemaining: 28 },
  { date: "2025-10-16", day: "Wednesday", venue: "Magarpatta City", slotsTotal: 50, slotsRemaining: 35 },
  { date: "2025-10-17", day: "Thursday", venue: "Baner", slotsTotal: 45, slotsRemaining: 30 },
  { date: "2025-10-18", day: "Friday", venue: "Kothrud", slotsTotal: 40, slotsRemaining: 25 },
  { date: "2025-10-19", day: "Saturday", venue: "Wakad", slotsTotal: 50, slotsRemaining: 38 },
  { date: "2025-10-20", day: "Sunday", venue: "Aundh", slotsTotal: 60, slotsRemaining: 45 },
];

const mumbaiDates: DiwaliDate[] = [
  { date: "2025-10-16", day: "Wednesday", venue: "Andheri", slotsTotal: 50, slotsRemaining: 32 },
  { date: "2025-10-17", day: "Thursday", venue: "Thane", slotsTotal: 45, slotsRemaining: 28 },
  { date: "2025-10-18", day: "Friday", venue: "Vashi", slotsTotal: 40, slotsRemaining: 22 },
  { date: "2025-10-19", day: "Saturday", venue: "Borivali", slotsTotal: 50, slotsRemaining: 35 },
  { date: "2025-10-20", day: "Sunday", venue: "Powai", slotsTotal: 55, slotsRemaining: 40 },
];

const DiwaliMarkets = () => {
  const { t } = useTranslation();
  const [selectedCity, setSelectedCity] = useState<"pune" | "mumbai">("pune");

  const currentDates = selectedCity === "pune" ? puneDates : mumbaiDates;

  const handleApply = (date?: DiwaliDate) => {
    window.dispatchEvent(
      new CustomEvent("openChatbot", {
        detail: {
          producerType: "Women Entrepreneur",
          stallType: "Diwali Market",
          city: selectedCity === "pune" ? "Pune" : "Mumbai",
          market: date?.venue,
          date: date?.date,
        },
      })
    );
  };

  return (
    <section id="diwali-markets" className="py-20 bg-gradient-to-b from-orange-50/50 to-white dark:from-orange-950/10 dark:to-background">
      <div className="container px-4">
        {/* Diwali Banner */}
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 dark:from-orange-950/30 dark:via-amber-950/30 dark:to-orange-950/30 border border-orange-200 dark:border-orange-800 rounded-2xl p-6 mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-center md:text-left">
              <Sparkles className="h-8 w-8 text-orange-600 dark:text-orange-400 animate-pulse flex-shrink-0" />
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Diwali Markets 2025 — Women Entrepreneurs Showcase
                </h2>
                <p className="text-sm md:text-base text-muted-foreground">
                  Special festive stalls in Pune (Tue–Sun) & Mumbai (Wed–Sun). Apply now!
                </p>
              </div>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Button
                onClick={() => handleApply()}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Apply for Stall
              </Button>
              <Button
                variant="outline"
                onClick={() => document.getElementById('diwali-markets')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
              >
                View Schedule
              </Button>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">

          {/* Hero Carousel */}
          <Carousel 
            className="max-w-5xl mx-auto mb-8" 
            opts={{ loop: true, align: "start" }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
          >
            <CarouselContent>
              {/* Slide 1 - Festive Shopping */}
              <CarouselItem>
                <div className="relative h-[400px] bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                  <div className="relative h-full flex flex-col items-center justify-center text-white px-8 animate-fade-in">
                    <div className="mb-6 relative">
                      <Sparkles className="h-24 w-24 animate-pulse drop-shadow-2xl" />
                      <Sparkles className="h-8 w-8 absolute -top-2 -right-2 animate-bounce" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">
                      Festive Shopping Experience
                    </h3>
                    <p className="text-xl md:text-2xl text-center max-w-2xl text-white/90 drop-shadow-md">
                      Celebrate Diwali with handpicked products from talented women entrepreneurs
                    </p>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 2 - Women Entrepreneurs */}
              <CarouselItem>
                <div className="relative h-[400px] bg-gradient-to-br from-pink-500 via-rose-400 to-orange-500 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
                  <div className="relative h-full flex flex-col items-center justify-center text-white px-8 animate-fade-in">
                    <div className="mb-6 relative">
                      <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <Users className="h-16 w-16 drop-shadow-2xl" />
                      </div>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">
                      Empowering Women Entrepreneurs
                    </h3>
                    <p className="text-xl md:text-2xl text-center max-w-2xl text-white/90 drop-shadow-md">
                      Support local women-led businesses this festive season
                    </p>
                    <div className="mt-6 flex gap-4">
                      <Badge className="bg-white/20 backdrop-blur-sm text-white text-lg px-6 py-2 border-white/30">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        WSHG Certified
                      </Badge>
                      <Badge className="bg-white/20 backdrop-blur-sm text-white text-lg px-6 py-2 border-white/30">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Quality Products
                      </Badge>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 3 - Multiple Locations */}
              <CarouselItem>
                <div className="relative h-[400px] bg-gradient-to-br from-purple-500 via-indigo-400 to-blue-500 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)] pointer-events-none" />
                  <div className="relative h-full flex flex-col items-center justify-center text-white px-8 animate-fade-in">
                    <div className="mb-6 relative">
                      <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-pulse">
                        <MapPin className="h-16 w-16 drop-shadow-2xl" />
                      </div>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">
                      46 Markets Across Pune & Mumbai
                    </h3>
                    <p className="text-xl md:text-2xl text-center max-w-2xl text-white/90 drop-shadow-md">
                      Find a Diwali market near you and shop local
                    </p>
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
                        <div className="text-3xl font-bold">34</div>
                        <div className="text-sm">Pune Markets</div>
                      </div>
                      <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3 text-center">
                        <div className="text-3xl font-bold">12</div>
                        <div className="text-sm">Mumbai Markets</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>

              {/* Slide 4 - Limited Slots */}
              <CarouselItem>
                <div className="relative h-[400px] bg-gradient-to-br from-red-500 via-orange-500 to-amber-500 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_60%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
                  <div className="relative h-full flex flex-col items-center justify-center text-white px-8 animate-fade-in">
                    <div className="mb-6">
                      <Calendar className="h-24 w-24 drop-shadow-2xl animate-bounce" />
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-lg">
                      Limited Stalls Available!
                    </h3>
                    <p className="text-xl md:text-2xl text-center max-w-2xl text-white/90 drop-shadow-md mb-6">
                      Book your festive stall today - slots filling fast
                    </p>
                    <Button 
                      size="lg" 
                      onClick={() => handleApply()}
                      className="bg-white text-orange-600 hover:bg-orange-50 text-xl px-8 py-6 h-auto font-bold shadow-xl hover:scale-105 transition-transform"
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      Apply Now
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="left-4 h-12 w-12 bg-white/90 hover:bg-white" />
            <CarouselNext className="right-4 h-12 w-12 bg-white/90 hover:bg-white" />
          </Carousel>
        </div>

        {/* Vendor Eligibility */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">{t("vendorEligibility")}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { icon: CheckCircle2, label: "womenLedBrand" },
              { icon: Users, label: "wshgMember" },
              { icon: CheckCircle2, label: "fssaiRequired" },
              { icon: CheckCircle2, label: "posOptional" },
            ].map(({ icon: Icon, label }) => (
              <Card key={label} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-sm font-medium">{t(label as any)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* City Tabs & Dates */}
        <Tabs value={selectedCity} onValueChange={(v) => setSelectedCity(v as "pune" | "mumbai")} className="mb-16">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="pune">{t("pune")}</TabsTrigger>
            <TabsTrigger value="mumbai">{t("mumbai")}</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedCity}>
            <h3 className="text-2xl font-bold mb-6 text-center">{t("diwaliDates")}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentDates.map((dateInfo) => (
                <Card key={dateInfo.date} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      {dateInfo.day}
                    </CardTitle>
                    <CardDescription>
                      {new Date(dateInfo.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{dateInfo.venue}</span>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">{t("limitedSlots")}</p>
                      <p className="text-sm font-semibold text-orange-600">
                        {t("slotsRemaining", {
                          remaining: dateInfo.slotsRemaining.toString(),
                          total: dateInfo.slotsTotal.toString(),
                        })}
                      </p>
                    </div>
                    <Button onClick={() => handleApply(dateInfo)} className="w-full bg-orange-600 hover:bg-orange-700">
                      {t("applyNow")}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Stall Options */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">{t("stallOptions")}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {stallOptions.map((stall) => (
              <Card key={stall.type} className="hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle>{t(stall.type as any)}</CardTitle>
                  <CardDescription>
                    {t("stallSize")}: {stall.size}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-orange-600">{stall.price}</div>
                  <p className="text-sm text-muted-foreground">{t("pricePerDay")}</p>
                  <div className="space-y-2">
                    <p className="font-semibold text-sm">{t("whatsIncluded")}:</p>
                    <ul className="space-y-1">
                      {stall.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          {t(feature as any)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button onClick={() => handleApply()} variant="outline" className="w-full border-orange-600 text-orange-600 hover:bg-orange-50">
                    {t("bookNow")}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">{t("diwaliFaqTitle")}</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t("faqWhatCanISell")}</AccordionTrigger>
              <AccordionContent>{t("faqWhatCanISellAnswer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{t("faqLicenses")}</AccordionTrigger>
              <AccordionContent>{t("faqLicensesAnswer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{t("faqTimings")}</AccordionTrigger>
              <AccordionContent>{t("faqTimingsAnswer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>{t("faqRefund")}</AccordionTrigger>
              <AccordionContent>{t("faqRefundAnswer")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>{t("faqPower")}</AccordionTrigger>
              <AccordionContent>{t("faqPowerAnswer")}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default DiwaliMarkets;
