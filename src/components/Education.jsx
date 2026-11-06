import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    id: '01',
    degree: 'B.E. — Computer Science and Engineering (AI & ML)',
    institution: 'SJC Institute of Technology',
    institutionFull: 'SJC Institute of Technology (SJCIT)',
    location: 'Chikkaballapur, Bengaluru Region, Karnataka',
    period: '2024 — 2028',
    status: '3rd Year',
    score: '9.54 CGPA',
    description:
      'Pursuing a specialized engineering degree focused on artificial intelligence, machine learning, generative AI, RAG concepts, and software application development.',
    highlights: [
      'Maintaining a stellar 9.54 CGPA in CSE (AI & ML)',
      'Hands-on projects in Generative AI, Computer Vision, and full-stack development',
      'Active participant in hackathons and technical project building',
    ],
    tags: ['AI & ML', 'Python', 'Generative AI', 'RAG', 'Deep Learning'],
  },
  {
    id: '02',
    degree: 'Pre-University / Class XII',
    institution: 'Sri Saraswathi Vidyaniketana PU College',
    institutionFull: 'Sri Saraswathi Vidyaniketana PU College',
    location: 'Karnataka',
    period: '2022 — 2024',
    status: 'Completed',
    score: '93%',
    description:
      'Completed pre-university education with a strong academic foundation in science and mathematics, achieving 93% in Karnataka board examinations.',
    highlights: [
      'Science stream with focus on Physics, Chemistry, and Mathematics (PCM)',
      'Scored 93% with distinction in board examinations',
      'Built strong analytical and problem-solving foundation',
    ],
    tags: ['Physics', 'Chemistry', 'Mathematics', 'Science'],
  },
  {
    id: '03',
    degree: 'Secondary School / Class X',
    institution: 'New Horizon School',
    institutionFull: 'New Horizon School',
    location: 'Karnataka',
    period: '2012 — 2022',
    status: 'Completed',
    score: '94%',
    description:
      'Completed schooling with excellent academic results, securing 94% in the secondary school board examinations.',
    highlights: [
      'Achieved 94% with academic excellence',
      'Strong academic foundation in science, mathematics, and computers',
      'Early interest in technology and software development',
    ],
    tags: ['Class X', 'Science', 'Mathematics', 'Computer Science'],
  },
];

const Education = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const timelineRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        timelineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            x: index % 2 === 0 ? -80 : 80,
            y: 40,
            opacity: 0,
            scale: 0.92,
            rotateY: index % 2 === 0 ? 8 : -8,
          },
          {
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, section);

    const cards = cardRefs.current;
    const handleMouseMove = (e, card) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    };

    const listeners = cards
      .filter(Boolean)
      .map((card) => {
        const listener = (e) => handleMouseMove(e, card);
        card.addEventListener('mousemove', listener);
        return { card, listener };
      });

    return () => {
      listeners.forEach(({ card, listener }) => {
        card.removeEventListener('mousemove', listener);
      });
      ctx.revert();
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0b0b0b] text-white py-32 px-6 md:px-12 flex flex-col justify-center select-none overflow-hidden"
    >
      <div className="absolute top-20 right-0 w-[450px] h-[450px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="absolute top-16 left-0 w-full flex justify-center pointer-events-none opacity-[0.03]">
        <span aria-hidden="true" className="text-[18vw] font-black uppercase tracking-tighter whitespace-nowrap">EDUCATION</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full space-y-16">
        <div ref={headerRef} className="flex flex-col items-start space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-md bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
            <span className="text-red-500 font-bold">EDUCATION</span>
            <span className="text-white/40">|</span>
            <span>ACADEMIC JOURNEY</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            LEARNING PATH <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_30px_rgba(229,9,20,0.4)]">
              DEGREES & MILESTONES.
            </span>
          </h2>
          <p className="text-sm md:text-base text-white/60 font-light max-w-xl leading-relaxed">
            My academic foundation in AI and machine learning — where theory meets hands-on engineering.
          </p>
        </div>

        <div className="relative">
          <div
            ref={timelineRef}
            className="absolute left-4 md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-red-600/60 to-transparent origin-top"
          />

          <div className="space-y-12 md:space-y-16">
            {educationData.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-10 w-3.5 h-3.5 rounded-full bg-red-600 shadow-[0_0_15px_#E50914] z-10" />

                <div className={`hidden md:block md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`} />

                <div
                  ref={addToRefs}
                  className={`w-full md:w-1/2 ml-10 md:ml-0 ${
                    index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'
                  }`}
                >
                  <div className="group relative p-8 md:p-10 bg-[#141414]/90 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl hover:border-red-600/60 transition-all duration-500 overflow-hidden [transform-style:preserve-3d]">
                    <div
                      className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(229,9,20,0.15), transparent 70%)',
                      }}
                    />

                    <div className="absolute top-0 right-0 p-6 text-white/5 font-mono text-6xl font-black pointer-events-none">
                      {item.id}
                    </div>

                    <div className="relative z-10 space-y-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/20">
                          {item.status}
                        </span>
                        <span className="text-xs font-mono text-white/40">{item.period}</span>
                        {item.score && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-red-600/80 px-3 py-1 rounded border border-red-500/40">
                            {item.score}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl md:text-2xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                          {item.degree}
                        </h3>
                        <p className="text-base font-semibold text-white/90">{item.institution}</p>
                        <p className="text-xs font-mono text-white/50">{item.institutionFull}</p>
                        <p className="text-xs font-mono text-red-400/90 tracking-wider">{item.location}</p>
                      </div>

                      <p className="text-sm text-white/60 font-light leading-relaxed">{item.description}</p>

                      <ul className="space-y-2">
                        {item.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2 text-sm text-white/75 font-light">
                            <span className="text-red-500 font-bold mt-0.5">›</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-white/80 group-hover:border-red-600/30 transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
