import { SearchFilter, SearchResultLecture } from '@/entities/search';
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
  search(args: { baseUrl: string; apikey: string }, params: Partial<SearchFilter>): Promise<SearchResultLecture[]>;
}

const getSearchRepository = (): SearchRepository => {
  return {
    getTags: async ({ baseUrl, apikey }, { year, semester }) => {
      const response = await fetch(`${baseUrl}/v1/tags/${year}/${semester}`, {
        headers: { 'x-access-apikey': apikey },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as Awaited<ReturnType<SearchRepository['getTags']>>;
    },
    search: async ({ baseUrl, apikey }, params) => {
      const response = await fetch(`${baseUrl}/v1/search_query`, {
        headers: { 'x-access-apikey': apikey, 'content-type': 'application/json;charset=UTF-8' },
        method: 'POST',
        body: JSON.stringify(params),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as SearchResultLecture[];
    },
  };
};

export const searchRepository = getSearchRepository();
