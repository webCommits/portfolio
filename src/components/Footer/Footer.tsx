import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer theme-latte">
      <div className="footer-container">
        <div className="footer-brand">
            <img src="/webCommits-logo.webp" alt="webCommits Logo" />
        </div>
        <div className="footer-social">
          <a href="https://github.com/LStoneyy" className="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="/impressum" className="social-link" aria-label="Impressum">
            Impressum
          </a>
          <a href="/datenschutz" className="social-link" aria-label="Datenschutz">
            Datenschutz
          </a>
        </div>
        <div className="footer-copyright">
          <p>© {new Date().getFullYear()} webCommits web Designs.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
