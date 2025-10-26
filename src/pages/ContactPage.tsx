import Navigation from "@/components/Navigation";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FloatingProduceBackground from "@/components/FloatingProduceBackground";

const ContactPage = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingProduceBackground density="low" />
      <Navigation />
      <div className="pt-20">
        <ContactForm />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default ContactPage;
