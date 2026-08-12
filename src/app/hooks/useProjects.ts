import { useState, useEffect, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  projectDescriptions,
  categoryEmoji,
  categoryAccent,
} from '../data/projectDescriptions';

// URLs keep public fallbacks so a missing build var never breaks the site.
// The API key is NOT hardcoded — it must come from the build env (a GitHub
// Actions secret in CI, or .env locally).
const API_URL = import.meta.env.VITE_PM_API_URL || 'https://pm.jumadev.com';
const API_KEY = import.meta.env.VITE_PM_API_KEY;
const IMAGE_BASE = import.meta.env.VITE_PM_IMAGE_BASE || 'https://pm.jumadev.com';

/** Builds a public image URL from the API's relative src_path. */
function resolveImage(srcPath?: string | null): string {
  if (!srcPath) return '';
  if (/^https?:\/\//i.test(srcPath)) return srcPath;
  const base = (IMAGE_BASE || '').replace(/\/+$/, '');
  const path = srcPath.replace(/^\/+/, '');
  return base ? `${base}/${path}` : `/${path}`;
}

/** Shape consumed by <ProjectCard> — derived from the API's f_projects. */
export interface UiProject {
  id: number;
  title: string;
  description: string;
  emoji: string;
  accent: string;
  image: string;
  tech: string[];
  category: string;
  url: string;
  github: string;
  year: string;
}

/** Raw project as returned by GET /public/portfolio -> f_projects[]. */
interface ApiProject {
  id: number;
  title: string;
  description: string | null;
  repo_url: string | null;
  live_url: string | null;
  category?: { category?: string } | null;
  technologies?: { tech: string }[] | null;
  f_images?: { id: number; src_path: string } | null;
  created_at?: string;
}

/**
 * Fetches projects from the Portfolio Manager CMS and maps them to the card
 * shape. Descriptions come from the local i18n overlay (falling back to the
 * API text); emoji/accent are derived from category. Fetch runs once; the
 * mapping re-runs when the language changes.
 */
export function useProjects() {
  const { language } = useApp();
  const [raw, setRaw] = useState<ApiProject[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch(`${API_URL}/public/portfolio`, {
          headers: { 'x-api-key': API_KEY },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setRaw(Array.isArray(data?.f_projects) ? data.f_projects : []);
        }
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

  const projects = useMemo<UiProject[]>(() => {
    if (!raw) return [];
    return raw.map((p) => {
      const category = (p.category?.category || '').toUpperCase();
      const overlay = projectDescriptions[p.id]?.[language];
      return {
        id: p.id,
        title: p.title,
        description: overlay || p.description || '',
        emoji: categoryEmoji[category] || categoryEmoji.DEFAULT,
        accent: categoryAccent[category] || categoryAccent.DEFAULT,
        image: resolveImage(p.f_images?.src_path),
        tech: Array.isArray(p.technologies) ? p.technologies.map((t) => t.tech) : [],
        category,
        url: p.live_url || '',
        github: p.repo_url || '',
        year: p.created_at ? String(new Date(p.created_at).getFullYear()) : '',
      };
    });
  }, [raw, language]);

  return { projects, loading, error };
}
