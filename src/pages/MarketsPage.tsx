import Navigation from "@/components/Navigation";
import Markets from "@/components/Markets";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FloatingProduceBackground from "@/components/FloatingProduceBackground";

const MarketsPage = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingProduceBackground density="low" />
      <Navigation />
      <div className="pt-20">
        <Markets />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default MarketsPage;
