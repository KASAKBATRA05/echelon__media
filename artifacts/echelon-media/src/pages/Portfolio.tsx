import { useState, useEffect } from "react";
import gsap from "gsap";

const ALL_PROJECTS = [
  { id: 1, name: "Midnight Launch", category: "Event Coverage", img: "11" },
  { id: 2, name: "Aura Rebrand", category: "Branding", img: "12" },
  { id: 3, name: "Urban Threads", category: "Social Media", img: "13" },
  { id: 4, name: "Echo Platform", category: "Web", img: "14" },
  { id: 5, name: "Summer Vows", category: "Weddings", img: "15" },
  { id: 6, name: "Tech Summit '24", category: "Event Coverage", img: "16" },
  { id: 7, name: "Lumina Skincare", category: "Branding", img: "17" },
  { id: 8, name: "Peak Fitness App", category: "Web", img: "18" },
  { id: 9, name: "Golden Hour", category: "Weddings", img: "19" },
];

const TABS = ["All", "Social Media", "Event Coverage", "Branding", "Web", "Weddings"];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof ALL_PROJECTS[0] | null>(null);

  const filteredProjects = activeTab === "All" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === activeTab);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLightbox = (p: typeof ALL_PROJECTS[0]) => {
    setSelectedProject(p);
  };

  const closeLightbox = () => {
    setSelectedProject(null);
  };

  useEffect(() => {
    if (selectedProject) {
      gsap.fromTo(".lightbox-content", 
        { scale: 0.95, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [selectedProject]);

  return (
    <div className="pt-32 pb-24 px-6 bg-[var(--cream)] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="font-sans font-medium text-[11px] tracking-[0.2em] text-[var(--amber)] mb-4 uppercase">
          Our Work
        </div>
        <h1 className="font-heading font-bold text-6xl md:text-8xl text-[var(--purple)] mb-12">
          All Projects
        </h1>

        <div className="flex flex-wrap gap-3 mb-12">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-sans font-semibold text-sm transition-all duration-300 ${
                activeTab === tab 
                  ? 'bg-[var(--purple)] text-[var(--amber)] border-[1.5px] border-[var(--purple)]' 
                  : 'bg-transparent text-[var(--purple)] border-[1.5px] border-[var(--purple)] hover:border-[var(--amber)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((proj) => (
            <div 
              key={proj.id} 
              onClick={() => openLightbox(proj)}
              className="group relative rounded-[16px] overflow-hidden aspect-[4/3] bg-[var(--offwhite)] cursor-pointer animate-[fadeIn_0.3s_ease]"
            >
              <img 
                src={`https://picsum.photos/800/600?random=${proj.img}`} 
                alt={proj.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[rgba(45,27,94,0.75)] transition-all duration-350 ease-out flex flex-col justify-end p-6"
                   style={{ clipPath: "inset(100% 0 0 0)" }}
                   ref={(el) => {
                     if (el) {
                        el.parentElement?.addEventListener('mouseenter', () => el.style.clipPath = 'inset(0 0 0 0)');
                        el.parentElement?.addEventListener('mouseleave', () => el.style.clipPath = 'inset(100% 0 0 0)');
                     }
                   }}>
                <div className="font-sans text-[10px] font-bold tracking-wider uppercase text-[var(--amber)] bg-[rgba(245,166,35,0.15)] px-3 py-1 rounded-full w-fit mb-2">
                  {proj.category}
                </div>
                <h3 className="font-heading font-semibold text-2xl text-[var(--cream)] transform translate-y-4 opacity-0 transition-all duration-300 delay-100 group-hover:translate-y-0 group-hover:opacity-100">
                  {proj.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedProject && (
        <div className="fixed inset-0 z-[900] bg-[rgba(250,243,224,0.97)] backdrop-blur-[30px] flex items-center justify-center p-6 overflow-y-auto">
          <button onClick={closeLightbox} className="fixed top-24 right-6 w-10 h-10 rounded-full bg-[rgba(245,166,35,0.15)] flex items-center justify-center text-[var(--amber)] hover:bg-[var(--amber)] hover:text-[var(--purple)] transition-colors z-[910]">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          
          <div className="lightbox-content max-w-5xl w-full mt-20 pb-20">
            <div className="font-sans text-[12px] font-bold tracking-wider uppercase text-[var(--amber)] bg-[rgba(245,166,35,0.15)] px-4 py-1.5 rounded-full w-fit mb-4">
              {selectedProject.category}
            </div>
            <h2 className="font-heading font-bold text-5xl md:text-7xl text-[var(--purple)] mb-8">
              {selectedProject.name}
            </h2>
            
            <img 
              src={`https://picsum.photos/1200/800?random=${selectedProject.img}`} 
              alt={selectedProject.name} 
              className="w-full aspect-video object-cover rounded-[16px] mb-6 shadow-2xl"
            />
            
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[1, 2, 3].map(i => (
                <img key={i} src={`https://picsum.photos/400/300?random=${selectedProject.img}${i}`} className="w-full aspect-video object-cover rounded-[12px]" alt="gallery" />
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-[rgba(245,166,35,0.2)] pt-8">
              <div>
                <div className="font-sans font-bold text-[var(--purple)] text-lg">Client Name Inc.</div>
                <div className="font-sans text-[var(--purple)] opacity-70">240% increase in engagement.</div>
              </div>
              <div className="flex gap-4">
                <button className="font-sans font-semibold text-[var(--amber)] hover:text-[var(--purple)] transition-colors">← Previous</button>
                <button className="font-sans font-semibold text-[var(--amber)] hover:text-[var(--purple)] transition-colors">Next Project →</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
