import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/lib/translations';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: string, replacements?: Record<string, string | number>): string => {
    let text = translations[language][key as keyof typeof translations['en']] || key;
    
    if (replacements) {
      Object.entries(replacements).forEach(([key, value]) => {
        text = text.replace(`{${key}}`, String(value));
      });
    }
    
    return text;
  };
  
  return { t, language };
};
