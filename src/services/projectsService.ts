import { Project, ProjectCategory } from '../types';
import fallbackProjects from '../data/projects.json';

const baseUrl = import.meta.env.BASE_URL || '/';

let cachedProjects: Project[] | null = null;

/**
 * Loads projects dynamically from /data/projects.json if available,
 * falling back seamlessly to bundled projects.json.
 */
export async function loadProjects(): Promise<Project[]> {
  try {
    const response = await fetch(`${baseUrl}data/projects.json`, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        cachedProjects = data as Project[];
        return cachedProjects;
      }
    }
  } catch (err) {
    console.warn('Dynamic fetch from /data/projects.json bypassed, using bundled projects list:', err);
  }

  // Fallback to static bundled list
  cachedProjects = fallbackProjects as Project[];
  return cachedProjects;
}

/**
 * Synchronous getter for immediate render while async fetch happens in background.
 */
export function getInitialProjects(): Project[] {
  if (cachedProjects && cachedProjects.length > 0) {
    return cachedProjects;
  }
  return fallbackProjects as Project[];
}

/**
 * Extracts all unique categories dynamically from the loaded project list
 * so you can add any category (e.g. HOSPITALITY, CIVIC, INTERIOR) in the JSON!
 */
export function getDynamicCategories(projects: Project[]): { id: string; label: string }[] {
  const categoriesMap = new Map<string, string>();
  categoriesMap.set('ALL', 'All Projects');

  projects.forEach((p) => {
    const catId = (p.category || 'RESIDENTIAL').toUpperCase();
    const label = p.categoryLabel || p.category || 'Project';
    if (!categoriesMap.has(catId)) {
      categoriesMap.set(catId, label);
    }
  });

  return Array.from(categoriesMap.entries()).map(([id, label]) => ({
    id,
    label
  }));
}
