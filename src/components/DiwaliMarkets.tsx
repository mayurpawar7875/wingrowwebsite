import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Calendar, CheckCircle2, MapPin, Sparkles, Users } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <Badge className="bg-orange-600 text-white px-4 py-2 text-base">
              <Sparkles className="h-4 w-4 mr-2" />
              Diwali Special 2025
            </Badge>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
            {t("diwaliHeroTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("diwaliHeroSubtitle")}
          </p>

          {/* Hero Carousel */}
          <Carousel className="max-w-4xl mx-auto mb-8">
            <CarouselContent>
              <CarouselItem>
                <div className="h-[300px] bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Sparkles className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Festive Shopping Experience</h3>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-[300px] bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Users className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Women-Led Brands</h3>
                  </div>
                </div>
              </CarouselItem>
              <CarouselItem>
                <div className="h-[300px] bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Multiple Locations</h3>
                  </div>
                </div>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
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
