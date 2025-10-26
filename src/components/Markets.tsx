import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Grid3x3, List, Navigation, Calendar } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import puneMarketBg from "@/assets/pune-market-bg.jpg";
import mumbaiMarketBg from "@/assets/mumbai-market-bg.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import marketCarousel1 from "@/assets/market-carousel-1.jpg";
import marketCarousel2 from "@/assets/market-carousel-2.jpg";
import marketCarousel3 from "@/assets/market-carousel-3.jpg";
import marketCarousel4 from "@/assets/market-carousel-4.jpg";
import marketCarousel5 from "@/assets/market-carousel-5.jpg";

interface Market {
  nameKey: string;
  day: string;
  time: string;
  lat: number;
  lng: number;
  category: string[];
}

const puneMarkets: Market[] = [
  {
    nameKey: "karveNagarMarket",
    day: "Tuesday",
    time: "4 PM - 9 PM",
    lat: 18.4955875049347,
    lng: 73.8184985846566,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "godrejPranaMarket",
    day: "Tuesday",
    time: "4 PM - 9 PM",
    lat: 18.4552920362542,
    lng: 73.9138772153433,
    category: ["Vegetables", "Fruits", "Millets"],
  },
  {
    nameKey: "dhanoriMarket",
    day: "Tuesday",
    time: "4 PM - 9 PM",
    lat: 18.6019938625116,
    lng: 73.9041310441791,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "morjaiMarket",
    day: "Tuesday",
    time: "4 PM - 9 PM",
    lat: 18.6331504479689,
    lng: 73.8046165423283,
    category: ["Vegetables", "Processed Foods"],
  },
  {
    nameKey: "sadesataraNaliMarket",
    day: "Wednesday",
    time: "4 PM - 9 PM",
    lat: 18.5307967846815,
    lng: 73.9325030576716,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "gorejHorizonMarket",
    day: "Wednesday",
    time: "4 PM - 9 PM",
    lat: 18.4551160050207,
    lng: 73.9192969079398,
    category: ["Vegetables", "Millets"],
  },
  {
    nameKey: "geraKharadiMarket",
    day: "Wednesday",
    time: "4 PM - 9 PM",
    lat: 18.5630503126476,
    lng: 73.9573710236524,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "gujarwadiMarket",
    day: "Wednesday",
    time: "4 PM - 9 PM",
    lat: 18.4376332533761,
    lng: 73.8689091360955,
    category: ["Vegetables", "Processed Foods"],
  },
  {
    nameKey: "kharadiItParkMarket",
    day: "Thursday",
    time: "4 PM - 9 PM",
    lat: 18.5588062236668,
    lng: 73.9480621576716,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "manjariMarket",
    day: "Thursday",
    time: "4 PM - 9 PM",
    lat: 18.5383084959545,
    lng: 73.980659,
    category: ["Vegetables", "Fruits", "Millets"],
  },
  {
    nameKey: "bopodiMarket",
    day: "Thursday",
    time: "4 PM - 9 PM",
    lat: 18.5736670082045,
    lng: 73.8308716081672,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "morecornerMarket",
    day: "Friday",
    time: "4 PM - 9 PM",
    lat: 18.5904561199073,
    lng: 73.9663471576716,
    category: ["Vegetables", "Processed Foods"],
  },
  {
    nameKey: "bramhasunMarket",
    day: "Friday",
    time: "4 PM - 9 PM",
    lat: 18.5470747230474,
    lng: 73.9193005962982,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "kothrudMarket",
    day: "Friday",
    time: "4 PM - 9 PM",
    lat: 18.5019837832919,
    lng: 73.8215053066613,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "navsahyadriMarket",
    day: "Friday",
    time: "4 PM - 9 PM",
    lat: 18.4957004073687,
    lng: 73.8281300576716,
    category: ["Vegetables", "Millets"],
  },
  {
    nameKey: "bhavadiRoadMarket",
    day: "Saturday",
    time: "4 PM - 9 PM",
    lat: 18.5888319455885,
    lng: 73.9879499350319,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "grandeurUndriMarket",
    day: "Saturday",
    time: "4 PM - 9 PM",
    lat: 18.4497232044554,
    lng: 73.9135035711641,
    category: ["Vegetables", "Processed Foods"],
  },
  {
    nameKey: "baifRoadMarket",
    day: "Saturday",
    time: "4 PM - 9 PM",
    lat: 18.5754071126094,
    lng: 73.9766730525318,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "gangaConstellaMarket",
    day: "Saturday",
    time: "4 PM - 9 PM",
    lat: 18.5566933178482,
    lng: 73.949274311137,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "magarpattaMarket",
    day: "Sunday",
    time: "8 AM - 1 PM",
    lat: 18.5227060131992,
    lng: 73.92773909603,
    category: ["Vegetables", "Millets"],
  },
  {
    nameKey: "kumarKurtiMarket",
    day: "Sunday",
    time: "8 AM - 1 PM",
    lat: 18.5477584162186,
    lng: 73.9114329865075,
    category: ["Vegetables", "Millets"],
  },
  {
    nameKey: "amanoraMarket",
    day: "Sunday",
    time: "4 PM - 9 PM",
    lat: 18.5149195426023,
    lng: 73.9453898,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "ivyEstateMarket",
    day: "Sunday",
    time: "4 PM - 9 PM",
    lat: 18.5842656420482,
    lng: 74.0031701,
    category: ["Vegetables", "Processed Foods"],
  },
  {
    nameKey: "moreBaugMarket",
    day: "Sunday",
    time: "4 PM - 9 PM",
    lat: 18.4569785927258,
    lng: 73.8548221137411,
    category: ["Vegetables", "Fruits"],
  },
];

