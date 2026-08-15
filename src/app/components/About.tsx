import { CSSProperties } from 'react';
import { useApp } from '../context/AppContext';
import { useEducation, useExperience, ResumeEntry } from '../hooks/useResume';
import { SectionKicker } from './SectionKicker';
import fotoNova from '../../assets/FotoNova2.png';

const MONO = "'JetBrains Mono', monospace";
const DISPLAY = "'Familjen Grotesk', sans-serif";

const columnLabel: CSSProperties = {
  fontFamily: MONO,
  fontSize: '11.5px',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#8B7CF6',
  marginBottom: '20px',
};
const entryTitle: CSSProperties = { fontWeight: 600, fontSize: '15px' };
const entrySub: CSSProperties = { fontFamily: MONO, fontSize: '12px', color: '#8B8D9B', marginTop: '4px' };
const note: CSSProperties = { fontFamily: MONO, fontSize: '12px', color: '#8B8D9B' };

function ResumeColumn({
  label,
  items,
  loading,
  emptyMessage,
}: {
  label: string;
  items: ResumeEntry[];
  loading: boolean;
  emptyMessage: string;
}) {
  const { t } = useApp();
  return (
    <div>
      <div style={columnLabel}>{label}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {loading ? (
          <div style={note}>{t('about.loading')}</div>
        ) : items.length === 0 ? (
          <div style={note}>{emptyMessage}</div>
        ) : (
          items.map((item) => (
            <div key={item.id}>
              <div style={entryTitle}>{item.title}</div>
              {item.subtitle && <div style={entrySub}>{item.subtitle}</div>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export function About() {
  const { t } = useApp();
  const experience = useExperience();
  const education = useEducation();

  return (
    <section
      id="sobre"
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1240px',
        margin: '0 auto',
        padding: 'clamp(84px,11vw,130px) clamp(20px,4vw,28px)',
      }}
    >
      <SectionKicker label={t('about.kicker')} />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
          gap: 'clamp(40px,5vw,70px)',
          alignItems: 'start',
        }}
      >
        <div className="rv-blur">
          <div style={{ position: 'relative', borderRadius: '22px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.10)' }}>
            <img
              src={fotoNova}
              alt="Jumael Martins, Full Stack Software Engineer"
              width={900}
              height={600}
              loading="lazy"
              style={{ display: 'block', width: '100%', height: 'auto', filter: 'grayscale(0.25) contrast(1.05)' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg,rgba(10,10,13,0) 45%,rgba(10,10,13,0.75))',
              }}
            />
          </div>
          <div style={{ marginTop: '18px', fontFamily: MONO, fontSize: '12px', lineHeight: 1.9, color: '#8B8D9B' }}>
            <div>Jumael Martins</div>
            <div>{t('about.role')}</div>
            <div>{t('about.location')}</div>
          </div>
        </div>

        <div>
          <h2
            className="rv"
            style={{
              fontFamily: DISPLAY,
              fontWeight: 600,
              fontSize: 'clamp(32px,3.6vw,52px)',
              lineHeight: 1.06,
              letterSpacing: '-0.04em',
              margin: 0,
            }}
          >
            {t('about.headline')}
          </h2>
          <p
            className="rv"
            style={{ fontSize: '18px', lineHeight: 1.68, color: '#9EA0AE', margin: '26px 0 0', maxWidth: '62ch', textWrap: 'pretty' }}
          >
            {t('about.body')}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(220px,100%),1fr))',
              gap: '40px 44px',
              marginTop: '56px',
            }}
          >
            <ResumeColumn
              label={t('about.experience')}
              items={experience.items}
              loading={experience.loading}
              emptyMessage={t('about.expEmpty')}
            />
            <ResumeColumn
              label={t('about.education')}
              items={education.items}
              loading={education.loading}
              emptyMessage={t('about.eduEmpty')}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
