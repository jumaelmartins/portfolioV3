import { useApp } from '../context/AppContext';

export function Footer() {
  const { t } = useApp();
  return (
    <footer style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div
        style={{
          maxWidth: '1240px',
          margin: '0 auto',
          padding: '34px clamp(20px,4vw,28px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px 24px',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: '#7A7C8A',
        }}
      >
        <span>© 2026 Jumael Martins</span>
        <span>{t('footer.tagline')}</span>
      </div>
    </footer>
  );
}
