# AGENTS.md

Guidelines for AI coding agents working in this codebase.

## Project Overview

Personal portfolio website built with React 19, TypeScript, and GSAP animations. Uses Catppuccin theme system with progressive color transitions on scroll. Focuses on high-end, modern UI/UX with "Bento Box" layouts, interactive mouse-reactive elements, and 3D parallax GSAP effects. German/English internationalization via i18next. SEO-optimized and deployed to GitHub Pages.

## Build/Lint/Test Commands

```bash
npm start                  # Development server
npm run build              # Production build
npm test                   # Run tests
npm test -- src/components/Header/Header.test.tsx  # Run single test
npm test -- --coverage --watchAll=false   # Tests with coverage
npm run deploy             # Deploy to GitHub Pages
```

Note: Uses Create React App with react-scripts. Tests use Jest + React Testing Library.

## Code Style Guidelines

### Import Order

Group imports with blank lines between:
1. React imports
2. Third-party libraries (react-router-dom, gsap, i18next)
3. Local components/hooks/assets
4. CSS files

```typescript
import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ComponentName from './ComponentName';
import useCustomHook from '../hooks/useCustomHook';

import './Component.css';
```

### Component Structure

- Use functional components with `React.FC<Props>` type annotation
- Define interfaces at top of file, before component
- Export components as default

```typescript
interface ComponentProps {
  activeSection: string;
}

const ComponentName: React.FC<ComponentProps> = ({ activeSection }) => {
  // hooks, state, effects, handlers, render
};

export default ComponentName;
```

### GSAP Animation Pattern

Always use `gsap.context` with cleanup to prevent memory leaks:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.from(elementRef.current, {
      scrollTrigger: { trigger: elementRef.current, start: 'top 80%' },
      y: 50,
      opacity: 0,
      duration: 1,
    });
  }, elementRef);

  return () => ctx.revert();
}, []);
```

Register GSAP plugins before use: `gsap.registerPlugin(ScrollTrigger);`

### Refs

Type refs explicitly: `const containerRef = useRef<HTMLElement>(null);`

### Naming Conventions

- **Components:** PascalCase (Header, Hero, Portfolio)
- **Files:** Match component name (Header.tsx, Header.css)
- **Hooks:** camelCase with `use` prefix (useScrollTheme)
- **CSS classes:** kebab-case (.hero-container, .portfolio-mockup)
- **Translation keys:** dot notation (t('hero.name'), t('portfolio.projects.key.title'))

### File Organization

```
src/
├── components/ComponentName/ComponentName.tsx, ComponentName.css
├── hooks/useHookName.ts
├── pages/PageName.tsx
├── styles/themes.css, global.css
├── i18n/index.ts, locales/de.json, en.json
└── App.tsx
```

### Theme System

Catppuccin color palette with four theme variants applied via CSS classes:

- `.theme-latte` - Light theme
- `.theme-frappe` - Medium dark
- `.theme-macchiato` - Dark
- `.theme-mocha` - Darkest

Access colors via CSS variables: `var(--base)`, `var(--text)`, `var(--surface1)`, `var(--mauve)`, `var(--sky)`, etc.

*Advanced Styling:* Use CSS `color-mix` with CSS variables for dynamic themes: 
`color-mix(in srgb, var(--item-color) 20%, transparent)`
Use inline styles for dynamic component custom properties:
`style={{ '--item-color': group.color } as React.CSSProperties}`

### i18n Usage

```typescript
const { t, i18n } = useTranslation();
t('header.about');                                    // Simple translation
t('key', { returnObjects: true }) as string[]        // Array for lists
i18n.changeLanguage('en');                            // Change language
```

### TypeScript Configuration

Strict mode enabled. Target: ES5. JSX: react-jsx. Module: ESNext. Module resolution: Node.

### Error Handling

Use optional chaining for DOM manipulation. Check element existence before GSAP operations:

```typescript
const element = document.getElementById('section');
if (element) {
  element.scrollIntoView({ behavior: 'smooth' });
}
```

### ESLint

Extends `react-app` and `react-app/jest` presets. No Prettier config present.

### Animation Patterns

1. **ScrollTrigger entrance:** `gsap.from(elementRef.current, { scrollTrigger: {...}, y: 50, opacity: 0, duration: 1 });`
2. **Timeline:** `const tl = gsap.timeline({ defaults: { ease: 'power3.out' } }); tl.from(el1, {...}).from(el2, {...}, '-=0.7');`
3. **Floating:** `gsap.to(element, { y: 'random(-80, 80)', duration: 'random(10, 15)', repeat: -1, yoyo: true, ease: 'sine.inOut' });`
4. **High-Performance Mouse Tracking:** Use `gsap.quickTo()` for mouse/cursor followers.
```typescript
const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
window.addEventListener('mousemove', (e) => xTo(e.clientX));
```
5. **Device Optimization:** Use `window.matchMedia("(pointer: fine)").matches` to restrict intensive mouse/hover 3D animations (`rotationX/Y`) to desktop, and implement ScrollTrigger fallback proxies for mobile UI (Touch sweeps).

### Form Integration
Contact section uses FormSubmit. Do NOT use custom React Router success routes (e.g., `/danke`). Just point `<form action="...">` and let FormSubmit handle the default success flow locally.

### SEO & Web Vitals
When generating pages, maintain strict HTML5 semantic standards. Meta-tags, JSON-LD Schema, and WebManifest are actively managed in `public/index.html`. 

### Testing

```typescript
import { render, screen } from '@testing-library/react';
import Component from './Component';

test('renders expected content', () => {
  render(<Component />);
  expect(screen.getByText(/content/i)).toBeInTheDocument();
});
```

### Deployment

`npm run build` → `npm run deploy` to GitHub Pages. Output directory: `build/`