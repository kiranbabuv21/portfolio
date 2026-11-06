import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "SJC Connect – Smart College Transport Management System",
    category: "Full-Stack Development",
    description: "A college transport management platform designed to simplify student transportation, vehicle tracking, attendance monitoring, and multi-role administrative communication.",
    tags: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS"],
    match: "99%",
    label: "PROJECT 01",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "ReWorth – AI-Powered Smart Recycling Platform",
    category: "Generative AI & Computer Vision",
    description: "An AI-powered waste management platform that identifies waste materials from images, estimates their potential value, and recommends suitable recycling, reuse, and upcycling options.",
    tags: ["Python", "Streamlit", "Gemini API", "Generative AI", "Pillow", "Pandas"],
    match: "99%",
    label: "PROJECT 02",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "AI Emotion Detector & Intelligent Caretaker",
    category: "AI & Computer Vision",
    description: "An AI-based application focused on detecting human emotions and providing supportive, context-aware caretaker assistance based on detected emotional states.",
    tags: ["Python", "AI/ML", "Computer Vision", "Deep Learning"],
    match: "98%",
    label: "PROJECT 03",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "ThreatLens – Intelligent Threat Detection System",
    category: "Cybersecurity & Artificial Intelligence",
    description: "A security-focused project designed to help identify and analyze potential digital threats using intelligent detection and analysis techniques.",
    tags: ["Python", "Django", "PostgreSQL", "Cybersecurity", "AI/ML"],
    match: "98%",
    label: "PROJECT 04",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "AI Finder – AI-Powered Discovery Platform",
    category: "AI-Powered Discovery",
    description: "AI-powered platform that recommends useful AI tools and websites based on a user's requirements.",
    tags: ["Python", "React", "JavaScript", "APIs", "AI"],
    match: "98%",
    label: "PROJECT 05",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "Research Paper Assistant – NLP & LLM",
    category: "AI & NLP",
    description: "AI-powered assistant that helps users understand, analyze, and interact with research papers using NLP and LLMs.",
    tags: ["Python", "NLP", "LLM", "AI", "Vector Database"],
    match: "98%",
    label: "PROJECT 06",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "AI-Based Healthcare Prediction System",
    category: "Machine Learning & Healthcare",
    description: "An AI/ML-based healthcare project focused on analyzing health-related data and generating predictive insights to support clinical decision-making.",
    tags: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
    match: "98%",
    label: "PROJECT 07",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "AI-Based Deforestation Detection Using Satellite Images",
    category: "Computer Vision & Environmental AI",
    description: "An AI-powered environmental monitoring project focused on analyzing satellite imagery to identify deforestation patterns and support forest conservation.",
    tags: ["Python", "Computer Vision", "Deep Learning", "Image Processing"],
    match: "99%",
    label: "PROJECT 08",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "Emergency AI Agent – Intelligent Emergency Assistance",
    category: "Generative AI & Agentic AI",
    description: "An AI-agent-based project designed to assist with emergency situations by interpreting user requests and supporting rapid response workflows.",
    tags: ["Python", "Generative AI", "LLMs", "AI Agents"],
    match: "98%",
    label: "PROJECT 09",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "Spotty – Location-Based Discovery Platform",
    category: "Software Development",
    description: "A software application developed to address practical user navigation and place discovery problems through a technology-driven solution.",
    tags: ["React", "JavaScript", "OpenStreetMap", "APIs"],
    match: "97%",
    label: "PROJECT 10",
    github: "https://github.com/kiranbabuv21"
  },
  {
    title: "Freelance Client Web Development",
    category: "Client Web Development",
    description: "Designed and developed responsive websites for hotels and small businesses based on their branding and business requirements.",
    tags: ["HTML", "CSS", "JavaScript", "React", "Responsive Design"],
    match: "99%",
    label: "PROJECT 11",
    github: "https://github.com/kiranbabuv21"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);
  const mobileCarouselRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial origins (Centered in viewport)
      gsap.set([folderBackRef.current, folderFrontRef.current], { 
        xPercent: -50, 
        yPercent: -50 
      });
      gsap.set(folderFrontRef.current, { transformOrigin: "bottom center" });
      
      const getGridPos = (index, total) => {
        const row = Math.floor(index / 3);
        const totalRows = Math.ceil(total / 3);
        const itemsInThisRow = (row === totalRows - 1 && total % 3 !== 0) ? (total % 3) : 3;
        const colInRow = index % 3;
        const midCol = (itemsInThisRow - 1) / 2;
        const colOffset = colInRow - midCol;
        return { row, colOffset, totalRows };
      };

      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
        });
      });

      let mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if (isDesktop) {
          let floatTween;

          const activeCards = cardsRef.current.filter(Boolean);

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 50%", 
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
              onEnter: () => { if (floatTween) floatTween.kill(); },
              onEnterBack: () => { if (floatTween) floatTween.kill(); },
              onLeave: () => { if (floatTween) floatTween.kill(); },
              onLeaveBack: () => { if (floatTween) floatTween.kill(); }
            },
            onComplete: () => {
              floatTween = gsap.to(activeCards, {
                y: "+=12",
                rotation: "+=1",
                duration: 3.5,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: { amount: 1.5, from: "random" }
              });
            }
          });

          // 1. Folder opens with smooth rotation
          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 1.2,
            ease: "power3.inOut"
          });

          // 2. Cards rise up collectively
          tl.to(activeCards, {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          }, "-=0.6");

          // 3. Cards spread out into clean blockbuster grid layout
          tl.to(activeCards, {
            x: (i) => {
              const w = Math.max(...activeCards.map(c => c?.offsetWidth || 0)) || 350;
              const gap = 32;
              const { colOffset } = getGridPos(i, activeCards.length);
              return colOffset * (w + gap);
            },
            y: (i) => {
              const h = Math.max(...activeCards.map(c => c?.offsetHeight || 0)) || 230;
              const gap = 32;
              const { row, totalRows } = getGridPos(i, activeCards.length);
              const midRow = (totalRows - 1) / 2;
              return (row - midRow) * (h + gap);
            },
            rotation: () => gsap.utils.random(-3, 3),
            scale: 0.95,
            duration: 1.4,
            stagger: { amount: 0.4, from: "center" },
            ease: "expo.out"
          }, "-=0.2");
        }

        if (isMobile) {
          const activeMobileCards = mobileCardsRef.current.filter(Boolean);
          const cardW = window.innerWidth * 0.8;
          const gap = 20;
          
          activeMobileCards.forEach((card, i) => {
            gsap.set(card, {
              x: -(i * (cardW + gap)), 
              y: 0,
              scale: 0.4,
              opacity: 0,
              rotation: gsap.utils.random(-15, 15)
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
            }
          });

          tl.to(folderFrontRef.current, {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tl.to(activeMobileCards, {
            y: -100,
            opacity: 1,
            scale: 0.85,
            duration: 0.6,
            stagger: 0.05,
            ease: "back.out(1.2)"
          }, "-=0.4");

          tl.to(activeMobileCards, {
            x: 0,
            y: 0,
            rotation: 0,
            scale: (i) => i === 0 ? 1 : 0.92,
            opacity: (i) => i === 0 ? 1 : 0.5,
            duration: 0.8,
            stagger: 0.08,
            ease: "expo.out",
            onComplete: () => {
              if (mobileCarouselRef.current) {
                mobileCarouselRef.current.style.overflowX = 'auto';
                mobileCarouselRef.current.style.pointerEvents = 'auto';
              }
            }
          }, "-=0.2");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0b0b0b] min-h-[100svh] md:min-h-[260vh] relative font-sans overflow-x-clip text-white w-full flex items-center justify-center py-24 md:py-48 select-none">
      
      {/* Background Netflix Cinematic Title Watermark (Issue 9 & 12) */}
      <div className="absolute top-10 left-0 w-full flex flex-col items-center justify-center pointer-events-none z-0">
        <h2 className="sr-only">Originals & Featured Projects</h2>
        <span aria-hidden="true" className="text-[14vw] sm:text-[17vw] md:text-[20vw] font-black text-white/[0.03] tracking-tighter leading-none whitespace-nowrap uppercase">
          ORIGINALS
        </span>
      </div>

      {/* Ambient Crimson Glow behind folder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] bg-red-600/15 rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Main Perspective Container */}
      <div className="mt-12 relative w-full max-w-7xl h-full flex items-center justify-center perspective-[2000px] z-10">
        
        {/* Origin Container */}
        <div className="relative w-0 h-0 transform-style-3d">
          
          {/* Folder Back */}
          <div 
            ref={folderBackRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video bg-[#141414] rounded-[24px] border border-red-600/40 shadow-[0_20px_50px_rgba(229,9,20,0.25)] flex items-center justify-center"
            style={{ zIndex: 5 }}
          >
            <div className="absolute -top-6 left-6 w-32 h-8 bg-[#1f1f1f] rounded-t-xl border-t border-red-600/30" />
            <div className="relative z-10 text-red-600 font-mono font-bold text-xl tracking-wider uppercase opacity-80">
              FEATURED PRODUCTIONS
            </div>
          </div>

          {/* Desktop Project Cards */}
          {projectsData.map((project, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="hidden md:block absolute w-[80vw] md:w-[33vw] max-w-[390px] aspect-[16/10.5] will-change-transform"
              style={{ zIndex: 10 + i }}
            >
              <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414]/95 backdrop-blur-2xl shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 group hover:scale-[1.04] hover:border-red-600 hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)] hover:-translate-y-2 cursor-pointer relative z-10 p-6 flex flex-col justify-between">
                
                {/* Top Card Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-2.5 py-1 rounded border border-red-600/20">
                    {project.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
                    <span className="text-[10px] font-mono border border-white/30 px-1 text-white/70">HD</span>
                  </div>
                </div>

                {/* Middle Title & Description */}
                <div className="space-y-1.5 my-auto">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    {project.category}
                  </div>
                  <h3 className="text-lg md:text-xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300 leading-snug line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/70 font-light leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Bottom: Tags + Action Buttons */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded text-white/70 bg-white/5 group-hover:border-red-600/30 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Working Action Buttons */}
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-red-600 border border-white/20 hover:border-red-600 rounded-md text-[10px] font-mono font-bold text-white tracking-wider uppercase transition-all duration-300 hover:scale-105 cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Source Code
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-md text-[10px] font-mono font-bold text-white tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-[0_0_10px_rgba(229,9,20,0.4)] cursor-pointer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                      View Project
                    </a>
                  </div>
                </div>

                {/* Red Glowing Corner Accent */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
              </div>
            </div>
          ))}

          {/* Folder Front Flap */}
          <div 
            ref={folderFrontRef}
            className="absolute w-[85vw] md:w-[32vw] max-w-[380px] aspect-video pointer-events-none will-change-transform"
            style={{ zIndex: 60 }}
          >
            <div className="absolute bottom-0 w-full h-[85%] bg-[#1c1c1c] rounded-b-[24px] rounded-t-md shadow-[0_-5px_20px_rgba(0,0,0,0.8)] flex flex-col justify-end p-6 border-t border-red-600/40">
              <div className="w-20 h-1.5 bg-white/20 rounded-full mx-auto mb-2" />
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Swipeable Carousel */}
      <div 
        ref={mobileCarouselRef}
        className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-auto py-12 flex items-center gap-6 px-[12.5vw] pointer-events-none z-[100] snap-x snap-mandatory overflow-x-hidden hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar::-webkit-scrollbar { display: none; }
          .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>
        {projectsData.map((project, i) => (
          <div 
            key={`mob-${i}`}
            ref={el => mobileCardsRef.current[i] = el}
            className="shrink-0 w-[80vw] sm:w-[340px] aspect-[16/11.5] snap-center will-change-transform relative z-10"
          >
            <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/15 bg-[#141414] p-5 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 bg-red-600/10 px-2 py-0.5 rounded">
                  {project.label}
                </span>
                <span className="text-xs font-mono text-red-400 font-bold">{project.match} Match</span>
              </div>
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                  {project.category}
                </div>
                <h3 className="text-base sm:text-lg font-black text-white leading-snug line-clamp-1">{project.title}</h3>
                <p className="text-xs text-white/70 font-light line-clamp-2">{project.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded text-white/60 bg-white/5">
                    {tag}
                  </span>
                ))}
              </div>
              {/* Mobile Action Buttons */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 border border-white/20 rounded-md text-[10px] font-mono font-bold text-white tracking-wider uppercase transition-all duration-300 cursor-pointer"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  Code
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-md text-[10px] font-mono font-bold text-white tracking-wider uppercase transition-all duration-300 shadow-[0_0_8px_rgba(229,9,20,0.3)] cursor-pointer"
                >
                  <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Projects;