const mumbaiMarkets: Market[] = [
  {
    nameKey: "dombivliMarket",
    day: "Sunday",
    time: "7 AM - 12 PM",
    lat: 19.2183,
    lng: 73.0868,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "thaneMarket",
    day: "Saturday",
    time: "7 AM - 12 PM",
    lat: 19.2183,
    lng: 72.9781,
    category: ["Vegetables", "Fruits", "Millets"],
  },
  {
    nameKey: "mulundMarket",
    day: "Sunday",
    time: "7 AM - 1 PM",
    lat: 19.1722,
    lng: 72.9565,
    category: ["Vegetables", "Processed Foods"],
  },
  {
    nameKey: "ghatkoperMarket",
    day: "Saturday",
    time: "7 AM - 12 PM",
    lat: 19.086,
    lng: 72.9081,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "borivaliMarket",
    day: "Sunday",
    time: "7 AM - 12 PM",
    lat: 19.2304,
    lng: 72.8573,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "chemburMarket",
    day: "Saturday",
    time: "7 AM - 1 PM",
    lat: 19.0632,
    lng: 72.8997,
    category: ["Vegetables", "Millets"],
  },
  {
    nameKey: "andheriMarket",
    day: "Sunday",
    time: "7 AM - 12 PM",
    lat: 19.1136,
    lng: 72.8697,
    category: ["Vegetables", "Fruits", "Processed Foods"],
  },
  {
    nameKey: "kandivaliMarket",
    day: "Saturday",
    time: "7 AM - 12 PM",
    lat: 19.2094,
    lng: 72.8538,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "maladMarket",
    day: "Sunday",
    time: "7 AM - 1 PM",
    lat: 19.1867,
    lng: 72.8481,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "goregaonMarket",
    day: "Saturday",
    time: "7 AM - 12 PM",
    lat: 19.1646,
    lng: 72.8493,
    category: ["Vegetables", "Processed Foods"],
  },
  {
    nameKey: "dahisarMarket",
    day: "Sunday",
    time: "7 AM - 12 PM",
    lat: 19.2546,
    lng: 72.864,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "miraRoadMarket",
    day: "Saturday",
    time: "7 AM - 1 PM",
    lat: 19.2814,
    lng: 72.8729,
    category: ["Vegetables", "Millets"],
  },
  {
    nameKey: "bhandupMarket",
    day: "Sunday",
    time: "7 AM - 12 PM",
    lat: 19.1527,
    lng: 72.9375,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "vikhroliMarket",
    day: "Saturday",
    time: "7 AM - 12 PM",
    lat: 19.1104,
    lng: 72.9313,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "powaiMarket",
    day: "Sunday",
    time: "7 AM - 1 PM",
    lat: 19.1177,
    lng: 72.906,
    category: ["Vegetables", "Processed Foods"],
  },
  {
    nameKey: "kurlaMarket",
    day: "Saturday",
    time: "7 AM - 12 PM",
    lat: 19.0728,
    lng: 72.8826,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "vashiMarket",
    day: "Sunday",
    time: "7 AM - 12 PM",
    lat: 19.0701,
    lng: 72.9977,
    category: ["Vegetables", "Fruits", "Millets"],
  },
  {
    nameKey: "khargharMarket",
    day: "Saturday",
    time: "7 AM - 1 PM",
    lat: 19.0433,
    lng: 73.0677,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "panvelMarket",
    day: "Sunday",
    time: "7 AM - 12 PM",
    lat: 18.9894,
    lng: 73.1178,
    category: ["Vegetables", "Processed Foods"],
  },
  {
    nameKey: "nerulMarket",
    day: "Saturday",
    time: "7 AM - 12 PM",
    lat: 19.033,
    lng: 73.0169,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "airoliMarket",
    day: "Sunday",
    time: "7 AM - 1 PM",
    lat: 19.1571,
    lng: 72.9985,
    category: ["Vegetables", "Millets"],
  },
  {
    nameKey: "sanpadaMarket",
    day: "Saturday",
    time: "7 AM - 12 PM",
    lat: 19.071,
    lng: 73.0057,
    category: ["Vegetables", "Fruits"],
  },
  {
    nameKey: "koparKhairaneMarket",
    day: "Sunday",
    time: "7 AM - 12 PM",
    lat: 19.1014,
    lng: 73.0036,
    category: ["Vegetables", "Processed Foods"],
  },
];

