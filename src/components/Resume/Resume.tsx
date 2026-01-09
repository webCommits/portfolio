import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Resume.css';

gsap.registerPlugin(ScrollTrigger);

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  description: string;
}

const Resume: React.FC = () => {
  const resumeRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  const experienceData: TimelineItem[] = [
    {
      year: 'Seit 05/2025',
      title: 'Freiberuflicher Webentwickler',
      organization: 'webCommits web Designs',
      description: 'Freiberufliche Full-Stack Webentwicklung unter Verwendung verschiedener moderner Technologien unter dem Namen webCommits web Designs.',
    },
    {
      year: 'Seit 10/2023',
      title: 'IT-Administrator',
      organization: 'Institut für Anglistik, Amerikanistik und Romanistik, RWTH Aachen',
      description: 'Unterstützung bei IT-Infrastruktur, Netzwerkpflege und technischen Anliegen des Instituts, sowie Full-Stack Webentwicklung.',
    },
    {
      year: '11/2024 - 02/2025',
      title: 'Projektmanager (Werkstudent)',
      organization: 'Promedia Maassen',
      description: 'Materialerstellung (Unterrichtsmaterialien), Mitarbeit an NetRace Aachen/Netrace Kiel, IT-Support und Weiterentwicklung der Website.',
    },
    {
      year: '02/2020 - 10/2024',
      title: 'Nachhilfelehrer',
      organization: 'Schülerhilfe, Geilenkirchen',
      description: 'Nachhilfe in Englisch, Deutsch und Informatik für Schüler:innen verschiedener Jahrgangsstufen und Berufsschüler.',
    },
    {
      year: '12/2022 – 10/2023',
      title: 'Wissenschaftliche Hilfskraft',
      organization: 'Institut für Anglistik, Amerikanistik und Romanistik, RWTH Aachen',
      description: 'Entwicklung des Webbasierten Self-Study Kurses "Virtual Acoustic Immersion for Advanced Bachelor\'s Students of English".',
    },
    {
      year: '2016 – 2019',
      title: 'Praktika & Nebenjobs',
      organization: 'u.a. Media Markt, api GmbH, Dampfzebra',
      description: 'Erfahrung im Einzelhandel, Kundenberatung, Logistik sowie technische Unterstützung und Software Entwicklung.',
    },
  ];

  const educationData: TimelineItem[] = [
    {
      year: 'Seit 2025',
      title: 'Master of Arts',
      organization: 'RWTH Aachen',
      description: 'Cognitive, Digital and Empirical English Studies',
    },
    {
      year: '2024 - 2025',
      title: 'Master of Education',
      organization: 'RWTH Aachen',
      description: 'Lehramt für Gymnasien und Gesamtschulen (Englisch und Technik)',
    },
    {
      year: '2019 – 2024',
      title: 'Bachelor of Arts',
      organization: 'RWTH Aachen',
      description: 'Lehramt an Gymnasien und Gesamtschulen (Englisch und Technik)',
    },
    {
      year: '2010 – 2018',
      title: 'Allgemeine Hochschulreife',
      organization: 'Gymnasium Baesweiler',
      description: 'Abschluss mit Schwerpunkt auf naturwissenschaftlichen und sprachlichen Fächern.',
    },
  ];

  const currentData = activeTab === 'experience' ? experienceData : educationData;

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance - slide from bottom
      gsap.from(resumeRef.current, {
        scrollTrigger: {
          trigger: resumeRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });

      gsap.from('.resume-title', {
        scrollTrigger: {
          trigger: resumeRef.current,
          start: 'top 60%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
      });

      gsap.from('.toggle-buttons', {
        scrollTrigger: {
          trigger: resumeRef.current,
          start: 'top 60%',
        },
        x: 100,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });
    }, resumeRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate timeline items when tab changes
    gsap.fromTo('.timeline-item', 
      {
        x: -50,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
      }
    );
  }, [activeTab]);

  return (
    <section id="resume" className="resume theme-macchiato" ref={resumeRef}>
      <div className="resume-container">
        <div className="resume-header">
          <h2 className="resume-title">Lebenslauf & Qualifikationen</h2>
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              berufserfahrung
            </button>
            <button
              className={`toggle-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              ausbildung
            </button>
          </div>
        </div>
        <div className="timeline">
          {currentData.map((item, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker">
                <div className="marker-circle"></div>
              </div>
              <div className="timeline-content">
                <div className="timeline-year">{item.year}</div>
                <h3 className="timeline-title">{item.title}</h3>
                <h4 className="timeline-organization">{item.organization}</h4>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
