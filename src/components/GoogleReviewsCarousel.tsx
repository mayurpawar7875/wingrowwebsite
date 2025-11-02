import { Card } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { supabase } from "@/integrations/supabase/client";

interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  reviewUrl: string;
  profileUrl?: string;
  time: number;
}

const GoogleReviewsCarousel = () => {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('fetch-google-reviews');
        if (error) throw error;
        setReviews(data.reviews);
      } catch (error) {
        console.error('Error fetching Google reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoogleReviews();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2].map((i) => (
            <Card key={i} className="p-6 md:p-8 h-48 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4 mb-4" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!reviews.length) {
    return null;
  }

  return (
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
          {reviews.map((review, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2">
              <Card className="p-6 md:p-8 shadow-medium h-full group hover:shadow-xl transition-all hover:-translate-y-1 relative overflow-hidden cursor-pointer">
                <a href={review.reviewUrl} target="_blank" rel="noopener noreferrer" className="block">
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
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          {review.profileUrl && (
                            <img 
                              src={review.profileUrl} 
                              alt={`${review.name}'s profile`} 
                              className="w-6 h-6 rounded-full mr-2"
                            />
                          )}
                          <span>{new Date(review.time * 1000).toLocaleDateString()}</span>
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
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
  );
};

export default GoogleReviewsCarousel;