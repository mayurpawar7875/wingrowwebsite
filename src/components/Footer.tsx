import { Facebook, Instagram, Mail, Phone, Youtube } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import wingrowLogo from "@/assets/wingrow-logo.png";

const Footer = () => {
  const { t } = useTranslation();

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/wingrowagritech", label: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/wingrowmarket/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@wingrow_wewinwegrow", label: "YouTube" },
  ];

  return (
    <footer className="bg-muted/30">
      <div className="container px-4 py-6">
        {/* Compact grid: 2 cols on md+, stack on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* About */}
          <div className="space-y-3">
            <img src={wingrowLogo} alt="Wingrow Market" className="h-8 w-auto" />
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t("connectingFarmers")}
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+917776003700" className="hover:text-primary transition-colors">
                  +91 77760 03700
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:info@wingrowmarket.com" className="hover:text-primary transition-colors">
                  info@wingrowmarket.com
                </a>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="font-semibold text-sm mb-3">{t("followUs")}</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              {socialLinks.map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <a
              href="mailto:info@wingrowmarket.com"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-sm transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="font-medium">{t("email")}</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <p className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Wingrow Market. {t("allRightsReserved")}
            </p>
            <div className="flex gap-4">
              <button className="hover:text-primary transition-colors">{t("privacyPolicy")}</button>
              <button className="hover:text-primary transition-colors">{t("termsConditions")}</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
