import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image: string;
}

const Portfolio: React.FC = () => {
  const portfolioRef = useRef<HTMLElement>(null);
  const [currentProject, setCurrentProject] = useState(0);
  const backgroundRef = useRef<HTMLDivElement>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Anglistik Web',
      description: 'Sprechstunden- und Buchungssystem mit Login und Account-Verwaltung. Basierend auf Django und Python.',
      technologies: ['Django', 'Python', 'HTMX', 'HTML/CSS'],
      link: 'https://web.anglistik.rwth-aachen.de',
      image: '/anglistikweb.png',
    },
    {
      id: 2,
      title: 'GPUpgrade',
      description: 'Web-Tool zur Analyse und zum Vergleich von GPU-Leistungen mit Upgrade-Kalkulator, Such- und Filterfunktionen. Entwickelt mit Eleventy (11ty), AlpineJS, JavaScript und JSON-Datenbasis von u/SenorPeterz.',
      technologies: ['Eleventy', 'AlpineJS', 'JavaScript', 'JSON'],
      link: 'https://webcommits.github.io/gpupgrade/',
      image: '/gpupgrade.png',
    },
    {
      id: 3,
      title: 'CL-Verkehrstechnik',
      description: 'Verkehrszeichenpläne und -technik. Klar, präzise, deutschlandweit, in reinem Vanilla Code.',
      technologies: ['HTML', 'Vanilla CSS', 'Vanilla JavaScript'],
      link: 'https://www.cl-verkehrstechnik.de/',
      image: '/clweb.png',
    },
    {
      id: 4,
      title: 'Lashes by Dim',
      description: 'Interaktive Website für eine Wimpernstylistin',
      technologies: ['HTML', 'Vanilla CSS', 'Vanilla JavaScript'],
      link: 'https://lashesbydim.de/',
      image: '/lashesbydim.png',
    },
    {
      id: 5,
      title: 'Ben-Bachmair',
      description: 'Website eines international renommierten Professors & Autors, basierend auf Vue.js.',
      technologies: ['Vue.js', 'JavaScript'],
      link: 'http://ben-bachmair.de/',
      image: '/benbachmair.png',
    },
    {
      id: 6,
      title: 'Kernbohrungen Günther',
      description: 'Website eines Meisterbetriebs im Mauerwerks- und Betonbau, aufgebaut mit Eleventy und Nunjucks.',
      technologies: ['Eleventy', 'Nunjucks', 'HTML/CSS'],
      link: 'https://kernbohrungen-guenther.de/',
      image: '/kernbohrungen-guenther.png',
    },
    {
      id: 7,
      title: 'AnzeigeSchalten',
      description: 'Eine Website, die den Prozess des Anzeigens vereinfachen soll. Speziell für die Großeltern als PWA erstellt.',
      technologies: ['PWA', 'HTML', 'CSS', 'JavaScript'],
      link: 'https://lstoneyy.github.io/anzeigeschalten/',
      image: '/anzeigeschalten.png',
    },
    {
      id: 8,
      title: 'Notion to Obsidian Transition Tool',
      description: 'Ein kleines Script, dass bei der Transition von Notion to Obsidian hilft, durch schlaue Dateikonvertierung.',
      technologies: ['Python', 'Bash', 'Script'],
      link: 'https://github.com/LStoneyy/notion-to-obsidian-py',
      image: '/notion.png',
    },
    {
      id: 9,
      title: 'Snake Game',
      description: 'Ein einfacher Snake-Klon, geschrieben in Python mit PyGame. Erstellt als self-study Programmier-Projekt im Zuge eines Lehrgangs in der Technikdidaktik.',
      technologies: ['Python', 'PyGame'],
      link: 'https://github.com/LStoneyy/snake-game',
      image: '/snakegame.png',
    },
    {
      id: 10,
      title: 'webCommits',
      description: 'Die Seite der besten Webentwickler.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      link: 'https://webcommits.github.io/webcommits-website/',
      image: '/webcommits.png',
    },
  ];

  const handleNext = () => {
    // Animate out current project
    gsap.to('.portfolio-mockup', {
      x: -50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentProject((prev) => (prev + 1) % projects.length);
        // Animate in new project
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
    // Animate out current project
    gsap.to('.portfolio-mockup', {
      x: 50,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
        // Animate in new project
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
      // Section entrance - fade and zoom in
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

      // Background floating shapes
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
        <h2 className="portfolio-title">Portfolio</h2>
        <div className="portfolio-content">
          <div className="portfolio-left">
            <div className="portfolio-mockup">
              <div className="mockup-frame">
                <div className="mockup-screen">
                  <div className="project-image-placeholder">
                    <img 
                      src={projects[currentProject].image} 
                      alt={projects[currentProject].title}
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
              <h3 className="project-title">{projects[currentProject].title}</h3>
              <p className="project-description">{projects[currentProject].description}</p>
              <div className="project-technologies">
                {projects[currentProject].technologies.map((tech, index) => (
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
                Projekt ansehen →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
