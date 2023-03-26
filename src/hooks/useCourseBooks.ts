import { useQuery } from '@tanstack/react-query';

import { semesterService } from '@/services';

export const useCourseBooks = () =>
  useQuery(['course_books'], () => semesterService.getCourseBooks(), { staleTime: Infinity });
