<div align="center">

# 🌐 lukasschaffrath.online

**Persönliches Portfolio** von Lukas Schaffrath – Freiberuflicher Webentwickler aus Baesweiler bei Aachen.

[![Live Website](https://img.shields.io/badge/🔗_Live-lukasschaffrath.online-1e66f5?style=for-the-badge)](https://www.lukasschaffrath.online)
[![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![GSAP](https://img.shields.io/badge/GSAP-3.14-88ce02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com)

</div>

---

## ✨ Features

| Feature | Beschreibung |
|---|---|
| 🎨 **Catppuccin Themes** | 4 Farbpaletten (Latte → Frappé → Macchiato → Mocha), die sich beim Scrollen automatisch wechseln |
| ✨ **GSAP Animationen** | Scroll-getriggerte Animationen, Parallax-Effekte, schwebende Partikel und Timeline-Übergänge |
| 💼 **Portfolio Carousel** | Projekte im Laptop-Mockup-Frame mit animierten Übergängen |
| 📄 **Lebenslauf Timeline** | Berufserfahrung & Ausbildung mit animierter vertikaler Timeline |
| 📱 **Responsive Design** | Adaptive Navigation mit animiertem Hamburger-Menü |
| 📬 **Kontaktformular** | Serverlose Formulare via FormSubmit.co |
| 🔍 **SEO-optimiert** | Schema.org JSON-LD, Sitemap, robots.txt, Meta-Tags |

---

## 🎨 Design System – Catppuccin

Die Website nutzt die [Catppuccin](https://catppuccin.com/) Farbpalette. Beim Scrollen verändert sich das Theme progressiv von hell nach dunkel.


---

## 🏗️ Projektstruktur

```
src/
├── components/
│   ├── Hero/           # Landing Section mit Parallax & Partikel
│   ├── Header/         # Navigation mit adaptivem Hamburger-Menü
│   ├── About/          # Über mich mit animiertem Tech-Stack Background
│   ├── Portfolio/      # Projekt-Carousel mit Laptop-Mockup
│   ├── Resume/         # Timeline mit Toggle (Erfahrung/Ausbildung)
│   ├── Contact/        # Kontaktformular (FormSubmit.co)
│   ├── Footer/         # Footer mit Links & Copyright
│   ├── FloatingButtons/ # Schwebende Kontakt-Buttons
│   └── Loading/        # Gebrandeter Ladebildschirm
├── pages/
│   ├── Impressum.tsx   # Impressum (§5 TMG)
│   └── Datenschutz.tsx # Datenschutzerklärung (DSGVO)
├── hooks/
│   └── useScrollTheme.ts  # Scroll-basierter Theme-Wechsel
├── styles/
│   ├── themes.css      # Catppuccin Farbvariablen
│   └── global.css      # Globale Styles & Utilities
└── App.tsx             # Routing & Seitenaufbau
```

---

## 🛠️ Tech Stack

| Technologie | Zweck |
|---|---|
| **React 19** | UI-Framework |
| **TypeScript** | Typsicherheit |
| **GSAP 3.14** | Animationen & ScrollTrigger |
| **React Router 7** | Client-seitiges Routing |
| **Epilogue** | Schriftart (Google Fonts) |
| **FormSubmit.co** | Kontaktformular (serverlos) |
| **gh-pages** | Deployment auf GitHub Pages |

---

## 🚀 Lokale Entwicklung

### Voraussetzungen

- [Node.js](https://nodejs.org/) (v16+)
- npm

### Installation

```bash
# Repository klonen
git clone https://github.com/webCommits/portfolio.git
cd portfolio

# Dependencies installieren
npm install

# Entwicklungsserver starten
npm start
```

Die App läuft dann unter **http://localhost:3000**

### Deployment

```bash
# Baut und deployt automatisch auf GitHub Pages
npm run deploy
```

---


## 📄 Lizenz

© 2025 Lukas Schaffrath. Alle Rechte vorbehalten.

