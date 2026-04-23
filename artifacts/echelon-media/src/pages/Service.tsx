import { useEffect, useRef } from "react";
import { useParams } from "wouter";
import gsap from "gsap";

const SERVICES = {
  "social-media": {
    title: "Social Media Marketing",
    descriptor: "Content that converts. Audiences that grow.",
    heroImg: "20",
    stat: "4.5M+",
    statDesc: "Impressions Generated",
    desc: "We don't just post content. We build communities, shape narratives, and turn casual scrollers into loyal customers.",
    packages: [
      { name: "Starter", price: "₹25,000/mo", features: ["12 Posts / Month", "Basic Community Management", "Monthly Report", "Standard Support"] },
      { name: "Growth", price: "₹45,000/mo", features: ["20 Posts / Month", "Reels & Video Content", "Ad Campaign Setup", "Priority Support", "Bi-weekly Reports", "Influencer Outreach"] },
      { name: "Dominance", price: "₹80,000/mo", features: ["Daily Posting", "Full Production House", "Advanced Ad Management", "24/7 Priority Support", "Weekly Strategy Calls", "Viral Trend Adaptation", "Custom Analytics"] },
    ]
  },
  "events": {
    title: "Event Coverage",
    descriptor: "Every moment. Captured forever.",
    heroImg: "21",
    stat: "150+",
    statDesc: "Events Covered",
    desc: "From corporate summits to intimate gatherings, our lenses capture the energy and scale of your most important days.",
    packages: [
      { name: "Starter", price: "₹35,000", features: ["4 Hours Coverage", "1 Photographer", "100 Edited Photos", "Standard Delivery"] },
      { name: "Growth", price: "₹75,000", features: ["8 Hours Coverage", "2 Photographers", "1 Videographer", "Highlight Reel (2 mins)", "Next-Day Teasers", "Priority Delivery"] },
      { name: "Dominance", price: "₹1,50,000", features: ["Full Day Coverage", "Multi-Cam Setup", "Drone Coverage", "Documentary Edit (15m)", "Raw Footage Included", "Same-Day Edits", "Dedicated Editor"] },
    ]
  },
  "branding": {
    title: "Branding and Ads",
    descriptor: "Identity built to be remembered.",
    heroImg: "22",
    stat: "85+",
    statDesc: "Brands Launched",
    desc: "A brand is a promise. We design identities and campaigns that make your promise unforgettable and impossible to ignore.",
    packages: [
      { name: "Starter", price: "₹40,000", features: ["Logo Design", "Color Palette", "Basic Typography", "Brand Guidelines Mini"] },
      { name: "Growth", price: "₹90,000", features: ["Full Identity System", "Social Media Assets", "Business Card Design", "Ad Creatives (5 sets)", "Comprehensive Guidelines", "Strategy Session"] },
      { name: "Dominance", price: "₹2,00,000", features: ["Complete Rebranding", "Brand Voice & Tone", "Packaging Design", "Full Campaign Strategy", "Video Ad Production", "Market Research", "Rollout Plan"] },
    ]
  },
  "web": {
    title: "Website Development",
    descriptor: "Digital spaces that perform beautifully.",
    heroImg: "23",
    stat: "99%",
    statDesc: "Uptime Guaranteed",
    desc: "Your website is your best salesperson. We build fast, cinematic, high-converting digital experiences.",
    packages: [
      { name: "Starter", price: "₹60,000", features: ["5 Page Website", "Mobile Responsive", "Basic SEO", "Contact Form"] },
      { name: "Growth", price: "₹1,20,000", features: ["Up to 15 Pages", "CMS Integration", "Custom Animations", "Advanced SEO Setup", "E-commerce (Basic)", "Performance Tuning"] },
      { name: "Dominance", price: "₹2,50,000", features: ["Unlimited Pages", "Custom Web App Logic", "Advanced 3D/GSAP", "Full E-commerce Suite", "API Integrations", "A/B Testing Setup", "Dedicated Maintenance"] },
    ]
  },
};

