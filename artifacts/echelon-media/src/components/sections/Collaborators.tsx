import { useEffect, useRef } from "react";
import gsap from "gsap";

import logo1 from "@assets/collabs/all_logos-removebg-preview.png";
import logo2 from "@assets/collabs/all_logos__1_-removebg-preview.png";
import logo3 from "@assets/collabs/all_logos__2_-removebg-preview.png";
import logo4 from "@assets/collabs/all_logos__3_-removebg-preview.png";
import logo5 from "@assets/collabs/all_logos__4_-removebg-preview.png";
import logo6 from "@assets/collabs/all_logos__5_-removebg-preview.png";
import logo7 from "@assets/collabs/all_logos__6_-removebg-preview.png";
import logo8 from "@assets/collabs/all_logos__7_-removebg-preview.png";
import logoSabherwal from "@assets/collabs/dr._sabherwal_dental.jpg-removebg-preview.png";
import logoJitoLadies from "@assets/collabs/jito_ladies_north_delhi.jpg-removebg-preview.png";
import logoJitoYouth from "@assets/collabs/jito_north_youth.jpg-removebg-preview.png";
import logoJitoZone from "@assets/collabs/jito_north_zone.jpg-removebg-preview.png";
import logoMmk from "@assets/collabs/MMk_logo-removebg-preview.png";
import logoPentagons from "@assets/collabs/pentagons_ai.jpg-removebg-preview.png";
import logoShopGem from "@assets/collabs/Shop_e_gem_logo_insta-removebg-preview.png";
import logoUntitled from "@assets/collabs/Untitled design (1).png";

const LOGOS = [
  logo1, logo2, logo3, logo4,
  logo5, logo6, logo7, logo8,
  logoSabherwal, logoJitoLadies, logoJitoYouth, logoJitoZone,
  logoMmk, logoPentagons, logoShopGem, logoUntitled,
];

function scrambleText(element: HTMLElement, finalTxt: string) {
  const chars = '!<>-_\\\\/[]{}—=+*^?#________';
  let frame = 0;
  const maxFrames = 20;

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
          opacity: 1, y: 0, stagger: 0.06, duration: 0.7, ease: "power3.out",
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

        <div ref={brandsRef} className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 md:gap-4">
          {LOGOS.map((src, i) => (
            <div
              key={i}
              className="bg-[var(--offwhite)] border border-[rgba(245,166,35,0.2)] rounded-[12px] p-1.5 flex items-center justify-center hover:-translate-y-[4px] hover:shadow-[0_10px_28px_rgba(245,166,35,0.18)] hover:border-[var(--amber)] transition-all duration-300 aspect-square overflow-hidden"
            >
              <img
                src={src}
                alt={`Collaborator ${i + 1}`}
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
