import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Careers() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(headingRef.current,
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      }
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={containerRef} className="relative py-32 px-6 bg-[var(--purple)] overflow-hidden" id="careers">
      <div className="absolute inset-0 bg-dots animate-drift opacity-50 pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
        <div className="font-sans font-medium text-[11px] tracking-[0.25em] text-[var(--amber)] mb-6">
          FUTURE OPPORTUNITIES
        </div>
        
        <h2 ref={headingRef} className="font-heading font-bold text-[clamp(48px,7vw,96px)] text-[var(--cream)] mb-4 text-center">
          Join the Team.
        </h2>
        
        <p className="font-italic-tagline text-2xl text-[var(--amber)] mb-16 text-center">
          We're always looking for sharp minds.
        </p>

        {submitted ? (
          <div className="text-center animate-[fadeIn_0.5s_ease_both]">
            <svg className="w-16 h-16 mx-auto text-[var(--amber)] mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" className="animate-[dash_1s_ease-out_forwards]" style={{strokeDasharray: 50, strokeDashoffset: 50}} />
            </svg>
            <div className="font-italic-tagline text-3xl text-[var(--amber)]">
              Application received. We'll be in touch.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(245,166,35,0.25)] rounded-[24px] p-8 md:p-12 backdrop-blur-[10px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col group">
                <label className="font-sans font-medium text-[12px] tracking-[0.08em] text-[var(--cream)] mb-1.5 transition-colors group-focus-within:text-[var(--amber)]">Full Name</label>
                <input required type="text" className="bg-[rgba(250,243,224,0.08)] border-b-[1.5px] border-[rgba(245,166,35,0.3)] text-[var(--cream)] font-sans px-4 py-3 outline-none focus:border-[var(--amber)] focus:shadow-[0_2px_0_var(--amber)] transition-all" />
              </div>
              <div className="flex flex-col group">
                <label className="font-sans font-medium text-[12px] tracking-[0.08em] text-[var(--cream)] mb-1.5 transition-colors group-focus-within:text-[var(--amber)]">Email Address</label>
                <input required type="email" className="bg-[rgba(250,243,224,0.08)] border-b-[1.5px] border-[rgba(245,166,35,0.3)] text-[var(--cream)] font-sans px-4 py-3 outline-none focus:border-[var(--amber)] focus:shadow-[0_2px_0_var(--amber)] transition-all" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col group">
                <label className="font-sans font-medium text-[12px] tracking-[0.08em] text-[var(--cream)] mb-1.5 transition-colors group-focus-within:text-[var(--amber)]">Phone Number</label>
                <input required type="tel" className="bg-[rgba(250,243,224,0.08)] border-b-[1.5px] border-[rgba(245,166,35,0.3)] text-[var(--cream)] font-sans px-4 py-3 outline-none focus:border-[var(--amber)] focus:shadow-[0_2px_0_var(--amber)] transition-all" />
              </div>
              <div className="flex flex-col group">
                <label className="font-sans font-medium text-[12px] tracking-[0.08em] text-[var(--cream)] mb-1.5 transition-colors group-focus-within:text-[var(--amber)]">Role Interested In</label>
                <select required className="bg-[rgba(250,243,224,0.08)] border-b-[1.5px] border-[rgba(245,166,35,0.3)] text-[var(--cream)] font-sans px-4 py-3 outline-none focus:border-[var(--amber)] focus:shadow-[0_2px_0_var(--amber)] transition-all appearance-none cursor-pointer">
                  <option value="" disabled selected className="text-[var(--purple)]">Select a role...</option>
                  <option value="Content Creator" className="text-[var(--purple)]">Content Creator</option>
                  <option value="Video Editor" className="text-[var(--purple)]">Video Editor</option>
                  <option value="Social Media Manager" className="text-[var(--purple)]">Social Media Manager</option>
                  <option value="Photographer" className="text-[var(--purple)]">Photographer</option>
                  <option value="Other" className="text-[var(--purple)]">Other</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col group mb-6">
              <label className="font-sans font-medium text-[12px] tracking-[0.08em] text-[var(--cream)] mb-1.5 transition-colors group-focus-within:text-[var(--amber)]">Portfolio Link / Instagram Handle</label>
              <input required type="text" className="bg-[rgba(250,243,224,0.08)] border-b-[1.5px] border-[rgba(245,166,35,0.3)] text-[var(--cream)] font-sans px-4 py-3 outline-none focus:border-[var(--amber)] focus:shadow-[0_2px_0_var(--amber)] transition-all" />
            </div>

            <div className="flex flex-col group mb-8">
              <label className="font-sans font-medium text-[12px] tracking-[0.08em] text-[var(--cream)] mb-1.5 transition-colors group-focus-within:text-[var(--amber)]">Tell us about yourself</label>
              <textarea required rows={4} className="bg-[rgba(250,243,224,0.08)] border-b-[1.5px] border-[rgba(245,166,35,0.3)] text-[var(--cream)] font-sans px-4 py-3 outline-none focus:border-[var(--amber)] focus:shadow-[0_2px_0_var(--amber)] transition-all resize-none"></textarea>
            </div>

            <button type="submit" className="w-full bg-gradient-to-br from-[var(--amber)] to-[#E8941A] text-[var(--purple)] font-sans font-bold text-base rounded-full py-4 hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(245,166,35,0.35)] transition-all">
              Submit Application
            </button>
          </form>
        )}
      </div>
      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </section>
  );
}
