import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import './Hero.css';

interface Particle {
  element: HTMLDivElement;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  timeOffset: number;
  floatRadiusX: number;
  floatRadiusY: number;
  floatSpeed: number;
}

const Hero: React.FC = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const surnameRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const particlesDataRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const heroEl = heroRef.current;
    const ctx = gsap.context(() => {
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

      gsap.to(imageRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });

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

      if (particlesRef.current && heroEl) {
        const rect = heroEl.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const particleCount = 90;
        particlesDataRef.current = [];

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          const baseX = gsap.utils.random(0, width);
          const baseY = gsap.utils.random(0, height);
          
          particlesRef.current.appendChild(particle);
          
          gsap.set(particle, {
            x: baseX,
            y: baseY,
            scale: gsap.utils.random(0.8, 1.5),
          });

          particlesDataRef.current.push({
            element: particle,
            x: baseX,
            y: baseY,
            baseX: baseX,
            baseY: baseY,
            vx: 0,
            vy: 0,
            timeOffset: gsap.utils.random(0, Math.PI * 2),
            floatRadiusX: gsap.utils.random(20, 50),
            floatRadiusY: gsap.utils.random(15, 40),
            floatSpeed: gsap.utils.random(0.0003, 0.0008),
          });
        }
      }
    }, heroRef);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroEl?.getBoundingClientRect();
      if (rect) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    heroEl?.addEventListener('mousemove', handleMouseMove);
    heroEl?.addEventListener('mouseleave', handleMouseLeave);

    let animationTime = 0;
    const animateParticles = () => {
      animationTime += 16;
      const repelRadius = 150;
      const repelStrength = 0.15;
      const returnStrength = 0.01;
      const friction = 0.92;

      particlesDataRef.current.forEach((p) => {
        const floatX = Math.sin(animationTime * p.floatSpeed + p.timeOffset) * p.floatRadiusX;
        const floatY = Math.cos(animationTime * p.floatSpeed * 0.8 + p.timeOffset) * p.floatRadiusY;

        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < repelRadius && distance > 0) {
          const force = (repelRadius - distance) / repelRadius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * repelStrength * 30;
          p.vy -= Math.sin(angle) * force * repelStrength * 30;
        }

        const targetX = p.baseX + floatX;
        const targetY = p.baseY + floatY;
        const returnDx = targetX - p.x;
        const returnDy = targetY - p.y;
        p.vx += returnDx * returnStrength;
        p.vy += returnDy * returnStrength;

        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        gsap.set(p.element, {
          x: p.x,
          y: p.y,
        });
      });

      rafRef.current = requestAnimationFrame(animateParticles);
    };

    rafRef.current = requestAnimationFrame(animateParticles);

    return () => {
      ctx.revert();
      heroEl?.removeEventListener('mousemove', handleMouseMove);
      heroEl?.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <section id="hero" className="hero theme-latte" ref={heroRef}>
      <div className="particles-container" ref={particlesRef}></div>
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-name" ref={nameRef}>
            {t('hero.name')}
          </h1>
          <h1 className="hero-surname" ref={surnameRef}>
            {t('hero.surname')}
          </h1>
          <p className="hero-subtitle" ref={subtitleRef}>
            {t('hero.subtitle.0')}
            <br />
            {t('hero.subtitle.1')}
            <br />
            {t('hero.subtitle.2')}
            <br />
            {t('hero.subtitle.3')}
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