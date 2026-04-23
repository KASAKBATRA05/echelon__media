import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Link } from "wouter";
import shot1 from "@assets/Screenshot 2026-04-23 121810.png";
import shot2 from "@assets/Screenshot 2026-04-23 121858.png";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: number;
  name: string;
  category: string;
  cover: string;
  blurb: string;
  description: string;
  highlights: string[];
  gallery: string[];
};

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Midnight Launch",
    category: "Event Coverage",
    cover: shot1,
    blurb: "A 1,200-guest brand reveal captured end-to-end.",
    description:
      "Full-spectrum coverage of a flagship product reveal — from stage rehearsals to the live audience reactions. Two camera teams, gimbal-led broadcast cuts, and same-night social edits delivered before guests left the venue.",
    highlights: [
      "Two-camera live coverage with Ronin gimbals",
      "Same-night reels delivered for socials",
      "Full event film + 60-second teaser",
    ],
    gallery: [shot1, shot2, shot1],
  },
  {
    id: 2,
    name: "Aura Rebrand",
    category: "Branding",
    cover: shot2,
    blurb: "Identity system rebuilt from the ground up.",
    description:
      "A complete visual reset for a lifestyle brand entering its next chapter — logo, type system, colour story, packaging direction and a campaign film that introduced the new identity to the world.",
    highlights: [
      "Logo + responsive identity system",
      "Editorial type pairing and tone of voice",
      "Launch campaign film and key art",
    ],
    gallery: [shot2, shot1, shot2],
  },
  {
    id: 3,
    name: "Urban Threads",
    category: "Social Media",
    cover: shot1,
    blurb: "12 weeks. +180% engagement. One vibe.",
    description:
      "A streetwear label needed a feed that felt like the city it came from. We built a 90-day content engine — shoots, reels, captions, community replies — and rode the algorithm into a triple-digit lift.",
    highlights: [
      "Weekly shoot days with 4-week content calendar",
      "Reels-first format with platform-native edits",
      "Community management and DM flows",
    ],
    gallery: [shot1, shot2, shot1],
  },
  {
    id: 4,
    name: "Echo Platform",
    category: "Web Development",
    cover: shot2,
    blurb: "A booking platform that loads in under a second.",
    description:
      "Designed and shipped a marketing site plus customer portal for a service marketplace. Headless CMS, edge caching, and a design system that the in-house team can extend without touching a line of code.",
    highlights: [
      "Marketing site + authenticated portal",
      "Sub-second load times on 3G",
      "Component library handed off to the team",
    ],
    gallery: [shot2, shot1, shot2],
  },
  {
    id: 5,
    name: "Summer Vows",
    category: "Weddings",
    cover: shot1,
    blurb: "A three-day wedding film, told like cinema.",
    description:
      "From mehendi to vidaai — a multi-day wedding documented with two cinematographers, a drone, and a quiet observer's eye. The hero film runs eight minutes; the highlight reel under one.",
    highlights: [
      "3-day, 6-event coverage",
      "Cinematic hero film + 60s highlight reel",
      "200+ retouched stills delivered in two weeks",
    ],
    gallery: [shot1, shot2, shot1],
  },
];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[2000] bg-[rgba(45,27,94,0.85)] backdrop-blur-md flex items-center justify-center p-4 md:p-10 animate-[fadeIn_0.25s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--cream)] rounded-[24px] max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[var(--purple)] text-[var(--amber)] flex items-center justify-center hover:bg-[var(--amber)] hover:text-[var(--purple)] transition-colors text-xl"
        >
          ×
        </button>

        <div className="aspect-video w-full overflow-hidden rounded-t-[24px]">
          <img src={project.cover} alt={project.name} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 md:p-10">
          <div className="font-sans text-[11px] tracking-[0.2em] text-[var(--amber)] uppercase mb-3">
            {project.category}
          </div>
          <h3 className="font-heading font-bold text-4xl md:text-5xl text-[var(--purple)] mb-3">
            {project.name}
          </h3>
          <p className="font-italic-tagline text-[var(--amber)] text-xl md:text-2xl mb-6">
            {project.blurb}
          </p>
          <p className="font-sans text-[15px] text-[var(--purple)] opacity-80 leading-relaxed mb-8 max-w-3xl">
            {project.description}
          </p>

          <div className="mb-10">
            <div className="font-sans text-[11px] tracking-[0.2em] text-[var(--amber)] uppercase mb-4">
              What we delivered
            </div>
            <ul className="space-y-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3 font-sans text-[15px] text-[var(--purple)]">
                  <span className="text-[var(--amber)] mt-1">→</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.gallery.map((src, i) => (
              <div key={i} className="rounded-[14px] overflow-hidden aspect-[4/5] bg-[var(--offwhite)]">
                <img src={src} alt={`${project.name} ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
      `}</style>
    </div>
  );
}

