import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Wingrow Assistant. How can I help you today?", isBot: true },
    { text: "• Book a stall\n• View market schedules\n• General inquiries", isBot: true }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInputValue("");

    // Simple bot responses
    setTimeout(() => {
      let botResponse = "";
      const lowerInput = userMessage.toLowerCase();

      if (lowerInput.includes("book") || lowerInput.includes("stall")) {
        botResponse = "Great! To book a stall, please fill out the booking form on our website or contact us at info@wingrowmarket.com. Would you like me to direct you to the booking form?";
      } else if (lowerInput.includes("schedule") || lowerInput.includes("timing") || lowerInput.includes("when")) {
        botResponse = "Our markets operate every weekend:\n• Saturday: 7 AM - 12 PM (most locations)\n• Sunday: 7 AM - 12 PM (selected locations)\n\nWhich city are you interested in - Pune or Mumbai?";
      } else if (lowerInput.includes("pune")) {
        botResponse = "We have 7 markets in Pune: Kharadi, Hadapsar, Magarpatta, Ivy Estate, Baner, Wakad, and Aundh. Which location interests you?";
      } else if (lowerInput.includes("mumbai")) {
        botResponse = "We have 6 markets in Mumbai: Dombivli, Thane, Mulund, Ghatkopar, Borivali, and Chembur. Which location would you like to know more about?";
      } else if (lowerInput.includes("price") || lowerInput.includes("cost") || lowerInput.includes("fee")) {
        botResponse = "Stall pricing varies by location and size. Please contact us at info@wingrowmarket.com or call +91 98765 43210 for detailed pricing information.";
      } else {
        botResponse = "I can help you with:\n• Booking a stall\n• Market schedules and locations\n• General information about Wingrow Market\n\nWhat would you like to know?";
      }

      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg z-50 hover:scale-110 transition-transform"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] flex flex-col shadow-xl z-50 animate-scale-in">
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">Wingrow Assistant</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                    message.isBot
                      ? 'bg-muted text-foreground'
                      : 'bg-primary text-primary-foreground'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t bg-card">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default Chatbot;
