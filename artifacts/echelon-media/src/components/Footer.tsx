import { Link } from "wouter";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full text-[var(--cream)]" id="contact">
      {/* Zone 1 */}
      <div className="bg-[var(--purple)] py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="font-sans font-medium text-[11px] tracking-[0.2em] text-[var(--amber)] mb-6 uppercase">Let's Create Together</div>
          <h2 className="font-heading font-bold text-5xl md:text-7xl mb-2 text-[var(--cream)]">
            Ready to elevate
          </h2>
          <div className="font-italic-tagline text-[var(--amber)] text-4xl md:text-6xl mb-8">
            your brand?
          </div>
          <p className="font-sans text-[var(--cream)] opacity-70 mb-12 max-w-xl mx-auto text-lg">
            From strategy to execution — we handle the digital. You focus on the vision.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="bg-[var(--amber)] text-[var(--purple)] font-sans font-semibold rounded-full px-8 py-4 hover:scale-105 transition-transform flex items-center gap-2">
              Start a Project <span>→</span>
            </button>
            <a href="mailto:echelonmedia17@gmail.com" className="font-sans text-[var(--cream)] flex items-center gap-2 hover:text-[var(--amber)] transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              echelonmedia17@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Zone 2 */}
      <div className="bg-[var(--purple)] border-t border-[rgba(245,166,35,0.2)] pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="text-center mb-10">
            <div className="font-heading font-bold text-3xl mb-1 text-[var(--cream)]">ECHELON MEDIA</div>
            <div className="font-sans text-[var(--amber)] italic text-sm">Creative Digital Agency</div>
          </div>
          
          <div className="flex items-center gap-4 mb-12">
            {[1,2,3,4].map((i) => (
              <button key={i} className="w-11 h-11 rounded-full border border-[rgba(245,166,35,0.3)] flex items-center justify-center text-[var(--amber)] hover:bg-[var(--amber)] hover:text-[var(--purple)] hover:scale-110 transition-all">
                <div className="w-5 h-5 bg-currentColor rounded-sm"></div>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {['Services', 'Portfolio', 'Careers', 'Privacy', 'Terms'].map((link) => (
              <span key={link} className="font-sans text-[13px] text-[var(--cream)] opacity-60 hover:opacity-100 hover:text-[var(--amber)] transition-colors cursor-pointer uppercase tracking-wider">{link}</span>
            ))}
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[rgba(245,166,35,0.1)]">
            <div className="font-sans text-[12px] text-[var(--cream)] opacity-40 mb-4 md:mb-0">
              © 2025 Echelon Media · All Rights Reserved
            </div>
            <button onClick={scrollToTop} className="border border-[rgba(245,166,35,0.4)] rounded-full px-6 py-2 text-[var(--amber)] font-sans font-semibold text-[12px] tracking-[0.15em] hover:bg-[var(--amber)] hover:text-[var(--purple)] transition-all">
              BACK TO TOP
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
