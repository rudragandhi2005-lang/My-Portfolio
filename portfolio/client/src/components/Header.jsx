import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, Download } from './Icons.jsx';

const links = ['about', 'skills', 'projects', 'education', 'contact'];

export default function Header({ profile }) {
  const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState(null); // section currently in view
  const [hover, setHover] = useState(null); // link under the pointer
  const [bar, setBar] = useState({ x: 0, w: 0, show: false });
  const [resizeTick, setResizeTick] = useState(0);
  const linkRefs = useRef({});

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  // Shrink the header once the page scrolls; clear the active link near the top.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.scrollY < 200) setActive(null);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is in the middle of the screen.
  useEffect(() => {
    const els = links.map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => setResizeTick((n) => n + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Slide the underline to the hovered link, or back to the active one.
  const target = hover ?? active;
  useEffect(() => {
    const el = target && linkRefs.current[target];
    if (!el) return setBar((b) => ({ ...b, show: false }));
    setBar({ x: el.offsetLeft, w: el.offsetWidth, show: true });
  }, [target, resizeTick]);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="container header-inner">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">{profile.initials}</span>
          <span className="brand-name">
            {profile.firstName} {profile.lastName}
          </span>
        </a>

        <nav className="nav" aria-label="Main" onMouseLeave={() => setHover(null)}>
          {links.map((l) => (
            <a
              key={l}
              href={`#${l}`}
              ref={(el) => (linkRefs.current[l] = el)}
              className={active === l ? 'is-active' : ''}
              aria-current={active === l ? 'true' : undefined}
              onMouseEnter={() => setHover(l)}
              onFocus={() => setHover(l)}
              onBlur={() => setHover(null)}
            >
              {l}
            </a>
          ))}
          <span
            className="nav-bar"
            aria-hidden="true"
            style={{ transform: `translateX(${bar.x}px)`, width: bar.w, opacity: bar.show ? 1 : 0 }}
          />
        </nav>

        <div className="header-actions">
          <button
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn-primary btn-sm cv-btn" href={profile.cv} download>
            <Download className="ico ico-down" />
            <span>Download CV</span>
          </a>
          <button
            className="menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className="mobile-nav" aria-hidden={!menuOpen}>
        <nav className="container" aria-label="Mobile">
          {links.map((l, i) => (
            <a
              key={l}
              href={`#${l}`}
              style={{ '--i': i }}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
