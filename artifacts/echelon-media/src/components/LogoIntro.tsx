import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function LogoIntro({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !logoRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, { opacity: 0, duration: 0.4, onComplete });
      }
    });

    // Fade in and scale up
    tl.fromTo(logoRef.current, 
      { opacity: 0, scale: 0.4 }, 
      { opacity: 1, scale: 1.0, duration: 0.9, ease: "power2.out" }
    );

    // Glow pulse handled via CSS animation, hold for 2.8s total
    tl.to({}, { duration: 1.9 }); // 0.9 + 1.9 = 2.8s

    // Zoom out
    tl.to(logoRef.current, { scale: 4.0, opacity: 0, duration: 0.7, ease: "power2.in" });

  }, [onComplete]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[var(--cream)] flex items-center justify-center">
      <div ref={logoRef} className="relative">
        <div className="font-heading font-bold text-6xl md:text-8xl text-[var(--purple)]">
          ECHELON
        </div>
        <div className="font-heading font-bold text-6xl md:text-8xl text-[var(--purple)] text-right">
          MEDIA
        </div>
        <div className="absolute inset-0 bg-transparent animate-[glow_1.2s_ease-in-out_0.9s] pointer-events-none rounded-full" style={{ boxShadow: "0 0 0px var(--amber)" }}></div>
      </div>
      <button 
        onClick={onComplete}
        className="absolute bottom-10 right-10 font-sans text-sm text-[var(--amber)] hover:opacity-80 transition-opacity animate-[fadeIn_0.5s_ease_1s_both]"
      >
        Skip
      </button>

      <style>{`
        @keyframes glow {
          0% { filter: drop-shadow(0 0 0px #F5A623); }
          50% { filter: drop-shadow(0 0 40px #F5A623); }
          100% { filter: drop-shadow(0 0 0px #F5A623); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
