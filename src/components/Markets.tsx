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
  { name: "Pimple Saudagar", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Kalyani Nagar", day: "Saturday", time: "7 AM - 1 PM" },
  { name: "Viman Nagar", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Kothrud Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Shivaji Nagar", day: "Sunday", time: "7 AM - 1 PM" },
  { name: "Katraj Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Warje Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Undri Market", day: "Saturday", time: "7 AM - 1 PM" },
  { name: "Kondhwa Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Hinjewadi Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Pashan Market", day: "Sunday", time: "7 AM - 1 PM" },
  { name: "Bavdhan Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Sus Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Pimpri Market", day: "Saturday", time: "7 AM - 1 PM" },
  { name: "Chinchwad Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Nigdi Market", day: "Saturday", time: "7 AM - 12 PM" },
];

const mumbaiMarkets = [
  { name: "Dombivli Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Thane Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Mulund Market", day: "Sunday", time: "7 AM - 1 PM" },
  { name: "Ghatkopar Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Borivali Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Chembur Market", day: "Saturday", time: "7 AM - 1 PM" },
  { name: "Andheri Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Kandivali Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Malad Market", day: "Sunday", time: "7 AM - 1 PM" },
  { name: "Goregaon Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Dahisar Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Mira Road Market", day: "Saturday", time: "7 AM - 1 PM" },
  { name: "Bhandup Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Vikhroli Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Powai Market", day: "Sunday", time: "7 AM - 1 PM" },
  { name: "Kurla Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Vashi Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Kharghar Market", day: "Saturday", time: "7 AM - 1 PM" },
  { name: "Panvel Market", day: "Sunday", time: "7 AM - 12 PM" },
  { name: "Nerul Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Airoli Market", day: "Sunday", time: "7 AM - 1 PM" },
  { name: "Sanpada Market", day: "Saturday", time: "7 AM - 12 PM" },
  { name: "Kopar Khairane", day: "Sunday", time: "7 AM - 12 PM" },
];

const Markets = () => {
  return (
    <section id="markets" className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Markets in Pune and Mumbai</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find fresh, local produce at our {puneMarkets.length + mumbaiMarkets.length} weekly markets across Maharashtra
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Pune Markets</h3>
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

        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Mumbai Markets</h3>
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

        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Find Us on the Map</h3>
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
