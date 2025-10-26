import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FloatingProduceBackground from "@/components/FloatingProduceBackground";

const AboutPage = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingProduceBackground density="low" />
      <Navigation />
      <div className="pt-20">
        <About />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default AboutPage;
