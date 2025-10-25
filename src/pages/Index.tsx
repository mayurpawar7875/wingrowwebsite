import Hero from "@/components/Hero";
import WomenMarkets from "@/components/WomenMarkets";
import Markets from "@/components/Markets";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Index = () => {
  return (
    <div className="min-h-screen">
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
