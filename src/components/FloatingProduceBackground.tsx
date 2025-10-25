import { useEffect, useState } from "react";
import { Leaf, Apple } from "lucide-react";

interface FloatingProduceBackgroundProps {
  density?: "low" | "medium" | "high";
  sections?: string[];
  colorMode?: "auto" | "light" | "dark";
}

const ProduceIcons = {
  apple: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2c-.5 0-1 .2-1.4.6-.4.4-.6.9-.6 1.4 0 .5.2 1 .6 1.4.4.4.9.6 1.4.6s1-.2 1.4-.6c.4-.4.6-.9.6-1.4 0-.5-.2-1-.6-1.4C13 2.2 12.5 2 12 2zm0 4c-2.8 0-5 2.2-5 5 0 4 3 7 5 8 2-1 5-4 5-8 0-2.8-2.2-5-5-5z"/>
    </svg>
  ),
  banana: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M20 4c-1.1 0-2 .9-2 2 0 .7.4 1.3.9 1.7-1.5 2.3-4.2 3.8-7.2 4.1-.3-.9-1.2-1.5-2.2-1.5-1.3 0-2.5 1-2.5 2.4 0 1.3 1 2.4 2.5 2.4 1 0 1.9-.6 2.2-1.5 3.5-.3 6.7-2.1 8.4-4.8.3.1.6.2.9.2 1.1 0 2-.9 2-2s-.9-2-2-2z"/>
    </svg>
  ),
  orange: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <circle cx="12" cy="13" r="7"/>
      <path d="M12 6c0-1 .5-2 1.5-2s1.5 1 1.5 2"/>
    </svg>
  ),
  carrot: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M16 2l-2 2-1-1-3 3 2 2-8 8c-1.1 1.1-1.1 2.9 0 4s2.9 1.1 4 0l8-8 2 2 3-3-1-1 2-2-2-2-1 1-3-3z"/>
    </svg>
  ),
  tomato: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 3c-.5 0-1 .2-1.4.6l-.2.2c-.3-.2-.7-.3-1-.3-.8 0-1.4.6-1.4 1.5s.6 1.5 1.4 1.5c.3 0 .6-.1.9-.2-.2.3-.3.7-.3 1.1C10 9.7 11 11 12 11s2-1.3 2-3.6c0-.4-.1-.8-.3-1.1.3.1.6.2.9.2.8 0 1.4-.6 1.4-1.5S15.4 3.5 14.6 3.5c-.3 0-.7.1-1 .3l-.2-.2C13 3.2 12.5 3 12 3zm0 3c1.7 0 3 2.2 3 5s-1.3 5-3 5-3-2.2-3-5 1.3-5 3-5z"/>
    </svg>
  ),
  broccoli: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <circle cx="8" cy="6" r="3"/>
      <circle cx="16" cy="6" r="3"/>
      <circle cx="12" cy="4" r="2.5"/>
      <path d="M10 9h4v11h-4z"/>
    </svg>
  ),
  corn: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 2c-1.5 0-3 1-3.5 2.5L7 8l-.5 4c0 4 2.5 8 5.5 8s5.5-4 5.5-8L17 8l-1.5-3.5C15 3 13.5 2 12 2z"/>
      <circle cx="10" cy="10" r="0.8" fill="#3A2E2A"/>
      <circle cx="14" cy="10" r="0.8" fill="#3A2E2A"/>
      <circle cx="10" cy="13" r="0.8" fill="#3A2E2A"/>
      <circle cx="14" cy="13" r="0.8" fill="#3A2E2A"/>
      <circle cx="12" cy="11.5" r="0.8" fill="#3A2E2A"/>
    </svg>
  ),
  grapes: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <circle cx="12" cy="5" r="1.5"/>
      <circle cx="9" cy="8" r="2"/>
      <circle cx="15" cy="8" r="2"/>
      <circle cx="12" cy="10" r="2"/>
      <circle cx="8" cy="11" r="2"/>
      <circle cx="16" cy="11" r="2"/>
      <circle cx="10" cy="13" r="2"/>
      <circle cx="14" cy="13" r="2"/>
      <circle cx="12" cy="16" r="2"/>
    </svg>
  ),
  leaf: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M17 8c-3.5 0-6.5 2-8 5-1.5-3-4.5-5-8-5 0 5.5 4.5 10 10 10s10-4.5 10-10c-1.3 0-2.6.3-3.8.8L17 8z"/>
    </svg>
  ),
};

