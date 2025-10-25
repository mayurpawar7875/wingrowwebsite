import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languageNames = {
    en: 'English',
    mr: 'मराठी',
    hi: 'हिंदी'
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Languages className="h-4 w-4" />
          {languageNames[language]}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-card">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')}
          className="cursor-pointer"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('mr')}
          className="cursor-pointer"
        >
          मराठी
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('hi')}
          className="cursor-pointer"
        >
          हिंदी
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
