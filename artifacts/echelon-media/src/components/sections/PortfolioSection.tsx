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
];

function ProjectModal({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    gsap.fromTo(
      ".home-lightbox-content",
      { scale: 0.96, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
    );
  }, [project.id]);

  return (
    <div className="fixed inset-0 z-[900] bg-[rgba(250,243,224,0.97)] backdrop-blur-[30px] overflow-y-auto">
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed top-24 right-6 w-10 h-10 rounded-full bg-[rgba(245,166,35,0.15)] flex items-center justify-center text-[var(--amber)] hover:bg-[var(--amber)] hover:text-[var(--purple)] transition-colors z-[910]"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="home-lightbox-content max-w-5xl w-full mx-auto mt-24 px-6 pb-20">
        <div className="font-sans text-[12px] font-bold tracking-wider uppercase text-[var(--amber)] bg-[rgba(245,166,35,0.15)] px-4 py-1.5 rounded-full w-fit mb-4">
          {project.category}
        </div>
        <h2 className="font-heading font-bold text-5xl md:text-7xl text-[var(--purple)] mb-4">
          {project.name}
        </h2>
        <p className="font-italic-tagline text-[var(--amber)] text-2xl md:text-3xl mb-8">
          {project.blurb}
        </p>

        <img
          src={project.cover}
          alt={project.name}
          className="w-full aspect-video object-cover rounded-[16px] mb-8 shadow-2xl"
        />

        <p className="font-sans text-[16px] text-[var(--purple)] opacity-85 leading-relaxed mb-8 max-w-3xl">
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

        <div className="grid grid-cols-3 gap-4 mb-10">
          {project.gallery.map((src, i) => (
            <img
              key={i}
              src={src}
              className="w-full aspect-video object-cover rounded-[12px]"
              alt={`${project.name} gallery ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[rgba(245,166,35,0.2)] pt-8">
          <div>
            <div className="font-sans font-bold text-[var(--purple)] text-lg">Echelon Media</div>
            <div className="font-sans text-[var(--purple)] opacity-70">{project.blurb}</div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={onPrev}
              className="font-sans font-semibold text-[var(--amber)] hover:text-[var(--purple)] transition-colors"
            >
              ← Previous
            </button>
            <button
              onClick={onNext}
              className="font-sans font-semibold text-[var(--amber)] hover:text-[var(--purple)] transition-colors"
            >
              Next Project →
            </button>
          </div>
        </div>
      </div>
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

      {active && (
        <ProjectModal
          project={active}
          onClose={() => setActive(null)}
          onPrev={() => {
            const idx = PROJECTS.findIndex((p) => p.id === active.id);
            setActive(PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length]);
          }}
          onNext={() => {
            const idx = PROJECTS.findIndex((p) => p.id === active.id);
            setActive(PROJECTS[(idx + 1) % PROJECTS.length]);
          }}
        />
      )}
    </section>
  );
}
