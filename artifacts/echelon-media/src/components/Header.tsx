import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import gsap from "gsap";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { id: "social-media", name: "Social Media Marketing", desc: "Content that converts. Audiences that grow." },
    { id: "events", name: "Event Coverage", desc: "Every moment. Captured forever." },
    { id: "branding", name: "Branding and Ads", desc: "Identity built to be remembered." },
    { id: "web", name: "Website Development", desc: "Digital spaces that perform beautifully." },
    { id: "weddings", name: "Wedding Diaries", desc: "Stories that outlast every trend." }
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 ${scrolled ? 'border-b border-[rgba(245,166,35,0.35)]' : 'border-b border-transparent'} bg-[rgba(250,243,224,0.82)] backdrop-blur-[24px]`}>
      <div className="max-w-7xl mx-auto px-6 h-[60px] md:h-[72px] flex items-center justify-between">
        <Link href="/" className="font-heading font-bold text-2xl text-[var(--purple)] flex items-center gap-2">
          ECHELON MEDIA
        </Link>

        <nav className="hidden md:flex items-center gap-8 relative">
          <div className="relative group cursor-pointer" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <div className="flex items-center gap-1 font-sans font-medium text-[var(--purple)] hover:text-[var(--amber)] transition-colors py-6">
              Services
              <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
            
            {/* Dropdown */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-[rgba(250,243,224,0.98)] backdrop-blur-[30px] border-b-2 border-[var(--amber)] shadow-xl overflow-hidden transition-all duration-350 ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              ref={dropdownRef}
            >
              <div className="flex flex-col">
                {services.map((service) => (
                  <Link key={service.id} href={`/services/${service.id}`} onClick={() => setIsOpen(false)}>
                    <div className="group/row flex items-center justify-between px-8 h-[72px] border-b border-[rgba(245,166,35,0.15)] hover:bg-[rgba(245,166,35,0.08)] border-l-[3px] border-l-transparent hover:border-l-[var(--amber)] transition-all cursor-pointer">
                      <span className="font-heading font-semibold text-[22px] text-[var(--purple)] group-hover/row:translate-x-[6px] transition-transform">{service.name}</span>
                      <span className="font-sans text-[13px] text-[var(--amber)]">{service.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <Link href="/portfolio">
            <span className={`font-sans font-medium text-[var(--purple)] hover:text-[var(--amber)] transition-colors cursor-pointer relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[var(--amber)] after:transition-all hover:after:w-full ${location === '/portfolio' ? 'after:w-full' : ''}`}>Portfolio</span>
          </Link>
          <a href="#careers" onClick={(e) => { e.preventDefault(); if (location !== '/') setLocation('/'); setTimeout(() => document.getElementById('careers')?.scrollIntoView({behavior:'smooth'}), 100); }} className="font-sans font-medium text-[var(--purple)] hover:text-[var(--amber)] transition-colors cursor-pointer">Careers</a>
          <a href="#contact" className="font-sans font-medium text-[var(--purple)] hover:text-[var(--amber)] transition-colors cursor-pointer">Contact</a>
        </nav>

        <div className="hidden md:block">
          <button className="bg-gradient-to-r from-[var(--amber)] to-[#E8941A] text-[var(--purple)] font-sans font-semibold rounded-full px-7 py-2.5 hover:scale-105 transition-transform">
            Let's Talk
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-[var(--purple)]" onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`md:hidden fixed inset-0 top-[60px] bg-[var(--cream)] z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col p-6">
          <div className="text-[var(--purple)] font-heading font-bold text-xl mb-4">Services</div>
          {services.map(s => (
            <Link key={s.id} href={`/services/${s.id}`} onClick={() => setIsOpen(false)} className="py-4 border-b border-[rgba(245,166,35,0.2)] text-[var(--purple)] font-sans">{s.name}</Link>
          ))}
          <Link href="/portfolio" onClick={() => setIsOpen(false)} className="py-4 border-b border-[rgba(245,166,35,0.2)] text-[var(--purple)] font-sans font-bold text-xl mt-4">Portfolio</Link>
        </div>
      </div>
    </header>
  );
}
