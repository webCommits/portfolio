import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Hero.css';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const surnameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animations
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(nameRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
      })
      .from(surnameRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.2,
      }, '-=0.9')
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
      }, '-=0.7')
      .from(imageRef.current, {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      }, '-=0.8');

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // Parallax scroll effect for hero
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0.3,
        y: 200,
      });

      // Create floating particles
      if (particlesRef.current) {
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particlesRef.current.appendChild(particle);

          gsap.set(particle, {
            x: gsap.utils.random(0, window.innerWidth),
            y: gsap.utils.random(0, window.innerHeight),
            scale: gsap.utils.random(0.3, 1),
          });

          gsap.to(particle, {
            y: `+=${gsap.utils.random(-200, 200)}`,
            x: `+=${gsap.utils.random(-100, 100)}`,
            duration: gsap.utils.random(3, 8),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: gsap.utils.random(0, 2),
          });
        }
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" className="hero theme-latte" ref={heroRef}>
      <div className="particles-container" ref={particlesRef}></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-name" ref={nameRef}>
            lukas.
          </h1>
          <h1 className="hero-surname" ref={surnameRef}>
            schaffrath
          </h1>
          <p className="hero-subtitle" ref={subtitleRef}>
            Web Developer & Designer
            <br />
            IT Administrator
            <br />
            Lehrer für Gymnasien & Gesamtschulen
            <br />
            CDE Student
          </p>
        </div>
        <div className="hero-image" ref={imageRef}>
          <div className="image-placeholder">
            <img src="/portrait.webp" alt="Lukas Schaffrath" />
          </div>
        </div>
      </div>
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
