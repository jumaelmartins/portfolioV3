import { CSSProperties, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Hoverable } from './primitives';
import { SectionKicker } from './SectionKicker';

const MONO = "'JetBrains Mono', monospace";
const DISPLAY = "'Familjen Grotesk', sans-serif";

interface ServiceItem {
  n: string;
  title: string;
  desc: string;
  tags: string[];
  price: string;
  featured?: boolean;
}

const pill: CSSProperties = {
  fontFamily: MONO,
  fontSize: '11.5px',
  color: '#8B8D9B',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '999px',
  padding: '6px 12px',
};

const arrowBtn: CSSProperties = {
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(255,255,255,0.16)',
  background: 'transparent',
  color: '#F2F1EE',
  fontSize: '17px',
  cursor: 'pointer',
  transition: 'border-color .3s, transform .3s, background .3s',
};
const arrowHover: CSSProperties = {
  borderColor: '#8B7CF6',
  background: 'rgba(139,124,246,0.12)',
  transform: 'translateY(-2px)',
};

function ServiceCard({ item, isLast }: { item: ServiceItem; isLast: boolean }) {
  const { t } = useApp();
  return (
    <Hoverable
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: item.featured ? 'rgba(139,124,246,0.34)' : 'rgba(255,255,255,0.09)',
        borderRadius: '22px',
        padding: '34px',
        flex: '0 0 clamp(272px,78vw,352px)',
        scrollSnapAlign: 'start',
        background: item.featured
          ? 'linear-gradient(180deg,rgba(139,124,246,0.10),rgba(10,10,13,0.6))'
          : 'rgba(10,10,13,0.6)',
        transition: 'transform .4s cubic-bezier(.2,.8,.2,1), border-color .4s, box-shadow .4s',
      }}
      hoverStyle={{
        transform: 'translateY(-8px)',
        borderColor: item.featured ? 'rgba(139,124,246,0.7)' : 'rgba(139,124,246,0.45)',
        boxShadow: item.featured ? '0 24px 60px rgba(139,124,246,0.18)' : '0 24px 60px rgba(0,0,0,0.5)',
      }}
    >
      <div style={{ fontFamily: MONO, fontSize: '12px', color: '#8B7CF6', letterSpacing: '0.1em' }}>{item.n}</div>
      <h3 style={{ fontFamily: DISPLAY, fontSize: '27px', fontWeight: 600, letterSpacing: '-0.03em', margin: '16px 0 12px' }}>
        {item.title}
      </h3>
      <p style={{ fontSize: '15.5px', lineHeight: 1.66, color: '#9EA0AE', margin: '0 0 24px' }}>{item.desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '26px' }}>
        {item.tags.map((tag) => (
          <span key={tag} style={pill}>{tag}</span>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '18px', fontFamily: MONO, fontSize: '12px', color: '#8B8D9B' }}>
        <span>{item.price}</span>
        {!isLast && <> <span style={{ color: '#F2F1EE' }}>R$ —</span></>} · <span>{t('services.onRequest')}</span>
      </div>
    </Hoverable>
  );
}

export function Services() {
  const { t } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);
  const items = t('services.items') as ServiceItem[];

  const nudge = (dir: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.getBoundingClientRect().width + 22 : track.clientWidth * 0.8;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section
      id="servicos"
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(18,19,26,0.55)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(84px,11vw,130px) clamp(20px,4vw,28px)' }}>
        <SectionKicker label={t('services.kicker')} />
        <h2
          className="rv"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 600,
            fontSize: 'clamp(32px,3.6vw,52px)',
            lineHeight: 1.06,
            letterSpacing: '-0.04em',
            margin: '0 0 26px',
          }}
        >
          {t('services.headline')}
        </h2>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', margin: '0 0 22px' }}>
          <span style={{ fontFamily: MONO, fontSize: '11.5px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7A7C8A' }}>
            {t('services.hint')}
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Hoverable as="button" type="button" aria-label="Anterior" onClick={() => nudge(-1)} style={arrowBtn} hoverStyle={arrowHover}>
              &#8592;
            </Hoverable>
            <Hoverable as="button" type="button" aria-label="Próximo" onClick={() => nudge(1)} style={arrowBtn} hoverStyle={arrowHover}>
              &#8594;
            </Hoverable>
          </div>
        </div>

        <div
          ref={trackRef}
          data-track="services"
          style={{
            display: 'flex',
            gap: '22px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            padding: '8px 2px 26px',
            scrollPaddingLeft: '2px',
          }}
        >
          {items.map((item, i) => (
            <ServiceCard key={item.n} item={item} isLast={i === items.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
