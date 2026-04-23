import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "wouter";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
        ease: "none",
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, var(--offwhite) 0%, var(--cream) 70%)",
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
