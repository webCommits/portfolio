import React, { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      setIsScrolled(scrollPosition > 50);
      // Show hamburger menu after scrolling 300px
      setShowHamburger(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop Header (visible until hamburger appears) */}
      <header 
        className={`header ${isScrolled ? 'scrolled' : ''} ${showHamburger ? 'hidden' : ''}`}
      >
        <div className="header-container">
          <div className="logo" onClick={() => scrollToSection('hero')}>
            <span className="logo-name"><img src="/Logo.webp" alt="Logo" /></span>
          </div>
          <nav className="nav-menu">
            <a 
              href="#hero" 
              className={activeSection === 'hero' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
            >
              start
            </a>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              über mich
            </a>
            <a 
              href="#portfolio" 
              className={activeSection === 'portfolio' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
            >
              portfolio
            </a>
            <a 
              href="#resume" 
              className={activeSection === 'resume' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('resume'); }}
            >
              lebenslauf
            </a>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            >
              kontakt
            </a>
          </nav>
        </div>
      </header>

      {/* Hamburger Button */}
      <button 
        className={`hamburger ${showHamburger ? 'visible' : ''} ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <a 
            href="#hero" 
            className={activeSection === 'hero' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
          >
            start
          </a>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            über mich
          </a>
          <a 
            href="#portfolio" 
            className={activeSection === 'portfolio' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
          >
            portfolio
          </a>
          <a 
            href="#resume" 
            className={activeSection === 'resume' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('resume'); }}
          >
            lebenslauf
          </a>
          <a 
            href="#contact" 
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
          >
            kontakt
          </a>
        </nav>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
