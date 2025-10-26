import Navigation from "@/components/Navigation";
import WomenMarkets from "@/components/WomenMarkets";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FloatingProduceBackground from "@/components/FloatingProduceBackground";

const WomenMarketsPage = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingProduceBackground density="low" />
      <Navigation />
      <div className="pt-20">
        <WomenMarkets />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default WomenMarketsPage;
