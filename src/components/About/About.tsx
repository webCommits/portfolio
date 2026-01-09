import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
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
      // Section entrance animation - slide from right
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

      // Text animation
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

      // Tech stack items animation - continuous text lines moving left to right
      const techItems = techStackRef.current?.querySelectorAll('.tech-item');
      if (techItems) {
        // Create multiple rows of text that fill the section height
        const itemsPerRow = 5;
        const rows = Math.ceil(techStack.length / itemsPerRow);
        
        techItems.forEach((item, index) => {
          const row = Math.floor(index / itemsPerRow);
          const col = index % itemsPerRow;
          
          // Calculate text width approximately
          const itemWidth = 280;
          const spacing = 100;
          
          // Position items in a line, one after another
          const startX = col * (itemWidth + spacing);
          // Distribute rows evenly across the full section height
          const sectionHeight = window.innerHeight;
          const rowHeight = sectionHeight / (rows + 2); // +2 for padding top/bottom
          const startY = rowHeight * (row + 1);

          gsap.set(item, {
            x: startX,
            y: startY,
          });

          // Different speed for each row
          const speeds = [18, 23, 28, 33]; // 4 different speeds
          const duration = speeds[row % speeds.length];

          // Infinite horizontal scroll
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
  }, []);

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
          <h2 className="about-title">Über Mich</h2>
          <div className="about-text">
            <p>
              Ich bin Lukas Schaffrath – Webentwickler mit technischem Lehramtsabschluss der RWTH 
              Aachen und einer Leidenschaft für digitale Lösungen. Was einst als studentischer Nebenjob 
              begann, wurde zur Berufung: der Entwicklung moderner, leistungsstarker und bezahlbarer 
              Websites.
            </p>
            <p>
              Während meines Studiums war ich als Webentwickler und wissenschaftliche Hilfskraft an der 
              RWTH tätig. Heute betreue ich als IT-Administrator verschiedene technische Projekte am 
              Institut für Anglistik und arbeite parallel selbstständig an Webprojekten unter dem Namen 
              webCommits web Designs.
            </p>
            <p>
              Ich setze auf nachhaltigen, sauberen Code und nutzerfreundliche Konzepte. Ob mit 
              klassischen Webtechnologien wie HTML, CSS, JavaScript oder Frameworks wie Django, Ruby on 
              Rails, Eleventy und Symfony. Besonders gerne unterstütze ich kleinere Unternehmen mit 
              individuellen Lösungen. Mein technisches Know-how kombiniere ich mit pädagogischem 
              Feingefühl und klarer Kommunikation. Denn gute Webentwicklung beginnt mit dem Verständnis 
              für die Menschen dahinter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
