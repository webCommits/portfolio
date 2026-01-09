import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Legal.css';

const Danke: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="legal-page theme-latte">
      <div className="legal-container" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <svg 
            width="100" 
            height="100" 
            viewBox="0 0 100 100" 
            fill="none" 
            style={{ margin: '0 auto', display: 'block' }}
          >
            <circle cx="50" cy="50" r="45" stroke="var(--sky)" strokeWidth="4" fill="none" />
            <path 
              d="M30 50 L42 62 L70 34" 
              stroke="var(--green)" 
              strokeWidth="6" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        <h1 style={{ color: 'var(--sky)', marginBottom: '1.5rem' }}>Nachricht erfolgreich gesendet!</h1>
        
        <p style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: '2rem', lineHeight: '1.8' }}>
          Vielen Dank für Ihre Nachricht! Ich habe Ihre Anfrage erhalten und werde mich 
          schnellstmöglich bei Ihnen melden – in der Regel innerhalb von 24 Stunden.
        </p>

        <p style={{ fontSize: '1rem', color: 'var(--subtext0)', marginBottom: '3rem' }}>
          Sie werden in Kürze eine Bestätigungs-E-Mail erhalten.
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/')}
            style={{
              padding: '1rem 2rem',
              background: 'var(--sky)',
              color: 'var(--base)',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--blue)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--sky)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            ← Zurück zur Startseite
          </button>

          <button 
            onClick={() => navigate('/#portfolio')}
            style={{
              padding: '1rem 2rem',
              background: 'transparent',
              color: 'var(--sky)',
              border: '2px solid var(--sky)',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--sky)';
              e.currentTarget.style.color = 'var(--base)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--sky)';
            }}
          >
            Portfolio ansehen →
          </button>
        </div>

        <div style={{ 
          marginTop: '4rem', 
          padding: '2rem', 
          background: 'var(--surface1)', 
          borderRadius: '15px',
          border: '1px solid var(--surface2)'
        }}>
          <h3 style={{ color: 'var(--text)', marginBottom: '1rem', fontSize: '1.3rem' }}>
            Direkter Kontakt
          </h3>
          <p style={{ color: 'var(--subtext0)', marginBottom: '1rem' }}>
            Für dringende Anliegen erreichen Sie mich auch direkt:
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="mailto:webcommitswebdesigns@gmail.com"
              style={{ 
                color: 'var(--sky)', 
                textDecoration: 'none',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              webcommitswebdesigns@gmail.com
            </a>
            <a 
              href="tel:+4915207282881"
              style={{ 
                color: 'var(--sky)', 
                textDecoration: 'none',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
              +49 152 07282881
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Danke;
