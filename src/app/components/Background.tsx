/** Fixed decorative layers behind everything: faint grid + drifting violet haze. */
export function Background() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '76px 76px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 30%, transparent 78%)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: '-24vh',
          left: '52%',
          width: '60vw',
          height: '60vw',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
          background:
            'radial-gradient(circle, rgba(139,124,246,0.20), rgba(139,124,246,0) 62%)',
          filter: 'blur(30px)',
          animation: 'haze 16s ease-in-out infinite',
        }}
      />
    </>
  );
}
