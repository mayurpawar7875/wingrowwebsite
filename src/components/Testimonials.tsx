import { Card, CardContent } from "@/components/ui/card";
import { Star, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";

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
  }
];

const googleReviews = [
  { name: "Priya Sharma", rating: 5, text: "Best farmers market in Pune! Fresh produce, friendly vendors, and great atmosphere.", location: "Kharadi Market" },
  { name: "Rohit Mehta", rating: 5, text: "Supporting local farmers has never been easier. Highly recommend!", location: "Thane Market" },
  { name: "Anjali Joshi", rating: 5, text: "Amazing variety of organic vegetables and fruits. Will visit every weekend!", location: "Magarpatta Market" },
  { name: "Vikram Singh", rating: 5, text: "Quality products and reasonable prices. The farmers are so knowledgeable!", location: "Dombivli Market" },
  { name: "Meera Patil", rating: 5, text: "Love the community vibe and fresh produce. A must-visit market!", location: "Wakad Market" }
];

const Testimonials = () => {
  const { t } = useTranslation();
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-rotate reviews every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % googleReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

        {/* Video Testimonials */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-fade-in">
            {t('videoTestimonials')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {videoTestimonials.map((video, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-medium transition-shadow group">
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
            ))}
          </div>
        </div>

        {/* Google Reviews */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent animate-fade-in">
            {t('liveGoogleReviews')}
          </h3>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 shadow-medium relative overflow-hidden">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 animate-pulse" />
              
              <div className="relative z-10 flex items-start gap-4 animate-fade-in" key={currentReview}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(googleReviews[currentReview].rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-5 w-5 fill-primary text-primary animate-scale-in" 
                        style={{ animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-lg mb-4 text-foreground">"{googleReviews[currentReview].text}"</p>
                  <div>
                    <p className="font-semibold">{googleReviews[currentReview].name}</p>
                    <p className="text-sm text-muted-foreground">{googleReviews[currentReview].location}</p>
                  </div>
                </div>
              </div>
            </Card>
            
            <div className="flex justify-center gap-2 mt-6">
              {googleReviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentReview === index ? 'w-8 bg-primary' : 'w-2 bg-muted hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`View review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
