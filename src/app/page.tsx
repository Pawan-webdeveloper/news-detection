"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Stats Counters
  const [stats, setStats] = useState({ speed: 0, languages: 0, sources: 0 });

  useGSAP(
    () => {
      // Custom Cursor Animation
      let cursorCtx = gsap.context(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        // Move cursor
        window.addEventListener("mousemove", (e) => {
          gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
          });
        });

        // Hover effects on buttons, links, cards
        document.querySelectorAll('button, a, .neo-card').forEach(item => {
          item.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 2, backgroundColor: '#FF5C4D', duration: 0.2 });
          });
          item.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, backgroundColor: '#C8FF00', duration: 0.2 });
          });
        });
      }, container);

      // Scroll Reveal Animations
      const reveals = gsap.utils.toArray('.reveal');
      reveals.forEach((element: any) => {
        gsap.fromTo(element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Stats Count Up Animation
      ScrollTrigger.create({
        trigger: "#stats",
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: 30,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () { setStats(s => ({ ...s, speed: Math.floor(this.targets()[0].val) })) }
          });
          gsap.to({ val: 0 }, {
            val: 11,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () { setStats(s => ({ ...s, languages: Math.floor(this.targets()[0].val) })) }
          });
          gsap.to({ val: 0 }, {
            val: 500,
            duration: 2,
            ease: "power2.out",
            onUpdate: function () { setStats(s => ({ ...s, sources: Math.floor(this.targets()[0].val) })) }
          });
        }
      });

      // Floating Animation for Hero Emojis
      gsap.to(".floating-1", { y: -15, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" });
      gsap.to(".floating-2", { y: -20, duration: 1.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2 });
      gsap.to(".floating-3", { y: -10, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.4 });
      gsap.to(".floating-4", { y: -18, duration: 1.6, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.1 });

      // Marquee animation
      gsap.to(".marquee-content", {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "linear"
      });

      return () => cursorCtx.revert();
    },
    { scope: container }
  );

  return (
    <div ref={container} className="font-dmsans">
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        id="custom-cursor"
        style={{ transform: "translate(-50%, -50%)" }}
      ></div>

      {/* Sticky Navbar */}
      <nav className="sticky top-0 z-50 bg-[var(--color-sach-bg)] border-b-3 border-[var(--color-sach-black)] px-6 py-4 flex items-center justify-between">
        <div className="text-3xl font-syne uppercase tracking-tighter">
          Sach<span className="bg-[var(--color-sach-acid)] px-2">Check</span>
        </div>
        <div className="hidden md:flex space-x-8 font-mono font-bold text-sm uppercase">
          <a className="hover:underline" href="#how-it-works">Detection</a>
          <a className="hover:underline" href="#education">Learn</a>
          <a className="hover:underline" href="#stats">Stats</a>
          <a className="hover:underline" href="#cta">Contact</a>
        </div>
        <button className="neo-button bg-[var(--color-sach-sky)] px-6 py-2 text-sm uppercase">
          Try SachCheck Free
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
        <div className="max-w-5xl text-center z-10">
          <h1 className="font-syne text-6xl md:text-8xl leading-none mb-8">
            INDIA’S FAKE NEWS PROBLEM IS REAL. <br />
            <span className="text-[var(--color-sach-coral)]">SACHCHECK ISN’T.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl md:text-2xl font-medium mb-10">
            Stop the spread of WhatsApp university forwards. Instant AI verification for the 1.4 billion voices of India.
          </p>

          {/* WhatsApp Mockup Area */}
          <div className="relative max-w-2xl mx-auto mt-12 neo-card bg-white p-4 h-[400px] flex flex-col">
            <div className="bg-[#075E54] p-3 text-white rounded-t-lg flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
              <span className="font-bold">Family WhatsApp Group</span>
            </div>
            <div className="flex-1 bg-[#E5DDD5] p-4 flex flex-col space-y-4 overflow-hidden rounded-b-lg">
              <div className="bg-white p-3 rounded-lg shadow-sm self-start max-w-[80%] text-sm">
                "UNESCO has declared India's National Anthem as the best in the world! Forward to 10 groups."
              </div>
              <div className="bg-[#DCF8C6] p-3 rounded-lg shadow-sm self-end max-w-[80%] text-sm border-2 border-[var(--color-sach-black)]">
                <span className="block font-bold text-xs text-[var(--color-sach-coral)] mb-1">SACHCHECK BOT:</span>
                ❌ This is FALSE. UNESCO does not give such awards.
                <a className="underline font-bold ml-1" href="#">Read Verification →</a>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Emojis */}
        <div className="absolute top-1/4 left-10 neo-card bg-[var(--color-sach-mint)] p-4 text-4xl floating-1">✅</div>
        <div className="absolute bottom-1/4 left-20 neo-card bg-[var(--color-sach-coral)] p-4 text-4xl floating-2">❌</div>
        <div className="absolute top-1/3 right-12 neo-card bg-[var(--color-sach-sky)] p-4 text-4xl floating-3">📱</div>
        <div className="absolute bottom-1/3 right-20 neo-card bg-[var(--color-sach-acid)] p-4 text-4xl floating-4">🤔</div>
      </section>

      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee-content inline-flex">
          82% OF INDIANS ARE WORRIED ABOUT FAKE NEWS • 1.2 MILLION MISINFORMATION PIECES FLAGGED DAILY • 400+ WHATSAPP GROUPS MONITORED PER SECOND • VERIFYING IN 11 INDIC LANGUAGES • 82% OF INDIANS ARE WORRIED ABOUT FAKE NEWS • 1.2 MILLION MISINFORMATION PIECES FLAGGED DAILY • 400+ WHATSAPP GROUPS MONITORED PER SECOND • VERIFYING IN 11 INDIC LANGUAGES
        </div>
      </div>

      {/* Detection Engine */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="how-it-works">
        <div className="mb-16">
          <p className="font-mono font-bold text-[var(--color-sach-coral)] mb-2 tracking-widest uppercase">The Engine</p>
          <h2 className="font-syne text-5xl md:text-6xl">HOW WE CATCH THE LIES.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Card 1 */}
          <div className="neo-card bg-white p-10 flex flex-col justify-between reveal">
            <div>
              <div className="w-16 h-16 bg-[var(--color-sach-acid)] border-3 border-[var(--color-sach-black)] rounded-full mb-6 flex items-center justify-center font-mono font-bold text-2xl">01</div>
              <h3 className="font-syne text-3xl mb-4 uppercase">Text Semantics</h3>
              <p className="text-lg">NLP models trained specifically on Hinglish, Manglish, and regional slang to detect emotive manipulation.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="neo-card bg-[var(--color-sach-sky)] p-10 flex flex-col justify-between reveal">
            <div>
              <div className="w-16 h-16 bg-white border-3 border-[var(--color-sach-black)] rounded-full mb-6 flex items-center justify-center font-mono font-bold text-2xl">02</div>
              <h3 className="font-syne text-3xl mb-4 uppercase">Deepfake Vision</h3>
              <p className="text-lg">AI forensic analysis of pixel patterns to spot manipulated faces, cloned voices, and staged photos.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="neo-card bg-[var(--color-sach-violet)] p-10 text-white flex flex-col justify-between reveal">
            <div>
              <div className="w-16 h-16 bg-[var(--color-sach-acid)] border-3 border-black rounded-full mb-6 flex items-center justify-center font-mono font-bold text-2xl text-black">03</div>
              <h3 className="font-syne text-3xl mb-4 uppercase">Audio Fingerprint</h3>
              <p className="text-lg">Analyzing voice stress and background noise consistency in viral audio clips and voice notes.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="neo-card bg-[var(--color-sach-orange)] p-10 flex flex-col justify-between reveal">
            <div>
              <div className="w-16 h-16 bg-white border-3 border-[var(--color-sach-black)] rounded-full mb-6 flex items-center justify-center font-mono font-bold text-2xl">04</div>
              <h3 className="font-syne text-3xl mb-4 uppercase">Source Origin</h3>
              <p className="text-lg">Tracing the metadata 'First Hop' of viral content to identify coordinate bot-farm deployments.</p>
            </div>
          </div>

          {/* Card 5 */}
          <div className="neo-card bg-[var(--color-sach-mint)] p-10 flex flex-col justify-between reveal">
            <div>
              <div className="w-16 h-16 bg-[var(--color-sach-acid)] border-3 border-[var(--color-sach-black)] rounded-full mb-6 flex items-center justify-center font-mono font-bold text-2xl">05</div>
              <h3 className="font-syne text-3xl mb-4 uppercase">Credibility Score</h3>
              <p className="text-lg">Cross-referencing claims against 500+ verified global and local fact-checking repositories.</p>
            </div>
          </div>

          {/* Card 6 */}
          <div className="neo-card bg-[var(--color-sach-coral)] p-10 text-white flex flex-col justify-between reveal">
            <div>
              <div className="w-16 h-16 bg-white border-3 border-[var(--color-sach-black)] rounded-full mb-6 flex items-center justify-center font-mono font-bold text-2xl text-black">06</div>
              <h3 className="font-syne text-3xl mb-4 uppercase">Network Heatmaps</h3>
              <p className="text-lg">Visualizing how misinformation travels across platforms to predict viral spikes before they happen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="bg-[var(--color-sach-black)] py-24 px-6 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-syne text-5xl md:text-7xl mb-16 uppercase text-center">WE ANALYZE <span className="text-[var(--color-sach-acid)]">EVERYTHING.</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="neo-card bg-zinc-900 border-white p-8 text-center reveal">
              <div className="text-5xl mb-4">💬</div>
              <div className="font-mono text-xl">WhatsApp</div>
            </div>
            <div className="neo-card bg-zinc-900 border-white p-8 text-center reveal">
              <div className="text-5xl mb-4">📸</div>
              <div className="font-mono text-xl">Instagram</div>
            </div>
            <div className="neo-card bg-zinc-900 border-white p-8 text-center reveal">
              <div className="text-5xl mb-4">🎞️</div>
              <div className="font-mono text-xl">Shorts/Reels</div>
            </div>
            <div className="neo-card bg-zinc-900 border-white p-8 text-center reveal">
              <div className="text-5xl mb-4">📰</div>
              <div className="font-mono text-xl">Local News</div>
            </div>
            <div className="neo-card bg-zinc-900 border-white p-8 text-center reveal">
              <div className="text-5xl mb-4">🐸</div>
              <div className="font-mono text-xl">Political Memes</div>
            </div>
            <div className="neo-card bg-zinc-900 border-white p-8 text-center reveal">
              <div className="text-5xl mb-4">🎙️</div>
              <div className="font-mono text-xl">Podcasts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="py-24 px-6 max-w-7xl mx-auto" id="education">
        <div className="text-center mb-16">
          <h2 className="font-syne text-5xl md:text-6xl uppercase italic">#SachPadhegaIndia</h2>
          <p className="font-mono mt-4">12 Psychological Tricks Used to Manipulate You</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">01 Fear Mongering</h4>
            <p className="text-sm">Creating panic to disable critical thinking.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">02 Cherry Picking</h4>
            <p className="text-sm">Using one true fact to support a big lie.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">03 False Authority</h4>
            <p className="text-sm">Inventing "Doctors" or "UNESCO" quotes.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">04 Out of Context</h4>
            <p className="text-sm">Old videos presented as today's events.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">05 Ad Hominem</h4>
            <p className="text-sm">Attacking the person instead of the argument.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">06 Straw Man</h4>
            <p className="text-sm">Distorting an opponent's position.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">07 False Dilemma</h4>
            <p className="text-sm">Suggesting only two extreme choices exist.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">08 Bandwagon</h4>
            <p className="text-sm">Claiming everyone believes it, so you should too.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">09 Loaded Language</h4>
            <p className="text-sm">Using emotional words to cloud judgment.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">10 Slippery Slope</h4>
            <p className="text-sm">Claiming one event will lead to disaster.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">11 Red Herring</h4>
            <p className="text-sm">Introducing irrelevant info to distract.</p>
          </div>
          <div className="neo-card bg-white p-6 reveal">
            <h4 className="font-mono font-bold border-b-2 border-[var(--color-sach-black)] pb-2 mb-3">12 Satire Paralysis</h4>
            <p className="text-sm">Pretending a joke is actual news.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-y-3 border-[var(--color-sach-black)] bg-[var(--color-sach-acid)]" id="stats">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <div className="text-center reveal">
            <div className="font-syne text-7xl mb-2">{stats.speed}</div>
            <p className="font-mono font-bold uppercase">Seconds for verification</p>
          </div>
          <div className="text-center reveal">
            <div className="font-syne text-7xl mb-2">{stats.languages}</div>
            <p className="font-mono font-bold uppercase">Languages supported</p>
          </div>
          <div className="text-center reveal">
            <div className="font-syne text-7xl mb-2">{stats.sources}+</div>
            <p className="font-mono font-bold uppercase">Trusted sources</p>
          </div>
        </div>
      </section>

      {/* Results Scenarios */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="font-syne text-5xl mb-16 uppercase">What Changes?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="neo-card bg-[var(--color-sach-mint)] p-8 reveal">
            <h3 className="font-mono font-bold text-2xl mb-4">Cleaner Inbox</h3>
            <p className="font-medium">Automatic labels for forwarded messages. No more questioning if that "health hack" actually works.</p>
          </div>
          <div className="neo-card bg-[var(--color-sach-sky)] p-8 reveal">
            <h3 className="font-mono font-bold text-2xl mb-4">Better Debates</h3>
            <p className="font-medium">Argue with facts, not "I saw this on Facebook." Evidence-based community discussions.</p>
          </div>
          <div className="neo-card bg-[var(--color-sach-acid)] p-8 reveal">
            <h3 className="font-mono font-bold text-2xl mb-4">Safer Society</h3>
            <p className="font-medium">Reducing real-world violence triggered by digital lies. Tech that protects humans.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--color-sach-black)] py-32 px-6 relative overflow-hidden" id="cta">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 flex flex-wrap gap-10 p-10 pointer-events-none">
          <div className="text-white text-9xl font-syne">SACH</div>
          <div className="text-white text-9xl font-syne">TRUTH</div>
          <div className="text-white text-9xl font-syne">FACTS</div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="font-syne text-6xl md:text-8xl text-white mb-10 leading-tight">SACH JAANO.<br />SACH FAILAO.</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="neo-button bg-[var(--color-sach-acid)] text-black px-12 py-5 text-xl">INSTALL WHATSAPP BOT</button>
            <button className="neo-button bg-white text-black px-12 py-5 text-xl">CHROME EXTENSION</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--color-sach-bg)] border-t-3 border-[var(--color-sach-black)] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="text-3xl font-syne uppercase tracking-tighter mb-6">
              Sach<span className="bg-[var(--color-sach-acid)] px-2">Check</span>
            </div>
            <p className="font-mono text-sm">Truth is a collective responsibility. Built for India, by India.</p>
          </div>
          <div>
            <h4 className="font-mono font-bold mb-6 uppercase border-b border-[var(--color-sach-black)] inline-block">Product</h4>
            <ul className="space-y-3 font-medium">
              <li><a className="hover:text-[var(--color-sach-coral)]" href="#">For Individuals</a></li>
              <li><a className="hover:text-[var(--color-sach-coral)]" href="#">For Journalists</a></li>
              <li><a className="hover:text-[var(--color-sach-coral)]" href="#">API Access</a></li>
              <li><a className="hover:text-[var(--color-sach-coral)]" href="#">Community Labels</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono font-bold mb-6 uppercase border-b border-[var(--color-sach-black)] inline-block">Resources</h4>
            <ul className="space-y-3 font-medium">
              <li><a className="hover:text-[var(--color-sach-coral)]" href="#">Education Hub</a></li>
              <li><a className="hover:text-[var(--color-sach-coral)]" href="#">Media Kit</a></li>
              <li><a className="hover:text-[var(--color-sach-coral)]" href="#">Annual Report</a></li>
              <li><a className="hover:text-[var(--color-sach-coral)]" href="#">Verification Standards</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-mono font-bold mb-6 uppercase border-b border-[var(--color-sach-black)] inline-block">Social</h4>
            <div className="flex space-x-4">
              <a className="w-10 h-10 neo-card bg-white flex items-center justify-center hover:bg-[var(--color-sach-sky)]" href="#">𝕏</a>
              <a className="w-10 h-10 neo-card bg-white flex items-center justify-center hover:bg-[var(--color-sach-coral)]" href="#">IG</a>
              <a className="w-10 h-10 neo-card bg-white flex items-center justify-center hover:bg-[var(--color-sach-violet)]" href="#">LI</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t-2 border-[var(--color-sach-black)] flex flex-col md:flex-row items-center justify-between font-mono text-xs gap-4">
          <p>© 2024 SACHCHECK AI FOUNDATION. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6">
            <a href="#">PRIVACY POLICY</a>
            <a href="#">TERMS OF SERVICE</a>
            <a href="#">ETHICS CODE</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
