import Hero from "@/components/Hero";
import Markets from "@/components/Markets";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FloatingBookButton from "@/components/FloatingBookButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Markets />
      <About />
      <Testimonials />
      <ContactForm />
      <Footer />
      <Chatbot />
      <FloatingBookButton />
    </div>
  );
};

export default Index;
