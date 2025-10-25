import { Facebook, Instagram, Twitter, Mail, Leaf, MapPin, Phone, Youtube, Send, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing!", {
        description: "You'll receive updates about new markets and offers.",
      });
      setEmail("");
    }
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-background via-muted/30 to-muted/50 overflow-hidden">
      {/* Decorative wave separator */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-background"></path>
        </svg>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-10 opacity-10">
        <Leaf className="h-24 w-24 text-primary animate-pulse" />
      </div>
      <div className="absolute bottom-40 left-10 opacity-10">
        <Leaf className="h-16 w-16 text-primary rotate-45 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container px-4 pt-20 pb-8">
        {/* Newsletter Section */}
        <div className="max-w-3xl mx-auto mb-16 animate-fade-in">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/20 shadow-lg relative overflow-hidden group">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 text-center mb-6">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                Stay Connected with Wingrow Market
              </h3>
              <p className="text-muted-foreground">
                Get updates on new markets, offers, and stories from our community
              </p>
            </div>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto relative z-10">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-full px-6 py-6 shadow-lg focus:shadow-xl focus:shadow-primary/20 transition-all"
              />
              <Button 
                type="submit" 
                size="lg"
                className="rounded-full px-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                <Send className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Wingrow Market */}
          <div className="animate-fade-in space-y-4" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6 text-primary animate-pulse" />
              <h3 className="text-xl font-bold">Wingrow Market</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting farmers, women entrepreneurs, and consumers directly through our weekly markets in Pune and Mumbai.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+919876543210" className="hover:text-primary transition-colors">
                +91 98765 43210
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:info@wingrowmarket.com" className="hover:text-primary transition-colors">
                info@wingrowmarket.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-bold text-lg mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {[
                { label: t('home'), action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                { label: t('markets'), action: () => scrollToSection('markets') },
                { label: t('bookAStall'), action: () => scrollToSection('contact') },
                { label: t('contactUs'), action: () => scrollToSection('contact') },
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={link.action}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-bold text-lg mb-4">{t('markets')}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('markets')}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all"
                >
                  <MapPin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>Pune (24 Markets)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('markets')}
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all"
                >
                  <MapPin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>Mumbai (23 Markets)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Follow Us / Contact */}
          <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h4 className="font-bold text-lg mb-4">{t('followUs')}</h4>
            <div className="flex flex-wrap gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`group relative w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color} hover:text-white`}
                >
                  <social.icon className="h-5 w-5 relative z-10" />
                </a>
              ))}
            </div>
            <a
              href="mailto:info@wingrowmarket.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">Email Us</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Wingrow Market. {t('allRightsReserved')}
            </p>
            <div className="flex gap-6">
              <button className="relative hover:text-primary transition-colors group">
                Privacy Policy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
              <button className="relative hover:text-primary transition-colors group">
                Terms & Conditions
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
