import { useEffect } from "react";

export default function Legal({ kind }: { kind: "privacy" | "terms" }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [kind]);

  const isPrivacy = kind === "privacy";

  return (
    <div className="pt-32 pb-24 px-6 bg-[var(--cream)] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="font-sans font-medium text-[11px] tracking-[0.2em] text-[var(--amber)] mb-4 uppercase">
          {isPrivacy ? "Privacy" : "Terms of Service"}
        </div>
        <h1 className="font-heading font-bold text-5xl md:text-7xl text-[var(--purple)] mb-10">
          {isPrivacy ? "Your Privacy." : "The Terms."}
        </h1>

        <div className="space-y-6 font-sans text-[15px] text-[var(--purple)] opacity-85 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>
                Echelon Media respects your privacy. We collect only the information you
                voluntarily share with us — your name, email, and any details you submit
                through our contact and careers forms — and we use it solely to respond
                to your enquiry or process your application.
              </p>
              <p>
                We do not sell, rent, or trade your personal information with third
                parties. Aggregated, anonymous analytics may be used to understand how
                visitors interact with our site and to improve our services.
              </p>
              <p>
                You may request access to, correction of, or deletion of your personal
                information at any time by emailing{" "}
                <a className="text-[var(--amber)] hover:underline" href="mailto:echelonmedia17@gmail.com">
                  echelonmedia17@gmail.com
                </a>
                .
              </p>
              <p className="text-[13px] opacity-70">Last updated: April 2026</p>
            </>
          ) : (
            <>
              <p>
                By accessing this website, you agree to use it for lawful purposes and
                in a manner that does not infringe the rights of, or restrict the use of
                this site by, any third party.
              </p>
              <p>
                All content on this site — including copy, photography, video, branding,
                and design — is the property of Echelon Media unless otherwise noted, and
                may not be reproduced without written permission.
              </p>
              <p>
                Any project engagements are governed by a separate written agreement
                signed at the start of the project. Pricing displayed on this site is
                indicative and may change without notice.
              </p>
              <p className="text-[13px] opacity-70">Last updated: April 2026</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
