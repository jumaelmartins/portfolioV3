import { CSSProperties } from 'react';
import { useApp } from '../context/AppContext';
import { useProjects, UiProject } from '../hooks/useProjects';
import { Hoverable } from './primitives';
import { SectionKicker } from './SectionKicker';

const MONO = "'JetBrains Mono', monospace";
const DISPLAY = "'Familjen Grotesk', sans-serif";

const pill: CSSProperties = {
  fontFamily: MONO,
  fontSize: '11.5px',
  color: '#8B8D9B',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '999px',
  padding: '6px 12px',
};
const linkBtn: CSSProperties = {
  fontFamily: MONO,
  fontSize: '12.5px',
  color: '#F2F1EE',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'rgba(255,255,255,0.16)',
  borderRadius: '999px',
  padding: '12px 20px',
  transition: 'border-color .3s, transform .3s',
};
const linkHover: CSSProperties = { borderColor: '#8B7CF6', transform: 'translateY(-2px)' };
const note: CSSProperties = {
  fontFamily: MONO,
  fontSize: '13px',
  color: '#8B8D9B',
  padding: '40px 8px',
  borderTop: '1px solid rgba(255,255,255,0.09)',
};

function ProjectRow({ project, index }: { project: UiProject; index: number }) {
  const { t } = useApp();
  const num = String(index + 1).padStart(3, '0');

  return (
    <details style={{ borderTop: '1px solid rgba(255,255,255,0.09)' }} className="rv">
      <Hoverable
        as="summary"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '12px 26px',
          padding: '34px 8px',
          cursor: 'pointer',
          color: '#F2F1EE',
          transition: 'padding-left .45s cubic-bezier(.2,.8,.2,1), background .45s',
        }}
        hoverStyle={{ paddingLeft: '24px', background: 'rgba(139,124,246,0.06)' }}
      >
        <span style={{ flex: '0 0 42px', fontFamily: MONO, fontSize: '12px', color: '#8B7CF6' }}>{num}</span>
        <span
          style={{
            flex: '0 1 auto',
            minWidth: '180px',
            fontFamily: DISPLAY,
            fontSize: 'clamp(24px,2.6vw,38px)',
            fontWeight: 600,
            letterSpacing: '-0.035em',
          }}
        >
          {project.title}
        </span>
        <span style={{ flex: '1 1 300px', minWidth: 0, fontSize: '15.5px', lineHeight: 1.6, color: '#9EA0AE' }}>
          {project.description}
        </span>
        {project.tech.length > 0 && (
          <span
            style={{
              flex: '0 0 auto',
              marginLeft: 'auto',
              fontFamily: MONO,
              fontSize: '11.5px',
              color: '#8B8D9B',
              textAlign: 'right',
              lineHeight: 1.9,
            }}
          >
            {project.tech.slice(0, 3).join(' · ')}
          </span>
        )}
        <span
          data-caret="1"
          style={{
            flex: '0 0 auto',
            fontFamily: MONO,
            fontSize: '19px',
            lineHeight: 1,
            color: '#8B7CF6',
            transition: 'transform .35s cubic-bezier(.2,.8,.2,1)',
          }}
        >
          +
        </span>
      </Hoverable>

      <div style={{ padding: '4px 8px 46px', display: 'flex', flexWrap: 'wrap', gap: '26px' }}>
        <div
          style={{
            flex: '1 1 420px',
            minWidth: 0,
            position: 'relative',
            aspectRatio: '16/9',
            border: '1px solid rgba(255,255,255,0.10)',
            borderRadius: '16px',
            overflow: 'hidden',
            background: '#0F1016',
          }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: MONO,
                color: '#5E6070',
                fontSize: '12px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {project.title}
            </div>
          )}
        </div>

        <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {project.tech.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tech.map((tech) => (
                <span key={tech} style={pill}>{tech}</span>
              ))}
            </div>
          )}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {project.repoUrl && (
              <Hoverable as="a" href={project.repoUrl} target="_blank" rel="noopener" style={linkBtn} hoverStyle={linkHover}>
                {t('projects.source')}
              </Hoverable>
            )}
            {project.liveUrl ? (
              <Hoverable
                as="a"
                href={project.liveUrl}
                target="_blank"
                rel="noopener"
                style={{ ...linkBtn, borderColor: 'rgba(139,124,246,0.5)', background: 'rgba(139,124,246,0.14)' }}
                hoverStyle={linkHover}
              >
                {t('projects.live')}
              </Hoverable>
            ) : (
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: '12.5px',
                  color: '#6E7080',
                  border: '1px dashed rgba(255,255,255,0.14)',
                  borderRadius: '999px',
                  padding: '12px 20px',
                }}
              >
                {t('projects.demoSoon')}
              </span>
            )}
          </div>
        </div>
      </div>
    </details>
  );
}

export function Projects() {
  const { t } = useApp();
  const { projects, loading, error } = useProjects();

  return (
    <section
      id="projetos"
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: '1240px',
        margin: '0 auto',
        padding: 'clamp(84px,11vw,130px) clamp(20px,4vw,28px)',
      }}
    >
      <SectionKicker label={t('projects.kicker')} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {loading ? (
          <div style={note}>{t('projects.loading')}</div>
        ) : error ? (
          <div style={note}>{t('projects.error')}</div>
        ) : projects.length === 0 ? (
          <div style={note}>{t('projects.empty')}</div>
        ) : (
          projects.map((project, i) => <ProjectRow key={project.id} project={project} index={i} />)
        )}
        {!loading && !error && projects.length > 0 && (
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.09)' }} />
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '54px' }}>
        <Hoverable
          as="a"
          href="https://github.com/jumaelmartins?tab=repositories"
          target="_blank"
          rel="noopener"
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
            padding: '16px 28px',
            borderRadius: '999px',
            transition: 'border-color .3s, transform .3s, background .3s',
          }}
          hoverStyle={{ borderColor: '#8B7CF6', background: 'rgba(139,124,246,0.10)', transform: 'translateY(-3px)' }}
        >
          {t('projects.more')}
        </Hoverable>
      </div>
    </section>
  );
}
