import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Portfolio from './components/Portfolio/Portfolio';
import Resume from './components/Resume/Resume';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import FloatingButtons from './components/FloatingButtons/FloatingButtons';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import useScrollTheme from './hooks/useScrollTheme';
import './styles/themes.css';
import './styles/global.css';
import './App.css';

function HomePage() {
  const [activeSection, setActiveSection] = useState('hero');
  
  useScrollTheme();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'portfolio', 'resume', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Loading />
      <Header activeSection={activeSection} />
      <FloatingButtons />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
      </Routes>
    </div>
  );
}

export default App;

