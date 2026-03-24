# AGENTS.md

Guidelines for AI coding agents working in this codebase.

## Project Overview

Personal portfolio website built with React 19, TypeScript, and GSAP animations. Uses Catppuccin theme system with progressive color transitions on scroll. Features "Bento Box" layouts, interactive mouse-reactive elements, 3D parallax effects, and German/English i18next internationalization. SEO-optimized, deployed to GitHub Pages.

## Build/Lint/Test Commands

```bash
npm start                  # Development server (localhost:3000)
npm run build              # Production build
npm test                   # Run all tests (Jest watch mode)
npm test -- --watchAll=false  # Run tests once (no watch)
npm test -- --coverage --watchAll=false  # Tests with coverage
npm test -- src/components/Header/Header.test.tsx  # Run single test file
npm run deploy             # Deploy to GitHub Pages
```

Uses Create React App (react-scripts 5.0.1). No standalone lint command - ESLint runs via react-scripts.

## Code Style Guidelines

### Import Order

Group imports with blank lines between groups:

```typescript
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route } from 'react-router-dom';

import ComponentName from './ComponentName';
import useCustomHook from '../hooks/useCustomHook';
import './Component.css';
```

Order: React → Third-party libraries → Local imports → CSS files

### Component Structure

```typescript
interface Project {
  id: number;
  key: string;
  link: string;
}

interface ComponentProps {
  activeSection: string;
  onNavigate?: (section: string) => void;
}

const ComponentName: React.FC<ComponentProps> = ({ activeSection, onNavigate }) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    // GSAP animations here
  }, []);

  return (
    <section id="component-name" className="component-name theme-latte" ref={containerRef}>
      {/* content */}
    </section>
  );
};

export default ComponentName;
```

- Use `React.FC<Props>` type annotation
- Define interfaces before component
- Export as default
- Destructure props in function signature

### GSAP Animation Patterns

Always wrap in `gsap.context` with cleanup:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(elementRef.current, {
      scrollTrigger: { 
        trigger: elementRef.current, 
        start: 'top 80%' 
      },
      y: 50,
      opacity: 0,
      duration: 1,
    });
  }, elementRef);

  return () => ctx.revert();
}, []);
```

Register plugins at component top: `gsap.registerPlugin(ScrollTrigger);`

Animation types used:
- **Entrance:** `gsap.from()` with ScrollTrigger
- **Timeline:** `gsap.timeline({ defaults: { ease: 'power3.out' } })`
- **Floating:** `gsap.to(el, { y: -20, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' })`
- **Mouse tracking:** Use `gsap.quickTo()` for performance
- **Scroll parallax:** `scrollTrigger: { scrub: 1 }`

### Refs

Type explicitly with null initial value:

```typescript
const containerRef = useRef<HTMLElement>(null);
const itemsRef = useRef<HTMLDivElement[]>([]);
const dataRef = useRef<CustomType[]>([]);
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Header`, `Hero`, `Portfolio` |
| Files | Match component | `Header.tsx`, `Header.css` |
| Hooks | camelCase + use | `useScrollTheme` |
| CSS classes | kebab-case | `.hero-container`, `.portfolio-mockup` |
| Interfaces | PascalCase | `Project`, `ComponentProps` |
| Translation keys | dot notation | `t('hero.name')`, `t('portfolio.projects.key.title')` |
| Constants | camelCase | `colorPalette`, `themeConfigs` |

### File Organization

```
src/
├── components/ComponentName/ComponentName.tsx, ComponentName.css
├── hooks/useHookName.ts
├── pages/PageName.tsx, PageName.css
├── styles/themes.css, global.css
├── i18n/index.ts, locales/de.json, en.json
├── assets/
├── App.tsx, App.css
└── index.tsx
```

### Theme System

Catppuccin palette with four variants via CSS classes:

- `.theme-latte` - Light
- `.theme-frappe` - Medium dark
- `.theme-macchiato` - Dark
- `.theme-mocha` - Darkest

Available CSS variables: `--base`, `--text`, `--surface0`, `--surface1`, `--surface2`, `--mauve`, `--sky`, `--blue`, `--lavender`, `--teal`, `--green`, `--yellow`, `--peach`, `--red`, `--pink`

Dynamic theming with `color-mix`:
```css
background: color-mix(in srgb, var(--item-color) 20%, transparent);
```

Inline style custom properties:
```typescript
style={{ '--item-color': group.color } as React.CSSProperties}
```

### i18n Usage

```typescript
const { t, i18n } = useTranslation();

t('header.about');                                           // Simple string
t('portfolio.projects.key.technologies', { returnObjects: true }) as string[]  // Array
i18n.changeLanguage('en');                                   // Switch language
```

Fallback language is German (`de`). Detection via localStorage and navigator.

### TypeScript Configuration

Strict mode enabled. Target: ES5. JSX: `react-jsx`. Module: ESNext. Resolution: Node.

### Error Handling

Use optional chaining for DOM operations. Check element existence:

```typescript
const element = document.getElementById('section');
if (element) {
  element.scrollIntoView({ behavior: 'smooth' });
}

// Or with optional chaining
heroEl?.addEventListener('mousemove', handleMouseMove);
```

### Testing

```typescript
import { render, screen } from '@testing-library/react';
import Component from './Component';

test('renders expected content', () => {
  render(<Component />);
  expect(screen.getByText(/content/i)).toBeInTheDocument();
});
```

Tests use Jest + React Testing Library. Mock i18next when needed.

### Form Integration

Contact form uses FormSubmit service. Point form action directly:

```typescript
<form action="https://formsubmit.co/email@example.com" method="POST">
```

Do NOT create custom React Router success routes. Let FormSubmit handle redirects.

### SEO & Web Vitals

Maintain HTML5 semantic standards. Meta tags, JSON-LD Schema, and WebManifest are in `public/index.html`. Use semantic elements (`<section>`, `<main>`, `<nav>`).

### Device Optimization

Restrict intensive 3D hover animations to desktop:

```typescript
const isDesktop = window.matchMedia("(pointer: fine)").matches;
```

Provide ScrollTrigger fallbacks for mobile touch interfaces.

### Deployment

```bash
npm run build   # Creates build/ directory
npm run deploy  # Deploys to gh-pages branch
```

Output: `build/`. Uses homepage field in package.json for path resolution.
