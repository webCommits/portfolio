import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './Header.css';

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'de' ? 'en' : 'de';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      setIsScrolled(scrollPosition > 50);
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
              {t('header.start')}
            </a>
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              {t('header.about')}
            </a>
            <a 
              href="#portfolio" 
              className={activeSection === 'portfolio' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
            >
              {t('header.portfolio')}
            </a>
            <a 
              href="#resume" 
              className={activeSection === 'resume' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('resume'); }}
            >
              {t('header.resume')}
            </a>
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
            >
              {t('header.contact')}
            </a>
            <button 
              className="lang-toggle" 
              onClick={toggleLanguage}
              aria-label="Toggle language"
            >
              {i18n.language === 'de' ? 'EN' : 'DE'}
            </button>
          </nav>
        </div>
      </header>

      <button 
        className={`hamburger ${showHamburger ? 'visible' : ''} ${isSidebarOpen ? 'open' : ''}`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <a 
            href="#hero" 
            className={activeSection === 'hero' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}
          >
            {t('header.start')}
          </a>
          <a 
            href="#about" 
            className={activeSection === 'about' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
          >
            {t('header.about')}
          </a>
          <a 
            href="#portfolio" 
            className={activeSection === 'portfolio' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}
          >
            {t('header.portfolio')}
          </a>
          <a 
            href="#resume" 
            className={activeSection === 'resume' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('resume'); }}
          >
            {t('header.resume')}
          </a>
          <a 
            href="#contact" 
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}
          >
            {t('header.contact')}
          </a>
          <button 
            className="lang-toggle-sidebar" 
            onClick={toggleLanguage}
          >
            {i18n.language === 'de' ? '🇬🇧 English' : '🇩🇪 Deutsch'}
          </button>
        </nav>
      </div>

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
