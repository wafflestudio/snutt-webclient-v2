import { CourseBook } from '@/entities/semester';

export interface SearchRepository {
  getTags(
    args: { baseUrl: string; apikey: string },
    params: Omit<CourseBook, 'updated_at'>,
  ): Promise<{
    academic_year: string[];
    category: string[];
    classification: string[];
    credit: string[];
    department: string[];
    instructor: string[];
    updated_at: number;
  }>;
}

const getSearchRepository = (): SearchRepository => {
  return {
    getTags: async ({ baseUrl, apikey }, { year, semester }) => {
      const response = await fetch(`${baseUrl}/tags/${year}/${semester}`, {
        headers: { 'x-access-apikey': apikey },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as Awaited<ReturnType<SearchRepository['getTags']>>;
    },
  };
};

export const searchRepository = getSearchRepository();
