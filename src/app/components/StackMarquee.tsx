import { CSSProperties } from 'react';

const MONO = "'JetBrains Mono', monospace";

const STACK = [
  'Node.js', 'TypeScript', 'React', 'Next.js', 'Python', 'FastAPI',
  'PostgreSQL', 'MongoDB', 'Prisma', 'Docker', 'OpenAI', 'Stripe', 'AWS',
];

const rowStyle: CSSProperties = {
  display: 'flex',
  gap: '44px',
  paddingRight: '44px',
  fontFamily: MONO,
  fontSize: '13px',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#7A7C8A',
};

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden || undefined} style={rowStyle}>
      {STACK.map((tech) => (
        <span key={tech} style={{ display: 'contents' }}>
          <span>{tech}</span>
          <span style={{ color: '#8B7CF6' }}>/</span>
        </span>
      ))}
    </div>
  );
}

/** Infinite horizontal marquee of the tech stack. */
export function StackMarquee() {
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '22px 0',
        overflow: 'hidden',
        background: 'rgba(18,19,26,0.5)',
      }}
    >
      <div style={{ display: 'flex', width: 'max-content', animation: 'marquee 34s linear infinite' }}>
        <Row />
        <Row hidden />
      </div>
    </div>
  );
}
