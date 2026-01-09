import { useEffect } from 'react';

interface ThemeConfig {
  sectionId: string;
  theme: 'latte' | 'frappe' | 'macchiato' | 'mocha';
}

const themeConfigs: ThemeConfig[] = [
  { sectionId: 'hero', theme: 'latte' },
  { sectionId: 'about', theme: 'frappe' },
  { sectionId: 'portfolio', theme: 'frappe' },
  { sectionId: 'resume', theme: 'macchiato' },
  { sectionId: 'contact', theme: 'mocha' },
];

export const useScrollTheme = () => {
  useEffect(() => {
    const updateThemeColors = (theme: string) => {
      // Update header/hamburger colors based on current theme
      const hamburger = document.querySelector('.hamburger');
      const sidebar = document.querySelector('.sidebar');
      
      if (hamburger) {
        hamburger.setAttribute('data-theme', theme);
      }
      
      if (sidebar) {
        sidebar.setAttribute('data-theme', theme);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const config of themeConfigs) {
        const element = document.getElementById(config.sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            updateThemeColors(config.theme);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export default useScrollTheme;
