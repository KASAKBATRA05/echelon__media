import { useEffect, useState } from "react";
import LogoIntro from "@/components/LogoIntro";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import Collaborators from "@/components/sections/Collaborators";
import PortfolioSection from "@/components/sections/PortfolioSection";
import Careers from "@/components/sections/Careers";

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window !== "undefined" && window.location.search.includes("skipIntro")) return false;
    return !sessionStorage.getItem("echelonIntroSeen");
  });

  const handleIntroComplete = () => {
    sessionStorage.setItem("echelonIntroSeen", "true");
    setShowIntro(false);
  };

  return (
    <div className="bg-[var(--cream)] min-h-screen">
      {showIntro && <LogoIntro onComplete={handleIntroComplete} />}
      <div className={`transition-opacity duration-400 ${showIntro ? 'opacity-0' : 'opacity-100'}`}>
        <Hero />
        <Marquee />
        <Collaborators />
        <PortfolioSection />
        <Careers />
      </div>
    </div>
  );
}
