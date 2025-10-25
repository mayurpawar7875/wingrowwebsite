import { Card, CardContent } from "@/components/ui/card";
import { Star, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const videoTestimonials = [
  {
    name: "Rajesh Patil",
    role: "Farmer from Hadapsar",
    thumbnail: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=400&h=300&fit=crop",
    quote: "Wingrow Market changed my life. Direct connection with customers means better prices."
  },
  {
    name: "Sunita Deshmukh",
    role: "Women SHG Leader, Thane",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
    quote: "Our group now earns sustainable income selling organic products every week."
  },
  {
    name: "Amit Kulkarni",
    role: "Regular Customer, Baner",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    quote: "Fresh vegetables at fair prices. I love supporting local farmers directly!"
  },
  {
    name: "Meena Sharma",
    role: "Vendor, Magarpatta",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
    quote: "Wingrow provided me a platform to showcase my organic produce. Sales have tripled!"
  },
  {
    name: "Prakash Desai",
    role: "Farmer from Mumbai",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop",
    quote: "No middlemen, fair prices, and a supportive community. Best decision I made!"
  }
];

const googleReviews = [
  { name: "Priya Sharma", rating: 5, text: "Best farmers market in Pune! Fresh produce, friendly vendors, and great atmosphere.", location: "Kharadi Market" },
  { name: "Rohit Mehta", rating: 5, text: "Supporting local farmers has never been easier. Highly recommend!", location: "Thane Market" },
  { name: "Anjali Joshi", rating: 5, text: "Amazing variety of organic vegetables and fruits. Will visit every weekend!", location: "Magarpatta Market" },
  { name: "Vikram Singh", rating: 5, text: "Quality products and reasonable prices. The farmers are so knowledgeable!", location: "Dombivli Market" },
  { name: "Meera Patil", rating: 5, text: "Love the community vibe and fresh produce. A must-visit market!", location: "Wakad Market" },
  { name: "Kiran Kumar", rating: 5, text: "Fresh, organic, and directly from farmers. What more could you ask for?", location: "Mulund Market" },
  { name: "Sneha Rao", rating: 5, text: "The quality of vegetables here is unmatched. Wonderful experience!", location: "Baner Market" },
  { name: "Aditya Patel", rating: 5, text: "Great initiative connecting farmers with customers. Keep up the good work!", location: "Thane Market" }
];

const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 pb-12 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary/70 to-primary bg-clip-text text-transparent animate-scale-in">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('testimonialsSubtitle')}
          </p>
        </div>

        {/* Video Testimonials Carousel */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-fade-in">
            {t('videoTestimonials')}
          </h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            className="w-full max-w-6xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {videoTestimonials.map((video, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Card className="overflow-hidden hover:shadow-medium transition-shadow group h-full">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={video.thumbnail} 
                        alt={video.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                        <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="h-8 w-8 text-primary-foreground ml-1" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground italic mb-4">"{video.quote}"</p>
                      <div>
                        <p className="font-semibold">{video.name}</p>
                        <p className="text-sm text-muted-foreground">{video.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="relative left-0 translate-y-0" />
              <CarouselNext className="relative right-0 translate-y-0" />
            </div>
          </Carousel>
        </div>

        {/* Google Reviews Carousel */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-fade-in">
            {t('liveGoogleReviews')}
          </h3>
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {googleReviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2">
                  <Card className="p-6 md:p-8 shadow-medium h-full group hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden">
                    {/* Animated background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-4">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-5 w-5 fill-primary text-primary group-hover:scale-110 transition-transform" 
                            style={{ transitionDelay: `${i * 50}ms` }}
                          />
                        ))}
                      </div>
                      <p className="text-base md:text-lg mb-4 text-foreground">"{review.text}"</p>
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <span>{review.location}</span>
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="relative left-0 translate-y-0" />
              <CarouselNext className="relative right-0 translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
