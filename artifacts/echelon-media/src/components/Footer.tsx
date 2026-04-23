import { Link, useLocation } from "wouter";
import logoUrl from "@assets/logo.png";

export default function Footer() {
  const [location, setLocation] = useLocation();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToCareers = () => {
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => document.getElementById("careers")?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      document.getElementById("careers")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToServices = () => {
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 120);
    } else {
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[var(--offwhite)] text-[var(--purple)]" id="contact">
      {/* CTA strip */}
      <div className="border-b border-[rgba(45,27,94,0.12)] py-14 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <div className="font-sans font-medium text-[11px] tracking-[0.2em] text-[var(--amber)] mb-2 uppercase">
              Let's Create Together
            </div>
            <h2 className="font-heading font-bold text-3xl md:text-5xl text-[var(--purple)] leading-tight">
              <span className="block">Ready to elevate</span>
              <span className="block font-italic-tagline text-[var(--amber)]">your brand?</span>
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
            <button className="bg-[var(--purple)] text-[var(--amber)] font-sans font-semibold rounded-full px-7 py-3 hover:bg-[var(--amber)] hover:text-[var(--purple)] transition-colors flex items-center gap-2">
              Start a Project <span>→</span>
            </button>
            <a
              href="mailto:echelonmedia17@gmail.com"
              className="font-sans text-sm text-[var(--purple)] flex items-center gap-2 hover:text-[var(--amber)] transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              echelonmedia17@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Footer proper */}
      <div className="py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Echelon Media" className="h-12 w-auto object-contain" />
            <div className="font-italic-tagline text-[var(--amber)] text-sm hidden sm:block">
              Creative Digital Agency
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <button
              onClick={goToServices}
              className="font-sans text-[12px] text-[var(--purple)] opacity-70 hover:opacity-100 hover:text-[var(--amber)] transition-colors cursor-pointer uppercase tracking-wider"
            >
              Services
            </button>
            <Link
              href="/portfolio"
              className="font-sans text-[12px] text-[var(--purple)] opacity-70 hover:opacity-100 hover:text-[var(--amber)] transition-colors cursor-pointer uppercase tracking-wider"
            >
              Portfolio
            </Link>
            <button
              onClick={goToCareers}
              className="font-sans text-[12px] text-[var(--purple)] opacity-70 hover:opacity-100 hover:text-[var(--amber)] transition-colors cursor-pointer uppercase tracking-wider"
            >
              Careers
            </button>
            <Link
              href="/privacy"
              className="font-sans text-[12px] text-[var(--purple)] opacity-70 hover:opacity-100 hover:text-[var(--amber)] transition-colors cursor-pointer uppercase tracking-wider"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-sans text-[12px] text-[var(--purple)] opacity-70 hover:opacity-100 hover:text-[var(--amber)] transition-colors cursor-pointer uppercase tracking-wider"
            >
              Terms
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-sans text-[11px] text-[var(--purple)] opacity-60">
              © 2025 Echelon Media
            </div>
            <button
              onClick={scrollToTop}
              className="border border-[rgba(245,166,35,0.6)] rounded-full px-4 py-1.5 text-[var(--amber)] font-sans font-semibold text-[11px] tracking-[0.15em] hover:bg-[var(--amber)] hover:text-[var(--purple)] transition-all"
            >
              TOP ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
