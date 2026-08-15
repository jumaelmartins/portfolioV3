import { CSSProperties, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Hoverable } from './primitives';

const MONO = "'JetBrains Mono', monospace";

const navLink: CSSProperties = {
  fontFamily: MONO,
  fontSize: '12.5px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#8B8D9B',
  transition: 'color .25s',
};

export function Header() {
  const { t, language, toggleLanguage } = useApp();
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const apply = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    apply();
    window.addEventListener('scroll', apply, { passive: true });
    window.addEventListener('resize', apply, { passive: true });
    return () => {
      window.removeEventListener('scroll', apply);
      window.removeEventListener('resize', apply);
    };
  }, []);

  const nav = [
    { href: '#sobre', label: t('nav.about') },
    { href: '#servicos', label: t('nav.services') },
    { href: '#projetos', label: t('nav.projects') },
    { href: '#blog', label: t('nav.blog') },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        background: 'rgba(10,10,13,0.72)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '14px clamp(20px,4vw,28px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px 18px',
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: MONO,
            fontSize: '16px',
            fontWeight: 500,
            color: '#F2F1EE',
            letterSpacing: '-0.02em',
          }}
        >
          &lt;<span style={{ color: '#8B7CF6' }}>JM</span>/&gt;
        </a>

        <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 26px' }}>
          {nav.map((item) => (
            <Hoverable key={item.href} as="a" href={item.href} style={navLink} hoverStyle={{ color: '#F2F1EE' }}>
              {item.label}
            </Hoverable>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Hoverable
            as="button"
            type="button"
            onClick={toggleLanguage}
            aria-label={language === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            style={{
              fontFamily: MONO,
              fontSize: '12px',
              letterSpacing: '0.1em',
              color: '#8B8D9B',
              background: 'transparent',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(255,255,255,0.12)',
              borderRadius: '999px',
              padding: '7px 12px',
              cursor: 'pointer',
              transition: 'color .25s, border-color .25s',
            }}
            hoverStyle={{ color: '#F2F1EE', borderColor: 'rgba(139,124,246,0.5)' }}
          >
            {language === 'pt' ? 'EN' : 'PT'}
          </Hoverable>

          <Hoverable
            as="a"
            href="#contato"
            style={{
              fontFamily: MONO,
              fontSize: '12.5px',
              letterSpacing: '0.06em',
              color: '#0A0A0D',
              background: '#F2F1EE',
              borderRadius: '999px',
              padding: '10px 18px',
              transition: 'transform .25s cubic-bezier(.2,.8,.2,1), box-shadow .25s',
            }}
            hoverStyle={{ transform: 'translateY(-2px)', boxShadow: '0 10px 30px rgba(139,124,246,0.35)' }}
          >
            {t('nav.contact')}
          </Hoverable>
        </div>
      </div>

      <div
        ref={barRef}
        style={{ height: '1px', background: '#8B7CF6', transformOrigin: '0 50%', transform: 'scaleX(0)' }}
      />
    </header>
  );
}
