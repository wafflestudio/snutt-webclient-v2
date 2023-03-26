import type { ApiClient } from '@/clients/api';
import type { SearchFilter, SearchResultLecture } from '@/entities/search';
import type { CourseBook } from '@/entities/semester';

type Tags = {
  academic_year: string[];
  category: string[];
  classification: string[];
  credit: string[];
  department: string[];
  instructor: string[];
  updated_at: number;
};
export interface SearchRepository {
  getTags(params: Omit<CourseBook, 'updated_at'>): Promise<Tags>;
  search(params: Partial<SearchFilter>): Promise<SearchResultLecture[]>;
}

type Deps = { clients: [ApiClient] };
export const getSearchRepository = ({ clients: [apiClient] }: Deps): SearchRepository => {
  return {
    getTags: async ({ year, semester }) => (await apiClient.get<Tags>(`/v1/tags/${year}/${semester}`)).data,
    search: async (params) => (await apiClient.post<SearchResultLecture[]>(`/v1/search_query`, params)).data,
  };
};
