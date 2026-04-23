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
        background: "radial-gradient(ellipse 90% 70% at 50% 40%, var(--offwhite) 0%, var(--cream) 60%, #EFE3BE 100%)"
      }}
    >
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-multiply">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      {/* Scattered floating card mockups (faded into background) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-70">
        {/* TOP LEFT — Social Media tile */}
        <div
          ref={phoneRef}
          className="absolute left-[3%] top-[8%] w-[170px] rounded-[18px] overflow-hidden animate-[float_6s_ease-in-out_infinite] hidden md:block"
          style={{
            transform: "rotate(-7deg)",
            boxShadow: "0 30px 60px -20px rgba(45,27,94,0.25)",
            background: "var(--offwhite)"
          }}
        >
          <div className="px-3 pt-3 pb-2 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--amber)]" />
            <div className="flex flex-col gap-1">
              <div className="h-1.5 w-16 rounded-full bg-[var(--purple)] opacity-70" />
              <div className="h-1 w-10 rounded-full bg-[var(--purple)] opacity-30" />
            </div>
            <div className="ml-auto px-2 py-0.5 rounded-full bg-[var(--purple)] text-[8px] font-semibold tracking-wider text-[var(--amber)]">SOCIAL</div>
          </div>
          <div className="h-[170px] grid grid-cols-2 gap-1 px-1">
            <div className="rounded-md" style={{ background: "linear-gradient(135deg, var(--amber), #E8941A)" }} />
            <div className="rounded-md bg-[var(--purple)]" />
            <div className="rounded-md bg-[var(--purple)] opacity-80" />
            <div className="rounded-md" style={{ background: "linear-gradient(135deg, #F5A623, #FAF3E0)" }} />
          </div>
          <div className="px-3 py-3 flex items-center gap-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--amber)"><path d="M12 21s-7-4.35-9-8.5C1 7 5 4 8 4c2 0 3 1 4 2 1-1 2-2 4-2 3 0 7 3 5 8.5C19 16.65 12 21 12 21z"/></svg>
            <span className="text-[9px] font-semibold text-[var(--purple)]">4.2K · 318</span>
          </div>
        </div>

        {/* MIDDLE LEFT — Brand palette card */}
        <div
          className="absolute left-[5%] top-[52%] w-[180px] rounded-[16px] p-3 animate-[floatCard_7s_ease-in-out_infinite] hidden md:block"
          style={{
            transform: "rotate(4deg)",
            background: "var(--offwhite)",
            boxShadow: "0 30px 60px -20px rgba(45,27,94,0.22)"
          }}
        >
          <div className="px-2 py-0.5 rounded-full bg-[var(--purple)] text-[8px] font-semibold tracking-wider text-[var(--amber)] inline-block mb-3">BRAND</div>
          <div className="font-heading font-bold text-[20px] text-[var(--purple)] leading-none mb-3">AVANT<br/>VENTURES</div>
          <div className="grid grid-cols-4 gap-1 mb-3">
            <div className="aspect-square rounded bg-[var(--purple)]" />
            <div className="aspect-square rounded bg-[var(--amber)]" />
            <div className="aspect-square rounded" style={{ background: "#EFE3BE" }} />
            <div className="aspect-square rounded bg-[var(--cream)] border border-[var(--purple)] opacity-50" />
          </div>
          <div className="h-1 w-full rounded bg-[var(--purple)] opacity-15 mb-1" />
          <div className="h-1 w-2/3 rounded bg-[var(--purple)] opacity-15 mb-2" />
          <div className="text-[8px] font-semibold text-[var(--purple)] opacity-80">Brand Launch · Q2</div>
        </div>

        {/* TOP RIGHT — Brand Story video card */}
        <div
          ref={cardRef}
          className="absolute right-[4%] top-[10%] w-[180px] rounded-[16px] overflow-hidden animate-[floatCard_5s_ease-in-out_infinite] hidden md:block"
          style={{
            transform: "rotate(6deg)",
            background: "var(--offwhite)",
            boxShadow: "0 30px 60px -20px rgba(45,27,94,0.25)"
          }}
        >
          <div className="px-3 pt-3 pb-1 flex items-center justify-between">
            <span className="text-[9px] font-semibold tracking-wider text-[var(--purple)] opacity-70">BRAND STORY</span>
            <div className="flex gap-0.5">
              <div className="w-1 h-1 rounded-full bg-[var(--purple)] opacity-40" />
              <div className="w-1 h-1 rounded-full bg-[var(--purple)] opacity-40" />
              <div className="w-1 h-1 rounded-full bg-[var(--purple)] opacity-40" />
            </div>
          </div>
          <div className="mx-3 h-[110px] rounded-md relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--purple) 0%, #1a0f3d 100%)" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-italic-tagline text-[var(--amber)] text-[24px]">Brand Story</div>
            </div>
            <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-[var(--amber)] flex items-center justify-center">
              <div className="w-0 h-0 border-l-[5px] border-l-[var(--purple)] border-y-[3px] border-y-transparent ml-0.5" />
            </div>
          </div>
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-[var(--purple)]">Reel · 2.1M views</span>
            <div className="w-0 h-0 border-l-[6px] border-l-[var(--amber)] border-y-[4px] border-y-transparent" />
          </div>
        </div>

        {/* RIGHT MIDDLE — Web design preview */}
        <div
          className="absolute right-[3%] top-[55%] w-[200px] rounded-[14px] p-3 animate-[float_8s_ease-in-out_infinite] hidden md:block"
          style={{
            transform: "rotate(-5deg)",
            background: "var(--offwhite)",
            boxShadow: "0 30px 60px -20px rgba(45,27,94,0.22)"
          }}
        >
          <div className="px-2 py-0.5 rounded-full bg-[var(--purple)] text-[8px] font-semibold tracking-wider text-[var(--amber)] inline-block mb-2">WEB</div>
          <div className="rounded-md overflow-hidden border border-[var(--purple)]/15">
            <div className="h-3 bg-[var(--cream)] flex items-center gap-0.5 px-1.5">
              <div className="w-1 h-1 rounded-full bg-[var(--purple)] opacity-40" />
              <div className="w-1 h-1 rounded-full bg-[var(--purple)] opacity-40" />
              <div className="w-1 h-1 rounded-full bg-[var(--purple)] opacity-40" />
            </div>
            <div className="p-2" style={{ background: "linear-gradient(135deg, #FFF8EC, #FAF3E0)" }}>
              <div className="h-2 w-12 rounded bg-[var(--purple)] mb-2" />
              <div className="h-1 w-full rounded bg-[var(--purple)] opacity-20 mb-1" />
              <div className="h-1 w-4/5 rounded bg-[var(--purple)] opacity-20 mb-2" />
              <div className="grid grid-cols-3 gap-1 mb-2">
                <div className="aspect-square rounded bg-[var(--amber)] opacity-90" />
                <div className="aspect-square rounded bg-[var(--purple)] opacity-80" />
                <div className="aspect-square rounded bg-[var(--purple)] opacity-30" />
              </div>
              <div className="h-2 w-10 rounded-full bg-[var(--amber)]" />
            </div>
          </div>
          <div className="text-[8px] font-semibold text-[var(--purple)] mt-2">Web Design · UX Consulting</div>
        </div>

        {/* BOTTOM CENTER LEFT — Event poster */}
        <div
          className="absolute left-[22%] bottom-[6%] w-[150px] rounded-[14px] overflow-hidden animate-[floatCard_6s_ease-in-out_infinite] hidden lg:block"
          style={{
            transform: "rotate(-4deg)",
            background: "var(--offwhite)",
            boxShadow: "0 25px 50px -15px rgba(45,27,94,0.22)"
          }}
        >
          <div className="h-[110px] flex flex-col items-center justify-center text-center px-3" style={{ background: "linear-gradient(160deg, var(--purple), #1a0f3d)" }}>
            <div className="text-[7px] tracking-[0.3em] text-[var(--amber)] mb-1">EVENT · 2026</div>
            <div className="font-heading font-bold text-[18px] leading-none text-[var(--cream)]">UNLEASH<br/>YOUR<br/>POTENTIAL</div>
            <div className="text-[7px] text-[var(--amber)] mt-2 opacity-80">25.07</div>
          </div>
          <div className="px-3 py-2 text-[8px] font-semibold text-[var(--purple)]">Event Coverage</div>
        </div>

        {/* BOTTOM CENTER RIGHT — Wedding tile */}
        <div
          className="absolute right-[24%] bottom-[5%] w-[140px] rounded-[14px] overflow-hidden animate-[float_7s_ease-in-out_infinite] hidden lg:block"
          style={{
            transform: "rotate(5deg)",
            background: "var(--offwhite)",
            boxShadow: "0 25px 50px -15px rgba(45,27,94,0.22)"
          }}
        >
          <div className="h-[100px] relative" style={{ background: "linear-gradient(135deg, var(--amber) 0%, #E8941A 100%)" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-italic-tagline text-[var(--purple)] text-[22px]">forever</div>
            </div>
          </div>
          <div className="px-3 py-2 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-[var(--purple)]">Weddings</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--amber)]" />
          </div>
        </div>

        {/* SMALL — Campaign tag top-center */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[6%] hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full animate-[floatCard_5s_ease-in-out_infinite]"
          style={{
            background: "var(--offwhite)",
            transform: "translateX(-50%) rotate(-2deg)",
            boxShadow: "0 15px 30px -10px rgba(45,27,94,0.2)"
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--amber)]" />
          <span className="text-[9px] font-semibold tracking-[0.18em] text-[var(--purple)]">LIVE · 200+ PROJECTS</span>
        </div>

        {/* Camera lens icon (kept, smaller) */}
        <svg 
          ref={cameraRef}
          className="absolute left-[15%] top-[35%] w-16 h-16 text-[var(--amber)] animate-[spin_28s_linear_infinite] hidden lg:block opacity-50"
          viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5"
        >
          <circle cx="50" cy="50" r="44" />
          <circle cx="50" cy="50" r="28" strokeDasharray="2 3" />
          <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.7" />
        </svg>
      </div>

      {/* Soft white wash to fade cards behind text */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(250,243,224,0.85) 0%, rgba(250,243,224,0.45) 55%, transparent 80%)"
        }}
      />

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
