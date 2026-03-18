import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorIconRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isLinkHover, setIsLinkHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorDotRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      gsap.to(cursorRingRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
      gsap.to(cursorIconRef.current, {
        x: e.clientX + 12,
        y: e.clientY - 12,
        duration: 0.1,
      });
    };

    const handleButtonEnter = () => {
      setIsHovering(true);
      setIsLinkHover(false);
    };
    const handleButtonLeave = () => setIsHovering(false);
    
    const handleLinkEnter = () => {
      setIsHovering(true);
      setIsLinkHover(true);
    };
    const handleLinkLeave = () => {
      setIsHovering(false);
      setIsLinkHover(false);
    };

    window.addEventListener('mousemove', moveCursor);

    const buttons = document.querySelectorAll('button, input[type="submit"], input[type="button"], [role="button"]');
    const links = document.querySelectorAll('a');

    buttons.forEach(el => {
      el.addEventListener('mouseenter', handleButtonEnter);
      el.addEventListener('mouseleave', handleButtonLeave);
    });

    links.forEach(el => {
      el.addEventListener('mouseenter', handleLinkEnter);
      el.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      buttons.forEach(el => {
        el.removeEventListener('mouseenter', handleButtonEnter);
        el.removeEventListener('mouseleave', handleButtonLeave);
      });
      links.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkEnter);
        el.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={`custom-cursor-dot ${isHovering ? 'hovering' : ''}`} 
        ref={cursorDotRef}
      ></div>
      <div 
        className={`custom-cursor-ring ${isHovering ? 'hovering' : ''}`} 
        ref={cursorRingRef}
      ></div>
      <div 
        className={`cursor-link-icon ${isLinkHover ? 'visible' : ''}`} 
        ref={cursorIconRef}
      >
        ↗
      </div>
    </>
  );
};

export default CustomCursor;