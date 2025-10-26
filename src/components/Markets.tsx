import { useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Grid3x3, List, Navigation, Calendar } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import puneMarketBg from "@/assets/pune-market-bg.jpg";
import mumbaiMarketBg from "@/assets/mumbai-market-bg.jpg";

interface Market {
  nameKey: string;
  day: string;
  time: string;
  lat: number;
  lng: number;
  category: string[];
}

/* ... Pune & Mumbai arrays unchanged ... */

/** open URL safely - handles iframe context */
function openInNewTab(url: string) {
  try {
    if (window.top && window.top !== window) {
      window.top.open(url, "_blank", "noopener,noreferrer");
      return;
    }
  } catch {}
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
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

  const handleGetDirections = useCallback((market: Market) => {
    const { lat, lng } = market;
    const gmapsDir = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
    const gmapsShort = `https://maps.app.goo.gl/?link=https://www.google.com/maps/?q=${lat},${lng}`;
    const appleMaps = `http://maps.apple.com/?daddr=${lat},${lng}`;
    const androidGeo = `geo:${lat},${lng}?q=${lat},${lng}`;
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
                 hover:-translate-y-2 sm:hover:-translate-y-3 hover:scale-102 sm:hover:scale-105
                 animate-fade-in overflow-hidden border border-border hover:border-primary/50"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 
                      group-hover:from-primary/5 group-hover:via-primary/10 group-hover:to-primary/5 
                      transition-all duration-500" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                      bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 
                      blur-xl transition-opacity duration-500 -z-10" />

      {/* More compact paddings & sizes on mobile */}
      <CardHeader className="relative z-10 p-3 sm:p-4">
        <CardTitle className="flex items-center gap-2 text-base sm:text-lg group-hover:text-primary transition-colors duration-300">
          <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0 group-hover:scale-110 sm:group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300" />
          <span className="line-clamp-1">{t(market.nameKey)}</span>
        </CardTitle>
        <CardDescription className="space-y-1">
          <div className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-1 group-hover:text-primary transition-colors duration-300">
            <Calendar className="h-3 w-3 group-hover:scale-110 transition-transform duration-300" />
            {t(market.day.toLowerCase() as any)}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="relative z-10 p-3 sm:p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleGetDirections(market)}
          className="w-full text-[11px] sm:text-xs py-1 sm:py-2 hover:scale-105 transition-transform duration-300"
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

  return (
    <section id="markets" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent animate-scale-in">
            {t("marketsTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("marketsSubtitle", { count: (puneMarkets.length + mumbaiMarkets.length).toString() })}
          </p>
        </div>

        {/* City Selection (unchanged layout) */}
        {!selectedCity && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Pune Card */}
            <Card
              className="group cursor-pointer hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-border hover:border-primary overflow-hidden relative h-[240px]"
              onClick={() => setSelectedCity("pune")}
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                   style={{ backgroundImage: `url(${puneMarketBg})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 
                              group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-500" />
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

            {/* Mumbai Card */}
            <Card
              className="group cursor-pointer hover:shadow-2xl hover:shadow-primary/30 transition-all duration-500 hover:-translate-y-2 hover:scale-105 border-2 border-border hover:border-primary overflow-hidden relative h-[240px]"
              onClick={() => setSelectedCity("mumbai")}
            >
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                   style={{ backgroundImage: `url(${mumbaiMarketBg})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 
                              group-hover:from-black/70 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-500" />
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

        {/* Markets View */}
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
              {/* Search */}
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
                    <Badge variant={selectedDay === "all" ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedDay("all")}>
                      {t("allDays")}
                    </Badge>
                    <Badge variant={selectedDay === "Saturday" ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedDay("Saturday")}>
                      {t("saturday")}
                    </Badge>
                    <Badge variant={selectedDay === "Sunday" ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedDay("Sunday")}>
                      {t("sunday")}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <span className="text-sm font-medium">{t("filterByCategory")}:</span>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant={selectedCategory === "all" ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory("all")}>
                      All
                    </Badge>
                    <Badge variant={selectedCategory === "Vegetables" ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory("Vegetables")}>
                      {t("vegetables")}
                    </Badge>
                    <Badge variant={selectedCategory === "Fruits" ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory("Fruits")}>
                      {t("fruits")}
                    </Badge>
                    <Badge variant={selectedCategory === "Millets" ? "default" : "outline"} className="cursor-pointer" onClick={() => setSelectedCategory("Millets")}>
                      {t("millets")}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 ml-auto">
                  <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
                    <List className="h-4 w-4" />
                  </Button>
                  <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
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
                {/* ✅ Two columns on mobile */}
                <div className={viewMode === "grid"
                    ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
                    : "space-y-3"}>
                  {visibleMarkets.map((market, index) =>
                    viewMode === "grid" ? renderMarketCard(market, index) : renderMarketList(market, index)
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
