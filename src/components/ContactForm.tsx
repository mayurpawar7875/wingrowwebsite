import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("Booking inquiry submitted successfully! We'll contact you soon.");
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Book Your Stall Today</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you within 24 hours
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" required placeholder="Enter your name" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="phone">Contact Number *</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="Enter your phone number" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="market">Preferred Market *</Label>
                  <Select name="market" required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kharadi">Kharadi, Pune</SelectItem>
                      <SelectItem value="hadapsar">Hadapsar, Pune</SelectItem>
                      <SelectItem value="magarpatta">Magarpatta, Pune</SelectItem>
                      <SelectItem value="baner">Baner, Pune</SelectItem>
                      <SelectItem value="thane">Thane, Mumbai</SelectItem>
                      <SelectItem value="mulund">Mulund, Mumbai</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stallType">Stall Type *</Label>
                  <Select name="stallType" required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select stall type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">Farmer - Fresh Produce</SelectItem>
                      <SelectItem value="shg">Women SHG - Homemade Products</SelectItem>
                      <SelectItem value="organic">Organic Products</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder="Tell us about your products, special requirements, etc."
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Booking Inquiry"}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a href="mailto:info@wingrowmarket.com" className="text-muted-foreground hover:text-primary">
                        info@wingrowmarket.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <div className="text-muted-foreground">+91 98765 43210</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">Headquarters</div>
                      <div className="text-muted-foreground">Pune, Maharashtra, India</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6">
                <h4 className="font-semibold text-lg mb-3">Why Book with Wingrow?</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>✓ Prime locations with high footfall</li>
                  <li>✓ Marketing support and promotion</li>
                  <li>✓ Fair and transparent pricing</li>
                  <li>✓ Community of trusted vendors</li>
                  <li>✓ Weekly consistent opportunity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
