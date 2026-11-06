import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const LOCAL_PHOTO = '/profile.png';
const FALLBACK_PHOTO = 'https://github.com/kiranbabuv21.png';

const Hero = () => {
  const [photoSrc, setPhotoSrc] = useState(LOCAL_PHOTO);
  const [activeSection, setActiveSection] = useState('home');
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'Feature Film // AI & ML Engineer',
    'Blockbuster // Generative AI Builder',
    'Original Series // Full-Stack Web Developer',
    'Acclaimed // Sustainable Innovator'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
      "-=0.7"
    )
    .fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
      "-=0.9"
    );

    // --- MOUSE TILT PHYSICS ON POSTER CARD ---
    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Card 3D Perspective Calculations
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare mapping
      glareX((x - cardRect.left) - cardRect.width / 2);
      glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseLeave = () => {
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // --- SCROLLSPY FOR NAVBAR ACTIVE STATE (Issue 18) ---
  useEffect(() => {
    const sectionIds = ['home', 'about', 'education', 'expertise', 'skills', 'projects', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'expertise', label: 'Expertise' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-red-600 mx-8 tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-12">
        
        {/* Top Badge */}
        <div className="hero-anim-item flex items-center justify-end w-full">
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/70 tracking-wider">
            <span className="px-2 py-0.5 border border-white/20 rounded-md bg-black/40">AI / ML</span>
            <span className="px-2 py-0.5 border border-white/20 rounded-md bg-black/40">WEB DEVELOPMENT</span>
            <span className="px-2 py-0.5 border border-white/20 rounded-md bg-black/40">BENGALURU, IN</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">
          
          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            
            <div className="hero-anim-item flex items-center gap-3">
              <span className="text-white/70 text-xs font-mono tracking-wider">AI & ML Engineering Student | Freelance Web Developer</span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              KIRAN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
                BABU.V
              </span>
            </h1>

            <div className="hero-anim-item flex flex-wrap items-center gap-2 text-xs font-mono text-red-400 font-bold">
              <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded-md text-red-400">Generative AI</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Python • React • FastAPI</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Machine Learning</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/70 font-light leading-relaxed max-w-md">
              Building practical AI and ML solutions, crafting modern web experiences as a freelance developer, and working on sustainable bio products with biodegradable polymers.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex items-center gap-4 pt-2 flex-wrap">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-white text-black font-bold text-xs rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="/resume.pdf"
                download="Kiran_Babu_Resume.pdf"
                className="px-6 py-3.5 bg-red-600/20 text-white border border-red-600/60 hover:bg-red-600 font-bold text-xs rounded-md transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer group"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2 group-hover:translate-y-0.5 transition-transform" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" />
                </svg>
                Download Resume
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs rounded-md hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
              <a
                href="https://github.com/kiranbabuv21"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs rounded-md hover:bg-neutral-800 hover:border-red-600/40 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Cinematic Red Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-2xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-2xl overflow-hidden">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Netflix Series Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-xs font-bold rounded-md shadow-xl">
                  FEATURED DEV
                </div>

                <img
                  src={photoSrc}
                  alt="Kiran Babu V"
                  onError={() => {
                    if (photoSrc !== FALLBACK_PHOTO) {
                      setPhotoSrc(FALLBACK_PHOTO);
                    }
                  }}
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs">
              <h2 className="text-xs font-mono text-red-500 font-bold mb-2">Core Stack & Specs</h2>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Freelance Web Developer, Hackathon Participant, and currently building a bio product with biodegradable polymers.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/40 tracking-wider">
          <span>Building What Matters</span>
          <span>AI & ML • WEB • INNOVATION</span>
        </div>
      </div>

      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR --- */}
      <header className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)]">
          KIRAN<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono text-white/80">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`transition-colors py-1 border-b-2 ${
                activeSection === item.id
                  ? 'text-red-500 border-red-600 font-bold'
                  : 'border-transparent text-white/70 hover:text-red-400'
              }`}
              aria-current={activeSection === item.id ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="/resume.pdf"
            download="Kiran_Babu_Resume.pdf"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-md border border-white/20 hover:border-red-600/50 hover:bg-white/5 text-white/90 hover:text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16" />
            </svg>
            Resume
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white font-bold text-xs tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            Hire Me
          </a>
        </div>
      </header>
    </section>
  );
};

export default Hero;