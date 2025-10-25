import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-card border-t py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Wingrow Market</h3>
            <p className="text-muted-foreground text-sm">
              {t('heroSubtitle')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('home')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('markets')} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('markets')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('bookAStall')}
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('contact')} className="text-muted-foreground hover:text-primary transition-colors">
                  {t('contactUs')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('markets')}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('puneMarkets')}</li>
              <li>{t('mumbaiMarkets')}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('followUs')}</h4>
            <div className="flex gap-4 mb-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:info@wingrowmarket.com" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">info@wingrowmarket.com</p>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Wingrow Market. {t('allRightsReserved')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
