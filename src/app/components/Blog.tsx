import { useApp } from '../context/AppContext';
import { SectionKicker } from './SectionKicker';

const MONO = "'JetBrains Mono', monospace";
const DISPLAY = "'Familjen Grotesk', sans-serif";

interface BlogPost {
  tag: string;
  title: string;
}

export function Blog() {
  const { t } = useApp();
  const posts = t('blog.posts') as BlogPost[];

  return (
    <section
      id="blog"
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'rgba(18,19,26,0.55)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: 'clamp(84px,11vw,130px) clamp(20px,4vw,28px)' }}>
        <SectionKicker label={t('blog.kicker')} />
        <h2
          className="rv"
          style={{
            fontFamily: DISPLAY,
            fontWeight: 600,
            fontSize: 'clamp(32px,3.6vw,52px)',
            lineHeight: 1.06,
            letterSpacing: '-0.04em',
            margin: '0 0 18px',
          }}
        >
          {t('blog.headline')}
        </h2>
        <p style={{ fontSize: '17px', color: '#9EA0AE', margin: '0 0 50px' }}>{t('blog.subtitle')}</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(272px,100%),1fr))', gap: '22px' }}>
          {posts.map((post) => (
            <div
              key={post.title}
              className="rv"
              style={{
                border: '1px solid rgba(255,255,255,0.09)',
                borderRadius: '22px',
                padding: '30px',
                background: 'rgba(10,10,13,0.6)',
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#8B7CF6',
                  border: '1px solid rgba(139,124,246,0.3)',
                  borderRadius: '999px',
                  padding: '5px 10px',
                }}
              >
                {post.tag}
              </span>
              <h3
                style={{
                  fontFamily: DISPLAY,
                  fontSize: '22px',
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  lineHeight: 1.2,
                  margin: '20px 0 0',
                }}
              >
                {post.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
