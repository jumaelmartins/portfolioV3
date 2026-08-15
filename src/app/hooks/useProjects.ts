import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { usePortfolio, resolveImage } from '../context/PortfolioContext';
import { projectDescriptions } from '../data/projectDescriptions';

/** Shape consumed by the Projects accordion — derived from the API's f_projects. */
export interface UiProject {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  category: string;
  liveUrl: string;
  repoUrl: string;
  year: string;
}

/**
 * Maps CMS projects into the accordion card shape. Descriptions come from the
 * local i18n overlay (falling back to the API text). Data is fetched once by
 * PortfolioProvider; the mapping re-runs when the language changes.
 */
export function useProjects() {
  const { language } = useApp();
  const { data, loading, error } = usePortfolio();

  const projects = useMemo<UiProject[]>(() => {
    const raw = data?.f_projects;
    if (!Array.isArray(raw)) return [];
    return raw.map((p) => {
      const overlay = projectDescriptions[p.id]?.[language];
      return {
        id: p.id,
        title: p.title,
        description: overlay || p.description || '',
        image: resolveImage(p.f_images),
        tech: Array.isArray(p.technologies) ? p.technologies.map((t) => t.tech) : [],
        category: (p.category?.category || '').toUpperCase(),
        liveUrl: p.live_url || '',
        repoUrl: p.repo_url || '',
        year: p.created_at ? String(new Date(p.created_at).getFullYear()) : '',
      };
    });
  }, [data, language]);

  return { projects, loading, error };
}
