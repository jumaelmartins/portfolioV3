import { CSSProperties, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useApp } from '../context/AppContext';

const MONO = "'JetBrains Mono', monospace";

/** Resolves a raw video URL into an embeddable form.
 *  - YouTube (watch, youtu.be, shorts, embed) → privacy-friendly embed iframe
 *  - Vimeo (vimeo.com/ID) → player iframe
 *  - anything else → treated as a direct media file for <video> */
function resolveVideo(url: string): { kind: 'iframe' | 'file'; src: string } {
  const yt =
    url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/i);
  if (yt) {
    return { kind: 'iframe', src: `https://www.youtube-nocookie.com/embed/${yt[1]}?autoplay=1&rel=0` };
  }
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeo) {
    return { kind: 'iframe', src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` };
  }
  return { kind: 'file', src: url };
}

const overlay: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'clamp(16px,4vw,48px)',
  background: 'rgba(8,8,12,0.82)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  transition: 'opacity .28s ease',
};

const frame: CSSProperties = {
  position: 'relative',
  width: '100%',
  maxWidth: '1040px',
  aspectRatio: '16/9',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: '16px',
  overflow: 'hidden',
  background: '#0F1016',
  boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
  transition: 'transform .28s cubic-bezier(.2,.8,.2,1), opacity .28s ease',
};

const closeBtn: CSSProperties = {
  position: 'absolute',
  top: 'calc(-1 * clamp(34px,6vw,46px))',
  right: 0,
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  fontFamily: MONO,
  fontSize: '12.5px',
  color: '#F2F1EE',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '6px 4px',
};

export function VideoModal({ url, title, onClose }: { url: string; title: string; onClose: () => void }) {
  const { t } = useApp();
  const [shown, setShown] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const video = resolveVideo(url);

  // Fade/scale in after mount, lock body scroll, wire Esc, focus the close button.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      style={{ ...overlay, opacity: shown ? 1 : 0 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div style={{ ...frame, opacity: shown ? 1 : 0, transform: shown ? 'scale(1)' : 'scale(0.96)' }}>
        <button ref={closeRef} type="button" onClick={onClose} style={closeBtn} aria-label={t('projects.videoClose')}>
          {t('projects.videoClose')} ✕
        </button>
        {video.kind === 'iframe' ? (
          <iframe
            src={video.src}
            title={title}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        ) : (
          <video
            src={video.src}
            controls
            autoPlay
            playsInline
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain', background: '#000' }}
          />
        )}
      </div>
    </div>,
    document.body,
  );
}
