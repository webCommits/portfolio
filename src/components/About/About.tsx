import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const { t } = useTranslation();
  const aboutRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const techStackRef = useRef<HTMLDivElement>(null);

  const techStack = [
    'HTML5', 'CSS3', 'JavaScript', 'Eleventy', 'React',
    'Python', 'Django', 'Ruby', 'Rails', 'Symfony',
    'ShopWare', 'Moodle', 'Git', 'Node', 'Responsive Design',
    'Java', 'Docker', 'NX', 'Siemens NX', 'Autodesk',
    'Fusion 360', 'Davinci Resolve', 'DaVinci Resolve', 'Adobe Premiere Pro',
    'Adobe InDesign', 'Affinity Suite', 'Gimp', 'Inkscape', 'FL Studio',
    'GSAP', 'HTML5', 'CSS3', 'JavaScript', 'React',
    'Python', 'Django', 'Ruby', 'Rails', 'Symfony',
    'Git', 'Node', 'Docker', 'GSAP', 'Responsive Design'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(aboutRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        x: 100,
        opacity: 0,
      });

      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        scale: 0.8,
      });

      const techItems = techStackRef.current?.querySelectorAll('.tech-item');
      if (techItems) {
        const itemsPerRow = 5;
        const rows = Math.ceil(techStack.length / itemsPerRow);
        
        techItems.forEach((item, index) => {
          const row = Math.floor(index / itemsPerRow);
          const col = index % itemsPerRow;
          
          const itemWidth = 280;
          const spacing = 100;
          
          const startX = col * (itemWidth + spacing);
          const sectionHeight = window.innerHeight;
          const rowHeight = sectionHeight / (rows + 2);
          const startY = rowHeight * (row + 1);

          gsap.set(item, {
            x: startX,
            y: startY,
          });

          const speeds = [18, 23, 28, 33];
          const duration = speeds[row % speeds.length];

          gsap.to(item, {
            x: `+=${window.innerWidth + itemWidth * itemsPerRow}`,
            duration: duration,
            repeat: -1,
            ease: 'none',
            modifiers: {
              x: gsap.utils.unitize(x => {
                const totalWidth = (itemWidth + spacing) * itemsPerRow;
                const parsed = parseFloat(x);
                return (parsed % totalWidth) - itemWidth;
              }),
            },
          });
        });
      }
    }, aboutRef);

    return () => ctx.revert();
  }, [techStack.length]);

  return (
    <section id="about" className="about theme-frappe" ref={aboutRef}>
      <div className="about-background" ref={techStackRef}>
        {techStack.map((tech, index) => (
          <div 
            key={index} 
            className="tech-item"
            data-weight={index % 3}
            data-color={index % 4}
          >
            {tech}
          </div>
        ))}
      </div>
      <div className="about-container">
        <div className="about-content" ref={textRef}>
          <h2 className="about-title">{t('about.title')}</h2>
          <div className="about-text">
            <p>{t('about.paragraphs.0')}</p>
            <p>{t('about.paragraphs.1')}</p>
            <p>{t('about.paragraphs.2')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
