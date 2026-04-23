export default function Marquee() {
  const items = [
    "Social Media Marketing",
    "Event Coverage",
    "Branding and Ads",
    "Website Development",
    "Wedding Diaries",
    "200+ Projects",
    "The Power of Vision"
  ];

  return (
    <div className="w-full bg-[var(--purple)] h-[52px] overflow-hidden flex items-center">
      <div className="flex whitespace-nowrap animate-marquee hover:[animation-play-state:paused] min-w-max">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="font-sans font-medium text-[13px] tracking-[0.1em] text-[var(--offwhite)] uppercase mx-6">
                  {item}
                </span>
                <span className="w-[6px] h-[6px] rounded-full bg-[var(--amber)]"></span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
