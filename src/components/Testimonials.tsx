import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ramesh Patil",
    role: "Farmer from Pune",
    content: "Wingrow Market has transformed my business. I now sell directly to customers and earn 40% more than before. The team's support is excellent!",
    rating: 5,
  },
  {
    name: "Anjali Sharma",
    role: "Women SHG Member",
    content: "As part of a self-help group, Wingrow gave us a platform to showcase our products. We've gained financial independence and confidence.",
    rating: 5,
  },
  {
    name: "Priya Deshmukh",
    role: "Regular Customer",
    content: "I love shopping at Wingrow markets! Fresh vegetables, fair prices, and I get to support local farmers. It's a win-win!",
    rating: 5,
  },
  {
    name: "Sunil Joshi",
    role: "Organic Farmer",
    content: "Finally, a platform that values quality and connects me directly with conscious consumers. Wingrow Market is a blessing!",
    rating: 5,
  },
  {
    name: "Meera Kulkarni",
    role: "SHG Coordinator",
    content: "Wingrow has empowered over 20 women in our group. We sell homemade products and the response has been overwhelming!",
    rating: 5,
  },
  {
    name: "Amit Rao",
    role: "Customer from Mumbai",
    content: "The convenience of having fresh produce every weekend near my home is amazing. Quality is always top-notch!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stories from farmers, entrepreneurs, and customers who trust Wingrow Market
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-medium transition-shadow hover-scale">
              <CardContent className="pt-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