const colors = [
  "text-[#D86B46]", // primary orange
  "text-[#8FBF5A]", // leaf green
  "text-[#F2C94C]", // yellow
  "text-[#EA7362]", // tomato
  "text-[#6E7F5B]", // olive
];

const FloatingProduceBackground = ({
  density = "medium",
  sections,
  colorMode = "auto",
}: FloatingProduceBackgroundProps) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    motionQuery.addEventListener("change", handleMotionChange);
    return () => motionQuery.removeEventListener("change", handleMotionChange);
  }, []);

  useEffect(() => {
    // Check localStorage for user preference
    const saved = localStorage.getItem("wingrow-produce-bg");
    if (saved !== null) {
      setIsEnabled(saved === "true");
    }
  }, []);

  useEffect(() => {
    // Generate floating items after first contentful paint
    const callback = () => {
      const count = density === "low" ? 8 : density === "high" ? 16 : 12;
      const isMobile = window.innerWidth < 768;
      const itemCount = isMobile ? Math.floor(count / 2) : count;

      const iconNames = Object.keys(ProduceIcons);
      const generatedItems = Array.from({ length: itemCount }, (_, i) => ({
        id: i,
        icon: iconNames[Math.floor(Math.random() * iconNames.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 24 + Math.random() * 40, // 24-64px
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        duration: 15 + Math.random() * 15, // 15-30s
        delay: Math.random() * -20, // stagger start
        rotation: Math.random() * 360,
        blur: Math.random() > 0.7, // 30% chance of blur
      }));

      setItems(generatedItems);
    };

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 100);
    }
  }, [density]);

  const toggleBackground = () => {
    const newValue = !isEnabled;
    setIsEnabled(newValue);
    localStorage.setItem("wingrow-produce-bg", String(newValue));
  };

  // Don't render if disabled or user prefers reduced motion
  if (!isEnabled || prefersReducedMotion) {
    return null;
  }

  return (
    <>
      <style>{`
        @keyframes float-drift {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(15px, -20px) rotate(5deg);
          }
          50% {
            transform: translate(-10px, -40px) rotate(-5deg);
          }
          75% {
            transform: translate(-20px, -20px) rotate(3deg);
          }
        }

        @keyframes gentle-rotate {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(10deg);
          }
        }

        .produce-item {
          animation: float-drift var(--duration) ease-in-out infinite,
                     gentle-rotate calc(var(--duration) * 0.8) ease-in-out infinite;
          animation-delay: var(--delay);
          will-change: transform;
          transition: transform 0.15s ease-out;
        }

        @media (hover: hover) {
          .produce-item:hover {
            transform: scale(1.05);
            animation-play-state: paused;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .produce-item {
            animation: none !important;
          }
        }
      `}</style>

      {/* Fixed background layer */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
        role="presentation"
      >
        {/* Subtle radial gradient wash */}
        <div className="absolute inset-0 bg-gradient-radial from-background/5 via-transparent to-transparent" />

        {/* Floating produce items */}
        {items.map((item) => {
          const IconComponent = ProduceIcons[item.icon as keyof typeof ProduceIcons];
          
          return (
            <div
              key={item.id}
              className={`produce-item absolute ${item.color} ${item.blur ? 'blur-sm' : ''}`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                width: `${item.size}px`,
                height: `${item.size}px`,
                opacity: 0.08 + Math.random() * 0.04, // 0.08-0.12
                '--duration': `${item.duration}s`,
                '--delay': `${item.delay}s`,
              } as React.CSSProperties}
            >
              <IconComponent />
            </div>
          );
        })}
      </div>

      {/* Toggle control - fixed bottom left */}
      <button
        onClick={toggleBackground}
        className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 text-muted-foreground hover:text-primary"
        aria-label="Toggle background illustrations"
        title="Toggle background illustrations"
      >
        <Leaf className="h-4 w-4" />
      </button>
    </>
  );
};

export default FloatingProduceBackground;
