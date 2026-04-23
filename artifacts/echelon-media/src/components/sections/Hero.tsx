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
        background: "radial-gradient(ellipse 80% 60% at 50% 35%, var(--offwhite) 0%, var(--cream) 55%, #F2E8C8 100%)"
      }}
    >
      {/* Soft amber glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-40 -left-40 w-[680px] h-[680px] rounded-full opacity-50"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.32) 0%, transparent 65%)", filter: "blur(20px)" }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[720px] h-[720px] rounded-full opacity-45"
          style={{ background: "radial-gradient(circle, rgba(45,27,94,0.18) 0%, transparent 65%)", filter: "blur(30px)" }}
        />
        <div
          className="absolute top-[55%] left-[60%] w-[420px] h-[420px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.25) 0%, transparent 70%)", filter: "blur(40px)" }}
        />
      </div>

      {/* Subtle dot grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(45,27,94,0.18) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 45%, #000 30%, transparent 80%)"
        }}
      />

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Decorative concentric arcs (top-right corner) */}
      <svg
        className="absolute -top-32 -right-32 w-[520px] h-[520px] pointer-events-none opacity-40"
        viewBox="0 0 200 200" fill="none" stroke="var(--amber)" strokeWidth="0.6"
      >
        <circle cx="100" cy="100" r="90" />
        <circle cx="100" cy="100" r="70" strokeDasharray="2 4" />
        <circle cx="100" cy="100" r="50" />
        <circle cx="100" cy="100" r="30" strokeDasharray="1 3" />
      </svg>

      {/* Decorative arcs bottom-left */}
      <svg
        className="absolute -bottom-40 -left-40 w-[560px] h-[560px] pointer-events-none opacity-30"
        viewBox="0 0 200 200" fill="none" stroke="var(--purple)" strokeWidth="0.5"
      >
        <circle cx="100" cy="100" r="95" />
        <circle cx="100" cy="100" r="75" strokeDasharray="1 3" />
        <circle cx="100" cy="100" r="55" />
      </svg>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Stylised phone (no photo) */}
        <div 
          ref={phoneRef}
          className="absolute left-[7%] top-[22%] w-[190px] h-[360px] rounded-[32px] p-[10px] animate-[float_6s_ease-in-out_infinite] hidden md:block"
          style={{
            background: "linear-gradient(145deg, var(--purple), #1a0f3d)",
            boxShadow: "0 50px 100px -20px rgba(45,27,94,0.4), 0 0 0 1px rgba(245,166,35,0.25)"
          }}
        >
          <div className="w-full h-full rounded-[22px] overflow-hidden relative" style={{ background: "linear-gradient(160deg, #FFF8EC 0%, #FAF3E0 100%)" }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-[var(--purple)] rounded-b-xl" />
            <div className="p-4 pt-7 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full bg-[var(--amber)]" />
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--purple)] opacity-30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--purple)] opacity-30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--purple)] opacity-30" />
                </div>
              </div>
              <div className="h-32 rounded-xl" style={{ background: "linear-gradient(135deg, var(--amber) 0%, #E8941A 100%)" }}>
                <div className="h-full w-full flex items-end p-3">
                  <div className="w-full h-1 rounded-full bg-[var(--purple)] opacity-30" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-2 w-3/4 rounded-full bg-[var(--purple)] opacity-20" />
                <div className="h-2 w-1/2 rounded-full bg-[var(--purple)] opacity-15" />
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="aspect-square rounded-lg bg-[var(--purple)] opacity-90" />
                <div className="aspect-square rounded-lg bg-[var(--amber)] opacity-80" />
                <div className="aspect-square rounded-lg bg-[var(--purple)] opacity-15" />
              </div>
            </div>
          </div>
        </div>

        {/* UI Card */}
        <div 
          ref={cardRef}
          className="absolute right-[8%] top-[18%] w-[230px] rounded-[18px] backdrop-blur-[14px] border p-5 animate-[floatCard_5s_ease-in-out_infinite] hidden md:block"
          style={{
            background: "rgba(255,248,236,0.85)",
            borderColor: "rgba(245,166,35,0.35)",
            boxShadow: "0 30px 70px -15px rgba(45,27,94,0.25)"
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[var(--amber)]" />
            <div className="text-[9px] font-semibold tracking-[0.2em] text-[var(--purple)] opacity-70">ENGAGEMENT</div>
          </div>
          <div className="text-[28px] font-heading font-bold text-[var(--purple)] leading-none mb-1">+248%</div>
          <div className="text-[11px] text-[var(--purple)] opacity-50 mb-4">vs. last quarter</div>
          {/* Mini bar chart */}
          <div className="flex items-end gap-1.5 h-12">
            {[40, 65, 30, 80, 55, 95, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: i === 5 ? "var(--amber)" : "rgba(45,27,94,0.25)" }} />
            ))}
          </div>
          <div className="mt-3 h-[1px] w-full bg-[var(--amber)] opacity-50" />
        </div>

        {/* Small floating tag bottom-left of hero text */}
        <div
          className="absolute left-[12%] bottom-[18%] hidden lg:flex items-center gap-2 px-3 py-2 rounded-full backdrop-blur-md animate-[floatCard_7s_ease-in-out_infinite]"
          style={{
            background: "rgba(45,27,94,0.92)",
            boxShadow: "0 20px 40px -10px rgba(45,27,94,0.3)"
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--amber)] animate-pulse" />
          <span className="text-[10px] font-semibold tracking-[0.18em] text-[var(--cream)]">LIVE · 200+ PROJECTS</span>
        </div>

        {/* Camera Lens */}
        <svg 
          ref={cameraRef}
          className="absolute right-[14%] bottom-[14%] w-36 h-36 text-[var(--amber)] animate-[spin_20s_linear_infinite] hidden md:block"
          viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2"
        >
          <circle cx="50" cy="50" r="44" opacity="0.6" />
          <circle cx="50" cy="50" r="32" />
          <circle cx="50" cy="50" r="18" opacity="0.7" strokeDasharray="2 2" />
          <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.8" />
          <line x1="50" y1="2" x2="50" y2="14" />
          <line x1="50" y1="86" x2="50" y2="98" />
          <line x1="2" y1="50" x2="14" y2="50" />
          <line x1="86" y1="50" x2="98" y2="50" />
        </svg>

        {/* Structured golden dot constellation */}
        {[
          { l: 18, t: 18 }, { l: 22, t: 70 }, { l: 78, t: 65 }, { l: 84, t: 30 },
          { l: 50, t: 12 }, { l: 30, t: 85 }, { l: 70, t: 90 }, { l: 8, t: 50 },
          { l: 92, t: 55 }, { l: 60, t: 80 }
        ].map((p, i) => (
          <div 
            key={i}
            className="absolute w-[5px] h-[5px] bg-[var(--amber)] rounded-full animate-[pulse_3s_ease-in-out_infinite]"
            style={{
              left: `${p.l}%`,
              top: `${p.t}%`,
              opacity: 0.5,
              animationDelay: `${(i * 0.3) % 2}s`,
              boxShadow: "0 0 12px rgba(245,166,35,0.6)"
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
