import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  key: string;
  link: string;
  image: string;
}

interface ShapeState {
  x: number;
  y: number;
  rotation: number;
}

const colorPalette = [
  'var(--blue)',
  'var(--sky)',
  'var(--sapphire)',
  'var(--teal)',
  'var(--lavender)',
  'var(--mauve)',
];

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const portfolioRef = useRef<HTMLElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const baseAnimationsRef = useRef<gsap.core.Tween[]>([]);
  const currentProjectRef = useRef(0);

  const projects: Project[] = [
    { id: 1, key: 'xrnexus', link: 'https://xrnexus.de', image: '/xrnexus.webp' },
    { id: 2, key: 'trackable', link: 'https://github.com/webCommits/trackable', image: '/trackable.webp' },
    { id: 3, key: 'weeklyplanner', link: 'https://github.com/LStoneyy/weekly-planner-web', image: '/weeklyplanner.webp' },
    { id: 4, key: 'rueckenwind', link: 'https://rueckenwind.reise', image: '/rueckenwind.webp' },
    { id: 5, key: 'gpupgrade', link: 'https://webcommits.github.io/gpupgrade/', image: '/gpupgrade.webp' },
    { id: 6, key: 'anglistikweb', link: 'https://web.anglistik.rwth-aachen.de', image: '/anglistikweb.webp' },
    { id: 7, key: 'portfolio', link: 'https://github.com/webCommits/portfolio', image: '/portfolio.webp' },
    { id: 8, key: 'spotifydl', link: 'https://github.com/LStoneyy/spotify-download', image: '/spotifydl.webp' },
    { id: 9, key: 'webcommits', link: 'https://www.webcommits.info', image: '/webcommits.webp' },
    { id: 10, key: 'lashesbydim', link: 'https://lashesbydim.de/', image: '/lashesbydim.webp' },
    { id: 11, key: 'benbachmair', link: 'http://ben-bachmair.de/', image: '/benbachmair.webp' },
    { id: 12, key: 'anzeigeschalten', link: 'https://lstoneyy.github.io/anzeigeschalten/', image: '/anzeigeschalten.webp' },
    { id: 13, key: 'mdtopdf', link: 'https://github.com/LStoneyy/md-to-html-pdf', image: '/mdtopdf.webp' },
    { id: 14, key: 'notion', link: 'https://github.com/LStoneyy/notion-to-obsidian-py', image: '/notion.webp' },
    { id: 15, key: 'snakegame', link: 'https://github.com/LStoneyy/snake-game', image: '/snakegame.webp' },
  ];

  const startBaseAnimations = useCallback((shapes: NodeListOf<Element>, initialStates?: ShapeState[], projectIndex: number = 0) => {
    baseAnimationsRef.current.forEach(anim => anim.kill());
    baseAnimationsRef.current = [];

    shapes.forEach((shape, i) => {
      const initialState = initialStates?.[i] || { x: 0, y: 0, rotation: 0 };
      const targetX = initialState.x + gsap.utils.random(-30, 30);
      const targetY = initialState.y + gsap.utils.random(-40, 40);
      const targetRotation = initialState.rotation + gsap.utils.random(-10, 10);

      gsap.set(shape, {
        x: initialState.x,
        y: initialState.y,
        rotation: initialState.rotation,
        background: colorPalette[(projectIndex + i) % colorPalette.length],
      });

      const anim = gsap.to(shape, {
        x: targetX,
        y: targetY,
        rotation: targetRotation,
        duration: gsap.utils.random(8, 15),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.3,
      });

      baseAnimationsRef.current.push(anim);
    });
  }, []);

  const triggerBurstAnimation = useCallback(() => {
    const shapes = backgroundRef.current?.querySelectorAll('.bg-shape');
    if (!shapes) return;

    const currentStates: ShapeState[] = [];
    shapes.forEach((shape) => {
      const transform = gsap.getProperty(shape);
      currentStates.push({
        x: (transform('x') as number) || 0,
        y: (transform('y') as number) || 0,
        rotation: (transform('rotation') as number) || 0,
      });
    });

    baseAnimationsRef.current.forEach(anim => anim.kill());
    baseAnimationsRef.current = [];

    const newStates: ShapeState[] = [];
    const projectIndex = currentProjectRef.current;

    shapes.forEach((shape, i) => {
      const currentState = currentStates[i];
      const burstX = currentState.x + gsap.utils.random(-80, 80);
      const burstY = currentState.y + gsap.utils.random(-80, 80);
      const burstRotation = currentState.rotation + gsap.utils.random(30, 90);
      const newColor = colorPalette[(projectIndex + i) % colorPalette.length];

      newStates.push({
        x: burstX,
        y: burstY,
        rotation: burstRotation,
      });

      gsap.timeline()
        .to(shape, {
          x: burstX,
          y: burstY,
          rotation: burstRotation,
          scale: 1.4,
          opacity: 0.12,
          duration: 0.4,
          ease: 'power2.out',
        })
        .to(shape, {
          background: newColor,
          duration: 0.3,
        }, 0)
        .to(shape, {
          scale: 1,
          opacity: 0.06,
          duration: 0.4,
          ease: 'power2.inOut',
          onComplete: () => {
            startBaseAnimations(shapes, newStates, projectIndex);
          },
        });
    });
  }, [startBaseAnimations]);

  const handleNext = useCallback(() => {
    gsap.to('.portfolio-mockup', {
      x: -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentProject((prev) => {
          const next = (prev + 1) % projects.length;
          currentProjectRef.current = next;
          return next;
        });
        gsap.fromTo('.portfolio-mockup',
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      }
    });

    gsap.to('.portfolio-details', {
      x: 50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.fromTo('.portfolio-details',
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, delay: 0.1 }
        );
      }
    });

    currentProjectRef.current = (currentProjectRef.current + 1) % projects.length;
    triggerBurstAnimation();
  }, [triggerBurstAnimation]);

  const handlePrev = useCallback(() => {
    gsap.to('.portfolio-mockup', {
      x: 50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentProject((prev) => {
          const next = (prev - 1 + projects.length) % projects.length;
          currentProjectRef.current = next;
          return next;
        });
        gsap.fromTo('.portfolio-mockup',
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3 }
        );
      }
    });

    gsap.to('.portfolio-details', {
      x: -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.fromTo('.portfolio-details',
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, delay: 0.1 }
        );
      }
    });

    currentProjectRef.current = (currentProjectRef.current - 1 + projects.length) % projects.length;
    triggerBurstAnimation();
  }, [triggerBurstAnimation]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(portfolioRef.current, {
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        scale: 0.9,
        opacity: 0,
      });

      gsap.from('.portfolio-title', {
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top 60%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        rotation: -5,
      });

      gsap.from('.portfolio-mockup', {
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top 60%',
        },
        x: -100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });

      gsap.from('.portfolio-details', {
        scrollTrigger: {
          trigger: portfolioRef.current,
          start: 'top 60%',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.4,
      });

      const shapes = backgroundRef.current?.querySelectorAll('.bg-shape');
      if (shapes) {
        startBaseAnimations(shapes, undefined, 0);
      }
    }, portfolioRef);

    return () => {
      ctx.revert();
      baseAnimationsRef.current.forEach(anim => anim.kill());
    };
  }, [startBaseAnimations]);

  const currentProjectKey = projects[currentProject].key;

  return (
    <section id="portfolio" className="portfolio theme-frappe" ref={portfolioRef}>
      <div className="portfolio-background" ref={backgroundRef}>
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
        <div className="bg-shape shape-5"></div>
        <div className="bg-shape shape-6"></div>
        <div className="bg-shape shape-7"></div>
      </div>
      <div className="portfolio-container">
        <h2 className="portfolio-title">{t('portfolio.title')}</h2>
        <div className="portfolio-content">
          <div className="portfolio-left">
            <div className="portfolio-mockup">
              <div className="mockup-frame">
                <div className="mockup-screen">
                  <div className="project-image-placeholder">
                    <img
                      src={projects[currentProject].image}
                      alt={t(`portfolio.projects.${currentProjectKey}.title`)}
                      style={{ width: '100%', height: '100%', objectFit: 'fill' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="portfolio-navigation">
              <button className="nav-btn prev" onClick={handlePrev} aria-label="Previous project">
                ←
              </button>
              <div className="project-indicator">
                {currentProject + 1} / {projects.length}
              </div>
              <button className="nav-btn next" onClick={handleNext} aria-label="Next project">
                →
              </button>
            </div>
          </div>
          <div className="portfolio-right">
            <div className="portfolio-details">
              <h3 className="project-title">{t(`portfolio.projects.${currentProjectKey}.title`)}</h3>
              <p className="project-description">{t(`portfolio.projects.${currentProjectKey}.description`)}</p>
              <div className="project-technologies">
                {(t(`portfolio.projects.${currentProjectKey}.technologies`, { returnObjects: true }) as string[]).map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={projects[currentProject].link}
                className="project-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('portfolio.projectLink')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;