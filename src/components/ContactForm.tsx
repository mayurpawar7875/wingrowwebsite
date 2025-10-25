import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ContactForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(t('submissionSuccess'));
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('contactTitle')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('contactSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">{t('yourName')} *</Label>
                  <Input id="name" name="name" required placeholder={t('enterYourName')} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="phone">{t('phoneNumber')} *</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder={t('tenDigitNumber')} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="email">{t('yourEmail')}</Label>
                  <Input id="email" name="email" type="email" placeholder={t('yourEmail')} className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="market">{t('selectMarket')} *</Label>
                  <Select name="market" required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={t('chooseMarket')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kharadi">Kharadi, {t('pune')}</SelectItem>
                      <SelectItem value="hadapsar">Hadapsar, {t('pune')}</SelectItem>
                      <SelectItem value="magarpatta">Magarpatta, {t('pune')}</SelectItem>
                      <SelectItem value="baner">Baner, {t('pune')}</SelectItem>
                      <SelectItem value="thane">Thane, {t('mumbai')}</SelectItem>
                      <SelectItem value="mulund">Mulund, {t('mumbai')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="stallType">{t('stallType')} *</Label>
                  <Select name="stallType" required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder={t('selectStallType')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="farmer">{t('producerFarmer')}</SelectItem>
                      <SelectItem value="shg">{t('producerWSHG')}</SelectItem>
                      <SelectItem value="processor">{t('producerFoodProcessor')}</SelectItem>
                      <SelectItem value="other">{t('producerOther')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">{t('notes')}</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    placeholder={t('anySpecialRequirements')}
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? t('submitting') : t('sendMessage')}
                </Button>
              </form>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">{t('contactInfo')}</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">{t('email')}</div>
                      <a href="mailto:info@wingrowmarket.com" className="text-muted-foreground hover:text-primary">
                        info@wingrowmarket.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">{t('phone')}</div>
                      <div className="text-muted-foreground">+91 98765 43210</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <div className="font-semibold mb-1">{t('headquarters')}</div>
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
