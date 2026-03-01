import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const resumeRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<'experience' | 'education'>('experience');

  const experienceData: TimelineItem[] = t('resume.experienceItems', { returnObjects: true }) as TimelineItem[];
  const educationData: TimelineItem[] = t('resume.educationItems', { returnObjects: true }) as TimelineItem[];

  const currentData = activeTab === 'experience' ? experienceData : educationData;

  useEffect(() => {
    const ctx = gsap.context(() => {
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
          <h2 className="resume-title">{t('resume.title')}</h2>
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              {t('resume.experience')}
            </button>
            <button
              className={`toggle-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              {t('resume.education')}
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