export default function PortfolioSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    if (!containerRef.current || !leftPanelRef.current || !cardsRef.current) return;

    const pin = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top+=120",
      end: "bottom bottom",
      pin: leftPanelRef.current,
      pinSpacing: false,
    });

    const cards = cardsRef.current.children;
    const tweens = Array.from(cards).map((card) =>
      gsap.fromTo(
        card,
        { x: 60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%" },
        },
      ),
    );

    return () => {
      pin.kill();
      tweens.forEach((t) => t.scrollTrigger?.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="work" className="py-24 bg-[var(--cream)] px-6 relative">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Left Sticky Panel */}
        <div className="lg:w-[35%]">
          <div ref={leftPanelRef} className="lg:sticky lg:top-[120px]">
            <div className="font-sans font-medium text-[11px] tracking-[0.2em] text-[var(--amber)] mb-4 uppercase">
              Our Work
            </div>
            <h2 className="font-heading font-bold text-5xl md:text-6xl text-[var(--purple)] mb-6 leading-tight">
              Stories we've{" "}
              <span className="font-italic-tagline text-[var(--amber)]">brought to life.</span>
            </h2>
            <p className="font-sans text-[16px] text-[var(--purple)] opacity-70 mb-8 max-w-sm">
              Tap any project to step inside — see what we made, how we made it, and the moments worth keeping.
            </p>
            <div className="w-[60px] h-[2px] bg-[var(--amber)] mb-12"></div>
          </div>
        </div>

        {/* Right Scrolling Grid */}
        <div className="lg:w-[65%] flex flex-col">
          <div ref={cardsRef} className="flex flex-col gap-6">
            {PROJECTS.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setActive(proj)}
                className="block group relative rounded-[20px] overflow-hidden aspect-video bg-[var(--offwhite)] cursor-pointer text-left"
              >
                <img
                  src={proj.cover}
                  alt={proj.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-[rgba(45,27,94,0.8)] transition-all duration-350 ease-out flex flex-col justify-end p-8"
                  style={{ clipPath: "inset(100% 0 0 0)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.clipPath = "inset(0 0 0 0)")}
                  onMouseLeave={(e) => (e.currentTarget.style.clipPath = "inset(100% 0 0 0)")}
                >
                  <div className="font-sans text-[11px] font-bold tracking-wider uppercase text-[var(--amber)] bg-[rgba(245,166,35,0.15)] px-3 py-1 rounded-full w-fit mb-3">
                    {proj.category}
                  </div>
                  <h3 className="font-heading font-semibold text-3xl text-[var(--cream)] mb-2">
                    {proj.name}
                  </h3>
                  <p className="font-sans text-[13px] text-[var(--cream)] opacity-80">
                    Tap to view case →
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-12 flex justify-center lg:justify-start">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 bg-[var(--purple)] text-[var(--amber)] font-sans font-semibold rounded-full px-8 py-3 hover:bg-[var(--amber)] hover:text-[var(--purple)] transition-colors"
            >
              Explore More <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
