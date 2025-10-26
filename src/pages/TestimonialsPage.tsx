import Navigation from "@/components/Navigation";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import FloatingProduceBackground from "@/components/FloatingProduceBackground";

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen relative">
      <FloatingProduceBackground density="low" />
      <Navigation />
      <div className="pt-20">
        <Testimonials />
      </div>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default TestimonialsPage;
