import { Facebook, Instagram, Twitter, Mail, Leaf, Phone, Youtube } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import wingrowLogo from "@/assets/wingrow-logo.png";
import { useEffect, useRef, useState } from "react";

const Footer = () => {
  const { t } = useTranslation();
  const [bgUrl, setBgUrl] = useState<string | null>(null);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          import("@/assets/footer-farming-bg.jpg").then(mod => {
            const img = new Image();
            img.src = mod.default;
            img.onload = () => setBgUrl(mod.default);
          });
          observer.disconnect();
        }
      },
      { rootMargin: '300px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: Youtube, href: "https://youtube.com", label: "YouTube", color: "hover:bg-red-600" },
  ];

  return (
    <footer ref={ref} className="relative overflow-hidden">
      {bgUrl && (
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${bgUrl})` }} />
          <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background/95" />
        </div>
      )}

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-background"></path>
        </svg>
      </div>

      <div className="container px-4 pt-8 pb-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="space-y-3">
            <div className="mb-3">
              <img src={wingrowLogo} alt="Wingrow Market" className="h-10 w-auto mb-2" loading="lazy" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('connectingFarmers')}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+917776003700" className="hover:text-primary transition-colors">+91 77760 03700</a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4 text-primary" />
              <a href="mailto:connect@wingrowagritech.com" className="hover:text-primary transition-colors">connect@wingrowagritech.com</a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base mb-3">{t('followUs')}</h4>
            <div className="flex flex-wrap gap-2 mb-4">
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
              href="mailto:connect@wingrowagritech.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">{t('email')}</span>
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6">
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
