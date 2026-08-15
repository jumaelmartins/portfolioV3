import { CSSProperties } from 'react';
import { useApp } from '../context/AppContext';

const MONO = "'JetBrains Mono', monospace";
const DISPLAY = "'Familjen Grotesk', sans-serif";

interface CaseItem {
  client: string;
  title: string;
  body: string;
  stats: { value: string; label: string }[];
}

const card: CSSProperties = {
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: '22px',
  padding: '34px',
  background: 'rgba(18,19,26,0.6)',
};

/** Two outcome-focused case cards. Rendered directly under the projects list. */
export function CaseStudies() {
  const { t } = useApp();
  const items = t('cases.items') as CaseItem[];

  return (
    <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(20px,4vw,28px) clamp(20px,4vw,28px)' }}>
      <div
        style={{
          marginTop: '70px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
          gap: '22px',
        }}
      >
        {items.map((c) => (
          <div key={c.client} className="rv" style={card}>
            <div style={{ fontFamily: MONO, fontSize: '11.5px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8B7CF6' }}>
              {c.client}
            </div>
            <h3 style={{ fontFamily: DISPLAY, fontSize: '26px', fontWeight: 600, letterSpacing: '-0.03em', margin: '14px 0 12px' }}>
              {c.title}
            </h3>
            <p style={{ fontSize: '15.5px', lineHeight: 1.66, color: '#9EA0AE', margin: '0 0 22px' }}>{c.body}</p>
            <div style={{ display: 'flex', gap: '34px' }}>
              {c.stats.map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: DISPLAY, fontSize: '34px', fontWeight: 600, letterSpacing: '-0.04em', color: '#8B7CF6' }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: MONO, fontSize: '11px', color: '#8B8D9B', marginTop: '4px' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
