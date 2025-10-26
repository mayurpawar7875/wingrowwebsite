import { useTranslation } from "@/hooks/useTranslation";

const Supporters = () => {
  const { t } = useTranslation();

  const supporters = [
    {
      name: "Digital Imppact SQL",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
    },
    {
      name: "USAID",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
    },
    {
      name: "Sahyadri Farms",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
    },
    {
      name: "Y Combinator",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide animate-slide-in-left bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent" style={{ animationDelay: '0.2s' }}>
            Supporters & Partners
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto mb-6"></div>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
            People Who Believe In Our Vision For An Inclusive Agri Ecosystem
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {supporters.map((supporter, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-card via-card to-primary/5 p-8 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:scale-105 animate-fade-in border border-primary/20 aspect-[2/1] relative overflow-hidden"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                borderRadius: '100px 20px 20px 100px'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-accent/0 hover:from-primary/5 hover:via-accent/5 hover:to-primary/5 transition-all duration-300" />
              <div className="relative z-10 flex items-center justify-center h-full">
                <img
                  src={supporter.logo}
                  alt={supporter.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Supporters;
