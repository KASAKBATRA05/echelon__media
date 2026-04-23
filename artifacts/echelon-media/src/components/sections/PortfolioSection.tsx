import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "wouter";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  { id: 1, name: "Midnight Launch", category: "Event Coverage" },
  { id: 2, name: "Aura Rebrand", category: "Branding" },
  { id: 3, name: "Urban Threads", category: "Social Media" },
  { id: 4, name: "Echo Platform", category: "Web Development" },
  { id: 5, name: "Summer Vows", category: "Weddings" },
];

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !leftPanelRef.current || !cardsRef.current) return;

    // Pin left panel
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top+=120",
      end: "bottom bottom",
      pin: leftPanelRef.current,
      pinSpacing: false
    });

    // Card slide in
    const cards = cardsRef.current.children;
    Array.from(cards).forEach((card) => {
      gsap.fromTo(card,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-[var(--cream)] px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Sticky Panel */}
        <div className="lg:w-[35%]">
          <div ref={leftPanelRef} className="lg:sticky lg:top-[120px]">
            <div className="font-sans font-medium text-[11px] tracking-[0.2em] text-[var(--amber)] mb-4 uppercase">
              Our Work
            </div>
            <h2 className="font-heading font-bold text-5xl md:text-6xl text-[var(--purple)] mb-6 leading-tight">
              Work that speaks for itself.
            </h2>
            <p className="font-sans text-[16px] text-[var(--purple)] opacity-70 mb-8 max-w-sm">
              A selection of projects across social media, events, branding, and more.
            </p>
            <div className="w-[60px] h-[2px] bg-[var(--amber)] mb-12"></div>
            <Link href="/portfolio" className="hidden lg:inline-flex border-2 border-[var(--purple)] text-[var(--purple)] font-sans font-semibold rounded-full px-8 py-3 hover:bg-[var(--amber)] hover:border-[var(--amber)] transition-colors">
              Explore All Projects →
            </Link>
          </div>
        </div>

        {/* Right Scrolling Grid */}
        <div ref={cardsRef} className="lg:w-[65%] flex flex-col gap-6">
          {PROJECTS.map((proj, i) => (
            <Link key={proj.id} href="/portfolio" className="block group relative rounded-[20px] overflow-hidden aspect-video bg-[var(--offwhite)] cursor-pointer">
              <img 
                src={`https://picsum.photos/1000/600?random=${proj.id + 10}`} 
                alt={proj.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[rgba(45,27,94,0.75)] transition-all duration-350 ease-out clip-path-inset-100 group-hover:clip-path-inset-0 flex flex-col justify-end p-8"
                   style={{ clipPath: "inset(100% 0 0 0)" }}>
                <div className="font-sans text-[11px] font-bold tracking-wider uppercase text-[var(--amber)] bg-[rgba(245,166,35,0.15)] px-3 py-1 rounded-full w-fit mb-3">
                  {proj.category}
                </div>
                <h3 className="font-heading font-semibold text-3xl text-[var(--cream)] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                  {proj.name}
                </h3>
              </div>
              <style>{`
                .group:hover .clip-path-inset-100 { clip-path: inset(0 0 0 0) !important; }
              `}</style>
            </Link>
          ))}

          <Link href="/portfolio" className="lg:hidden mt-8 border-2 border-[var(--purple)] text-[var(--purple)] font-sans font-semibold rounded-full px-8 py-3 text-center hover:bg-[var(--amber)] hover:border-[var(--amber)] transition-colors">
            Explore All Projects →
          </Link>
        </div>

      </div>
    </section>
  );
}
