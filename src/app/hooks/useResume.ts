import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { usePortfolio, ApiEducation, ApiExperience } from '../context/PortfolioContext';

export interface ResumeEntry {
  id: number;
  title: string;
  subtitle: string;
  period: string;
}

/** "2024-09-01T..." -> "09/2024"; empty/invalid -> "". */
function monthYear(iso?: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  return `${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
}

function sortByStartDesc<T extends { start?: string | null }>(a: T, b: T): number {
  const ta = a.start ? new Date(a.start).getTime() : 0;
  const tb = b.start ? new Date(b.start).getTime() : 0;
  return tb - ta;
}

/** Experience list from f_experience. Note the CMS spells the title field "tile". */
export function useExperience(): { items: ResumeEntry[]; loading: boolean; error: boolean } {
  const { t } = useApp();
  const { data, loading, error } = usePortfolio();

  const items = useMemo<ResumeEntry[]>(() => {
    const raw = data?.f_experience;
    if (!Array.isArray(raw)) return [];
    return raw
      .map((e: ApiExperience) => ({
        id: e.id,
        title: e.tile || e.title || '',
        subtitle: e.company_name || '',
        start: e.start_date,
        end: e.end_date,
      }))
      .sort(sortByStartDesc)
      .map(({ id, title, subtitle, start, end }) => ({
        id,
        title,
        subtitle: [subtitle, `${monthYear(start)} — ${end ? monthYear(end) : t('about.present')}`]
          .filter(Boolean)
          .join(' · '),
        period: '',
      }));
  }, [data, t]);

  return { items, loading, error };
}

/**
 * Education list from f_education. The CMS has no education entries yet, so its
 * field names are unknown — read defensively with fallbacks and render whatever
 * is present.
 */
export function useEducation(): { items: ResumeEntry[]; loading: boolean; error: boolean } {
  const { t } = useApp();
  const { data, loading, error } = usePortfolio();

  const items = useMemo<ResumeEntry[]>(() => {
    const raw = data?.f_education;
    if (!Array.isArray(raw)) return [];
    return raw
      .map((e: ApiEducation) => ({
        id: e.id,
        title: e.degree || e.course || e.title || e.tile || e.name || e.field || '',
        subtitle: e.institution || e.institution_name || e.school || e.organization || e.company_name || '',
        start: e.start_date || e.start || e.started_at || null,
        end: e.end_date || e.end || e.finished_at || null,
      }))
      .sort(sortByStartDesc)
      .map(({ id, title, subtitle, start, end }) => {
        const range = start ? `${monthYear(start)} — ${end ? monthYear(end) : t('about.present')}` : '';
        return {
          id,
          title,
          subtitle: [subtitle, range].filter(Boolean).join(' · '),
          period: '',
        };
      });
  }, [data, t]);

  return { items, loading, error };
}
