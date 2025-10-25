import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Grid3x3, List, Navigation, Calendar } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Market {
  nameKey: string;
  day: string;
  time: string;
  lat: number;
  lng: number;
  category: string[];
}

const puneMarkets: Market[] = [
  { nameKey: "kharadiMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 18.5579, lng: 73.9364, category: ["Vegetables", "Fruits"] },
  { nameKey: "hadapsarMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 18.5089, lng: 73.9260, category: ["Vegetables", "Fruits", "Millets"] },
  { nameKey: "magarpattaMarket", day: "Saturday", time: "7 AM - 1 PM", lat: 18.5152, lng: 73.9290, category: ["Vegetables", "Fruits"] },
  { nameKey: "ivyEstateMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 18.5018, lng: 73.9425, category: ["Vegetables", "Processed Foods"] },
  { nameKey: "banerMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 18.5590, lng: 73.7810, category: ["Vegetables", "Fruits"] },
  { nameKey: "wakadMarket", day: "Sunday", time: "7 AM - 1 PM", lat: 18.5992, lng: 73.7677, category: ["Vegetables", "Millets"] },
  { nameKey: "aundhMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 18.5606, lng: 73.8084, category: ["Vegetables", "Fruits"] },
  { nameKey: "pimpleSaudagarMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 18.5880, lng: 73.8028, category: ["Vegetables", "Processed Foods"] },
  { nameKey: "kalyaniNagarMarket", day: "Saturday", time: "7 AM - 1 PM", lat: 18.5467, lng: 73.9026, category: ["Vegetables", "Fruits"] },
  { nameKey: "vimanNagarMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 18.5679, lng: 73.9143, category: ["Vegetables", "Fruits", "Millets"] },
  { nameKey: "kothrudMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 18.5074, lng: 73.8077, category: ["Vegetables", "Fruits"] },
  { nameKey: "shivajiNagarMarket", day: "Sunday", time: "7 AM - 1 PM", lat: 18.5304, lng: 73.8567, category: ["Vegetables", "Processed Foods"] },
  { nameKey: "katrajMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 18.4481, lng: 73.8631, category: ["Vegetables", "Fruits"] },
  { nameKey: "warjeMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 18.4806, lng: 73.8082, category: ["Vegetables", "Fruits"] },
  { nameKey: "undriMarket", day: "Saturday", time: "7 AM - 1 PM", lat: 18.4707, lng: 73.8976, category: ["Vegetables", "Millets"] },
  { nameKey: "kondhwaMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 18.4621, lng: 73.8845, category: ["Vegetables", "Fruits"] },
  { nameKey: "hinjewadiMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 18.5913, lng: 73.7377, category: ["Vegetables", "Processed Foods"] },
  { nameKey: "pashanMarket", day: "Sunday", time: "7 AM - 1 PM", lat: 18.5362, lng: 73.7958, category: ["Vegetables", "Fruits"] },
  { nameKey: "bavdhanMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 18.5091, lng: 73.7696, category: ["Vegetables", "Fruits"] },
  { nameKey: "susMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 18.5608, lng: 73.7520, category: ["Vegetables", "Millets"] },
  { nameKey: "pimpriMarket", day: "Saturday", time: "7 AM - 1 PM", lat: 18.6298, lng: 73.8057, category: ["Vegetables", "Fruits"] },
  { nameKey: "chinchwadMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 18.6278, lng: 73.7954, category: ["Vegetables", "Processed Foods"] },
  { nameKey: "nigdiMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 18.6550, lng: 73.7633, category: ["Vegetables", "Fruits"] },
];

const mumbaiMarkets: Market[] = [
  { nameKey: "dombivliMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 19.2183, lng: 73.0868, category: ["Vegetables", "Fruits"] },
  { nameKey: "thaneMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 19.2183, lng: 72.9781, category: ["Vegetables", "Fruits", "Millets"] },
  { nameKey: "mulundMarket", day: "Sunday", time: "7 AM - 1 PM", lat: 19.1722, lng: 72.9565, category: ["Vegetables", "Processed Foods"] },
  { nameKey: "ghatkoperMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 19.0860, lng: 72.9081, category: ["Vegetables", "Fruits"] },
  { nameKey: "borivaliMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 19.2304, lng: 72.8573, category: ["Vegetables", "Fruits"] },
  { nameKey: "chemburMarket", day: "Saturday", time: "7 AM - 1 PM", lat: 19.0632, lng: 72.8997, category: ["Vegetables", "Millets"] },
  { nameKey: "andheriMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 19.1136, lng: 72.8697, category: ["Vegetables", "Fruits", "Processed Foods"] },
  { nameKey: "kandivaliMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 19.2094, lng: 72.8538, category: ["Vegetables", "Fruits"] },
  { nameKey: "maladMarket", day: "Sunday", time: "7 AM - 1 PM", lat: 19.1867, lng: 72.8481, category: ["Vegetables", "Fruits"] },
  { nameKey: "goregaonMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 19.1646, lng: 72.8493, category: ["Vegetables", "Processed Foods"] },
  { nameKey: "dahisarMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 19.2546, lng: 72.8640, category: ["Vegetables", "Fruits"] },
  { nameKey: "miraRoadMarket", day: "Saturday", time: "7 AM - 1 PM", lat: 19.2814, lng: 72.8729, category: ["Vegetables", "Millets"] },
  { nameKey: "bhandupMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 19.1527, lng: 72.9375, category: ["Vegetables", "Fruits"] },
  { nameKey: "vikhroliMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 19.1104, lng: 72.9313, category: ["Vegetables", "Fruits"] },
  { nameKey: "powaiMarket", day: "Sunday", time: "7 AM - 1 PM", lat: 19.1177, lng: 72.9060, category: ["Vegetables", "Processed Foods"] },
  { nameKey: "kurlaMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 19.0728, lng: 72.8826, category: ["Vegetables", "Fruits"] },
  { nameKey: "vashiMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 19.0701, lng: 72.9977, category: ["Vegetables", "Fruits", "Millets"] },
  { nameKey: "khargharMarket", day: "Saturday", time: "7 AM - 1 PM", lat: 19.0433, lng: 73.0677, category: ["Vegetables", "Fruits"] },
  { nameKey: "panvelMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 18.9894, lng: 73.1178, category: ["Vegetables", "Processed Foods"] },
  { nameKey: "nerulMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 19.0330, lng: 73.0169, category: ["Vegetables", "Fruits"] },
  { nameKey: "airoliMarket", day: "Sunday", time: "7 AM - 1 PM", lat: 19.1571, lng: 72.9985, category: ["Vegetables", "Millets"] },
  { nameKey: "sanpadaMarket", day: "Saturday", time: "7 AM - 12 PM", lat: 19.0710, lng: 73.0057, category: ["Vegetables", "Fruits"] },
  { nameKey: "koparKhairaneMarket", day: "Sunday", time: "7 AM - 12 PM", lat: 19.1014, lng: 73.0036, category: ["Vegetables", "Processed Foods"] },
];

const Markets = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDay, setSelectedDay] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");
  const [visibleCount, setVisibleCount] = useState(9);
  const [selectedCity, setSelectedCity] = useState<"pune" | "mumbai">("pune");
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const currentMarkets = selectedCity === "pune" ? puneMarkets : mumbaiMarkets;

  const filteredMarkets = useMemo(() => {
    return currentMarkets.filter((market) => {
      const matchesSearch = t(market.nameKey).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDay = selectedDay === "all" || market.day === selectedDay;
      const matchesCategory = selectedCategory === "all" || market.category.includes(selectedCategory);
      return matchesSearch && matchesDay && matchesCategory;
    });
  }, [currentMarkets, searchQuery, selectedDay, selectedCategory, t]);

  const visibleMarkets = filteredMarkets.slice(0, visibleCount);

  const handleBookStall = useCallback((market: Market) => {
    // Trigger chatbot to open with prefilled data
    window.dispatchEvent(new CustomEvent('openChatbot', { 
      detail: { 
        city: selectedCity === "pune" ? "Pune" : "Mumbai",
        market: t(market.nameKey)
      }
    }));
  }, [selectedCity, t]);

  const handleGetDirections = useCallback((market: Market) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${market.lat},${market.lng}`;
    window.open(url, '_blank');
  }, []);

  const renderMarketCard = (market: Market, index: number) => (
    <Card 
      key={index} 
      className={`hover:shadow-lg transition-all duration-300 hover-scale animate-fade-in cursor-pointer ${
        selectedMarket?.nameKey === market.nameKey ? 'ring-2 ring-primary' : ''
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => setSelectedMarket(market)}
    >
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
          <span className="line-clamp-1">{t(market.nameKey)}</span>
        </CardTitle>
        <CardDescription className="space-y-1">
          <div className="font-semibold text-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {t(market.day.toLowerCase() as any)}
          </div>
          <div className="text-sm">{market.time}</div>
          <div className="flex flex-wrap gap-1 mt-2">
            {market.category.slice(0, 2).map((cat, i) => (
              <Badge key={i} variant="secondary" className="text-xs">{cat}</Badge>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleGetDirections(market);
          }}
          className="text-xs"
        >
          <Navigation className="h-3 w-3 mr-1" />
          {t('getDirections')}
        </Button>
        <Button 
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleBookStall(market);
          }}
          className="text-xs"
        >
          {t('bookStallAt')}
        </Button>
      </CardContent>
    </Card>
  );

  const renderMarketList = (market: Market, index: number) => (
    <Card 
      key={index}
      className={`hover:shadow-md transition-all duration-200 cursor-pointer ${
        selectedMarket?.nameKey === market.nameKey ? 'ring-2 ring-primary' : ''
      }`}
      onClick={() => setSelectedMarket(market)}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm truncate">{t(market.nameKey)}</h4>
              <p className="text-xs text-muted-foreground">
                {t(market.day.toLowerCase() as any)} • {market.time}
              </p>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleGetDirections(market);
              }}
            >
              <Navigation className="h-4 w-4" />
            </Button>
            <Button 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleBookStall(market);
              }}
            >
              {t('bookStallAt')}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="markets" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('marketsTitle')}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('marketsSubtitle', { count: (puneMarkets.length + mumbaiMarkets.length).toString() })}
          </p>
        </div>

        <Tabs value={selectedCity} onValueChange={(v) => setSelectedCity(v as "pune" | "mumbai")} className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="pune">
              {t('puneMarkets', { count: puneMarkets.length.toString() })}
            </TabsTrigger>
            <TabsTrigger value="mumbai">
              {t('mumbaiMarkets', { count: mumbaiMarkets.length.toString() })}
            </TabsTrigger>
          </TabsList>

          <div className="space-y-6 mb-8">
            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={t('searchMarkets')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium">{t('filterByDay')}:</span>
                <div className="flex gap-2">
                  <Badge 
                    variant={selectedDay === "all" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedDay("all")}
                  >
                    {t('allDays')}
                  </Badge>
                  <Badge 
                    variant={selectedDay === "Saturday" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedDay("Saturday")}
                  >
                    {t('saturday')}
                  </Badge>
                  <Badge 
                    variant={selectedDay === "Sunday" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedDay("Sunday")}
                  >
                    {t('sunday')}
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 items-center">
                <span className="text-sm font-medium">{t('filterByCategory')}:</span>
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
                    {t('vegetables')}
                  </Badge>
                  <Badge 
                    variant={selectedCategory === "Fruits" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory("Fruits")}
                  >
                    {t('fruits')}
                  </Badge>
                  <Badge 
                    variant={selectedCategory === "Millets" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory("Millets")}
                  >
                    {t('millets')}
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

          <TabsContent value={selectedCity} className="mt-0">
            {filteredMarkets.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{t('noMarketsFound')}</p>
              </div>
            ) : (
              <>
                <div className={viewMode === "grid" 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                  : "space-y-3"
                }>
                  {visibleMarkets.map((market, index) => 
                    viewMode === "grid" ? renderMarketCard(market, index) : renderMarketList(market, index)
                  )}
                </div>

                <div className="mt-8 text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {t('showingMarkets', { 
                      count: visibleMarkets.length.toString(), 
                      total: filteredMarkets.length.toString() 
                    })}
                  </p>
                  {visibleCount < filteredMarkets.length && (
                    <Button 
                      variant="outline" 
                      onClick={() => setVisibleCount(prev => prev + 9)}
                    >
                      {t('loadMore')}
                    </Button>
                  )}
                </div>
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Interactive Map */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8 text-center">{t('findUsOnMap')}</h3>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d${selectedCity === 'pune' ? '242096' : '120000'}!2d${selectedCity === 'pune' ? '73.8567' : '72.8777'}!3d${selectedCity === 'pune' ? '18.5204' : '19.0760'}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c14df5c70e0d%3A0x2d19689e09e2fced!2s${selectedCity === 'pune' ? 'Pune' : 'Mumbai'}%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin`}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Wingrow Markets in ${selectedCity === 'pune' ? 'Pune' : 'Mumbai'}`}
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Click on any market card to highlight it on the map
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Markets;