export default function Service() {
  const { id } = useParams();
  const service = SERVICES[id as keyof typeof SERVICES];
  const containerRef = useRef<HTMLDivElement>(null);
  const statRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const packagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!service || !containerRef.current) return;

    // Fade + rise sections
    gsap.utils.toArray('.gsap-section').forEach((sec: any) => {
      gsap.fromTo(sec, 
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: sec, start: "top 80%" } }
      );
    });

    // Gallery images scale reveal
    if (galleryRef.current) {
      gsap.fromTo(galleryRef.current.children,
        { scale: 1.1, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.12, duration: 1, ease: "power2.out", scrollTrigger: { trigger: galleryRef.current, start: "top 80%" } }
      );
    }

    // Packages stagger
    if (packagesRef.current) {
      gsap.fromTo(packagesRef.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: packagesRef.current, start: "top 80%" } }
      );
    }

  }, [service, id]);

  if (!service) return <div className="pt-32 text-center text-[var(--purple)]">Service not found.</div>;

  return (
    <div className="bg-[var(--cream)] min-h-screen" ref={containerRef}>
      {/* Hero Block */}
      <div className="min-h-[60vh] flex flex-col md:flex-row pt-[72px]">
        <div className="md:w-1/2 p-12 lg:p-24 flex flex-col justify-center">
          <div className="font-sans font-medium text-[11px] tracking-[0.2em] text-[var(--amber)] mb-4 uppercase">
            Service
          </div>
          <h1 className="font-heading font-bold text-5xl lg:text-7xl text-[var(--purple)] mb-4">
            {service.title}
          </h1>
          <div className="font-italic-tagline text-[var(--amber)] text-2xl lg:text-3xl mb-12">
            {service.descriptor}
          </div>
          
          <div ref={statRef} className="mt-auto pt-12 border-t border-[rgba(245,166,35,0.3)]">
            <div className="font-heading font-bold text-5xl text-[var(--purple)]">{service.stat}</div>
            <div className="font-sans text-[var(--purple)] opacity-70">{service.statDesc}</div>
          </div>
        </div>
        <div className="md:w-1/2 min-h-[400px]">
          <img 
            src={`https://picsum.photos/1400/700?random=${service.heroImg}`} 
            className="w-full h-full object-cover rounded-bl-[40px] shadow-2xl"
            alt={service.title}
          />
        </div>
      </div>

      {/* Description & Gallery */}
      <div className="max-w-7xl mx-auto px-6 py-24 gsap-section">
        <p className="font-sans text-xl md:text-2xl text-[var(--purple)] text-center max-w-4xl mx-auto mb-20 leading-relaxed">
          {service.desc}
        </p>

        <div ref={galleryRef} className="columns-2 md:columns-3 gap-6 space-y-6">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="break-inside-avoid rounded-[12px] overflow-hidden hover:scale-[1.03] hover:shadow-[0_20px_60px_rgba(45,27,94,0.1)] transition-all duration-300">
              <img src={`https://picsum.photos/600/${Math.floor(Math.random() * 400 + 400)}?random=${service.heroImg}${i}`} className="w-full h-auto object-cover" alt="Gallery" />
            </div>
          ))}
        </div>
      </div>

      {/* Packages */}
      <div className="max-w-7xl mx-auto px-6 pb-32">
        <h2 className="font-heading font-bold text-5xl text-[var(--purple)] text-center mb-16 gsap-section">
          Choose Your Plan
        </h2>
        
        <div ref={packagesRef} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* Starter */}
          <div className="bg-[var(--offwhite)] border-[1.5px] border-[rgba(245,166,35,0.3)] rounded-[20px] p-8 flex flex-col h-full">
            <h3 className="font-heading font-semibold text-2xl text-[var(--purple)] mb-6">{service.packages[0].name}</h3>
            <ul className="space-y-4 mb-10 flex-1">
              {service.packages[0].features.map((f, i) => (
                <li key={i} className="font-sans text-[14px] text-[var(--purple)] flex gap-3">
                  <span className="text-[var(--amber)]">→</span> {f}
                </li>
              ))}
            </ul>
            <div className="font-heading font-semibold text-xl text-[var(--amber)] mb-6">{service.packages[0].price}</div>
            <button className="w-full border-2 border-[var(--purple)] text-[var(--purple)] font-sans font-bold rounded-full py-4 hover:bg-[var(--purple)] hover:text-[var(--amber)] transition-colors">
              Select {service.packages[0].name}
            </button>
          </div>

          {/* Growth */}
          <div className="bg-[var(--offwhite)] border-2 border-[var(--amber)] rounded-[20px] p-8 flex flex-col h-full relative z-10 transform lg:scale-105 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--amber)] text-[var(--purple)] font-sans font-bold text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-full">
              Most Popular
            </div>
            <h3 className="font-heading font-semibold text-3xl text-[var(--purple)] mb-6 mt-4">{service.packages[1].name}</h3>
            <ul className="space-y-4 mb-10 flex-1">
              {service.packages[1].features.map((f, i) => (
                <li key={i} className="font-sans text-[14px] text-[var(--purple)] flex gap-3 font-medium">
                  <span className="text-[var(--amber)]">→</span> {f}
                </li>
              ))}
            </ul>
            <div className="font-heading font-semibold text-2xl text-[var(--amber)] mb-6">{service.packages[1].price}</div>
            <button className="w-full bg-gradient-to-r from-[var(--amber)] to-[#E8941A] text-[var(--purple)] font-sans font-bold rounded-full py-4 hover:shadow-[0_8px_20px_rgba(245,166,35,0.3)] transition-shadow">
              Select {service.packages[1].name}
            </button>
          </div>

          {/* Dominance */}
          <div className="bg-[var(--purple)] rounded-[20px] p-8 flex flex-col h-full relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--amber)] text-[var(--purple)] font-sans font-bold text-[11px] uppercase tracking-wider px-4 py-1.5 rounded-full">
              Full Power
            </div>
            <h3 className="font-heading font-semibold text-2xl text-[var(--cream)] mb-6 mt-4">{service.packages[2].name}</h3>
            <ul className="space-y-4 mb-10 flex-1">
              {service.packages[2].features.map((f, i) => (
                <li key={i} className="font-sans text-[14px] text-[var(--cream)] flex gap-3">
                  <span className="text-[var(--amber)]">→</span> {f}
                </li>
              ))}
            </ul>
            <div className="font-heading font-semibold text-xl text-[var(--amber)] mb-6">{service.packages[2].price}</div>
            <button className="w-full bg-[var(--amber)] text-[var(--purple)] font-sans font-bold rounded-full py-4 hover:bg-[var(--cream)] transition-colors">
              Select {service.packages[2].name}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
