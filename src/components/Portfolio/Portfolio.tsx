import React, { useState, useEffect, useRef } from 'react';
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

const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const portfolioRef = useRef<HTMLElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    { id: 1, key: 'webcommits', link: 'https://www.webcommits.info', image: '/webcommits.webp' },
    { id: 2, key: 'gpupgrade', link: 'https://webcommits.github.io/gpupgrade/', image: '/gpupgrade.webp' },
    { id: 3, key: 'anglistikweb', link: 'https://web.anglistik.rwth-aachen.de', image: '/anglistikweb.webp' },
    { id: 4, key: 'portfolio', link: 'https://github.com/webCommits/portfolio', image: '/portfolio.webp' },
    { id: 5, key: 'clweb', link: 'https://www.cl-verkehrstechnik.de/', image: '/clweb.webp' },
    { id: 6, key: 'lashesbydim', link: 'https://lashesbydim.de/', image: '/lashesbydim.webp' },
    { id: 7, key: 'benbachmair', link: 'http://ben-bachmair.de/', image: '/benbachmair.webp' },
    { id: 8, key: 'kernbohrungen', link: 'https://kernbohrungen-guenther.de/', image: '/kernbohrungen-guenther.webp' },
    { id: 9, key: 'anzeigeschalten', link: 'https://lstoneyy.github.io/anzeigeschalten/', image: '/anzeigeschalten.webp' },
    { id: 10, key: 'mdtopdf', link: 'https://github.com/LStoneyy/md-to-html-pdf', image: '/mdtopdf.webp' },
    { id: 11, key: 'notion', link: 'https://github.com/LStoneyy/notion-to-obsidian-py', image: '/notion.webp' },
    { id: 12, key: 'snakegame', link: 'https://github.com/LStoneyy/snake-game', image: '/snakegame.webp' },
  ];

  const handleNext = () => {
    gsap.to('.portfolio-mockup', {
      x: -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
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
  };

  const handlePrev = () => {
    gsap.to('.portfolio-mockup', {
      x: 50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
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
  };

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
        shapes.forEach((shape) => {
          gsap.to(shape, {
            y: `+=${gsap.utils.random(-50, 50)}`,
            x: `+=${gsap.utils.random(-30, 30)}`,
            rotation: gsap.utils.random(-15, 15),
            duration: gsap.utils.random(3, 6),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }
    }, portfolioRef);

    return () => ctx.revert();
  }, []);

  const currentProjectKey = projects[currentProject].key;

  return (
    <section id="portfolio" className="portfolio theme-frappe" ref={portfolioRef}>
      <div className="portfolio-background" ref={backgroundRef}>
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
        <div className="bg-shape shape-4"></div>
        <div className="bg-shape shape-5"></div>
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
