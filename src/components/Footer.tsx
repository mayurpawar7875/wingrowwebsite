import { Facebook, Instagram, Twitter, Mail, Leaf, MapPin, Phone, Youtube, ChevronRight } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { Link } from "react-router-dom";
import wingrowLogo from "@/assets/wingrow-logo.png";

const Footer = () => {
  const { t } = useTranslation();

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
        <Leaf className="h-24 w-24 text-accent animate-pulse" />
      </div>
      <div className="absolute bottom-40 left-10 opacity-10">
        <Leaf className="h-16 w-16 text-accent rotate-45 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container px-4 pt-12 pb-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Wingrow Market */}
          <div className="animate-fade-in space-y-4" style={{ animationDelay: '0.1s' }}>
            <div className="mb-4">
              <img src={wingrowLogo} alt="Wingrow Market" className="h-12 w-auto mb-3" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('connectingFarmers')}
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
                { label: t('home'), path: '/' },
                { label: t('markets'), path: '/markets' },
                { label: t('bookAStall'), path: '/contact' },
                { label: t('contactUs'), path: '/contact' },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all hover:translate-x-1"
                  >
                    <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative">
                      {link.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Markets */}
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-bold text-lg mb-4">{t('markets')}</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/markets"
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all"
                >
                  <MapPin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>Pune (24 Markets)</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/markets"
                  className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all"
                >
                  <MapPin className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                  <span>Mumbai (23 Markets)</span>
                </Link>
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
              <span className="text-sm font-medium">{t('email')}</span>
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
                {t('privacyPolicy')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
              <button className="relative hover:text-primary transition-colors group">
                {t('termsConditions')}
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
