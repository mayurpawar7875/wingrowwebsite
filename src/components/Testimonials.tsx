import { Card, CardContent } from "@/components/ui/card";
import { Star, Play, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import WingrowThumnail from "@/assets/Wingrow_June25_Thumnail.jpg";
import GoogleReviewsCarousel from "./GoogleReviewsCarousel";

const videoTestimonials = [
  {
    name: "Rucha and Rushi",
    role: "Stories From The Market",
    thumbnail: WingrowThumnail,
    quote: "Wingrow Market changed my life. Direct connection with customers means better prices.",
    videoUrl: "https://youtu.be/s7QbQaknOZA"
  },
  {
    name: "Rucha and Rushi Part 2",
    role: "Stories From The Market",
    thumbnail: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop",
    quote: "Our group now earns sustainable income selling organic products every week.",
    videoUrl: "https://youtu.be/LgdV-nFHw8o"
  },
  {
    name: "Glipmses From Wingrow Market",
    role: "Wingrow Market Setup",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    quote: "Fresh vegetables at fair prices. I love supporting local farmers directly!",
    videoUrl: "https://youtu.be/CO0URXyPbm0"
  },
  {
    name: "Taware Family",
    role: "Wingrow Customer",
    thumbnail: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
    quote: "Wingrow provided me a platform to showcase my organic produce. Sales have tripled!",
    videoUrl: "https://youtube.com/shorts/nLRp3tCHjrU"
  },
  {
    name: "Vijaya Birajdar",
    role: "Farmer from Pune",
    thumbnail: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop",
    quote: "No middlemen, fair prices, and a supportive community. Best decision I made!",
    videoUrl: "https://youtube.com/shorts/Jr01xfEPuN4"
  }
];

const googleReviews = [
  { name: "Priya Sharma", rating: 5, text: "Best farmers market in Pune! Fresh produce, friendly vendors, and great atmosphere.", location: "Kharadi Market", reviewUrl: "https://www.google.com/maps/reviews/example1" },
  { name: "Rohit Mehta", rating: 5, text: "Supporting local farmers has never been easier. Highly recommend!", location: "Thane Market", reviewUrl: "https://www.google.com/maps/reviews/example2" },
  { name: "Anjali Joshi", rating: 5, text: "Amazing variety of organic vegetables and fruits. Will visit every weekend!", location: "Magarpatta Market", reviewUrl: "https://www.google.com/maps/reviews/example3" },
  { name: "Vikram Singh", rating: 5, text: "Quality products and reasonable prices. The farmers are so knowledgeable!", location: "Dombivli Market", reviewUrl: "https://www.google.com/maps/reviews/example4" },
  { name: "Meera Patil", rating: 5, text: "Love the community vibe and fresh produce. A must-visit market!", location: "Wakad Market", reviewUrl: "https://www.google.com/maps/reviews/example5" },
  { name: "Kiran Kumar", rating: 5, text: "Fresh, organic, and directly from farmers. What more could you ask for?", location: "Mulund Market", reviewUrl: "https://www.google.com/maps/reviews/example6" },
  { name: "Sneha Rao", rating: 5, text: "The quality of vegetables here is unmatched. Wonderful experience!", location: "Baner Market", reviewUrl: "https://www.google.com/maps/reviews/example7" },
  { name: "Aditya Patel", rating: 5, text: "Great initiative connecting farmers with customers. Keep up the good work!", location: "Thane Market", reviewUrl: "https://www.google.com/maps/reviews/example8" }
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
                  <Card className="overflow-hidden hover:shadow-medium transition-shadow group h-full cursor-pointer">
                    <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="block">
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
                    </a>
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
        <GoogleReviewsCarousel />
      </div>
    </section>
  );
};

export default Testimonials;
