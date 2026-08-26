import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Public fallbacks keep the site working if a build var is missing.
// The API key is NEVER hardcoded — it comes from the build env (a GitHub
// Actions secret in CI, or .env locally).
const API_URL = import.meta.env.VITE_PM_API_URL || 'https://pm.jumadev.com';
const API_KEY = import.meta.env.VITE_PM_API_KEY;
const IMAGE_BASE = import.meta.env.VITE_PM_IMAGE_BASE || 'https://pm.jumadev.com';

/** Builds a public image URL. The API now returns an absolute `url`; older
 *  payloads used a relative `src_path`, so both are supported. */
export function resolveImage(img?: ApiImage | null): string {
  const raw = img?.url || img?.src_path || '';
  if (!raw) return '';
  if (/^https?:\/\//i.test(raw)) return raw;
  const base = (IMAGE_BASE || '').replace(/\/+$/, '');
  const path = raw.replace(/^\/+/, '');
  return base ? `${base}/${path}` : `/${path}`;
}

export interface ApiImage {
  id?: number;
  url?: string | null;
  src_path?: string | null;
  description?: string | null;
}

export interface ApiProject {
  id: number;
  title: string;
  description: string | null;
  repo_url: string | null;
  live_url: string | null;
  // Video URL added in the portfolio manager. The exact field name wasn't
  // confirmable against the live API (key rotated), so useProjects reads it
  // defensively across the likely names below.
  video_url?: string | null;
  video?: string | null;
  demo_video_url?: string | null;
  youtube_url?: string | null;
  category?: { category?: string } | null;
  technologies?: { tech: string }[] | null;
  f_images?: ApiImage | null;
  created_at?: string;
}

export interface ApiExperience {
  id: number;
  tile?: string; // NOTE: the CMS field is spelled "tile" (job title)
  title?: string;
  company_name?: string;
  description?: string | null;
  start_date?: string | null;
  end_date?: string | null;
}

/** Education/courses shape is not yet exercised by the CMS (empty arrays),
 *  so it is read defensively via multiple field-name fallbacks. */
export interface ApiEducation {
  id: number;
  [key: string]: any;
}

export interface PortfolioRaw {
  f_projects?: ApiProject[];
  f_experience?: ApiExperience[];
  f_education?: ApiEducation[];
  f_courses?: ApiEducation[];
  role?: { role?: string } | null;
  status?: { status?: string } | null;
}

interface PortfolioContextType {
  data: PortfolioRaw | null;
  loading: boolean;
  error: boolean;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioRaw | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${API_URL}/public/portfolio`, {
          headers: API_KEY ? { 'x-api-key': API_KEY } : undefined,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = (await res.json()) as PortfolioRaw;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, loading, error }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
