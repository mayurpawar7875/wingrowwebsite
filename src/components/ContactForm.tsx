import { Mail, Phone, MapPin } from "lucide-react";
import VisitorFeedbackForm from "./VisitorFeedbackForm";
import MarketInvitationForm from "./MarketInvitationForm";

const ContactForm = () => {
  return (
    <section id="contact" className="pt-8 pb-4 bg-background">
      <div className="container px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent animate-scale-in">
              Connect with Wingrow Market
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We'd love to hear from you or host a market at your venue
            </p>
          </div>

          {/* Two Forms Side by Side */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <VisitorFeedbackForm />
            <MarketInvitationForm />
          </div>

          {/* Contact Information Panel */}
          <div className="bg-card rounded-xl shadow-lg p-8 border border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Email</div>
                      <a 
                        href="mailto:info@wingrowmarket.com" 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@wingrowmarket.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Phone</div>
                      <a 
                        href="tel:+919876543210"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +91 98765 43210
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">Headquarters</div>
                      <div className="text-muted-foreground">Pune, Maharashtra, India</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">Why Choose Wingrow?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">Prime locations with high footfall</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">Marketing support and promotion</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">Fair and transparent pricing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">Community of trusted vendors</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">Weekly consistent opportunity</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                🔒 Your information is safe with us. We do not share data with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
