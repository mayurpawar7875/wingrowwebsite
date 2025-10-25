import Navigation from "@/components/Navigation";
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
      <Navigation />
      <div id="hero">
        <Hero />
      </div>
      <div id="markets">
        <Markets />
      </div>
      <div id="women-markets">
        <WomenMarkets />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="testimonials">
        <Testimonials />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default Index;
