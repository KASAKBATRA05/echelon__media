import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "wouter";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - window.innerWidth / 2;
      mouseY = e.clientY - window.innerHeight / 2;
    };

    const render = () => {
      currentX += (mouseX - currentX) * 0.08;
      currentY += (mouseY - currentY) * 0.08;

      if (phoneRef.current) {
        phoneRef.current.style.transform = `translate(${currentX * 0.02}px, ${currentY * 0.02}px) rotate(-8deg)`;
      }
      if (cardRef.current) {
        cardRef.current.style.transform = `translate(${currentX * 0.035}px, ${currentY * 0.025}px) rotateY(8deg)`;
      }
      if (cameraRef.current) {
        cameraRef.current.style.transform = `translate(${currentX * 0.015}px, ${currentY * 0.015}px)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove);
    render();

    // Scroll animation
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        opacity: 0,
        scale: 0.95,
        ease: "none"
      });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at 50% 40%, var(--offwhite) 0%, var(--cream) 70%)"
      }}
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Phone */}
        <div 
          ref={phoneRef}
          className="absolute left-[10%] top-[30%] w-[200px] h-[360px] rounded-[28px] border-[3px] border-[rgba(45,27,94,0.12)] overflow-hidden shadow-[0_40px_80px_rgba(45,27,94,0.12)] animate-[float_6s_ease-in-out_infinite]"
        >
          <img src="https://picsum.photos/196/354?random=1" alt="Phone Mockup" className="w-full h-full object-cover" />
        </div>

        {/* UI Card */}
        <div 
          ref={cardRef}
          className="absolute right-[15%] top-[25%] w-[200px] rounded-[16px] bg-[rgba(255,248,236,0.9)] backdrop-blur-[10px] border border-[rgba(245,166,35,0.3)] p-4 shadow-xl animate-[floatCard_5s_ease-in-out_infinite] perspective-[1000px]"
        >
          <img src="https://picsum.photos/160/90?random=2" alt="Card Mockup" className="w-full h-[90px] object-cover rounded-[8px] mb-3" />
          <div className="w-full h-[2px] bg-[var(--amber)] mb-3"></div>
          <div className="w-[80%] h-2 bg-[rgba(45,27,94,0.1)] rounded-full mb-2"></div>
          <div className="w-[60%] h-2 bg-[rgba(45,27,94,0.1)] rounded-full"></div>
        </div>

        {/* Camera Lens */}
        <svg 
          ref={cameraRef}
          className="absolute right-[20%] bottom-[20%] w-32 h-32 text-[var(--amber)] animate-[spin_20s_linear_infinite]"
          viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="25" />
          <line x1="50" y1="0" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="100" />
          <line x1="0" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="100" y2="50" />
        </svg>

        {/* Golden Dots */}
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-[6px] h-[6px] bg-[var(--amber)] rounded-full opacity-40 animate-[pulse_3s_ease-in-out_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div ref={textRef} className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">
        <div className="font-sans font-medium text-[11px] tracking-[0.2em] text-[var(--amber)] mb-8">
          — MEDIA AND MARKETING COMPANY
        </div>
        
        <h1 className="font-heading font-bold text-[clamp(56px,8vw,120px)] leading-[1.1] text-[var(--purple)] mb-6">
          <div>We craft</div>
          <div>
            <span className="font-italic-tagline text-[var(--amber)] text-[clamp(64px,9vw,130px)] font-semibold pr-4">stories</span>
            <span>that</span>
          </div>
          <div>resonates.</div>
        </h1>

        <p className="font-sans text-[16px] text-[var(--purple)] opacity-60 mb-10 max-w-lg">
          If you want your audience to be your customer — you are in the right place.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/portfolio" className="bg-[var(--purple)] text-[var(--amber)] font-sans font-semibold rounded-full px-[36px] py-[14px] flex items-center gap-2 hover:bg-[var(--amber)] hover:text-[var(--purple)] hover:-translate-y-[3px] transition-all duration-250">
            Explore Our Work <span>→</span>
          </Link>
          <a href="#contact" className="border-2 border-[var(--purple)] text-[var(--purple)] font-sans font-semibold rounded-full px-[36px] py-[14px] flex items-center justify-center hover:border-[var(--amber)] hover:text-[var(--amber)] transition-colors">
            Let's Talk
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="font-sans text-[10px] tracking-[0.3em] text-[var(--purple)] opacity-50">SCROLL</span>
        <div className="w-[2px] h-[40px] bg-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[var(--amber)] origin-top animate-[scrollLine_1.5s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.1% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}
