import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { Calendar, Sparkles } from "lucide-react";

const DiwaliBanner = () => {
  const { t } = useTranslation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleApply = () => {
    window.dispatchEvent(
      new CustomEvent("openChatbot", {
        detail: {
          producerType: "Women Entrepreneur",
          stallType: "Women Market",
        },
      })
    );
  };

  return (
    <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 dark:from-orange-950/30 dark:via-amber-950/30 dark:to-orange-950/30 border-b border-orange-200 dark:border-orange-800">
      <div className="container px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <Sparkles className="h-8 w-8 text-orange-600 dark:text-orange-400 animate-pulse flex-shrink-0" />
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                {t("womenMarketBannerTitle")}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t("womenMarketBannerSubtitle")}
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button
              onClick={handleApply}
              className="bg-orange-600 hover:bg-orange-700 text-white"
            >
              <Calendar className="h-4 w-4 mr-2" />
              {t("applyForStall")}
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection("women-markets")}
              className="border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
            >
              {t("viewSchedule")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiwaliBanner;
