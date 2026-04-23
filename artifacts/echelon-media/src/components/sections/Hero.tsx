import { useEffect, useRef } from "react";
import gsap from "gsap";
import bgLeft from "@assets/Screenshot 2026-04-23 121810.png";
import bgRight from "@assets/Screenshot 2026-04-23 121858.png";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImgRef = useRef<HTMLDivElement>(null);
  const rightImgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leftImgRef.current) {
        gsap.fromTo(
          leftImgRef.current,
          { scale: 1.15, x: -20 },
          { scale: 1.25, x: 20, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
      }
      if (rightImgRef.current) {
        gsap.fromTo(
          rightImgRef.current,
          { scale: 1.2, x: 20 },
          { scale: 1.1, x: -20, duration: 22, ease: "sine.inOut", yoyo: true, repeat: -1 },
        );
      }
      if (textRef.current) {
        gsap.from(textRef.current.children, {
          y: 40,
          opacity: 0,
          duration: 1.1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
        });
      }
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
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-[var(--cream)]"
    >
      {/* Background photo collage */}
      <div className="absolute inset-0 grid grid-cols-2 pointer-events-none">
        <div
          ref={leftImgRef}
          className="relative w-full h-full bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${bgLeft})` }}
        />
        <div
          ref={rightImgRef}
          className="relative w-full h-full bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${bgRight})` }}
        />
      </div>

      {/* Purple wash to push images toward palette + tame contrast */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-multiply"
        style={{ backgroundColor: "var(--purple)", opacity: 0.7 }}
      />
      {/* Cream radial highlight behind text so text reads clearly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(250,243,224,0.92) 0%, rgba(250,243,224,0.78) 35%, rgba(250,243,224,0.35) 65%, rgba(250,243,224,0) 100%)",
        }}
      />

      {/* Subtle noise */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay">
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

        <p className="font-sans text-[16px] text-[var(--purple)] opacity-70 mb-10 max-w-lg">
          If you want your audience to be your customer — you are in the right place.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-[var(--purple)] text-[var(--amber)] font-sans font-semibold rounded-full px-[36px] py-[14px] flex items-center gap-2 hover:bg-[var(--amber)] hover:text-[var(--purple)] hover:-translate-y-[3px] transition-all duration-250"
          >
            Explore Our Work <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
