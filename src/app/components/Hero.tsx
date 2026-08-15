import { CSSProperties } from 'react';
import { useApp } from '../context/AppContext';
import { Hoverable } from './primitives';
import { Globe } from './Globe';

const MONO = "'JetBrains Mono', monospace";
const DISPLAY = "'Familjen Grotesk', sans-serif";

const maskLine: CSSProperties = { display: 'block', overflow: 'hidden', paddingBottom: '2px' };
const codeRow: CSSProperties = {};
const statCard: CSSProperties = {
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '18px',
  padding: '20px',
  background: 'rgba(18,19,26,0.7)',
};
const statNum: CSSProperties = {
  fontFamily: DISPLAY,
  fontSize: '38px',
  fontWeight: 600,
  letterSpacing: '-0.04em',
};
const statLabel: CSSProperties = {
  fontFamily: MONO,
  fontSize: '11px',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#8B8D9B',
  marginTop: '6px',
};

export function Hero() {
  const { t } = useApp();

  return (
    <section
      id="top"
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1240px',
        margin: '0 auto',
        padding: 'clamp(126px,17vw,186px) clamp(20px,4vw,28px) 96px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '56px',
        alignItems: 'flex-end',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      <Globe
        style={{
          position: 'absolute',
          top: '14%',
          right: '-4%',
          width: 'min(600px,68vw)',
          aspectRatio: '1',
          pointerEvents: 'none',
          opacity: 0.5,
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, flex: '1 1 440px', minWidth: 0 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px 14px',
            border: '1px solid rgba(139,124,246,0.34)',
            borderRadius: '999px',
            background: 'rgba(139,124,246,0.10)',
            animation: 'riseSoft .8s cubic-bezier(.2,.8,.2,1) both',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#7CF6B0',
              boxShadow: '0 0 12px #7CF6B0',
              animation: 'blink 1.8s steps(1,end) infinite',
            }}
          />
          <span
            style={{
              fontFamily: MONO,
              fontSize: '11.5px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#C4BBFB',
            }}
          >
            {t('hero.badge')}
          </span>
        </div>

        <h1
          style={{
            fontFamily: DISPLAY,
            fontWeight: 600,
            fontSize: 'clamp(52px,7.4vw,108px)',
            lineHeight: 0.94,
            letterSpacing: '-0.045em',
            margin: '30px 0 0',
            textWrap: 'balance',
          }}
        >
          <span style={maskLine}>
            <span style={{ display: 'block', animation: 'unmask 1s cubic-bezier(.16,1,.3,1) .05s both' }}>
              {t('hero.title1')}
            </span>
          </span>
          <span style={maskLine}>
            <span style={{ display: 'block', animation: 'unmask 1s cubic-bezier(.16,1,.3,1) .16s both' }}>
              {t('hero.title2')}
            </span>
          </span>
          <span style={{ ...maskLine, paddingBottom: '8px' }}>
            <span
              style={{
                display: 'block',
                color: '#8B7CF6',
                fontStyle: 'italic',
                animation: 'unmask 1s cubic-bezier(.16,1,.3,1) .27s both',
              }}
            >
              {t('hero.title3')}
            </span>
          </span>
        </h1>

        <p
          style={{
            maxWidth: '60ch',
            fontSize: '19px',
            lineHeight: 1.62,
            color: '#9EA0AE',
            margin: '26px 0 0',
            animation: 'riseSoft .9s cubic-bezier(.2,.8,.2,1) .5s both',
            textWrap: 'pretty',
          }}
        >
          {t('hero.subtitle')}
        </p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            marginTop: '38px',
            animation: 'riseSoft .9s cubic-bezier(.2,.8,.2,1) .62s both',
          }}
        >
          <Hoverable
            as="a"
            href="#contato"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#8B7CF6',
              color: '#0A0A0D',
              fontWeight: 600,
              fontSize: '15px',
              padding: '16px 26px',
              borderRadius: '999px',
              transition: 'transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s',
            }}
            hoverStyle={{ transform: 'translateY(-3px)', boxShadow: '0 18px 44px rgba(139,124,246,0.42)' }}
          >
            {t('hero.cta1')}
          </Hoverable>
          <Hoverable
            as="a"
            href="#projetos"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'rgba(255,255,255,0.16)',
              color: '#F2F1EE',
              fontWeight: 600,
              fontSize: '15px',
              padding: '16px 26px',
              borderRadius: '999px',
              transition: 'border-color .3s, transform .3s',
            }}
            hoverStyle={{ borderColor: '#8B7CF6', transform: 'translateY(-3px)' }}
          >
            {t('hero.cta2')}
          </Hoverable>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: '1 1 300px',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          animation: 'blurIn 1.2s cubic-bezier(.16,1,.3,1) .4s both',
        }}
      >
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: '18px',
            background: 'linear-gradient(180deg,rgba(23,25,34,0.9),rgba(18,19,26,0.9))',
            padding: '22px',
            fontFamily: MONO,
            fontSize: '12.5px',
            lineHeight: 2,
            color: '#8B8D9B',
          }}
        >
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'rgba(255,255,255,0.14)' }} />
            ))}
          </div>
          <div style={codeRow}>
            <span style={{ color: '#8B7CF6' }}>role</span> = "Full Stack Engineer"
          </div>
          <div style={codeRow}>
            <span style={{ color: '#8B7CF6' }}>stack</span> = ["Node", "TS", "React", "Python"]
          </div>
          <div style={codeRow}>
            <span style={{ color: '#8B7CF6' }}>focus</span> = "{t('hero.focus')}"
          </div>
          <div style={codeRow}>
            <span style={{ color: '#8B7CF6' }}>base</span> = "{t('hero.base')}"
          </div>
          <div style={{ color: '#7CF6B0' }}>
            status = ready<span style={{ animation: 'blink 1.1s steps(1,end) infinite' }}>_</span>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(min(140px,100%),1fr))',
            gap: '18px',
          }}
        >
          <div style={statCard}>
            <div style={statNum}>20+</div>
            <div style={statLabel}>{t('hero.stat1')}</div>
          </div>
          <div style={statCard}>
            <div style={statNum}>+3</div>
            <div style={statLabel}>{t('hero.stat2')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
