import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';

const Footer: React.FC = () => {
  const { t } = useTranslation();

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
            {t('footer.impressum')}
          </a>
          <a href="/datenschutz" className="social-link" aria-label="Datenschutz">
            {t('footer.datenschutz')}
          </a>
        </div>
        <div className="footer-copyright">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
