import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the top of the page on route changes.
 * Clean replacement for the window.scrollTo(0, 0) useEffect hack.
 * Works with React Router v7's classic <Routes> pattern.
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'instant', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
