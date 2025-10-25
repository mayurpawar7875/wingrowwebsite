import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const puneMarkets = [
  { name: "Kharadi Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Hadapsar Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Magarpatta Market", day: "Saturday", time: "7 AM - 1 PM" },
  { name: "Ivy Estate Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Baner Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Wakad Market", day: "Sunday", time: "7 AM - 1 PM" },
  { name: "Aundh Market", day: "Saturday", time: "7 AM - 12 PM" },
];

const mumbaiMarkets = [
  { name: "Dombivli Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Thane Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Mulund Market", day: "Sunday", time: "7 AM - 1 PM" },
  { name: "Ghatkopar Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Borivali Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Chembur Market", day: "Saturday", time: "7 AM - 1 PM" },
];

const Markets = () => {
  return (
    <section id="markets" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Markets in Pune and Mumbai</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find fresh, local produce at our weekly markets across Maharashtra
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Pune Markets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {puneMarkets.map((market, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {market.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    <div className="font-semibold text-foreground mt-2">{market.day}</div>
                    <div>{market.time}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold mb-8 text-center">Mumbai Markets</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mumbaiMarkets.map((market, index) => (
              <Card key={index} className="hover:shadow-medium transition-shadow hover-scale">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {market.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    <div className="font-semibold text-foreground mt-2">{market.day}</div>
                    <div>{market.time}</div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">View Details</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Markets;
