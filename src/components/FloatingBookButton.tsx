import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const FloatingBookButton = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToContact}
      className="fixed bottom-24 left-6 shadow-lg z-40 hover:scale-110 transition-transform hidden md:flex"
      size="lg"
    >
      <Calendar className="mr-2 h-5 w-5" />
      Book Stall Now
    </Button>
  );
};

export default FloatingBookButton;
