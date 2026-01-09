import React from 'react';
import './Legal.css';

const Impressum: React.FC = () => {
  return (
    <div className="legal-page theme-latte">
      <div className="legal-container">
        <h1>Impressum</h1>
        
        <section>
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            Vertreten durch:<br />
            Lukas Schaffrath<br />
            Hofgracht 7<br />
            52499 Baesweiler<br />
            Deutschland
          </p>
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            Telefon: +49 (0) 1520 7282881<br />
            E-Mail: info@webcommits.info
          </p>
        </section>

        <section>
          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Lukas Schaffrath<br />
            Hofgracht 7<br />
            52499 Baesweiler
          </p>
        </section>

        <section>
          <h2>Haftungsausschluss</h2>
          <h3>Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen 
            Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir 
            als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
            Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
            Tätigkeit hinweisen.
          </p>

          <h3>Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
            Seiten verantwortlich.
          </p>

          <h3>Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art 
            der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung 
            des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        <a href="/" className="back-link">← Zurück zur Startseite</a>
      </div>
    </div>
  );
};

export default Impressum;