/** open URL safely - handles iframe context */
function openInNewTab(url: string) {
  // Try to open in parent/top window first (handles iframe case)
  try {
    if (window.top && window.top !== window) {
      window.top.open(url, "_blank", "noopener,noreferrer");
      return;
    }
  } catch (e) {
    // Cross-origin iframe - fallback to current window
  }
  
  // Regular window.open
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) {
    // Popup blocked - try direct navigation
    window.location.href = url;
  }
}

const Markets = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedCity, setSelectedCity] = useState<"pune" | "mumbai" | null>(null);

  const currentMarkets = selectedCity === "pune" ? puneMarkets : selectedCity === "mumbai" ? mumbaiMarkets : [];

  const filteredMarkets = useMemo(() => {
    if (!selectedCity) return [];
    return currentMarkets.filter((market) => {
      const matchesSearch = t(market.nameKey).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDay = selectedDay === "all" || market.day === selectedDay;
      const matchesCategory = selectedCategory === "all" || market.category.includes(selectedCategory);
      return matchesSearch && matchesDay && matchesCategory;
    });
  }, [currentMarkets, searchQuery, selectedDay, selectedCategory, t, selectedCity]);

  const visibleMarkets = filteredMarkets.slice(0, visibleCount);

  /** Robust Directions opener with fallbacks */
  const handleGetDirections = useCallback((market: Market) => {
    const { lat, lng } = market;

    // Primary: Google Maps web directions
    const gmapsDir = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    // Fallback: Google Maps App short link
    const gmapsShort = `https://maps.app.goo.gl/?link=https://www.google.com/maps/?q=${lat},${lng}`;
    // iOS: Apple Maps
    const appleMaps = `http://maps.apple.com/?daddr=${lat},${lng}`;
    // Android: geo intent
    const androidGeo = `geo:${lat},${lng}?q=${lat},${lng}`;
    // No-Google fallback: OpenStreetMap
    const osm = `https://www.openstreetmap.org/directions?engine=fossgis_osrm_car&route=;${lat},${lng}`;

    const ua = navigator.userAgent || "";
    const isIOS = /iPad|iPhone|iPod/.test(ua);
    const isAndroid = /Android/.test(ua);

    try {
      openInNewTab(gmapsDir);
    } catch {
      try {
        openInNewTab(gmapsShort);
      } catch {
        try {
          openInNewTab(isIOS ? appleMaps : isAndroid ? androidGeo : osm);
        } catch {
          const link = `https://maps.google.com/?q=${lat},${lng}`;
          navigator.clipboard?.writeText(link);
          alert("Couldn’t open maps. A directions link was copied to your clipboard.");
        }
      }
    }
  }, []);

  const renderMarketCard = (market: Market, index: number) => (
    <Card
      key={index}
      className="group relative hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 
                  hover:-translate-y-3 hover:scale-105 animate-fade-in overflow-hidden
                  border-2 border-border hover:border-primary/50"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 
                    group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 
                    transition-all duration-500" />
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                    bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 
                    blur-xl transition-opacity duration-500 -z-10" />
      
      <CardHeader className="relative z-10">
        <CardTitle className="flex items-center gap-2 text-lg group-hover:text-primary transition-colors duration-300">
          <MapPin className="h-5 w-5 text-primary flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
          <span className="line-clamp-1">{t(market.nameKey)}</span>
        </CardTitle>
        <CardDescription className="space-y-1">
          <div className="font-semibold text-foreground flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
            <Calendar className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
            {t(market.day.toLowerCase() as any)}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleGetDirections(market)}
          className="w-full text-xs hover:scale-105 transition-transform duration-300"
        >
          <Navigation className="h-3 w-3 mr-1" />
          {t("getDirections")}
        </Button>
      </CardContent>
    </Card>
  );

  const renderMarketList = (market: Market, index: number) => (
    <Card
      key={index}
      className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 
                  hover:-translate-x-2 border-l-4 border-l-transparent hover:border-l-primary"
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="p-2 rounded-full bg-primary/10 group-hover:bg-primary/20 
                          group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate group-hover:text-primary transition-colors duration-300">
                {t(market.nameKey)}
              </h4>
              <p className="text-xs text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {t(market.day.toLowerCase() as any)}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleGetDirections(market)}
              aria-label={t("getDirections")}
              className="hover:scale-110 transition-transform duration-300"
            >
              <Navigation className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const carouselTexts = [
    { title: "Fresh Organic Vegetables", subtitle: "Farm-to-table produce at your local market" },
    { title: "Seasonal Fruits", subtitle: "Handpicked fresh fruits daily" },
    { title: "Empowering Women Farmers", subtitle: "Supporting local women entrepreneurs" },
    { title: "Traditional Grains & Millets", subtitle: "Healthy and nutritious whole grains" },
    { title: "Vibrant Market Community", subtitle: "Where farmers meet families" }
  ];

  return (
    <section id="markets" className="pt-24 pb-20 bg-muted/30">
      <div className="container px-4">
        {/* Carousel Section */}
        <div className="mb-12 animate-fade-in">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent>
              {[marketCarousel1, marketCarousel2, marketCarousel3, marketCarousel4, marketCarousel5].map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden group">
                    <img
                      src={image}
                      alt={`Market scene ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                      <h3 className="text-2xl md:text-4xl font-bold mb-2 animate-fade-in drop-shadow-lg">
                        {carouselTexts[index].title}
                      </h3>
                      <p className="text-sm md:text-lg text-white/90 drop-shadow-md animate-fade-in" style={{ animationDelay: "0.1s" }}>
                        {carouselTexts[index].subtitle}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent animate-scale-in">
            {t("marketsTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("marketsSubtitle", { count: (puneMarkets.length + mumbaiMarkets.length).toString() })}
          </p>
        </div>

        {/* City Selection - Show when no city is selected */}
        {!selectedCity && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Pune City Card */}
            <Card 
              className="group cursor-pointer hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-border hover:border-primary overflow-hidden relative h-[240px]"
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
                            bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 
                            blur-2xl transition-opacity duration-500 -z-10" />
              
              <CardHeader className="text-center relative z-10 py-6 flex flex-col items-center justify-center h-full">
                <div className="mx-auto mb-3 p-4 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 
                              group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 w-fit">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300 drop-shadow-lg">
                  Pune
                </CardTitle>
                <CardDescription className="text-base mt-2 text-white/90 font-semibold drop-shadow-md">
                  {t("puneMarkets", { count: puneMarkets.length.toString() })}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Mumbai City Card */}
            <Card 
              className="group cursor-pointer hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-border hover:border-primary overflow-hidden relative h-[240px]"
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
                            bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 
                            blur-2xl transition-opacity duration-500 -z-10" />
              
              <CardHeader className="text-center relative z-10 py-6 flex flex-col items-center justify-center h-full">
                <div className="mx-auto mb-3 p-4 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 
                              group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 w-fit">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-white group-hover:text-primary transition-colors duration-300 drop-shadow-lg">
                  Mumbai
                </CardTitle>
                <CardDescription className="text-base mt-2 text-white/90 font-semibold drop-shadow-md">
                  {t("mumbaiMarkets", { count: mumbaiMarkets.length.toString() })}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Markets View - Show when city is selected */}
        {selectedCity && (
          <>
            <div className="flex items-center justify-center gap-4 mb-8">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedCity(null);
                  setSearchQuery("");
                  setSelectedDay("all");
                  setSelectedCategory("all");
                  setVisibleCount(9);
                }}
                className="hover:scale-105 transition-transform"
              >
                ← {t("backToCities") || "Back to Cities"}
              </Button>
              <h3 className="text-2xl font-bold">
                {selectedCity === "pune" ? "Pune" : "Mumbai"} {t("markets") || "Markets"}
              </h3>
            </div>

            <div className="space-y-6 mb-8">
              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={t("searchMarkets")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium">{t("filterByDay")}:</span>
                  <div className="flex gap-2">
                    <Badge
                      variant={selectedDay === "all" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedDay("all")}
                    >
                      {t("allDays")}
                    </Badge>
                    <Badge
                      variant={selectedDay === "Saturday" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedDay("Saturday")}
                    >
                      {t("saturday")}
                    </Badge>
                    <Badge
                      variant={selectedDay === "Sunday" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedDay("Sunday")}
                    >
                      {t("sunday")}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium">{t("filterByCategory")}:</span>
                  <div className="flex gap-2 flex-wrap">
                    <Badge
                      variant={selectedCategory === "all" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory("all")}
                    >
                      All
                    </Badge>
                    <Badge
                      variant={selectedCategory === "Vegetables" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory("Vegetables")}
                    >
                      {t("vegetables")}
                    </Badge>
                    <Badge
                      variant={selectedCategory === "Fruits" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory("Fruits")}
                    >
                      {t("fruits")}
                    </Badge>
                    <Badge
                      variant={selectedCategory === "Millets" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory("Millets")}
                    >
                      {t("millets")}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 ml-auto">
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3x3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {filteredMarkets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t("noMarketsFound")}</p>
              </div>
            ) : (
              <>
                <div
                  className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-3"}
                >
                  {visibleMarkets.map((market, index) =>
                    viewMode === "grid" ? renderMarketCard(market, index) : renderMarketList(market, index),
                  )}
                </div>

                <div className="mt-8 text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t("showingMarkets", {
                      count: visibleMarkets.length.toString(),
                      total: filteredMarkets.length.toString(),
                    })}
                  </p>
                  {visibleCount < filteredMarkets.length && (
                    <Button variant="outline" onClick={() => setVisibleCount((prev) => prev + 9)}>
                      {t("loadMore")}
                    </Button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Markets;
