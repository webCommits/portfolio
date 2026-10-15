// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// react-router 7 relies on TextEncoder/TextDecoder, which jsdom's test
// environment does not provide by default.
if (typeof global.TextEncoder === 'undefined') {
  // @ts-ignore - Node's TextEncoder typings differ slightly from lib.dom's
  global.TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  // @ts-ignore - Node's TextDecoder typings differ slightly from lib.dom's
  global.TextDecoder = TextDecoder;
}

// jsdom does not implement window.matchMedia, which several components use
// to detect pointer-capable (desktop) devices.
if (typeof window.matchMedia === 'undefined') {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList;
}

// jsdom does not implement IntersectionObserver.
if (typeof window.IntersectionObserver === 'undefined') {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  // @ts-ignore - simplified mock, sufficient for rendering in tests
  window.IntersectionObserver = MockIntersectionObserver;
}

// jsdom's window.scrollTo / Element.scrollIntoView log "not implemented"
// errors; replace both with harmless no-ops for tests.
window.scrollTo = () => {};
window.HTMLElement.prototype.scrollIntoView = () => {};
