import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance - spiral in effect
      gsap.from(contactRef.current, {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 80%',
          end: 'top 50%',
          scrub: 1,
        },
        scale: 0.5,
        rotation: 180,
        opacity: 0,
      });

      gsap.from('.contact-title', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 60%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'back.out(2)',
      });

      gsap.from('.contact-subtitle', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 60%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });

      gsap.from('.contact-form', {
        scrollTrigger: {
          trigger: contactRef.current,
          start: 'top 60%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.4,
      });
    }, contactRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact theme-mocha" ref={contactRef}>
      <div className="contact-container">
        <h2 className="contact-title">Bereit zu arbeiten?</h2>
        <p className="contact-subtitle">
          Melden Sie sich gerne per Mail über mein Kontaktformular oder per Telefon.
          <br />
          Jederzeit!
        </p>
        <form 
          className="contact-form" 
          action="https://formsubmit.co/webcommitswebdesigns@gmail.com" 
          method="POST"
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://www.lukasschaffrath.online/danke" />
          <input type="hidden" name="_subject" value="Neue Nachricht von Portfolio Website" />
          
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Ihr Name"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Ihre E-Mail"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Betreff"
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Ihre Nachricht"
              rows={6}
              required
              className="form-textarea"
            ></textarea>
          </div>
          
          <button type="submit" className="form-submit">
            Nachricht senden
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
