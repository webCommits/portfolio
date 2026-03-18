import React, { useRef, useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  {
    id: "backend",
    title: "Backend & Databases",
    color: "var(--peach)",
    skills: ["Python (uv/poetry)", "Django", "FastAPI", "Node.js", "Ruby on Rails", "PostgreSQL", "Supabase", "SQLite", "PHP/Symfony", "Shopware/Moodle"]
  },
  {
    id: "frontend",
    title: "Frontend & UI",
    color: "var(--sky)",
    skills: ["React", "TypeScript", "Vue", "Tailwind", "HTMX", "AlpineJS", "Three.js", "GSAP", "Vite", "PWA", "Eleventy"]
  },
  {
    id: "devops",
    title: "DevOps & Infra",
    color: "var(--mauve)",
    skills: ["Docker & Compose", "Linux/Unix & Bash", "CI/CD & Actions", "Traefik", "Coolify", "Firewalls", "Git", "Neovim/tmux"]
  },
  {
    id: "design",
    title: "Design",
    color: "var(--green)",
    skills: ["Figma", "Adobe Suite", "Affinity", "DaVinci Resolve", "Gimp/Inkscape"]
  },
  {
    id: "engineering",
    title: "Data, Apps & 3D Engineering",
    color: "var(--yellow)",
    skills: ["Data Science (R/Py)", "Matplotlib", "Pandoc", "Tkinter", "PyGame", "Gaussian Splatting", "SparkJS", "NX", "Fusion 360"]
  }
];

const About: React.FC = () => {
  const { t } = useTranslation();
  const component = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Animations
      gsap.from('.about-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-title', start: 'top 80%' },
      });

      gsap.from('.about-text p', {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-text', start: 'top 80%' },
      });

      gsap.from('.bento-item', {
        scale: 0.9,
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: { trigger: '.bento-grid', start: 'top 85%' },
      });

      // 2. Mouse Tracking & 3D Tilt Effect 
      const items = gsap.utils.toArray<HTMLElement>('.bento-item');
      const isDesktop = window.matchMedia("(pointer: fine)").matches;
      
      const cleanupFns = items.map((item) => {
        if (!isDesktop) {
          // MOBILE WOW-Effect: Animate flashlight & tilt slightly based on scroll
          const mobileTrigger = ScrollTrigger.create({
            trigger: item,
            start: "top 75%",
            end: "bottom 30%",
            onEnter: () => item.classList.add('mobile-active'),
            onLeave: () => item.classList.remove('mobile-active'),
            onEnterBack: () => item.classList.add('mobile-active'),
            onLeaveBack: () => item.classList.remove('mobile-active'),
            onUpdate: (self) => {
              // Create a sweeping flashlight effect purely from scroll position
              const rect = item.getBoundingClientRect();
              const sweepX = rect.width * self.progress;
              const sweepY = rect.height * self.progress;
              item.style.setProperty('--x', `${sweepX}px`);
              item.style.setProperty('--y', `${sweepY}px`);
            }
          });

          // Add a subtle Parallax 3D tilt as the item scrolls vertically through viewport
          gsap.fromTo(item, 
            { rotationX: -8, rotationY: 4 },
            { 
              rotationX: 8, 
              rotationY: -4,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "bottom 10%",
                scrub: true,
              }
            }
          );
          
          return () => {
             // GSAP context automatically reverts ScrollTriggers, nothing specialized to clean up here but we keep the structure.
             item.classList.remove('mobile-active');
          };
        }

        // Desktop: Create performant GSAP setters for rotation
        const qRotX = gsap.quickTo(item, "rotationX", { ease: "power3.out", duration: 0.5 });
        const qRotY = gsap.quickTo(item, "rotationY", { ease: "power3.out", duration: 0.5 });
        
        const innerContent = item.querySelector('.bento-inner');
        const qTransX = innerContent ? gsap.quickTo(innerContent, "x", { ease: "power3.out", duration: 0.5 }) : () => {};
        const qTransY = innerContent ? gsap.quickTo(innerContent, "y", { ease: "power3.out", duration: 0.5 }) : () => {};

        const handleMouseMove = (e: MouseEvent) => {
          const rect = item.getBoundingClientRect();
          
          // Get mouse position relative to the element
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;
          
          // Update CSS variables for the flashlight glow effect
          item.style.setProperty('--x', `${relX}px`);
          item.style.setProperty('--y', `${relY}px`);
          
          // Calculate percentage from center (-1 to 1) for 3D tilt
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const percentX = (relX - centerX) / centerX;
          const percentY = (relY - centerY) / centerY;

          // Apply rotations and translations (WOW Parallax Effect)
          qRotY(percentX * 8);    // max 8 degrees tilt
          qRotX(percentY * -8); 
          
          if (innerContent) {
            qTransX(percentX * 12); // move inner content slightly with the mouse
            qTransY(percentY * 12);
          }
        };

        const handleMouseLeave = () => {
          // Reset when mouse leaves
          qRotX(0);
          qRotY(0);
          if (innerContent) {
            qTransX(0);
            qTransY(0);
          }
        };

        item.addEventListener("mousemove", handleMouseMove);
        item.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          item.removeEventListener("mousemove", handleMouseMove);
          item.removeEventListener("mouseleave", handleMouseLeave);
        };
      });

      // 3. Background Blobs Animation & Subtle Mouse Reactivity
      const blobs = gsap.utils.toArray('.blob') as HTMLElement[];
      
      // Floating animation for blobs
      blobs.forEach((blob) => {
        gsap.to(blob, {
          x: 'random(-80, 80)',
          y: 'random(-80, 80)',
          scale: 'random(0.8, 1.2)',
          duration: 'random(10, 15)',
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Subtle mouse tracking for the background container
      const bgContainer = component.current?.querySelector('.about-bg-elements');
      if (bgContainer && isDesktop) {
        const xTo = gsap.quickTo(bgContainer, 'x', { duration: 2, ease: 'power3.out' });
        const yTo = gsap.quickTo(bgContainer, 'y', { duration: 2, ease: 'power3.out' });

        const handleBgMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          // Calculate movement from center, constrained to a small offset (e.g., max 30px)
          const xOffset = ((e.clientX / innerWidth) - 0.5) * 40;
          const yOffset = ((e.clientY / innerHeight) - 0.5) * 40;
          
          xTo(xOffset);
          yTo(yOffset);
        };

        window.addEventListener('mousemove', handleBgMouseMove);

        return () => {
          cleanupFns.forEach(fn => fn());
          window.removeEventListener('mousemove', handleBgMouseMove);
        };
      }

      return () => {
        cleanupFns.forEach(fn => fn());
      };
    }, component);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section theme-frappe" ref={component}>
      <div className="about-bg-elements">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="about-container">
        <h2 className="about-title">{t('about.title')}</h2>
        
        <div className="about-content">
          <div className="about-text">
            <p>{t('about.paragraphs.0')}</p>
            <p>{t('about.paragraphs.1')}</p>
            <p>{t('about.paragraphs.2')}</p>
          </div>

          <div className="bento-grid">
            {techStack.map((group, index) => (
              <div 
                key={index} 
                className={`bento-item bento-item-${group.id}`}
                style={{ '--item-color': group.color } as React.CSSProperties}
              >
                <div className="bento-inner">
                  <h3 style={{ color: group.color }}>{group.title}</h3>
                  <div className="skills-list">
                    {group.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="skill-tag">{skill}</span>
                    ))}
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

export default About;
