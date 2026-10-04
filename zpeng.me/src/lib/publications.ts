import { getCollection } from 'astro:content';

export const SECTION_ORDER = ['book', 'book-chapters', 'journals', 'conferences', 'patents'] as const;
export type SectionId = (typeof SECTION_ORDER)[number];

export async function publicationSections() {
  const all = await getCollection('publications');
  return SECTION_ORDER.map((id) => all.find((s) => s.id === id)).filter((s) => s !== undefined);
}

export async function publicationCounts(): Promise<Record<SectionId, number>> {
  const sections = await publicationSections();
  const counts = Object.fromEntries(SECTION_ORDER.map((id) => [id, 0])) as Record<SectionId, number>;
  for (const s of sections) counts[s.id as SectionId] = s.data.items.length;
  return counts;
}
