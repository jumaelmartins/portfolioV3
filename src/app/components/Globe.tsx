import { CSSProperties, useEffect, useRef } from 'react';

/**
 * Slowly rotating wireframe globe drawn on a canvas — ported verbatim from the
 * design's inline script into a self-contained effect. Honors reduced-motion by
 * drawing a single static frame.
 */
export function Globe({ style }: { style?: CSSProperties }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    const TILT = 0.36;
    const sinT = Math.sin(TILT);
    const cosT = Math.cos(TILT);
    let rot = 0;
    let size = 0;
    let raf = 0;

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = cv.clientWidth || 520;
      size = w;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(w * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (lat: number, lon: number) => {
      const la = (lat * Math.PI) / 180;
      const lo = (lon * Math.PI) / 180 + rot;
      const x = Math.cos(la) * Math.sin(lo);
      const y = Math.sin(la);
      const z = Math.cos(la) * Math.cos(lo);
      const y2 = y * cosT - z * sinT;
      const z2 = y * sinT + z * cosT;
      const r = size * 0.4;
      const persp = 1 / (1 - z2 * 0.28);
      return { x: size / 2 + x * r * persp, y: size / 2 - y2 * r * persp, z: z2 };
    };

    const stroke = (pts: { x: number; y: number; z: number }[]) => {
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const depth = (a.z + b.z) / 2;
        if (depth > 0.02) {
          ctx.strokeStyle = 'rgba(139,124,246,' + (0.2 + depth * 0.55).toFixed(3) + ')';
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = 'rgba(180,180,205,' + (0.05 + (1 + depth) * 0.05).toFixed(3) + ')';
          ctx.lineWidth = 0.8;
        }
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, size, size);
      for (let lat = -75; lat <= 75; lat += 15) {
        const pts = [];
        for (let lon = 0; lon <= 360; lon += 4) pts.push(project(lat, lon));
        stroke(pts);
      }
      for (let lon = 0; lon < 180; lon += 15) {
        const pts = [];
        for (let lat = -90; lat <= 90; lat += 4) pts.push(project(lat, lon));
        for (let lat = 90; lat >= -90; lat -= 4) pts.push(project(lat, lon + 180));
        stroke(pts);
      }
      rot += 0.0024;
      raf = requestAnimationFrame(draw);
    };

    fit();
    window.addEventListener('resize', fit);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', fit);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" style={style} />;
}
