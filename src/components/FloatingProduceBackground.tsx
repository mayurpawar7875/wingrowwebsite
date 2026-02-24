import { useEffect, useState, memo } from "react";
import { Leaf } from "lucide-react";

interface FloatingProduceBackgroundProps {
  density?: "low" | "medium" | "high";
}

const colors = [
  "text-[#FF1654]",
  "text-[#8FD400]",
  "text-[#FF69B4]",
  "text-[#7FD700]",
  "text-[#FF4081]",
];

const iconPaths: Record<string, string> = {
  apple: "M12 2c-.5 0-1 .2-1.4.6-.4.4-.6.9-.6 1.4 0 .5.2 1 .6 1.4.4.4.9.6 1.4.6s1-.2 1.4-.6c.4-.4.6-.9.6-1.4 0-.5-.2-1-.6-1.4C13 2.2 12.5 2 12 2zm0 4c-2.8 0-5 2.2-5 5 0 4 3 7 5 8 2-1 5-4 5-8 0-2.8-2.2-5-5-5z",
  carrot: "M16 2l-2 2-1-1-3 3 2 2-8 8c-1.1 1.1-1.1 2.9 0 4s2.9 1.1 4 0l8-8 2 2 3-3-1-1 2-2-2-2-1 1-3-3z",
  leaf: "M17 8c-3.5 0-6.5 2-8 5-1.5-3-4.5-5-8-5 0 5.5 4.5 10 10 10s10-4.5 10-10c-1.3 0-2.6.3-3.8.8L17 8z",
};

const iconNames = Object.keys(iconPaths);

const FloatingProduceBackground = memo(({ density = "medium" }: FloatingProduceBackgroundProps) => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery.matches) { setIsEnabled(false); return; }

    const saved = localStorage.getItem("wingrow-produce-bg");
    if (saved === "false") { setIsEnabled(false); return; }

    // Reduced count: low=4, medium=6, high=8
    const count = density === "low" ? 4 : density === "high" ? 8 : 6;
    const isMobile = window.innerWidth < 768;
    const itemCount = isMobile ? Math.floor(count / 2) : count;

    const generated = Array.from({ length: itemCount }, (_, i) => ({
      id: i,
      icon: iconNames[i % iconNames.length],
      color: colors[i % colors.length],
      size: 28 + (i * 7) % 30,
      x: (i * 17 + 5) % 90,
      y: (i * 23 + 10) % 85,
      duration: 18 + (i * 3) % 12,
      delay: -(i * 4),
    }));
    setItems(generated);
  }, [density]);

  if (!isEnabled || items.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes float-drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-10px, -30px) rotate(-3deg); }
        }
        .produce-item {
          animation: float-drift var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
        @media (prefers-reduced-motion: reduce) {
          .produce-item { animation: none !important; }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }} aria-hidden="true">
        {items.map((item) => (
          <div
            key={item.id}
            className={`produce-item absolute ${item.color}`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: `${item.size}px`,
              height: `${item.size}px`,
              opacity: 0.08,
              '--duration': `${item.duration}s`,
              '--delay': `${item.delay}s`,
            } as React.CSSProperties}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d={iconPaths[item.icon]} />
            </svg>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          setIsEnabled(false);
          localStorage.setItem("wingrow-produce-bg", "false");
        }}
        className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-card/80 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl transition-all hover:scale-105 text-muted-foreground hover:text-primary"
        aria-label="Toggle background illustrations"
      >
        <Leaf className="h-4 w-4" />
      </button>
    </>
  );
});

FloatingProduceBackground.displayName = "FloatingProduceBackground";

export default FloatingProduceBackground;
