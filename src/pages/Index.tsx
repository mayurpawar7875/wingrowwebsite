import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FloatingProduceBackground from "@/components/FloatingProduceBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingProduceBackground density="medium" />
      <Navigation />
      <Hero />
      <About />
      <ContactForm />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
