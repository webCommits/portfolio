import { projects } from './Portfolio';
import de from '../../i18n/locales/de.json';
import en from '../../i18n/locales/en.json';

describe('Portfolio projects translation data', () => {
  const locales: Record<string, typeof de> = { de, en };

  it.each(Object.entries(locales))(
    'has title, description, and non-empty technologies for every project key in %s.json',
    (_localeName, locale) => {
      const localeProjects = locale.portfolio.projects as Record<
        string,
        { title: string; description: string; technologies: string[] }
      >;

      projects.forEach(({ key }) => {
        const entry = localeProjects[key];
        expect(entry).toBeDefined();
        expect(typeof entry.title).toBe('string');
        expect(entry.title.length).toBeGreaterThan(0);
        expect(typeof entry.description).toBe('string');
        expect(entry.description.length).toBeGreaterThan(0);
        expect(Array.isArray(entry.technologies)).toBe(true);
        expect(entry.technologies.length).toBeGreaterThan(0);
      });
    }
  );

  it.each(Object.entries(locales))(
    'has no extra portfolio.projects keys in %s.json beyond the projects list',
    (_localeName, locale) => {
      const localeProjectKeys = Object.keys(locale.portfolio.projects);
      const projectKeys = projects.map((project) => project.key);

      expect(localeProjectKeys.sort()).toEqual([...projectKeys].sort());
    }
  );

  it('does not contain duplicate project keys', () => {
    const keys = projects.map((project) => project.key);
    expect(new Set(keys).size).toBe(keys.length);
  });
});
