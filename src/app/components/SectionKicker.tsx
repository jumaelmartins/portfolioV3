/** The "0N — Label" eyebrow with a growing hairline used atop each section. */
export function SectionKicker({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#8B7CF6',
          whiteSpace: 'nowrap',
        }}
      >
        {label}
      </span>
      <span className="rv-line" style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.10)' }} />
    </div>
  );
}
