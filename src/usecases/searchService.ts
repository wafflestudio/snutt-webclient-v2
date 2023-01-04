import { SearchFilter, SearchResultLecture } from '@/entities/search';
import { CourseBook } from '@/entities/semester';
import { SearchRepository, searchRepository } from '@/repositories/searchRepository';
import { AuthService, authService } from '@/usecases/authService';
import { EnvService, envService } from '@/usecases/envService';

export interface SearchService {
  getTags(params: Omit<CourseBook, 'updated_at'>): Promise<{
    academic_year: string[];
    category: string[];
    classification: string[];
    credit: string[];
    department: string[];
    instructor: string[];
    updated_at: number;
  }>;
  search(params: Partial<SearchFilter>): Promise<SearchResultLecture[]>;
}

const getSearchService = (deps: {
  services: [AuthService, EnvService];
  repositories: [SearchRepository];
}): SearchService => {
  const apikey = deps.services[0].getApiKey();
  const baseUrl = deps.services[1].getBaseUrl();

  return {
    getTags: (yearSemester) => deps.repositories[0].getTags({ apikey, baseUrl }, yearSemester),
    search: (params) => deps.repositories[0].search({ apikey, baseUrl }, params),
  };
};

export const searchService = getSearchService({
  services: [authService, envService],
  repositories: [searchRepository],
});
