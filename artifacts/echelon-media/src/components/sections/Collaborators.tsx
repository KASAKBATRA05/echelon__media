import { useEffect, useRef } from "react";
import gsap from "gsap";

const BRANDS = [
  "Skyrise Infra", "Court Culture", "United", "Taal", "Origen Systems", "Kokam", "Nexus", "Aura"
];

function scrambleText(element: HTMLElement, finalTxt: string) {
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  let frame = 0;
  const maxFrames = 20; // 30ms * 20 = 600ms
  
  const interval = setInterval(() => {
    let output = '';
    for (let i = 0; i < finalTxt.length; i++) {
      if (frame >= maxFrames || Math.random() < frame / maxFrames) {
        output += finalTxt[i];
      } else {
        output += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    element.innerText = output;
    frame++;
    if (frame > maxFrames) clearInterval(interval);
  }, 30);
}

export default function Collaborators() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const brandsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(containerRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          onEnter: () => {
            if (headingRef.current) {
              const el = headingRef.current.querySelector('.scramble-target') as HTMLElement;
              if (el) scrambleText(el, "Our Collaborators");
            }
          }
        }
      }
    );

    if (brandsRef.current) {
      const cards = brandsRef.current.children;
      gsap.fromTo(cards, 
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, stagger: 0.08, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: brandsRef.current,
            start: "top 85%"
          }
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-32 px-6 bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="font-sans font-medium text-[11px] tracking-[0.2em] text-[var(--amber)] mb-6">
            — BRANDS WE'VE WORKED WITH —
          </div>
          <h2 ref={headingRef} className="font-heading font-bold text-[clamp(40px,6vw,80px)] text-[var(--purple)] flex flex-wrap justify-center gap-x-4">
            <span className="scramble-target">Our Collaborators</span>
          </h2>
        </div>

        <div ref={brandsRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {BRANDS.map((brand, i) => (
            <div 
              key={i}
              className="bg-[var(--offwhite)] border border-[rgba(245,166,35,0.2)] rounded-[16px] p-6 md:p-8 flex items-center justify-center hover:-translate-y-[6px] hover:shadow-[0_16px_40px_rgba(245,166,35,0.2)] hover:border-[var(--amber)] transition-all duration-300 min-h-[120px]"
            >
              <span className="font-heading font-semibold text-xl text-[var(--purple)] text-center">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
