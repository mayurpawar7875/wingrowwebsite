import { Mail, Phone, MapPin, MessageSquare, Building2 } from "lucide-react";
import VisitorFeedbackForm from "./VisitorFeedbackForm";
import MarketInvitationForm from "./MarketInvitationForm";
import { useTranslation } from "@/hooks/useTranslation";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

const ContactForm = () => {
  const { t } = useTranslation();
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [invitationOpen, setInvitationOpen] = useState(false);
  
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

          {/* Two Clickable Form Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Visitor Feedback Tile */}
            <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
              <DialogTrigger asChild>
                <Card className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <MessageSquare className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Visitor Feedback</h3>
                      <p className="text-muted-foreground">Share your market experience with us</p>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Visitor Feedback</DialogTitle>
                </DialogHeader>
                <VisitorFeedbackForm onSuccess={() => setFeedbackOpen(false)} />
              </DialogContent>
            </Dialog>

            {/* Market Invitation Tile */}
            <Dialog open={invitationOpen} onOpenChange={setInvitationOpen}>
              <DialogTrigger asChild>
                <Card className="p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-105 hover:border-primary group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Building2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Invite Wingrow to Your Venue</h3>
                      <p className="text-muted-foreground">Let us organize a market at your location</p>
                    </div>
                  </div>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">Market Invitation</DialogTitle>
                </DialogHeader>
                <MarketInvitationForm onSuccess={() => setInvitationOpen(false)} />
              </DialogContent>
            </Dialog>
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
