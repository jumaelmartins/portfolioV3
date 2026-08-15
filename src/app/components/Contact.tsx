import { CSSProperties } from 'react';
import { useApp } from '../context/AppContext';
import { Hoverable } from './primitives';
import { SectionKicker } from './SectionKicker';

const DISPLAY = "'Familjen Grotesk', sans-serif";

const WHATSAPP_HREF =
  'https://wa.me/5571999910206?text=Ol%C3%A1%2C%20vim%20pelo%20seu%20portf%C3%B3lio%21%20Gostaria%20de%20conversar%20sobre%20um%20projeto.';

const outlineBtn: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(255,255,255,0.16)',
  color: '#F2F1EE',
  fontWeight: 600,
  fontSize: '15px',
  padding: '17px 28px',
  borderRadius: '999px',
  transition: 'border-color .3s, transform .3s',
};
const outlineHover: CSSProperties = { borderColor: '#8B7CF6', transform: 'translateY(-3px)' };

export function Contact() {
  const { t } = useApp();

  return (
    <section
      id="contato"
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1240px',
        margin: '0 auto',
        padding: 'clamp(90px,12vw,140px) clamp(20px,4vw,28px) 90px',
      }}
    >
      <SectionKicker label={t('contact.kicker')} />

      <h2
        className="rv"
        style={{
          fontFamily: DISPLAY,
          fontWeight: 600,
          fontSize: 'clamp(40px,6.4vw,92px)',
          lineHeight: 0.98,
          letterSpacing: '-0.045em',
          margin: 0,
          maxWidth: '20ch',
        }}
      >
        {t('contact.headline')}
      </h2>
      <p style={{ fontSize: '19px', color: '#9EA0AE', margin: '28px 0 44px' }}>{t('contact.subtitle')}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
        <Hoverable
          as="a"
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#8B7CF6',
            color: '#0A0A0D',
            fontWeight: 600,
            fontSize: '15px',
            padding: '17px 28px',
            borderRadius: '999px',
            transition: 'transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s',
          }}
          hoverStyle={{ transform: 'translateY(-3px)', boxShadow: '0 18px 44px rgba(139,124,246,0.42)' }}
        >
          WhatsApp
        </Hoverable>
        <Hoverable as="a" href="tel:+5571999910206" style={outlineBtn} hoverStyle={outlineHover}>
          +55 (71) 999 910 206
        </Hoverable>
        <Hoverable as="a" href="https://linkedin.com/in/jumael-martins-nodejs" target="_blank" rel="noopener" style={outlineBtn} hoverStyle={outlineHover}>
          LinkedIn
        </Hoverable>
        <Hoverable as="a" href="https://github.com/jumaelmartins" target="_blank" rel="noopener" style={outlineBtn} hoverStyle={outlineHover}>
          GitHub
        </Hoverable>
      </div>
    </section>
  );
}
