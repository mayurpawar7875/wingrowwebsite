import Hero from "@/components/Hero";
import WomenMarkets from "@/components/WomenMarkets";
import Markets from "@/components/Markets";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FloatingProduceBackground from "@/components/FloatingProduceBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingProduceBackground density="medium" />
      <Hero />
      <Markets />
      <WomenMarkets />
      <About />
      <Testimonials />
      <ContactForm />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
