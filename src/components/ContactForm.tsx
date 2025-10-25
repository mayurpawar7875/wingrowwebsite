import { Mail, Phone, MapPin } from "lucide-react";
import VisitorFeedbackForm from "./VisitorFeedbackForm";
import MarketInvitationForm from "./MarketInvitationForm";
import { useTranslation } from "@/hooks/useTranslation";

const ContactForm = () => {
  const { t } = useTranslation();
  
  return (
    <section id="contact" className="pt-8 pb-4 bg-background">
      <div className="container px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent animate-scale-in">
              {t('connectWithWingrow')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('connectDescription')}
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
                <h3 className="text-2xl font-bold mb-6">{t('contactInformation')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold mb-1">{t('email')}</div>
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
                      <div className="font-semibold mb-1">{t('phone')}</div>
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
                      <div className="font-semibold mb-1">{t('headquarters')}</div>
                      <div className="text-muted-foreground">Pune, Maharashtra, India</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">{t('whyChooseWingrow')}</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">{t('primeLocations')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">{t('marketingSupport')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">{t('fairPricing')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">{t('trustedCommunity')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-0.5">✓</span>
                    <span className="text-muted-foreground">{t('weeklyOpportunity')}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                {t('privacyNotice')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
