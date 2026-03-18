import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const contactRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [typedTitle, setTypedTitle] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const hasAnimatedRef = useRef(false);

  const performTypewriter = useCallback(() => {
    const title = t('contact.title');
    let currentIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (currentIndex < title.length) {
        setTypedTitle(title.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => setShowCursor(false), 600);
      }
    }, 70);
  }, [t]);

  useEffect(() => {
    if (hasAnimatedRef.current) return;
    
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contactRef.current,
        start: 'top 70%',
        onEnter: () => {
          if (!hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            performTypewriter();
          }
        },
      });

      gsap.from('.contact-subtitle', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 1.5,
      });

      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 60%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 1.8,
      });

      gsap.from('.form-group', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 60%',
        },
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 2,
      });
    }, contactRef);

    return () => ctx.revert();
  }, [performTypewriter]);

  return (
    <section id="contact" className="contact theme-mocha" ref={contactRef}>
      <div className="contact-container">
        <h2 className="contact-title" ref={titleRef}>
          {typedTitle}
          <span className={`typewriter-cursor ${showCursor ? 'visible' : ''}`}>|</span>
        </h2>
        <p className="contact-subtitle">
          {t('contact.subtitle.0')}
          <br />
          {t('contact.subtitle.1')}
        </p>
        <form
          className="contact-form"
          action="https://formsubmit.co/webcommitswebdesigns@gmail.com"
          method="POST"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="Neue Nachricht von Portfolio Website" />

          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder={t('contact.form.name')}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder={t('contact.form.email')}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder={t('contact.form.subject')}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <textarea
              name="message"
              placeholder={t('contact.form.message')}
              rows={6}
              required
              className="form-textarea"
            ></textarea>
          </div>

          <button type="submit" className="form-submit">
            {t('contact.form.submit')}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
