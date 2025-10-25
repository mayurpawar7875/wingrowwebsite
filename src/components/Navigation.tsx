import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import wingrowLogo from "@/assets/wingrow-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const openChatbot = () => {
    const event = new CustomEvent('openChatbot');
    window.dispatchEvent(event);
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: t('home'), onClick: () => scrollToSection('hero') },
    { label: t('about'), onClick: () => scrollToSection('about') },
    { label: t('markets'), onClick: () => scrollToSection('markets') },
    { label: t('womenMarkets'), onClick: () => scrollToSection('women-markets') },
    { label: t('testimonials'), onClick: () => scrollToSection('testimonials') },
    { label: t('contact'), onClick: () => scrollToSection('contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <img
              src={wingrowLogo}
              alt="Wingrow Market"
              className="h-12 md:h-16 w-auto"
              style={{ mixBlendMode: 'multiply' }}
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={item.onClick}
                className="text-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Right Side - CTA & Language */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              onClick={openChatbot}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              {t('bookStall')}
            </Button>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-md animate-fade-in">
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={item.onClick}
                  className="w-full justify-start text-foreground hover:text-primary hover:bg-primary/10"
                >
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={openChatbot}
                className="w-full mt-2 bg-gradient-to-r from-primary to-primary/80"
              >
                {t('bookStall')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
